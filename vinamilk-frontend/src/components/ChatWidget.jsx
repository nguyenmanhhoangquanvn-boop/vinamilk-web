import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend, FiUser, FiHelpCircle } from "react-icons/fi";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Xin chào! Cảm ơn bạn đã ghé thăm Vinamilk Shop. Mình có thể giúp gì cho bạn hôm nay? 🥛✨",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");

  const faqs = [
    { q: "Sữa Green Farm là gì? 🌿", a: "Sữa tươi Vinamilk Green Farm đến từ hệ thống trang trại sinh thái đạt chuẩn quốc tế của Vinamilk, nơi bò sữa được chăm sóc chu đáo, ăn cỏ tươi, uống nước sạch và nghe nhạc thư giãn để cho ra dòng sữa tươi ngon thuần khiết nhất!" },
    { q: "Chương trình ưu đãi? ⚡", a: "Hiện tại chúng tôi đang có chương trình Flash Sale giảm đến 50% cho dòng sản phẩm Green Farm và sữa bột Optimum Gold. Bạn có thể xem ngay tại trang chủ!" },
    { q: "Hành trình Net Zero? 🌍", a: "Vinamilk cam kết mạnh mẽ đạt Net Zero Carbon vào năm 2050. Chúng tôi phủ xanh rừng bảo tồn, sử dụng năng lượng mặt trời tại các trang trại sinh thái và cắt giảm tối đa rác thải nhựa để bảo vệ Trái Đất xanh." }
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");

    // Simulate bot response
    setTimeout(() => {
      let replyText = "Cảm ơn bạn đã nhắn tin! Yêu cầu của bạn đã được tiếp nhận. Đội ngũ CSKH Vinamilk sẽ phản hồi bạn trong giây lát.";
      
      // Basic matching
      const lower = text.toLowerCase();
      if (lower.includes("green farm") || lower.includes("sắm sữa") || lower.includes("sữa tươi")) {
        replyText = "Dòng sản phẩm Vinamilk Green Farm đang là dòng sữa tươi cao cấp được yêu thích nhất với 4 không: Không chất bảo quản, Không hormone tăng trưởng, Không dư lượng kháng sinh, Không thuốc trừ sâu hóa học. Cực kỳ thơm ngon tinh khiết!";
      } else if (lower.includes("khuyến mãi") || lower.includes("ưu đãi") || lower.includes("giá") || lower.includes("flash sale")) {
        replyText = "Vinamilk Shop đang ưu đãi miễn phí vận chuyển cho mọi đơn hàng từ 200.000đ trở lên, kèm theo hàng loạt deal hot Flash Sale giảm tới 50%. Hãy thêm ngay vào giỏ hàng nhé!";
      } else if (lower.includes("optimum") || lower.includes("sữa bột")) {
        replyText = "Sữa bột Optimum Gold Số 4 là giải pháp dinh dưỡng cao cấp giúp trẻ phát triển não bộ, hỗ trợ hệ tiêu hóa khỏe mạnh nhờ bổ sung dưỡng chất HMO và lợi khuẩn tốt.";
      } else if (lower.includes("bền vững") || lower.includes("net zero") || lower.includes("trang trại")) {
        replyText = "Trang trại Vinamilk Green Farm áp dụng nông nghiệp tuần hoàn, sử dụng năng lượng tái tạo, xử lý nước thải đạt chuẩn 100% tái sử dụng. Đây là hành trình bền vững kiến tạo tương lai xanh!";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="w-[360px] max-w-[calc(100vw-32px)] h-[500px] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#003087] text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold border border-white/20">
                  🥛
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-white">Vinamilk Assistant</h4>
                  <span className="text-[11px] text-green-300 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Đang trực tuyến
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 no-scrollbar">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 border ${
                      m.sender === "user"
                        ? "bg-blue-50 border-blue-200 text-blue-600"
                        : "bg-[#003087] border-[#003087] text-white"
                    }`}
                  >
                    {m.sender === "user" ? <FiUser size={12} /> : "🥛"}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-[#003087] text-white rounded-tr-none"
                          : "bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span
                      className={`text-[9px] text-slate-400 mt-1 ${
                        m.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 uppercase tracking-wider mb-2">
                    <FiHelpCircle size={10} /> Câu hỏi thường gặp:
                  </p>
                  {faqs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(faq.q)}
                      className="w-full text-left p-2.5 bg-white hover:bg-slate-100 border border-slate-200 hover:border-[#003087]/30 rounded-xl text-xs text-[#003087] font-semibold transition-all duration-200 flex items-center justify-between"
                    >
                      <span>{faq.q}</span>
                      <span className="text-slate-400">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#003087] focus:bg-white rounded-xl px-3 py-2 text-xs outline-none transition-all"
              />
              <button
                type="submit"
                className="w-9 h-9 bg-[#003087] hover:bg-blue-800 text-white rounded-xl flex items-center justify-center transition-colors shadow-md"
              >
                <FiSend size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={isOpen ? {} : { y: [0, -6, 0] }}
        transition={{
          y: {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="w-14 h-14 bg-[#003087] hover:bg-blue-800 text-white rounded-full flex items-center justify-center shadow-2xl relative transition-colors focus:outline-none border border-blue-900 group"
      >
        {isOpen ? (
          <FiX size={22} className="text-white" />
        ) : (
          <div className="relative">
            <FiMessageCircle size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white"></span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
