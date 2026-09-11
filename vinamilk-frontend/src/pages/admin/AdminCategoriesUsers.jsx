import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiGrid, FiAlertTriangle } from "react-icons/fi";

const MOCK_CATEGORIES = [
  { id: 1, name: "Sữa Tươi",       slug: "sua-tuoi",       count: 24, icon: "🥛", color: "#DBEAFE", textColor: "#1D4ED8", image: "/images/p1.png" },
  { id: 2, name: "Sữa Chua",       slug: "sua-chua",       count: 18, icon: "🍶", color: "#D1FAE5", textColor: "#065F46", image: "/images/p2.png" },
  { id: 3, name: "Sữa Đặc",        slug: "sua-dac",        count: 8,  icon: "🫙", color: "#FDE8C8", textColor: "#92400E", image: "/images/p8.png" },
  { id: 4, name: "Sữa Bột",        slug: "sua-bot",        count: 15, icon: "🧂", color: "#E9D5FF", textColor: "#6D28D9", image: "/images/p9.png" },
  { id: 5, name: "Sữa Hạt",        slug: "sua-hat",        count: 5,  icon: "🌰", color: "#FEF3C7", textColor: "#92400E", image: "/images/p4.png" },
  { id: 6, name: "Kem",            slug: "kem",            count: 6,  icon: "🍦", color: "#FCE7F3", textColor: "#BE185D", image: "/images/p5.png" },
  { id: 7, name: "Sữa Dinh Dưỡng", slug: "sua-dinh-duong", count: 12, icon: "💊", color: "#CCFBF1", textColor: "#0F766E", image: "/images/p10.png" },
  { id: 8, name: "Sữa Thực Vật",   slug: "sua-thuc-vat",   count: 5,  icon: "🌱", color: "#DCFCE7", textColor: "#15803D", image: "/images/p11.png" },
];

const MOCK_USERS = [
  { id: 1, fullName: "Nguyễn Văn An",   email: "an.nguyen@gmail.com",   phone: "0901234567", role: "user",  orders: 12, joined: "15/01/2026", status: "active",  avatar: "https://i.pravatar.cc/40?img=11" },
  { id: 2, fullName: "Trần Thị Bình",   email: "binh.tran@gmail.com",   phone: "0912345678", role: "user",  orders: 7,  joined: "22/02/2026", status: "active",  avatar: "https://i.pravatar.cc/40?img=5"  },
  { id: 3, fullName: "Lê Minh Cường",   email: "cuong.le@gmail.com",     phone: "0923456789", role: "admin", orders: 0,  joined: "01/01/2026", status: "active",  avatar: "https://i.pravatar.cc/40?img=3"  },
  { id: 4, fullName: "Phạm Lan Hương",  email: "huong.pham@gmail.com",   phone: "0934567890", role: "user",  orders: 24, joined: "05/03/2026", status: "active",  avatar: "https://i.pravatar.cc/40?img=9"  },
  { id: 5, fullName: "Võ Đình Tuấn",   email: "tuan.vo@gmail.com",      phone: "0945678901", role: "user",  orders: 3,  joined: "18/04/2026", status: "banned",  avatar: "https://i.pravatar.cc/40?img=7"  },
  { id: 6, fullName: "Hoàng Thu Hà",   email: "ha.hoang@gmail.com",     phone: "0956789012", role: "user",  orders: 15, joined: "10/05/2026", status: "active",  avatar: "https://i.pravatar.cc/40?img=16" },
];

const STORAGE_KEY_USERS = "vnm_admin_users";
const loadUsers = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USERS);
    return saved ? JSON.parse(saved) : MOCK_USERS;
  } catch { return MOCK_USERS; }
};
const saveUsers = (list) => {
  try { localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(list)); } catch {}
};

// ── Category Form Modal ───────────────────────────────────────────────────────
const CategoryModal = ({ open, category, onClose, onSave }) => {
  const [form, setForm] = useState({ name: "", slug: "", icon: "", color: "#E8F0FB", textColor: "#003087" });

  useState(() => {
    if (category) setForm({ name: category.name, slug: category.slug, icon: category.icon, color: category.color, textColor: category.textColor });
    else setForm({ name: "", slug: "", icon: "", color: "#E8F0FB", textColor: "#003087" });
  }, [category, open]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const autoSlug = (name) => name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Vui lòng nhập tên danh mục"); return; }
    onSave({ ...category, ...form, slug: form.slug || autoSlug(form.name) });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-[#1a2e5a] text-lg">{category ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#E8F0FB] text-[#5a7299]"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Tên danh mục *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Ví dụ: Sữa Tươi"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Slug (URL)</label>
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="sua-tuoi (tự động)"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Màu nền</label>
                  <input type="color" name="color" value={form.color} onChange={handleChange}
                    className="w-full h-[46px] rounded-xl border border-[#E8E2D4] cursor-pointer" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Màu chữ</label>
                  <input type="color" name="textColor" value={form.textColor} onChange={handleChange}
                    className="w-full h-[46px] rounded-xl border border-[#E8E2D4] cursor-pointer" />
                </div>
              </div>
              {/* Preview */}
              <div className="p-3 rounded-xl" style={{ background: "#FAF6EC" }}>
                <p className="text-xs text-[#5a7299] mb-2 font-semibold">Xem trước:</p>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold" style={{ background: form.color, color: form.textColor }}>
                  <span>{form.name || "Tên danh mục"}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold border border-[#E8E2D4] text-[#1a2e5a] hover:bg-[#FAF6EC] transition-all">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-sm transition-all" style={{ background: "#003087" }}>
                  {category ? "Lưu thay đổi" : "Thêm danh mục"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Confirm Dialog ─────────────────────────────────────────────────────────────
const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => (
  <AnimatePresence>
    {open && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <FiAlertTriangle size={20} className="text-red-600" />
            </div>
            <h3 className="font-bold text-[#1a2e5a]">{title}</h3>
          </div>
          <p className="text-sm text-[#5a7299] mb-5">{message}</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold border border-[#E8E2D4] text-[#1a2e5a] hover:bg-[#FAF6EC] transition-all">Hủy</button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm">Xác nhận</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ── AdminCategories ───────────────────────────────────────────────────────────
const CategoriesTab = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCat, setEditCat] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleSave = (saved) => {
    if (saved.id) {
      setCategories((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
      toast.success("Đã cập nhật danh mục!");
    } else {
      setCategories((prev) => [...prev, { ...saved, id: Date.now(), count: 0 }]);
      toast.success("Đã thêm danh mục mới!");
    }
    setModalOpen(false);
    setEditCat(null);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteId(null);
    toast.success("Đã xóa danh mục!");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#5a7299]">{categories.length} danh mục</p>
        <button
          onClick={() => { setEditCat(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm hover:opacity-90 transition-all"
          style={{ background: "#003087" }}
          id="admin-add-category-btn"
        >
          <FiPlus size={16} /> Thêm danh mục
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl border border-[#E8E2D4] overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            {/* Thanh màu accent trên đầu */}
            <div className="h-1.5 w-full" style={{ background: cat.textColor }} />

            {/* Vùng ảnh — nền trắng để mix-blend-mode hoạt động */}
            <div className="relative h-36 flex items-center justify-center bg-white overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                style={{ mixBlendMode: "multiply" }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditCat(cat); setModalOpen(true); }}
                  className="p-1.5 rounded-lg bg-white shadow text-[#5a7299] hover:text-blue-600 border border-[#E8E2D4] transition-all">
                  <FiEdit2 size={13} />
                </button>
                <button onClick={() => setDeleteId(cat.id)}
                  className="p-1.5 rounded-lg bg-white shadow text-[#5a7299] hover:text-red-600 border border-[#E8E2D4] transition-all">
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>

            {/* Info — nền màu nhẹ của danh mục */}
            <div className="p-3 border-t border-[#E8E2D4]" style={{ background: cat.color }}>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-[#1a2e5a]">{cat.name}</h3>
              </div>
              <p className="text-xs text-[#5a7299] mb-2">/{cat.slug}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                style={{ background: "white", color: cat.textColor, border: `1px solid ${cat.textColor}30` }}>
                {cat.count} sản phẩm
              </span>
            </div>
          </motion.div>
        ))}
      </div>


      <CategoryModal open={modalOpen} category={editCat} onClose={() => { setModalOpen(false); setEditCat(null); }} onSave={handleSave} />
      <ConfirmDialog open={!!deleteId} title="Xóa danh mục?" message="Bạn chắc chắn muốn xóa danh mục này không?" onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

// ── User Form Modal ─────────────────────────────────────────────────────────────
const UserModal = ({ open, user, onClose, onSave }) => {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", role: "user" });

  useState(() => {
    if (user) setForm({ fullName: user.fullName, email: user.email, phone: user.phone, role: user.role });
    else setForm({ fullName: "", email: "", phone: "", role: "user" });
  }, [user, open]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) { toast.error("Vui lòng nhập tên và email"); return; }
    onSave({ ...user, ...form });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-[#1a2e5a] text-lg">{user ? "Chỉnh sửa tài khoản" : "Tạo tài khoản nhân viên"}</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#E8F0FB] text-[#5a7299]"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Họ tên *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="nguyenvana@gmail.com" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Số điện thoại</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="09xxxx" className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Phân quyền</label>
                <select name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all bg-white">
                  <option value="user">Người dùng (Khách)</option>
                  <option value="admin">Quản trị viên (Nhân viên)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold border border-[#E8E2D4] text-[#1a2e5a] hover:bg-[#FAF6EC] transition-all">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-sm transition-all" style={{ background: "#003087" }}>
                  {user ? "Lưu thay đổi" : "Tạo tài khoản"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── UsersTab ──────────────────────────────────────────────────────────────────
const UsersTab = () => {
  const [users, setUsers] = useState(loadUsers);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  import("react").then((React) => {
    React.useEffect(() => { saveUsers(users); }, [users]);
  });

  const filtered = users.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((u) =>
      u.id === id ? { ...u, status: u.status === "active" ? "banned" : "active" } : u
    ));
    toast.success("Đã cập nhật trạng thái tài khoản!");
  };

  const toggleRole = (id) => {
    setUsers((prev) => prev.map((u) =>
      u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u
    ));
    toast.success("Đã cập nhật quyền tài khoản!");
  };

  const handleSave = (saved) => {
    if (saved.id) {
      setUsers((prev) => prev.map((u) => (u.id === saved.id ? saved : u)));
      toast.success("Đã cập nhật tài khoản!");
    } else {
      setUsers((prev) => [{
        ...saved, 
        id: Date.now(), 
        orders: 0, 
        joined: new Date().toLocaleDateString("vi-VN"), 
        status: "active",
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`
      }, ...prev]);
      toast.success("Đã tạo tài khoản nhân viên mới!");
    }
    setModalOpen(false);
    setEditUser(null);
  };

  const RoleBadge = ({ role }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold"
      style={role === "admin" ? { background: "#E8F0FB", color: "#003087" } : { background: "#F3F4F6", color: "#374151" }}>
      {role === "admin" ? "👑 Admin" : "Người dùng"}
    </span>
  );

  const StatusBadge2 = ({ status }) => (
    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold"
      style={status === "active" ? { background: "#D1FAE5", color: "#065F46" } : { background: "#FEE2E2", color: "#991B1B" }}>
      {status === "active" ? "Hoạt động" : "Đã khóa"}
    </span>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <p className="text-sm text-[#5a7299]">{users.length} tài khoản</p>
          <button onClick={() => { setEditUser(null); setModalOpen(true); }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-[#003087] bg-[#E8F0FB] hover:bg-[#003087] hover:text-white transition-all">
            <FiPlus size={14} /> Tạo nhân viên
          </button>
        </div>
        <div className="relative">
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm tài khoản..."
            className="pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E8E2D4] rounded-xl text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
            id="admin-user-search"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7299]" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E2D4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FAF6EC" }}>
                {["STT", "Họ tên", "Email", "SĐT", "Đơn hàng", "Vai trò", "Trạng thái", "Ngày tham gia", "Hành động"].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-[#5a7299] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const initials = user.fullName.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase();
                return (
                  <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="border-t border-[#E8E2D4] hover:bg-[#FAF6EC] transition-colors group">
                    <td className="px-4 py-3 text-sm text-[#5a7299]">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#E8E2D4]"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-9 h-9 rounded-full items-center justify-center text-white text-xs font-black flex-shrink-0 border-2 border-[#E8E2D4] hidden"
                            style={{ background: "linear-gradient(135deg, #003087, #0057b8)", display: 'none' }}>
                            {initials}
                          </div>
                          {user.status === "active" && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
                          )}
                          {user.status === "banned" && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1a2e5a] whitespace-nowrap">{user.fullName}</p>
                          {user.role === "admin" && (
                            <span className="text-[10px] font-bold text-[#003087]">👑 Quản trị viên</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#5a7299]">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-[#5a7299]">{user.phone}</td>
                    <td className="px-4 py-3 text-sm font-bold text-[#1a2e5a]">{user.orders}</td>
                    <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                    <td className="px-4 py-3"><StatusBadge2 status={user.status} /></td>
                    <td className="px-4 py-3 text-xs text-[#5a7299]">{user.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleRole(user.id)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold border border-[#E8E2D4] text-[#5a7299] hover:border-[#003087] hover:text-[#003087] transition-all whitespace-nowrap">
                          {user.role === "admin" ? "→ User" : "→ Admin"}
                        </button>
                        <button onClick={() => toggleStatus(user.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all whitespace-nowrap ${
                            user.status === "active"
                              ? "border-red-200 text-red-600 hover:bg-red-50"
                              : "border-green-200 text-green-700 hover:bg-green-50"
                          }`}>
                          {user.status === "active" ? "Khóa" : "Mở khóa"}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-12 text-[#5a7299]">
              <p>Không tìm thấy tài khoản nào</p>
            </div>
          )}
        </div>
      </div>
      <UserModal open={modalOpen} user={editUser} onClose={() => { setModalOpen(false); setEditUser(null); }} onSave={handleSave} />
    </div>
  );
};

// ── Main Component (Tab navigation) ──────────────────────────────────────────
const AdminCategoriesUsers = ({ defaultTab = "categories" }) => {
  const [tab, setTab] = useState(defaultTab);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-black text-[#1a2e5a]">
          {tab === "categories" ? "Quản lý Danh mục" : "Quản lý Tài khoản"}
        </h1>
        <p className="text-sm text-[#5a7299] mt-0.5">
          {tab === "categories" ? "Quản lý các danh mục sản phẩm" : "Quản lý tài khoản người dùng hệ thống"}
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "#F4EFE0" }}>
        {[
          { key: "categories", label: "Danh mục", icon: FiGrid },
          { key: "users", label: "Tài khoản", icon: null },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              tab === key ? "bg-white text-[#003087] shadow-sm" : "text-[#5a7299] hover:text-[#1a2e5a]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === "categories" ? <CategoriesTab /> : <UsersTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminCategoriesUsers;
