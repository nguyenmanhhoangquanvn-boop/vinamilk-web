import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiUpload,
  FiChevronLeft, FiChevronRight, FiFilter, FiEye,
  FiPackage, FiAlertTriangle,
} from "react-icons/fi";
import axiosClient from "../../services/axiosClient";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, name: "Sữa Tươi" },
  { id: 2, name: "Sữa Chua" },
  { id: 3, name: "Sữa Đặc" },
  { id: 4, name: "Sữa Bột" },
  { id: 5, name: "Sữa Hạt" },
  { id: 6, name: "Kem" },
];

const MOCK_PRODUCTS = [
  { id: "1", name: "Sữa tươi Green Farm Có đường 1L", category: "Sữa Tươi", price: 32000, stock: 245, status: "active", image: "/images/p1.png", sale: 0 },
  { id: "2", name: "Sữa chua ăn Green Farm Ít Đường", category: "Sữa Chua", price: 32000, stock: 182, status: "active", image: "/images/p2.png", sale: 10 },
  { id: "3", name: "Sữa chua uống Vinamilk 180ml", category: "Sữa Chua", price: 6500, stock: 0, status: "out_of_stock", image: "/images/p3.png", sale: 0 },
  { id: "4", name: "Sữa hạt Vinamilk 9 loại hạt ít đường", category: "Sữa Hạt", price: 35000, stock: 56, status: "active", image: "/images/p4.png", sale: 15 },
  { id: "5", name: "Vinamilk Gelato Sôcôla 400ml", category: "Kem", price: 79000, stock: 8, status: "active", image: "/images/p5.png", sale: 0 },
  { id: "6", name: "Kem hộp Vinamilk Dừa 870ml", category: "Kem", price: 85000, stock: 34, status: "active", image: "/images/p6.png", sale: 20 },
  { id: "7", name: "Sữa tươi tiệt trùng Vinamilk 1L", category: "Sữa Tươi", price: 28000, stock: 5, status: "active", image: "/images/p7.png", sale: 0 },
  { id: "8", name: "Sữa đặc Ngôi Sao Phương Nam", category: "Sữa Đặc", price: 18000, stock: 120, status: "inactive", image: "/images/p8.png", sale: 5 },
];

// ── Confirm Dialog ────────────────────────────────────────────────────────────
const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <FiAlertTriangle size={20} className="text-red-600" />
            </div>
            <h3 className="font-bold text-[#1a2e5a] text-base">{title}</h3>
          </div>
          <p className="text-sm text-[#5a7299] mb-5">{message}</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold border border-[#E8E2D4] text-[#1a2e5a] hover:bg-[#FAF6EC] transition-all">
              Hủy
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm">
              Xóa
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Product Form Modal ────────────────────────────────────────────────────────
const ProductModal = ({ open, product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "", category: "Sữa Tươi", price: "", stock: "",
    sale: "", status: "active", image: "", description: "",
  });
  const [imgPreview, setImgPreview] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category: product.category || "Sữa Tươi",
        price: product.price || "",
        stock: product.stock ?? "",
        sale: product.sale || 0,
        status: product.status || "active",
        image: product.image || "",
        description: product.description || "",
      });
      setImgPreview(product.image || "");
    } else {
      setForm({ name: "", category: "Sữa Tươi", price: "", stock: "", sale: "", status: "active", image: "", description: "" });
      setImgPreview("");
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgPreview(ev.target.result);
      setForm((p) => ({ ...p, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Vui lòng nhập tên sản phẩm"); return; }
    if (!form.price) { toast.error("Vui lòng nhập giá"); return; }
    onSave({ ...product, ...form, price: Number(form.price), stock: Number(form.stock), sale: Number(form.sale) });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D4] sticky top-0 bg-white z-10">
              <h2 className="font-black text-[#1a2e5a] text-lg">
                {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#E8F0FB] text-[#5a7299] transition-all">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-2">Hình ảnh sản phẩm</label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-24 h-24 rounded-xl border-2 border-dashed border-[#E8E2D4] flex items-center justify-center overflow-hidden bg-[#FAF6EC] flex-shrink-0 cursor-pointer hover:border-[#003087] transition-colors"
                    onClick={() => fileRef.current?.click()}
                  >
                    {imgPreview ? (
                      <img src={imgPreview} alt="preview" className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
                    ) : (
                      <FiUpload size={24} className="text-[#5a7299]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="px-4 py-2 text-sm font-bold rounded-xl border border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white transition-all flex items-center gap-2">
                      <FiUpload size={14} /> Chọn ảnh
                    </button>
                    <input
                      name="image"
                      value={form.image}
                      onChange={(e) => { handleChange(e); setImgPreview(e.target.value); }}
                      placeholder="Hoặc nhập URL ảnh..."
                      className="text-xs px-3 py-2 rounded-lg border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
                    />
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Tên sản phẩm *</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  placeholder="Nhập tên sản phẩm..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
                />
              </div>

              {/* Category + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Danh mục *</label>
                  <select
                    name="category" value={form.category} onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Trạng thái</label>
                  <select
                    name="status" value={form.status} onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all bg-white"
                  >
                    <option value="active">Đang bán</option>
                    <option value="inactive">Ngừng bán</option>
                    <option value="out_of_stock">Hết hàng</option>
                  </select>
                </div>
              </div>

              {/* Price + Stock + Sale */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Giá (₫) *</label>
                  <input
                    name="price" type="number" value={form.price} onChange={handleChange} min="0" required
                    placeholder="0"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Tồn kho</label>
                  <input
                    name="stock" type="number" value={form.stock} onChange={handleChange} min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Giảm giá (%)</label>
                  <input
                    name="sale" type="number" value={form.sale} onChange={handleChange} min="0" max="100"
                    placeholder="0"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#5a7299] uppercase tracking-wider mb-1.5">Mô tả</label>
                <textarea
                  name="description" value={form.description} onChange={handleChange} rows={3}
                  placeholder="Mô tả sản phẩm..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-bold border border-[#E8E2D4] text-[#1a2e5a] hover:bg-[#FAF6EC] transition-all">
                  Hủy
                </button>
                <button type="submit"
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-sm hover:opacity-90"
                  style={{ background: "#003087" }}>
                  {product ? "Lưu thay đổi" : "Thêm sản phẩm"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    active:       { label: "Đang bán",  bg: "#D1FAE5", color: "#065F46" },
    inactive:     { label: "Ngừng bán", bg: "#F3F4F6", color: "#374151" },
    out_of_stock: { label: "Hết hàng",  bg: "#FEE2E2", color: "#991B1B" },
  };
  const c = config[status] || config.inactive;
  return (
    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold" style={{ background: c.bg, color: c.color }}>
      {c.label}
    </span>
  );
};

// ── AdminProducts ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "vnm_admin_products";

const loadProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  } catch { return MOCK_PRODUCTS; }
};

const saveProducts = (list) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
};

const AdminProducts = () => {
  const [products, setProducts] = useState(loadProducts);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const PER_PAGE = 6;

  // Lưu vào localStorage mỗi khi products thay đổi
  useEffect(() => { saveProducts(products); }, [products]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (saved) => {
    if (saved.id) {
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
      toast.success("Đã cập nhật sản phẩm!");
    } else {
      const newProd = { ...saved, id: String(Date.now()) };
      setProducts((prev) => [newProd, ...prev]);
      toast.success("Đã thêm sản phẩm mới!");
    }
    setModalOpen(false);
    setEditProduct(null);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    toast.success("Đã xóa sản phẩm!");
  };


  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#1a2e5a]">Quản lý Sản phẩm</h1>
          <p className="text-sm text-[#5a7299] mt-0.5">{products.length} sản phẩm trong hệ thống</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm hover:opacity-90 transition-all"
          style={{ background: "#003087" }}
          id="admin-add-product-btn"
        >
          <FiPlus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E8E2D4] p-4 flex flex-wrap gap-3 items-center shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7299]" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF6EC] border border-[#E8E2D4] rounded-xl text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
            id="admin-product-search"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => { setFilterCat(e.target.value); setPage(1); }}
          className="px-3 py-2.5 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] bg-white transition-all"
        >
          <option value="all">Tất cả danh mục</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="px-3 py-2.5 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] bg-white transition-all"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="inactive">Ngừng bán</option>
          <option value="out_of_stock">Hết hàng</option>
        </select>
        <div className="flex items-center gap-1.5 text-xs text-[#5a7299]">
          <FiFilter size={12} />
          <span>{filtered.length} kết quả</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E8E2D4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FAF6EC" }}>
                {["STT", "Ảnh", "Tên sản phẩm", "Danh mục", "Giá", "Tồn kho", "Giảm giá", "Trạng thái", "Hành động"].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-[#5a7299] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paged.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-t border-[#E8E2D4] hover:bg-[#FAF6EC] transition-colors group"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[#5a7299]">
                      {(page - 1) * PER_PAGE + i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg bg-white border border-[#E8E2D4] flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          style={{ mixBlendMode: "multiply" }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold text-[#1a2e5a] line-clamp-2 max-w-[220px]">{product.name}</p>
                      <p className="text-[11px] text-[#5a7299] mt-0.5">ID: {product.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: "#E8F0FB", color: "#003087" }}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-[#1a2e5a] whitespace-nowrap">
                      {Number(product.price).toLocaleString("vi-VN")}₫
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-amber-600" : "text-[#1a2e5a]"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {product.sale > 0 ? (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">-{product.sale}%</span>
                      ) : (
                        <span className="text-xs text-[#5a7299]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setEditProduct(product); setModalOpen(true); }}
                          className="p-2 rounded-lg hover:bg-blue-50 text-[#5a7299] hover:text-blue-600 transition-all"
                          title="Chỉnh sửa"
                          id={`edit-product-${product.id}`}
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-[#5a7299] hover:text-red-600 transition-all"
                          title="Xóa"
                          id={`delete-product-${product.id}`}
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {paged.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-[#5a7299]">
              <FiPackage size={40} className="mb-3 opacity-30" />
              <p className="font-semibold">Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#E8E2D4]">
            <span className="text-xs text-[#5a7299]">
              Trang {page} / {totalPages} · {filtered.length} sản phẩm
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-[#E8F0FB] text-[#5a7299] disabled:opacity-40 transition-all"
              >
                <FiChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                    n === page ? "text-white" : "text-[#5a7299] hover:bg-[#E8F0FB]"
                  }`}
                  style={n === page ? { background: "#003087" } : {}}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-[#E8F0FB] text-[#5a7299] disabled:opacity-40 transition-all"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductModal
        open={modalOpen}
        product={editProduct}
        onClose={() => { setModalOpen(false); setEditProduct(null); }}
        onSave={handleSave}
      />
      <ConfirmDialog
        open={!!deleteId}
        title="Xóa sản phẩm?"
        message="Bạn chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
        onConfirm={() => handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default AdminProducts;
