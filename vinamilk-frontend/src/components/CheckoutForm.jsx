import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiPhone, FiMapPin, FiMap, FiAlertCircle, FiFileText } from "react-icons/fi";

const cities = ["Hà Nội","TP. Hồ Chí Minh","Đà Nẵng","Cần Thơ","Hải Phòng","Biên Hòa","Nha Trang","Huế","Vũng Tàu","Quy Nhơn"];
const districts = {
  "Hà Nội": ["Ba Đình","Hoàn Kiếm","Hai Bà Trưng","Đống Đa","Cầu Giấy","Thanh Xuân","Hoàng Mai"],
  "TP. Hồ Chí Minh": ["Quận 1","Quận 2","Quận 3","Quận 7","Bình Thạnh","Gò Vấp","Tân Bình"],
  "Biên Hòa": ["An Bình", "Bình Đa", "Bửu Hòa", "Bửu Long", "Hố Nai", "Long Bình", "Quang Vinh", "Tân Biên", "Tân Hạnh", "Tân Hòa", "Tân Hiệp", "Tân Mai", "Tân Phong", "Tân Vạn", "Thanh Bình", "Thống Nhất", "Trảng Dài", "Trung Dũng"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ", "Hòa Vang"],
  "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt", "Phong Điền", "Cờ Đỏ"],
  "Hải Phòng": ["Hồng Bàng", "Ngô Quyền", "Lê Chân", "Hải An", "Kiến An", "Đồ Sơn", "Dương Kinh"],
  "Nha Trang": ["Nha Trang", "Diên Khánh", "Khánh Vĩnh", "Trường Sa"],
  "Huế": ["Phong Điền", "Quảng Điền", "Phú Vang", "Hương Thủy", "Hương Trà"],
  "Vũng Tàu": ["Vũng Tàu", "Bà Rịa", "Châu Đức", "Côn Đảo", "Đất Đỏ", "Long Điền", "Tân Thành", "Xuyên Mộc"],
  "Quy Nhơn": ["Quy Nhơn", "An Nhơn", "Hoài Nhơn", "Phù Cát", "Phù Mỹ", "Tây Sơn", "Tuy Phước", "Vân Canh", "Vĩnh Thạnh", "Hoài Ân"],
};

const vnmInput = (hasError) => ({
  width: "100%",
  padding: "11px 14px",
  border: `1.5px solid ${hasError ? "#e53e3e" : "#d0d5e8"}`,
  borderRadius: 0,
  fontSize: 14,
  fontFamily: "system-ui, -apple-system, Arial, sans-serif",
  color: "#111",
  background: "#fff",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
});

const vnmLabel = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#003087",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "system-ui, -apple-system, Arial, sans-serif",
};

const Field = ({ label, name, type = "text", placeholder, value, onChange, error, icon: Icon, required, children }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={vnmLabel}>
      {label} {required && <span style={{ color: "#e53e3e" }}>*</span>}
    </label>
    {children || (
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon size={15} style={{
            position: "absolute", left: 13, top: "50%",
            transform: "translateY(-50%)", color: "#003087", pointerEvents: "none", zIndex: 1,
          }} />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          style={{ ...vnmInput(!!error), paddingLeft: Icon ? 38 : 14 }}
          onFocus={e => e.target.style.borderColor = "#003087"}
          onBlur={e => e.target.style.borderColor = error ? "#e53e3e" : "#d0d5e8"}
        />
      </div>
    )}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5, color: "#e53e3e", fontSize: 12, fontFamily: "system-ui, Arial, sans-serif" }}
        >
          <FiAlertCircle size={12} /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const CheckoutForm = ({ form, errors, onChange }) => {
  const handleCityChange = (e) => {
    onChange("city", e.target.value);
    onChange("district", "");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Họ tên + SĐT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-2col">
        <style>{`@media(max-width:600px){.form-2col{grid-template-columns:1fr!important}}`}</style>
        <Field label="Họ và tên" name="fullName"
          value={form.fullName} onChange={onChange} error={errors.fullName} icon={FiUser} required />
        <Field label="Số điện thoại" name="phone"
          value={form.phone} onChange={onChange} error={errors.phone} icon={FiPhone} required />
      </div>

      {/* Địa chỉ */}
      <Field label="Địa chỉ cụ thể" name="address" placeholder="Số nhà, tên đường, phường/xã..."
        value={form.address} onChange={onChange} error={errors.address} icon={FiMapPin} required />

      {/* Thành phố + Quận */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-2col">
        <Field label="Thành phố / Tỉnh" name="city" error={errors.city} icon={FiMap} required>
          <div style={{ position: "relative" }}>
            <FiMap size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#003087", zIndex: 1 }} />
            <select
              value={form.city}
              onChange={handleCityChange}
              style={{ ...vnmInput(!!errors.city), paddingLeft: 38, cursor: "pointer", appearance: "none" }}
              onFocus={e => e.target.style.borderColor = "#003087"}
              onBlur={e => e.target.style.borderColor = errors.city ? "#e53e3e" : "#d0d5e8"}
            >
              <option value="" disabled>Chọn thành phố</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </Field>

        <Field label="Quận / Huyện" name="district" error={errors.district} required>
          <select
            value={form.district}
            onChange={(e) => onChange("district", e.target.value)}
            style={{ ...vnmInput(!!errors.district), cursor: "pointer", appearance: "none" }}
            onFocus={e => e.target.style.borderColor = "#003087"}
            onBlur={e => e.target.style.borderColor = errors.district ? "#e53e3e" : "#d0d5e8"}
          >
            <option value="" disabled>Chọn quận/huyện</option>
            {(districts[form.city] || []).filter(d => d !== form.city).map((d) => <option key={d} value={d}>{d}</option>)}
            {!form.city && <option disabled>Chọn thành phố trước</option>}
          </select>
        </Field>
      </div>

      {/* Thời gian giao hàng */}
      <div style={{
        padding: "12px 16px",
        background: "#f0f4ff",
        border: "1px solid #c8d4f0",
        fontSize: 13,
        color: "#003087",
        fontFamily: "system-ui, -apple-system, Arial, sans-serif",
      }}>
        <strong>Thời gian giao hàng dự kiến:</strong> Giao hàng tiêu chuẩn (1-3 ngày làm việc)
      </div>

      {/* Ghi chú */}
      <Field label="Ghi chú đơn hàng" name="note" error={errors.note}>
        <div style={{ position: "relative" }}>
          <FiFileText size={15} style={{ position: "absolute", left: 13, top: 13, color: "#003087", zIndex: 1 }} />
          <textarea
            value={form.note}
            onChange={(e) => onChange("note", e.target.value)}
            placeholder="Ví dụ: Giao buổi sáng, gọi trước khi giao..."
            rows={3}
            style={{ ...vnmInput(false), paddingLeft: 38, resize: "none" }}
            onFocus={e => e.target.style.borderColor = "#003087"}
            onBlur={e => e.target.style.borderColor = "#d0d5e8"}
          />
        </div>
      </Field>

    </div>
  );
};

export default CheckoutForm;