import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiSearch } from "react-icons/fi";

import FilterSidebar from "../components/FilterSidebar";
import ActiveFilter from "../components/ActiveFilter";
import ProductListCard from "../components/ProductListCard";
import Pagination from "../components/Pagination";
import { ProductGridSkeleton } from "../components/ProductListSkeleton";
import axiosClient from "../services/axiosClient";
import useDebounce from "../hooks/useDebounce";

export const mockProducts = [
  { _id:"1", name:"Sữa tươi tiệt trùng có đường 1L", price:29000, oldPrice:36000, rating:4.8, sold:2341, discount:20, emoji:"🥛", category:"Sữa tươi", image: "/images/p1.png", images: ["/images/p1.png", "/images/p1_2.png", "/images/p1_3.png"], vi: { size:16, price:440000, oldPrice:512000 }, thuong: { size:48, price:1200000, oldPrice:1380000 } },
  { _id:"2", name:"Sữa chua uống Vinamilk việt quất 170ml", price:12000, oldPrice:15000, rating:4.7, sold:1892, discount:15, emoji:"🧴", category:"Sữa chua", image: "https://d8um25gjecm9v.cloudfront.net/cms/PROBI_ID_65_1_f23981958c_fc5aa4f505.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/PROBI_ID_65_1_f23981958c_fc5aa4f505.png", "https://d8um25gjecm9v.cloudfront.net/cms/PROBI_ID_65_2_b4685ed6d7_6695302d0c.png", "https://d8um25gjecm9v.cloudfront.net/cms/PROBI_ID_65_2_b4685ed6d7_6695302d0c.png"], vi: { size:16, price:176000, oldPrice:208000 }, thuong: { size:48, price:480000, oldPrice:560000 } },
  { _id:"3", name:"Sữa đặc có đường Ông Thọ Nhãn vàng 380g", price:22000, oldPrice:26000, rating:4.8, sold:2310, discount:15, emoji:"🥫", category:"Sữa đặc", badge:"Yêu thích số 1", image: "https://d8um25gjecm9v.cloudfront.net/cms/SD_Ong_Tho_Vang_380_1_c137c7416e_a53a3fb278.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SD_Ong_Tho_Vang_380_1_c137c7416e_a53a3fb278.png", "https://d8um25gjecm9v.cloudfront.net/cms/SD_Ong_Tho_Vang_380_2_f5acf53008_9479321a6a.png"], description: "Sữa đặc có đường Ông Thọ nhãn vàng 380g — thơm ngon, đậm vị, nguyên liệu quen thuộc cho mọi món ăn và thức uống Việt Nam.", benefits: ["Sữa đặc có đường Ông Thọ — hương vị đậm đà, thơm béo quen thuộc.", "Đa dụng: pha cà phê, trà sữa, làm bánh, chè và nhiều món tráng miệng.", "Đóng hộp 380g tiện lợi, dễ bảo quản.", "Sản xuất tại Việt Nam theo quy trình chuẩn quốc tế của Vinamilk."], vi: { size:16, price:320000, oldPrice:368000 }, thuong: { size:12, price:234000, oldPrice:264000 } },
  { _id:"4", name:"Dielac Alpha 4 (2-6 tuổi)", price:375000, oldPrice:420000, rating:4.9, sold:987, discount:11, emoji:"🍼", category:"Sữa bột", image: "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_DIELAC_ALPHA_S4_900_G_01_c1baccd13e.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SBTE_DIELAC_ALPHA_S4_900_G_01_c1baccd13e.png", "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_DIELAC_ALPHA_S4_900_G_03_b486451924.png"] },
  { _id:"5", name:"Sữa trái cây Hero Hương Dâu", price:20000, oldPrice:24000, rating:4.8, sold:1200, discount:10, emoji:"🍓", category:"Sữa trái cây", image: "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DAU_110_1_cf180aafa0_06456d3f58.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DAU_110_1_cf180aafa0_06456d3f58.png", "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DAU_180_3_fb009cf8f8_3bfc0a8a08.png", "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DAU_180_4_fe4899c99d_18feabd4bd.png"], description: "Cao lớn khỏe mạnh - Mắt sáng tinh anh.", benefits: ["Cao lớn khỏe mạnh - Mắt sáng tinh anh."], vi: { size:16, price:320000, oldPrice:384000 }, thuong: { size:48, price:900000, oldPrice:1100000 } },
  { _id:"13", name:"Sữa trái cây Hero Hương Dưa Hấu", price:20000, oldPrice:24000, rating:4.7, sold:950, discount:10, emoji:"🍉", category:"Sữa trái cây", image: "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DUA_HAU_110_1_1_ac1223e13e_5ba4eb9320.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DUA_HAU_110_1_1_ac1223e13e_5ba4eb9320.png", "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DAU_180_3_bd22d0936c_11ce55ccbe.png", "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DAU_180_4_8dac313920_74cb046c3e.png"], description: "Cao lớn khỏe mạnh - Mắt sáng tinh anh.", benefits: ["Cao lớn khỏe mạnh - Mắt sáng tinh anh."], vi: { size:16, price:320000, oldPrice:384000 }, thuong: { size:48, price:900000, oldPrice:1100000 } },
  { _id:"14", name:"Sữa trái cây Hero Hương Kẹo Nho", price:20000, oldPrice:24000, rating:4.9, sold:1430, discount:10, emoji:"🍇", category:"Sữa trái cây", image: "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_NHO_180_1_c7f482f315_87959060c3.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_NHO_180_1_c7f482f315_87959060c3.png", "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_NHO_180_3_63a440f098_0707dc21ca.png", "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_NHO_180_4_3432f1925c_0c315633df.png"], description: "Cao lớn khỏe mạnh - Mắt sáng tinh anh.", benefits: ["Cao lớn khỏe mạnh - Mắt sáng tinh anh."], vi: { size:16, price:320000, oldPrice:384000 }, thuong: { size:48, price:900000, oldPrice:1100000 } },
  { _id:"6", name:"Sữa tươi không đường tách béo 180ml", price:8500, oldPrice:10000, rating:4.4, sold:756, discount:15, emoji:"🧊", category:"Sữa tươi", specialTarget: ["diabetes"], image: "/images/p6.png", images: ["/images/p6.png", "/images/p6_2.png", "/images/p6_3.png"], vi: { size:16, price:120000, oldPrice:142000 }, thuong: { size:48, price:350000, oldPrice:420000 } },
  { _id:"7", name:"Vinamilk Happy Star Có đường", price: 20000, oldPrice: 24000, rating:4.9, sold:1420, discount:10, emoji:"⭐", category:"Sữa dinh dưỡng", image: "https://d8um25gjecm9v.cloudfront.net/cms/SDD_Happy_Star_CD_220_01_1_887bb8354f.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SDD_Happy_Star_CD_220_01_1_887bb8354f.png", "https://d8um25gjecm9v.cloudfront.net/cms/SDD_Happy_Star_CD_220_02_1_0588c531d1.png", "https://d8um25gjecm9v.cloudfront.net/cms/SDD_Happy_Star_CD_220_03_1_11e2f5e6fb.png"], description: "Bổ sung các vitamin và khoáng chất thiết yếu thường thiếu trong bữa ăn hàng ngày như vitamin A, D3, canxi giúp mắt sáng xương khỏe, tăng đề kháng, cho cơ thể luôn khỏe mạnh.", benefits: ["Bổ sung các vitamin và khoáng chất thiết yếu thường thiếu trong bữa ăn hàng ngày như vitamin A, D3, canxi giúp mắt sáng xương khỏe, tăng đề kháng, cho cơ thể luôn khỏe mạnh."], vi: { size:16, price:320000, oldPrice:384000 }, thuong: { size:48, price:900000, oldPrice:1100000 } },
  { _id:"15", name:"Sữa dinh dưỡng ADM Ít Đường", price: 20000, oldPrice: 24000, rating:4.8, sold:1100, discount:10, emoji:"🥛", category:"Sữa dinh dưỡng", image: "https://d8um25gjecm9v.cloudfront.net/cms/SDD_ADM_ID_110_01_79218ae633_1682fa8274.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SDD_ADM_ID_110_01_79218ae633_1682fa8274.png", "https://d8um25gjecm9v.cloudfront.net/cms/SDD_ADM_ID_110_02_8ae87a64e6_547a625573.png", "https://d8um25gjecm9v.cloudfront.net/cms/SDD_ADM_ID_110_04_4e0b3f6808_6746eb2c42.png", "https://d8um25gjecm9v.cloudfront.net/cms/SDD_ADM_ID_110_05_c42553968a_0e8b2443b6.png"], description: "Bổ sung các vitamin và khoáng chất thiết yếu thường thiếu trong bữa ăn hàng ngày như vitamin A, D3, canxi giúp mắt sáng xương khỏe, tăng đề kháng, cho cơ thể luôn khỏe mạnh.", benefits: ["Bổ sung các vitamin và khoáng chất thiết yếu thường thiếu trong bữa ăn hàng ngày như vitamin A, D3, canxi giúp mắt sáng xương khỏe, tăng đề kháng, cho cơ thể luôn khỏe mạnh."], vi: { size:16, price:320000, oldPrice:384000 }, thuong: { size:48, price:900000, oldPrice:1100000 } },
  { _id:"16", name:"Sữa chua ăn Green Farm Ít Đường", price: 8000, oldPrice: 9500, rating:4.8, sold:1540, discount:15, emoji:"🍦", category:"Sữa chua", image: "https://d8um25gjecm9v.cloudfront.net/cms/SP_19_Side_665c54b37b_ff6e9dfb31_ff6b65812f.webp", images: ["https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_20_5588ea3d82.webp", "https://d8um25gjecm9v.cloudfront.net/cms/SCA_GF_ID_01_3f2afca818_286c5123ee.png", "https://d8um25gjecm9v.cloudfront.net/cms/SCA_GF_ID_02_44f4130241_68a1d9787a.png"], description: "Lên men tự nhiên từ nguồn sữa tươi thuần khiết của Green Farm với 300 triệu men sống châu Âu.", benefits: ["Lên men tự nhiên", "300 triệu men sống châu Âu", "Từ nguồn sữa tươi thuần khiết Green Farm"], vi: { size:4, price:32000, oldPrice:38000 }, thuong: { size:48, price:384000, oldPrice:456000 } },
  { _id:"8", name:"Sữa Bột Optimum Gold 2 (6-12 tháng)", price:385000, oldPrice:450000, rating:4.9, sold:1205, discount:14, emoji:"🍼", category:"Sữa bột", image: "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Optimum_Gold_S2_400_01_cbad762a85.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Optimum_Gold_S2_400_01_cbad762a85.png", "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Optimum_Gold_S2_400_02_cb83a5a962.png"], benefits: ["Sữa Optimum Gold 2 chuyên hỗ trợ tiêu hóa cho trẻ từ 6 đến 12 tháng tuổi.", "Lấy cảm hứng từ các dưỡng chất được tìm thấy trong sữa mẹ, với công thức dinh dưỡng đột phá 6 HMO đầu tiên tại Việt Nam.", "Cùng lợi khuẩn BB-12TM và đạm whey giàu alpha-Lactalbumin chuyên hỗ trợ tiêu hóa - hấp thu, giúp bé lớn khỏe hơn mỗi ngày."] },
  { _id:"9", name:"Sữa tươi 100% giảm béo vị chuối 180ml", price:9000, oldPrice:11000, rating:4.9, sold:1567, discount:16, emoji:"🍌", category:"Sữa tươi", image: "/images/p9.png", images: ["/images/p9.png", "/images/p9_2.png", "/images/p9_3.png"], vi: { size:16, price:128000, oldPrice:154000 }, thuong: { size:48, price:372000, oldPrice:444000 } },
  { _id:"10", name:"Sữa chua uống thanh trùng Green Farm Ít Đường", price:6500, oldPrice:8000, rating:4.5, sold:2134, discount:19, emoji:"🥛", category:"Sữa chua", image: "https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_31_d56072082c.webp", images: ["https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_31_d56072082c.webp", "https://d8um25gjecm9v.cloudfront.net/cms/SCUTT_GF_thanhtrung_ID_01_a64a385623_923869557f.png", "https://d8um25gjecm9v.cloudfront.net/cms/SCUTT_GF_thanhtrung_ID_03_155b6a48ee.png"], vi: { size:16, price:92000, oldPrice:114000 }, thuong: { size:48, price:272000, oldPrice:330000 } },
  { _id:"11", name:"Sữa đặc có đường Ông Thọ Nhãn đỏ Thùng 12 hộp", price:264000, oldPrice:288000, rating:4.7, sold:945, discount:8, emoji:"🥫", category:"Sữa đặc", image: "https://d8um25gjecm9v.cloudfront.net/cms/SD_Ong_Tho_Do_1284_1_ffb37c7388_e5738e094f.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SD_Ong_Tho_Do_1284_1_ffb37c7388_e5738e094f.png", "https://d8um25gjecm9v.cloudfront.net/cms/SD_Ong_Tho_Do_1284_12_6fa85b47c2_d990b419e2.png"], description: "Sữa đặc có đường Ông Thọ nhãn đỏ — thơm ngon, đậm vị, nguyên liệu quen thuộc cho mọi món ăn và thức uống Việt Nam.", benefits: ["Sữa đặc có đường Ông Thọ — hương vị đậm đà, thơm béo quen thuộc.", "Đa dụng: pha cà phê, trà sữa, làm bánh, chè và nhiều món tráng miệng.", "Đóng thùng 12 hộp tiết kiệm, phù hợp gia đình và quán ăn.", "Sản xuất tại Việt Nam theo quy trình chuẩn quốc tế của Vinamilk."], vi: { size:16, price:320000, oldPrice:368000 }, thuong: { size:12, price:264000, oldPrice:288000 } },
  { _id:"12", name:"Sữa bột trẻ em Dielac Grow Plus 2+ (2-10 tuổi)", price:320000, oldPrice:380000, rating:4.8, sold:834, discount:16, emoji:"🍼", category:"Sữa bột", image: "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Dielac_Grow_Plus_S2_1400_1_949643dbe8.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Dielac_Grow_Plus_S2_1400_1_949643dbe8.png"], description: "Sữa Dielac Grow Plus 2+ với công thức dinh dưỡng chuyên biệt chứa đạm whey giàu alpha-Lactalbumin và 38 dưỡng chất, hỗ trợ tăng cân và tăng chiều cao, được nghiên cứu lâm sàng giúp bé bắt kịp đà tăng trưởng sau 3 tháng." },
  { _id:"17", name:"Sữa tươi Green Farm Có đường 180ml", price: 32000, oldPrice: 38000, rating: 4.9, sold: 1245, discount: 15, emoji:"🥛", category:"Sữa tươi", badge:"Đột phá", image: "https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_01_e23b453767.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_01_e23b453767.png", "https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_04_ff6ff9a097.png", "https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_02_022c6bb5fc.png"], description: "Sữa tươi đầu tiên tại Việt Nam được sản xuất từ trang trại sinh thái và sở hữu công nghệ kép đột phá hút chân không, làm nên hậu vị sữa tươi thơm khác biệt trên thị trường.", vi: { size: 4, price: 32000, oldPrice: 38000 }, thuong: { size: 48, price: 384000, oldPrice: 456000 } },
  { _id:"18", name:"Sữa hạt Vinamilk 9 loại hạt ít đường", price: 35000, oldPrice: 40000, rating: 4.8, sold: 980, discount: 12, emoji:"🌾", category:"Sữa thực vật", badge:"Hương vị mới", image: "https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_11_251468903a.webp", images: ["https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_11_251468903a.webp", "https://d8um25gjecm9v.cloudfront.net/cms/STV_9_loai_hat_ID_1_Lvuong_01_61c68ca928_f405e33f93.png", "https://d8um25gjecm9v.cloudfront.net/cms/STV_9_loai_hat_ID_1_Lvuong_02_1_9deef626a2.png"], description: "Kết hợp 9 loại hạt cho hương vị rang thơm béo bùi độc đáo, cung cấp đủ lượng ALA (Omega-3) cơ thể cần chỉ với 2 hộp mỗi ngày.", benefits: ["Kết hợp 9 loại hạt cho hương vị rang thơm béo bùi độc đáo.", "Cung cấp đủ lượng ALA (Omega-3) cơ thể cần chỉ với 2 hộp mỗi ngày."], thuong: { size: 24, price: 840000, oldPrice: 960000 } },
  { _id:"19", name:"Vinamilk Gelato Sôcôla", price: 79000, oldPrice: 89000, rating: 4.9, sold: 1823, discount: 11, emoji:"🍫", category:"Kem", badge:"Mới", image: "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Gelato_VNM_Socola_400_01_5ff26d1b10_33f22ef880.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/KEM_Gelato_VNM_Socola_400_01_5ff26d1b10_33f22ef880.png", "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Gelato_VNM_Socola_400_02_28ccf30970_a63a86b82a.png", "https://d8um25gjecm9v.cloudfront.net/cms/Thumbnails_1_28_Feb_10_e0538f5c9e.png"], description: "Gelato Sôcôla Vinamilk — kem cao cấp kiểu Ý được làm từ 100% sữa tươi Vinamilk, kết hợp socola đen thượng hạng cho hương vị đậm đà, mịn màng và thơm ngát. Lưu ý: sản phẩm cần bảo quản đông lạnh ≤ -18°C.", benefits: ["Một sáng tạo mới của Vinamilk. Cùng những nguyên liệu thượng hạng, lớp lớp kem sữa sánh mịn chen nhau, không một kẽ hở, tạo nên chất kem gelato dẻo mềm hoàn hảo."], specs: [{ label: "Dung tích", value: "400ml / 314g" }, { label: "Bảo quản", value: "≤ -18°C" }, { label: "Hạn sử dụng", value: "12 tháng" }, { label: "Thương hiệu", value: "Vinamilk" }, { label: "Xuất xứ", value: "Việt Nam" }], thuong: { size: 4, price: 295000, oldPrice: 356000 },
    featureBanner: "https://d8um25gjecm9v.cloudfront.net/cms/KEM_VNM_BNFIMG_2_ce30d76221_27bc9d5836.jpg",
    bottomBanner: "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Gelato_VNM_Socola_400_01_5ff26d1b10_33f22ef880.png",
    commentBanner: "https://d8um25gjecm9v.cloudfront.net/cms/KEM_VNM_INFO_d6e71581fd_a104e3542f.jpg",
    howToUse: "HDSD (400ml / 314g): Dùng hết trong 5 ngày từ khi mở. Ngon hơn khi dùng với bánh côn kem Vinamilk.\n\nHDSD (90ml / 70g): Dùng trực tiếp, không cần chế biến.",
    ingredients: "Nước, kem sữa, sữa bột, dextrose*, đường, sô cô la chip (4,9%), bột ca cao, maltodextrin*, chất ổn định (E407, E410, E412, E415), hương liệu tổng hợp, phẩm màu (E150d)."
  },
  { _id:"20", name:"Kem hộp Vinamilk Dừa", price: 85000, oldPrice: 98000, rating: 4.9, sold: 1420, discount: 13, emoji:"🥥", category:"Kem", badge:"Mới", image: "https://d8um25gjecm9v.cloudfront.net/cms/Thumbnails_1_28_Feb_23_c5e7bddaec.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/Thumbnails_1_28_Feb_23_c5e7bddaec.png", "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Kem_hop_VNM_Dua_870_01_7f3a3907ef_12766052fe.png"], description: "Còn gì bằng ngồi nhâm nhi muỗng kem mịn màng đầy đặn, thơm kem sữa, đậm đà vị, mát lạnh khoan khoái. 10 lựa chọn từ hộp đơn chiếc, đến sóng đôi, hoặc cặp ba để đảm bảo cả nhà ai cũng được thưởng thức hương vị mình mê.", benefits: ["Được sản xuất từ nguồn sữa tươi nguyên chất Vinamilk béo ngậy.", "Hương vị dừa xiêm ngọt thanh tự nhiên xen lẫn dừa nạo giòn giòn sần sật.", "Mát lạnh khoan khoái, kết cấu kem xốp mịn chuẩn vị kem truyền thống.", "Đóng hộp 870ml dung tích lớn, cực kỳ tiện lợi và tiết kiệm cho cả gia đình.", "Công nghệ sản xuất khép kín hiện đại, đạt tiêu chuẩn vệ sinh an toàn thực phẩm."], specs: [{ label: "Dung tích", value: "870ml" }, { label: "Bảo quản", value: "≤ -18°C" }, { label: "Hạn sử dụng", value: "12 tháng" }, { label: "Thương hiệu", value: "Vinamilk" }, { label: "Xuất xứ", value: "Việt Nam" }], thuong: { size: 4, price: 320000, oldPrice: 392000 },
    commentBanner: "https://d8um25gjecm9v.cloudfront.net/cms/KEM_VNM_INFO_d6e71581fd_a104e3542f.jpg",
    howToUse: "HDSD: Sử dụng trực tiếp ngay sau khi mở hộp. Có thể kết hợp cùng dừa nạo khô, lạc rang hoặc bánh ốc quế để tăng hương vị.\n\nBảo quản ở nhiệt độ ≤ -18°C. Không cấp đông lại sau khi rã đông.",
    ingredients: "Nước, sữa dừa (25%), nước cốt dừa tự nhiên, đường, kem sữa, sữa bột, dừa nạo sấy, chất nhũ hóa, chất ổn định, hương liệu dừa tổng hợp."
  },
  { 
    _id:"21", 
    name:"Sữa tươi tiệt trùng Green Farm A2 không đường 180ml", 
    price: 45000, 
    oldPrice: 50000, 
    rating: 5.0, 
    sold: 842, 
    discount: 10, 
    emoji:"🥛", 
    category:"Sữa tươi", 
    specialTarget: ["diabetes"],
    badge:"Mới", 
    image: "https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_49_8a8fefce53.webp", 
    images: [
      "https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_49_8a8fefce53.webp", 
      "https://d8um25gjecm9v.cloudfront.net/cms/ST_Tiet_trung_A2_GF_KD_180_01_1_52f4eeb4e7.png",
      "https://d8um25gjecm9v.cloudfront.net/cms/ST_Tiet_trung_A2_GF_KD_180_02_1_4302660b49.png"
    ], 
    description: "Siêu sữa tươi đạm quý A2 từ đàn bò gen sở hữu nguồn gen A2/A2 thuần chủng có mặt từ cách đây 10.000 năm trước khi trải qua quá trình tiến hóa tự nhiên. Kiểm soát nghiêm ngặt nguồn gen đến giọt sữa đảm bảo nguồn đạm A2 thuần túy. Đạm quý A2 beta casein có cấu trúc gần với đạm beta casein trong sữa mẹ. Một lựa chọn dịu dàng dành riêng cho những chiếc bụng khó tính và nhạy cảm: Béo mịn mịn màng, êm đềm mềm mại, nguyên vị nguyên bản.", 
    benefits: [
      "Nguồn gen A2/A2 thuần chủng cách đây 10.000 năm",
      "Đạm quý A2 thuần túy gần với sữa mẹ",
      "Dành riêng cho những chiếc bụng nhạy cảm",
      "Béo mịn màng, êm đềm nguyên bản",
      "Phù hợp cho người bệnh tiểu đường (không đường)"
    ],
    featureBanner: "https://d8um25gjecm9v.cloudfront.net/cms/Infographic_Desktop_84df2bddcc_977166ca43.jpg",
    specs: [
      { label: "Dung tích", value: "180ml" }, 
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" }, 
      { label: "Hạn sử dụng", value: "6 tháng" }, 
      { label: "Thương hiệu", value: "Vinamilk Green Farm" }, 
      { label: "Xuất xứ", value: "Việt Nam" }
    ], 
    vi: { size: 16, price: 175000, oldPrice: 195000 }, 
    thuong: { size: 48, price: 515000, oldPrice: 565000 } 
  }
];

const ITEMS_PER_PAGE = 12;
const emptyFilters = { categories:[], brands:[], rating:[], priceMin:0, priceMax:0, search:"", specialTarget: [] };

// ─── Empty state ───────────────────────────────────────────────────────────────
const EmptyProducts = ({ onClear }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <img 
      src="https://d8um25gjecm9v.cloudfront.net/cms/cart_empty_be904527e2.webp" 
      alt="Empty" 
      className="w-64 md:w-80 h-auto object-contain mb-8"
    />
    <h3 className="text-[17px] font-bold mb-8" style={{ color: "#003087" }}>
      Không có sản phẩm nào được tìm thấy
    </h3>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClear}
      className="px-10 py-2.5 rounded text-[15px] font-bold transition-all"
      style={{ color: "#003087", background: "transparent", border: "1px solid #003087" }}
    >
      Trở lại
    </motion.button>
  </motion.div>
);

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if we should restore state from sessionStorage
  const shouldRestore = sessionStorage.getItem("vnm_shop_should_restore") === "true";
  const shouldRestoreRef = useRef(shouldRestore);

  const [filters, setFilters] = useState(() => {
    if (shouldRestore) {
      const saved = sessionStorage.getItem("vnm_shop_filters");
      if (saved) return JSON.parse(saved);
    }
    return emptyFilters;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    if (shouldRestore) {
      const saved = sessionStorage.getItem("vnm_shop_page");
      if (saved) return parseInt(saved, 10);
    }
    return 1;
  });

  const [sortBy, setSortBy] = useState(() => {
    if (shouldRestore) {
      const saved = sessionStorage.getItem("vnm_shop_sort");
      if (saved) return saved;
    }
    return "relevant";
  });

  const [filterOpen, setFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 400);

  // Consume the restoration flag after a short delay to survive React Strict Mode double-mounting in dev
  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.removeItem("vnm_shop_should_restore");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Listen to filter updates from Mega Menu when already on ProductList
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setFilters(e.detail);
      } else {
        setFilters(emptyFilters);
      }
      setCurrentPage(1);
      setSortBy("relevant");
    };
    window.addEventListener("vnm_shop_filters_updated", handleUpdate);
    return () => window.removeEventListener("vnm_shop_filters_updated", handleUpdate);
  }, []);

  // Sync URL params
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (currentPage > 1) params.page = currentPage;
    if (sortBy !== "relevant") params.sort = sortBy;
    setSearchParams(params);
  }, [debouncedSearch, currentPage, sortBy]);

  // Save filters, page, sort to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("vnm_shop_filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    sessionStorage.setItem("vnm_shop_page", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    sessionStorage.setItem("vnm_shop_sort", sortBy);
  }, [sortBy]);

  // Save scroll position
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("vnm_shop_scroll", window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll position
  useEffect(() => {
    if (shouldRestoreRef.current && !loading && products.length > 0) {
      const savedScroll = sessionStorage.getItem("vnm_shop_scroll");
      if (savedScroll) {
        const timeoutId = setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScroll, 10),
            behavior: "instant"
          });
        }, 150);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [loading, products]);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    // Tạm thời bỏ qua gọi API để web load lập tức (chưa có Backend)
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 150);
  }, [debouncedSearch, currentPage, sortBy, filters.priceMin, filters.priceMax]);

  // Client-side filter + sort
  const filtered = products.filter((p) => {
    // 1. Search — tìm theo tên VÀ category
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchName && !matchCategory) return false;
    }

    // 2. Categories
    if (filters.categories?.length > 0) {
      const catMap = { 1:"Sữa tươi", 2:"Sữa chua", 3:"Sữa đặc", 4:"Sữa bột", 5:"Sữa trái cây", 6:"Sữa dinh dưỡng", 7:"Sữa thực vật", 8:"Kem" };
      const names = filters.categories.map((id) => catMap[id]);
      if (!names.includes(p.category)) return false;
    }

    // 3. Brands
    if (filters.brands?.length > 0) {
      const brandMap = { 1: "Vinamilk", 2: "Cô gái Hà Lan", 3: "TH true Milk", 4: "Lothamilk" };
      const activeBrands = filters.brands.map(id => brandMap[id]);
      const nameLower = p.name.toLowerCase();
      const matchesBrand = activeBrands.some(b => nameLower.includes(b.toLowerCase()));
      // If Vinamilk is selected, consider products without competitor names as Vinamilk
      const isVinamilkProduct = !nameLower.includes("cô gái hà lan") && !nameLower.includes("th true milk") && !nameLower.includes("lothamilk");
      if (!matchesBrand && !(activeBrands.includes("Vinamilk") && isVinamilkProduct)) {
        return false;
      }
    }

    // 4. Flavors
    if (filters.flavors?.length > 0) {
      const flavorMap = {
        "original": ["không đường", "ít đường", "nguyên chất", "có đường"],
        "strawberry": ["dâu"],
        "chocolate": ["socola", "sôcôla", "cacao"],
        "banana": ["chuối"],
        "blueberry": ["việt quất"],
        "vanilla": ["vani"],
        "coffee": ["cà phê", "coffee"]
      };
      const nameLower = p.name.toLowerCase();
      const hasFlavor = filters.flavors.some(fId => {
        const keywords = flavorMap[fId] || [];
        return keywords.some(k => nameLower.includes(k));
      });
      if (!hasFlavor) return false;
    }

    // 5. Price
    if (filters.priceMin > 0 && p.price < filters.priceMin) return false;
    if (filters.priceMax > 0 && p.price > filters.priceMax) return false;

    // 6. Rating
    if (filters.rating?.length > 0) {
      const minRating = Math.min(...filters.rating);
      if ((p.rating || 0) < minRating) return false;
    }

    // 7. Special Targets
    if (filters.specialTarget?.length > 0) {
      if (!p.specialTarget || !filters.specialTarget.some(t => p.specialTarget.includes(t))) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "best-seller": return (b.sold || 0) - (a.sold || 0);
      case "rating": return (b.rating || 0) - (a.rating || 0);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setFilters((p) => ({ ...p, search: val }));
    setCurrentPage(1);
  };

  const handleRemoveFilter = (key, item) => {
    if (key === "search") setFilters((p) => ({ ...p, search: "" }));
    else if (key === "price") setFilters((p) => ({ ...p, priceMin: 0, priceMax: 0 }));
    else if (item?.type === "category") setFilters((p) => ({ ...p, categories: p.categories.filter((c) => c !== item.id) }));
    else if (item?.type === "rating") setFilters((p) => ({ ...p, rating: p.rating.filter((r) => r !== item.id) }));
    else if (item?.type === "brand") setFilters((p) => ({ ...p, brands: p.brands.filter((b) => b !== item.id) }));
  };

  const handleClearAll = () => {
    setFilters(emptyFilters);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Trang chủ</Link>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">Sản phẩm</span>
        </div>

        {/* Header - Mobile Filter Button */}
        <div className="flex justify-end mb-4">
          <button
            id="mobile-filter-btn"
            onClick={() => setFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200
                       dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400
                       hover:text-blue-600 transition-all text-sm font-semibold bg-white dark:bg-slate-800"
          >
            <FiFilter size={16} /> Bộ lọc
            {(filters.categories.length > 0 || filters.rating.length > 0 || filters.priceMin > 0) && (
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isMobile={false}
              productCount={filtered.length}
            />
          </div>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {filterOpen && (
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                isMobile={true}
                onMobileClose={() => setFilterOpen(false)}
                productCount={filtered.length}
              />
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            <div className="mb-5">
              <ActiveFilter filters={filters} onRemove={handleRemoveFilter} onClearAll={handleClearAll} />
            </div>

            {loading ? (
              <ProductGridSkeleton count={12} />
            ) : paginated.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[800px] lg:min-h-[1200px] items-start content-start">
                  {paginated.map((product, i) => (
                    <ProductListCard key={product._id} product={product} index={i} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => {
                      setCurrentPage(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}
              </>
            ) : (
              <EmptyProducts onClear={handleClearAll} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductList;