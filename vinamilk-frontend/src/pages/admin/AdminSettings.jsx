import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSave, FiGlobe, FiBell, FiShield, FiCreditCard, FiMail } from "react-icons/fi";

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-[#E8E2D4] shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8E2D4]" style={{ background: "#FAF6EC" }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E8F0FB" }}>
        <Icon size={16} style={{ color: "#003087" }} />
      </div>
      <h3 className="font-bold text-[#1a2e5a]">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Field = ({ label, desc, children }) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-[#E8E2D4] last:border-0">
    <div className="flex-1">
      <p className="text-sm font-bold text-[#1a2e5a]">{label}</p>
      {desc && <p className="text-xs text-[#5a7299] mt-0.5">{desc}</p>}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

const Toggle = ({ value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${value ? "bg-[#003087]" : "bg-[#E8E2D4]"}`}
  >
    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? "left-6" : "left-1"}`} />
  </button>
);

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Vinamilk Shop",
    siteUrl: "https://vinamilk.com.vn",
    contactEmail: "support@vinamilk.com",
    hotline: "1800 1260",
    currency: "VND",
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    freeShipThreshold: 300000,
    orderNotify: true,
    stockAlert: true,
    emailNewOrder: true,
    emailNewUser: true,
    maintenanceMode: false,
    allowRegister: true,
    twoFactor: false,
    maxLoginAttempts: 5,
    paymentMomo: true,
    paymentCOD: true,
    paymentVNPay: false,
  });

  const update = (key, val) => setSettings((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    toast.success("Đã lưu cài đặt hệ thống!");
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1a2e5a]">Cài đặt hệ thống</h1>
          <p className="text-sm text-[#5a7299] mt-0.5">Cấu hình toàn bộ hệ thống Vinamilk Shop</p>
        </div>
        <motion.button
          whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm"
          style={{ background: "#003087" }}
          id="admin-settings-save"
        >
          <FiSave size={15} /> Lưu cài đặt
        </motion.button>
      </div>

      {/* General */}
      <Section title="Thông tin chung" icon={FiGlobe}>
        <div className="flex flex-col gap-0">
          <Field label="Tên cửa hàng" desc="Hiển thị trên tất cả trang">
            <input value={settings.siteName} onChange={(e) => update("siteName", e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all w-52" />
          </Field>
          <Field label="Email liên hệ" desc="Dùng để nhận thông báo">
            <input value={settings.contactEmail} onChange={(e) => update("contactEmail", e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all w-52" />
          </Field>
          <Field label="Hotline" desc="Số điện thoại hỗ trợ khách hàng">
            <input value={settings.hotline} onChange={(e) => update("hotline", e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all w-52" />
          </Field>
          <Field label="Ngưỡng miễn phí ship" desc="Đơn hàng từ số tiền này được miễn phí vận chuyển">
            <div className="flex items-center gap-1">
              <input type="number" value={settings.freeShipThreshold} onChange={(e) => update("freeShipThreshold", Number(e.target.value))}
                className="px-3 py-2 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all w-36" />
              <span className="text-sm text-[#5a7299]">₫</span>
            </div>
          </Field>
          <Field label="Chế độ bảo trì" desc="Tắt website tạm thời để bảo trì">
            <Toggle value={settings.maintenanceMode} onChange={(v) => update("maintenanceMode", v)} />
          </Field>
          <Field label="Cho phép đăng ký" desc="Người dùng mới có thể đăng ký tài khoản">
            <Toggle value={settings.allowRegister} onChange={(v) => update("allowRegister", v)} />
          </Field>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Thông báo" icon={FiBell}>
        <div className="flex flex-col gap-0">
          <Field label="Thông báo đơn hàng mới" desc="Nhận thông báo khi có đơn hàng mới">
            <Toggle value={settings.orderNotify} onChange={(v) => update("orderNotify", v)} />
          </Field>
          <Field label="Cảnh báo hàng sắp hết" desc="Thông báo khi sản phẩm có tồn kho dưới 10">
            <Toggle value={settings.stockAlert} onChange={(v) => update("stockAlert", v)} />
          </Field>
          <Field label="Email đơn hàng mới" desc="Gửi email khi có đơn hàng mới">
            <Toggle value={settings.emailNewOrder} onChange={(v) => update("emailNewOrder", v)} />
          </Field>
          <Field label="Email đăng ký mới" desc="Gửi email khi có tài khoản mới">
            <Toggle value={settings.emailNewUser} onChange={(v) => update("emailNewUser", v)} />
          </Field>
        </div>
      </Section>

      {/* Security */}
      <Section title="Bảo mật" icon={FiShield}>
        <div className="flex flex-col gap-0">
          <Field label="Xác thực 2 yếu tố" desc="Yêu cầu OTP khi đăng nhập admin">
            <Toggle value={settings.twoFactor} onChange={(v) => update("twoFactor", v)} />
          </Field>
          <Field label="Số lần đăng nhập tối đa" desc="Khóa tài khoản sau số lần thất bại">
            <select value={settings.maxLoginAttempts} onChange={(e) => update("maxLoginAttempts", Number(e.target.value))}
              className="px-3 py-2 text-sm rounded-xl border border-[#E8E2D4] text-[#1a2e5a] focus:outline-none bg-white w-24">
              {[3, 5, 10].map((n) => <option key={n} value={n}>{n} lần</option>)}
            </select>
          </Field>
        </div>
      </Section>

      {/* Payment */}
      <Section title="Phương thức thanh toán" icon={FiCreditCard}>
        <div className="flex flex-col gap-0">
          <Field label="Thanh toán khi nhận hàng (COD)" desc="Thanh toán trực tiếp khi giao hàng">
            <Toggle value={settings.paymentCOD} onChange={(v) => update("paymentCOD", v)} />
          </Field>
          <Field label="MoMo" desc="Thanh toán qua ví MoMo">
            <Toggle value={settings.paymentMomo} onChange={(v) => update("paymentMomo", v)} />
          </Field>
          <Field label="VNPay" desc="Thanh toán qua VNPay">
            <Toggle value={settings.paymentVNPay} onChange={(v) => update("paymentVNPay", v)} />
          </Field>
        </div>
      </Section>
    </div>
  );
};

export default AdminSettings;
