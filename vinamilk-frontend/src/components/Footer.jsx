import React from 'react';

const Footer = () => {
  return (
    <div style={{ background: "var(--vnm-cream)", padding: "48px 24px" }}>
      {/* Social icons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
        {[
          { href: "https://www.facebook.com/vinamilkofficial", label: "Facebook", icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          )},
          { href: "https://www.instagram.com/vinamilk_lovenature/", label: "Instagram", icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          )},
          { href: "https://www.linkedin.com/company/vinamilk", label: "LinkedIn", icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          )},
          { href: "https://www.tiktok.com/@vinamilk.official", label: "TikTok", icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
          )},
          { href: "https://www.youtube.com/channel/UCS9JKqDiIJqps1S8kpcx2Xg", label: "YouTube", icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
          )},
        ].map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "2px solid #003087",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#003087",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#003087"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#003087"; }}
          >
            {icon}
          </a>
        ))}
      </div>
      {/* ── Footer links (Vinamilk.com.vn style) ── */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto 48px",
        padding: "0 16px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "40px 20px",
          paddingBottom: 48,
          borderBottom: "1px solid rgba(0,48,135,0.15)",
        }}>
          {/* Col 1 — Company info */}
          <div style={{ gridColumn: "span 1" }}>
            <p style={{ fontWeight: 800, fontSize: 14, color: "#003087", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Công ty Cổ phần Sữa Việt Nam</p>
            <p style={{ fontSize: 14, color: "#003087", lineHeight: 1.8, marginBottom: 6 }}>Địa chỉ trụ sở: 10 Tân Trào, Phường Tân Mỹ, Thành phố Hồ Chí Minh</p>
            <p style={{ fontSize: 14, color: "#003087", lineHeight: 1.8 }}>Đại diện pháp luật: Mai Kiều Liên</p>
            <p style={{ fontSize: 14, color: "#003087", lineHeight: 1.8 }}>Điện thoại: 1900 636 979</p>
            <p style={{ fontSize: 14, color: "#003087", lineHeight: 1.8 }}>Fax: (028) 5416 1226</p>
            <p style={{ fontSize: 14, color: "#003087", lineHeight: 1.8 }}>Email: vinamilk@vinamilk.com.vn</p>
            <p style={{ fontSize: 14, color: "#003087", lineHeight: 1.8 }}>MST: 0300588569</p>
          </div>

          {/* Col 2 — Sắm sữa */}
          <div>
            <p style={{ fontWeight: 800, fontSize: 14, color: "#003087", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Sắm Sữa</p>
            {["Bán chạy", "Ưu đãi", "Cửa hàng", "Công bố"].map(item => (
              <p key={item} style={{ fontSize: 15, color: "#003087", marginBottom: 10, cursor: "pointer" }}>{item}</p>
            ))}
          </div>

          {/* Col 3 — Luôn để tâm */}
          <div>
            <p style={{ fontWeight: 800, fontSize: 14, color: "#003087", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Luôn Để Tâm</p>
            {["Bền vững", "Công nghệ", "Nghiên cứu"].map(item => (
              <p key={item} style={{ fontSize: 15, color: "#003087", marginBottom: 10, cursor: "pointer" }}>{item}</p>
            ))}
          </div>

          {/* Col 4 — Luôn là Vinamilk */}
          <div>
            <p style={{ fontWeight: 800, fontSize: 14, color: "#003087", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Luôn Là Vinamilk</p>
            {["Từ 1976", "Người dẫn đường", "Cùng một nhà", "Chất Vinamilk"].map(item => (
              <p key={item} style={{ fontSize: 15, color: "#003087", marginBottom: 10, cursor: "pointer" }}>{item}</p>
            ))}
          </div>

          {/* Col 5 — Luôn vui khoẻ */}
          <div>
            <p style={{ fontWeight: 800, fontSize: 14, color: "#003087", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Luôn Vui Khoẻ</p>
            {["Đẹp da - Đẹp dáng", "Thông tin dinh dưỡng", "Góc chuyên gia", "Công thức món ngon"].map(item => (
              <p key={item} style={{ fontSize: 15, color: "#003087", marginBottom: 10, cursor: "pointer" }}>{item}</p>
            ))}
          </div>

          {/* Col 6 — Luôn cùng bạn */}
          <div>
            <p style={{ fontWeight: 800, fontSize: 14, color: "#003087", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Luôn Cùng Bạn</p>
            {["Truyền thông", "Tin tức & Sự kiện", "Quan hệ Nhà đầu tư", "Mời vào đội", "Liên hệ"].map(item => (
              <p key={item} style={{ fontSize: 15, color: "#003087", marginBottom: 10, cursor: "pointer" }}>{item}</p>
            ))}
          </div>

          {/* Col 7 — Luôn hỗ trợ */}
          <div>
            <p style={{ fontWeight: 800, fontSize: 14, color: "#003087", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Luôn Hỗ Trợ</p>
            {["Đổi trả", "Thanh toán", "Giao hàng", "Nhận quà", "Tra cứu hoá đơn", "Chính sách khác"].map(item => (
              <p key={item} style={{ fontSize: 15, color: "#003087", marginBottom: 10, cursor: "pointer" }}>{item}</p>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 28, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", fontSize: 13, color: "#003087", textAlign: "center", lineHeight: 2 }}>
          <span>Bản quyền thuộc về Vinamilk © 2025</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Điều khoản sử dụng</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Chính sách bảo mật</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Quy chế hoạt động</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Quy trình giải quyết khiếu nại</span>
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "#003087", marginTop: 6, lineHeight: 1.8 }}>
          Số giấy chứng nhận đăng ký doanh nghiệp: 0300588569. Cấp lần đầu ngày: 20/11/2003. Nơi cấp: Sở Tài chính Thành phố Hồ Chí Minh
        </p>
        <p style={{ textAlign: "center", fontSize: 13, color: "#003087", marginTop: 4, lineHeight: 1.8 }}>
          Giấy phép kinh doanh hoạt động mua bán hàng hóa số: 0300588569/KD-0956. Cấp lần đầu ngày 25/06/2024. Nơi cấp: Sở Công thương TP. Hồ Chí Minh.
        </p>
      </div>

      {/* ── Vinamilk logo full-width ── */}
      <div style={{
        width: "100%",
        padding: "40px 0 48px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}>
        <div className="font-display" style={{
          fontWeight: 900,
          fontSize: "13.5vw",
          color: "#003087",
          letterSpacing: "-0.02em",
          lineHeight: 0.9,
          whiteSpace: "nowrap",
          textAlign: "center",
        }}>
          Vinamilk<sup style={{ fontSize: "0.12em", verticalAlign: "super", fontWeight: 900 }}>®</sup>
        </div>
        {/* EST — 1976 */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingLeft: "2vw", paddingRight: "2vw" }}>
          <span className="font-display" style={{
            fontWeight: 900,
            fontSize: "3vw",
            color: "#003087",
            letterSpacing: "0.1em",
          }}>EST</span>
          <span className="font-display" style={{
            fontWeight: 900,
            fontSize: "3vw",
            color: "#003087",
            letterSpacing: "0.05em",
          }}>1976</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;