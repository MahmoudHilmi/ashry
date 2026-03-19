// import React, { useState, useEffect } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import MOCK_PRODUCTS from "../assets/data";
// import ProductCard from "../components/ProductCard";

// const WHATSAPP_NUMBER = "2001092846526";

// const WA_ICON = (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

// const badgeStyle = {
//   الأفضل: { bg: "#5A341A", color: "#fff" },
//   جديد: { bg: "#C9A24A", color: "#fff" },
//   محدود: { bg: "#2B1A12", color: "#C9A24A" },
//   مميز: { bg: "#EFE8DD", color: "#5A341A" },
//   مخصص: { bg: "#7A5A3A", color: "#fff" },
// };

// // ✅ FIX 1: removed `onNavigate` prop — we use React Router's navigate() everywhere
// export default function ProductPage({ allProducts = MOCK_PRODUCTS }) {
//   const { state } = useLocation();
//   const { id } = useParams();
//   const navigate = useNavigate(); // single source of truth for all navigation

//   const fallbackProducts =
//     allProducts === MOCK_PRODUCTS
//       ? MOCK_PRODUCTS.map((p, i) => ({ ...p, id: String(i + 1) }))
//       : allProducts;

//   const product =
//     state?.product || fallbackProducts.find((p) => String(p.id) === String(id));

//   const [activeImg, setActiveImg] = useState(0);
//   const [activeTab, setActiveTab] = useState("description");
//   const [qty, setQty] = useState(1);
//   const [zoomed, setZoomed] = useState(false);

//   // Reset state whenever URL product ID changes
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setActiveImg(0);
//     setQty(1);
//     setActiveTab("description");
//   }, [id]);

//   if (!product) {
//     return (
//       <div style={{ textAlign: "center", padding: "100px 16px" }}>
//         <p
//           className="fp"
//           style={{ fontSize: 22, color: "#5A341A", marginBottom: 20 }}
//         >
//           المنتج غير موجود
//         </p>
//         <button
//           onClick={() => navigate("/products")}
//           style={{ background: "#5A341A", color: "#fff", padding: "12px 32px" }}
//         >
//           العودة للمتجر
//         </button>
//       </div>
//     );
//   }

//   const badge = product.badge ? badgeStyle[product.badge] : null;
//   const related = fallbackProducts
//     .filter(
//       (p) =>
//         String(p.id) !== String(product.id) && p.category === product.category,
//     )
//     .slice(0, 3);

//   const handleWA = () => {
//     const msg = encodeURIComponent(
//       `مرحباً، أود طلب:\n\n🪑 *${product.name}*\n🆔 رقم المنتج: ${product.id}\n📦 الكمية: ${qty}\n💰 السعر الإجمالي: ${(product.price * qty).toLocaleString()} EGP\n\nالمواد:\n${product.materials.map((m) => `• ${m}`).join("\n")}\n\nالوصف: ${product.description}\n\nيرجى تأكيد الطلب وتفاصيل التوصيل. شكراً!`,
//     );
//     window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
//   };

//   return (
//     <div className="page-in" style={{ width: "100%" }}>
//       <Header />
//       {/* Breadcrumb */}
//       <div
//         style={{
//           background: "#fff",
//           borderBottom: "1px solid #EFE8DD",
//           width: "100%",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: 1280,
//             margin: "0 auto",
//             padding: "10px 16px",
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             fontSize: 11,
//             color: "#7A5A3A",
//             flexWrap: "wrap",
//             direction: "rtl",
//           }}
//         >
//           {/* ✅ FIX 2: use navigate() instead of onNavigate() */}
//           <button
//             onClick={() => navigate("/")}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: "#7A5A3A",
//               fontSize: 11,
//             }}
//           >
//             الرئيسية
//           </button>
//           <span style={{ color: "#C9A24A" }}>/</span>
//           <button
//             onClick={() => navigate("/products")}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: "#7A5A3A",
//               fontSize: 11,
//             }}
//           >
//             المنتجات
//           </button>
//           <span style={{ color: "#C9A24A" }}>/</span>
//           <span style={{ color: "#5A341A", fontWeight: 500 }}>
//             {product.nameAr || product.name}
//           </span>
//         </div>
//       </div>

//       <main
//         style={{
//           width: "100%",
//           maxWidth: 1280,
//           margin: "0 auto",
//           padding: "28px 16px 80px",
//         }}
//       >
//         {/* Main 2-col */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
//             gap: 40,
//             alignItems: "start",
//           }}
//         >
//           {/* Images */}
//           <div>
//             <div
//               style={{
//                 position: "relative",
//                 paddingBottom: "100%",
//                 overflow: "hidden",
//                 background: "#F5F1EA",
//                 cursor: "zoom-in",
//               }}
//               onClick={() => setZoomed(true)}
//             >
//               <img
//                 src={product.images?.[activeImg] || "/placeholder.jpg"}
//                 alt={product.name}
//                 className="img-zoom"
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   background:
//                     "linear-gradient(135deg, rgba(90,52,26,0.08), transparent)",
//                   pointerEvents: "none",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 12,
//                   left: 12,
//                   width: 40,
//                   height: 40,
//                   borderTop: "2px solid rgba(201,162,74,0.5)",
//                   borderLeft: "2px solid rgba(201,162,74,0.5)",
//                   pointerEvents: "none",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 12,
//                   right: 12,
//                   width: 40,
//                   height: 40,
//                   borderBottom: "2px solid rgba(201,162,74,0.5)",
//                   borderRight: "2px solid rgba(201,162,74,0.5)",
//                   pointerEvents: "none",
//                 }}
//               />
//               <div
//                 className="spin-slow"
//                 style={{
//                   position: "absolute",
//                   top: 14,
//                   right: 14,
//                   width: 60,
//                   height: 60,
//                   border: "1px solid rgba(201,162,74,0.5)",
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   pointerEvents: "none",
//                 }}
//               >
//                 <span
//                   className="fp"
//                   style={{ fontStyle: "italic", fontSize: 9, color: "#C9A24A" }}
//                 >
//                   فاخر
//                 </span>
//               </div>
//               {badge && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: 12,
//                     left: 60,
//                     padding: "4px 10px",
//                     fontSize: 10,
//                     fontWeight: 700,
//                     background: badge.bg,
//                     color: badge.color,
//                   }}
//                 >
//                   {product.badge}
//                 </div>
//               )}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 12,
//                   left: 12,
//                   background: "rgba(255,255,255,0.82)",
//                   backdropFilter: "blur(4px)",
//                   padding: "3px 10px",
//                   fontSize: 10,
//                   letterSpacing: "0.1em",
//                   color: "#5A341A",
//                 }}
//               >
//                 {activeImg + 1} / {product.images.length}
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(4, 1fr)",
//                 gap: 8,
//                 marginTop: 8,
//               }}
//             >
//               {product.images.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setActiveImg(i)}
//                   style={{
//                     overflow: "hidden",
//                     aspectRatio: "1",
//                     background: "#F5F1EA",
//                     border: "none",
//                     cursor: "pointer",
//                     outline:
//                       activeImg === i
//                         ? "2px solid #C9A24A"
//                         : "1px solid #EFE8DD",
//                     opacity: activeImg === i ? 1 : 0.6,
//                     transition: "all 0.2s",
//                     padding: 0,
//                   }}
//                 >
//                   <img
//                     src={img}
//                     alt=""
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Info */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <div style={{ width: 24, height: 1, background: "#C9A24A" }} />
//               <span
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: "0.28em",
//                   color: "#C9A24A",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {product.category}
//               </span>
//             </div>
//             <div>
//               <h1
//                 className="fp"
//                 style={{
//                   fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
//                   fontWeight: 700,
//                   lineHeight: 1.1,
//                   color: "#2B1A12",
//                 }}
//               >
//                 {product.name}
//               </h1>
//               <p
//                 style={{
//                   fontSize: "1rem",
//                   fontWeight: 300,
//                   color: "#7A5A3A",
//                   marginTop: 4,
//                   direction: "rtl",
//                 }}
//               >
//                 {product.nameAr}
//               </p>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "baseline",
//                 gap: 10,
//                 flexWrap: "wrap",
//               }}
//             >
//               <span
//                 className="fp"
//                 style={{
//                   fontSize: "2.2rem",
//                   fontWeight: 700,
//                   color: "#5A341A",
//                   lineHeight: 1,
//                 }}
//               >
//                 {(product.price * qty).toLocaleString()}
//               </span>
//               <span
//                 style={{
//                   fontSize: 12,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   color: "#7A5A3A",
//                 }}
//               >
//                 EGP
//               </span>
//               {qty > 1 && (
//                 <span style={{ fontSize: 11, color: "#C9A24A" }}>
//                   ({product.price.toLocaleString()} × {qty})
//                 </span>
//               )}
//             </div>
//             <div style={{ height: 1, background: "#EFE8DD" }} />
//             <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//               <span
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: "0.15em",
//                   textTransform: "uppercase",
//                   color: "#7A5A3A",
//                 }}
//               >
//                 الكمية
//               </span>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   border: "1px solid #EFE8DD",
//                 }}
//               >
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   style={{
//                     width: 36,
//                     height: 36,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "#5A341A",
//                     fontSize: 18,
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#F5F1EA")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "none")
//                   }
//                 >
//                   −
//                 </button>
//                 <span
//                   style={{
//                     width: 36,
//                     height: 36,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 14,
//                     fontWeight: 500,
//                     color: "#2B1A12",
//                     borderLeft: "1px solid #EFE8DD",
//                     borderRight: "1px solid #EFE8DD",
//                   }}
//                 >
//                   {qty}
//                 </span>
//                 <button
//                   onClick={() => setQty((q) => q + 1)}
//                   style={{
//                     width: 36,
//                     height: 36,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "#5A341A",
//                     fontSize: 18,
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#F5F1EA")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "none")
//                   }
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//               {product.inStock ? (
//                 <button
//                   onClick={handleWA}
//                   style={{
//                     flex: 1,
//                     minWidth: 200,
//                     background: "#25D366",
//                     color: "#fff",
//                     fontSize: 12,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                     padding: "14px 16px",
//                     border: "none",
//                     cursor: "pointer",
//                     fontWeight: 500,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 10,
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#128C7E")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "#25D366")
//                   }
//                 >
//                   {WA_ICON} الطلب من واتساب —{" "}
//                   {(product.price * qty).toLocaleString()} EGP
//                 </button>
//               ) : (
//                 <div
//                   style={{
//                     flex: 1,
//                     minWidth: 200,
//                     background: "#EFE8DD",
//                     color: "#7A5A3A",
//                     fontSize: 12,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                     padding: "14px 16px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "not-allowed",
//                   }}
//                 >
//                   غير متوفر حالياً
//                 </div>
//               )}
//               {/* ✅ FIX 3: use navigate() instead of localNavigate() */}
//               <button
//                 onClick={() => navigate("/products")}
//                 className="sweep-btn"
//                 style={{
//                   background: "#5A341A",
//                   color: "#fff",
//                   fontSize: 12,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   padding: "14px 24px",
//                   border: "none",
//                   cursor: "pointer",
//                   fontWeight: 500,
//                 }}
//               >
//                 <span>تفاصيل أكثر</span>
//               </button>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: 8,
//               }}
//             >
//               {[
//                 ["🚚", "توصيل مجاني", "طلبات فوق 20000 EGP"],
//                 ["🔨", "صناعة يدوية", "حرفيون ماهرون"],
//                 ["🛡️", "ضمان3 سنوات", "ضمان هيكلي"],
//               ].map(([icon, label, sub]) => (
//                 <div
//                   key={label}
//                   style={{
//                     background: "#F5F1EA",
//                     border: "1px solid #EFE8DD",
//                     padding: "10px 8px",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                     gap: 3,
//                   }}
//                 >
//                   <span style={{ fontSize: 18 }}>{icon}</span>
//                   <span
//                     style={{
//                       fontSize: 10,
//                       fontWeight: 500,
//                       color: "#5A341A",
//                       direction: "rtl",
//                     }}
//                   >
//                     {label}
//                   </span>
//                   <span
//                     style={{ fontSize: 9, color: "#7A5A3A", direction: "rtl" }}
//                   >
//                     {sub}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <p
//               style={{
//                 fontSize: 10,
//                 letterSpacing: "0.12em",
//                 color: "rgba(122,90,58,0.55)",
//                 direction: "rtl",
//               }}
//             >
//               رقم المنتج: <span style={{ color: "#C9A24A" }}>{product.id}</span>
//             </p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div style={{ marginTop: 60 }}>
//           <div
//             className="no-scrollbar"
//             style={{
//               display: "flex",
//               borderBottom: "1px solid #EFE8DD",
//               gap: 24,
//               marginBottom: 36,
//               overflowX: "auto",
//             }}
//           >
//             {[
//               ["description", "وصف المنتج"],
//               ["materials", "الخامات المستخدمة"],
//               ["details", "التفاصيل"],
//             ].map(([key, label]) => (
//               <button
//                 key={key}
//                 onClick={() => setActiveTab(key)}
//                 style={{
//                   paddingBottom: 14,
//                   fontSize: 12,
//                   letterSpacing: "0.1em",
//                   fontWeight: 500,
//                   border: "none",
//                   borderBottom:
//                     activeTab === key
//                       ? "2px solid #C9A24A"
//                       : "2px solid transparent",
//                   background: "none",
//                   cursor: "pointer",
//                   whiteSpace: "nowrap",
//                   flexShrink: 0,
//                   color: activeTab === key ? "#5A341A" : "#7A5A3A",
//                   transition: "color 0.2s",
//                   marginBottom: -1,
//                 }}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {activeTab === "description" && (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
//                 gap: 40,
//                 alignItems: "center",
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     marginBottom: 12,
//                   }}
//                 >
//                   <div
//                     style={{ width: 18, height: 1, background: "#C9A24A" }}
//                   />
//                   <p
//                     style={{
//                       fontSize: 10,
//                       letterSpacing: "0.28em",
//                       textTransform: "uppercase",
//                       color: "#C9A24A",
//                     }}
//                   >
//                     وصف المنتج
//                   </p>
//                 </div>
//                 <p
//                   className="fp"
//                   style={{
//                     fontSize: "1.3rem",
//                     fontStyle: "italic",
//                     color: "#5A341A",
//                     lineHeight: 1.4,
//                     marginBottom: 16,
//                   }}
//                 >
//                   «حيث يلتقي الإتقان بالراحة»
//                 </p>
//                 <p style={{ fontSize: 14, color: "#7A5A3A", lineHeight: 1.9 }}>
//                   {product.description}
//                 </p>
//               </div>
//               <div
//                 style={{
//                   position: "relative",
//                   paddingBottom: "75%",
//                   overflow: "hidden",
//                   background: "#EFE8DD",
//                 }}
//               >
//                 <img
//                   src={product.images[1] || product.images[0]}
//                   alt="detail"
//                   style={{
//                     position: "absolute",
//                     inset: 0,
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute",
//                     inset: 0,
//                     background:
//                       "linear-gradient(to top, rgba(43,26,18,0.3), transparent)",
//                   }}
//                 />
//                 <div
//                   className="float-in"
//                   style={{
//                     position: "absolute",
//                     bottom: 16,
//                     left: 16,
//                     right: 16,
//                     background: "rgba(255,255,255,0.92)",
//                     backdropFilter: "blur(4px)",
//                     borderRight: "2px solid #C9A24A",
//                     padding: "10px 14px",
//                     direction: "rtl",
//                   }}
//                 >
//                   <p
//                     style={{
//                       fontSize: 10,
//                       letterSpacing: "0.18em",
//                       color: "#C9A24A",
//                       marginBottom: 3,
//                     }}
//                   >
//                     وعد الحرفي
//                   </p>
//                   <p className="fp" style={{ fontSize: 13, color: "#2B1A12" }}>
//                     كل قطعة موقّعة يدوياً من الحرفي الأساسي
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "materials" && (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
//                 gap: 1,
//                 background: "#EFE8DD",
//               }}
//             >
//               {product.materials.map((m, i) => (
//                 <div
//                   key={i}
//                   style={{ background: "#fff", padding: "28px 24px" }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#F5F1EA")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "#fff")
//                   }
//                 >
//                   <div
//                     style={{
//                       width: 20,
//                       height: 1,
//                       background: "#C9A24A",
//                       marginBottom: 14,
//                     }}
//                   />
//                   <p
//                     style={{
//                       fontSize: 10,
//                       letterSpacing: "0.22em",
//                       textTransform: "uppercase",
//                       color: "#C9A24A",
//                       marginBottom: 6,
//                     }}
//                   >
//                     الخامة {i + 1}
//                   </p>
//                   <p
//                     className="fp"
//                     style={{
//                       fontSize: "1.1rem",
//                       fontWeight: 500,
//                       color: "#2B1A12",
//                     }}
//                   >
//                     {m}
//                   </p>
//                 </div>
//               ))}
//               <div
//                 style={{
//                   background: "#5A341A",
//                   padding: "28px 24px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                 }}
//               >
//                 <p
//                   className="fp"
//                   style={{
//                     fontStyle: "italic",
//                     fontSize: "1rem",
//                     color: "#C9A24A",
//                     lineHeight: 1.5,
//                     marginBottom: 8,
//                     direction: "rtl",
//                   }}
//                 >
//                   «نختار فقط أفضل الخامات لكل قطعة أشري»
//                 </p>
//                 <p
//                   style={{
//                     fontSize: 10,
//                     letterSpacing: "0.18em",
//                     textTransform: "uppercase",
//                     color: "rgba(255,255,255,0.5)",
//                   }}
//                 >
//                   التزامنا
//                 </p>
//               </div>
//             </div>
//           )}

//           {activeTab === "details" && (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
//                 border: "1px solid #EFE8DD",
//               }}
//             >
//               {Object.entries(product.details || {}).length === 0 ? (
//                 <div
//                   style={{
//                     padding: "32px 20px",
//                     textAlign: "center",
//                     color: "#9A8A7A",
//                     fontSize: 13,
//                     direction: "rtl",
//                   }}
//                 >
//                   لا توجد تفاصيل إضافية
//                 </div>
//               ) : (
//                 Object.entries(product.details || {}).map(([key, value], i) => (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: "16px 20px",
//                       borderBottom: "1px solid #EFE8DD",
//                       direction: "rtl",
//                       transition: "background 0.2s",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.background = "#F5F1EA")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.background = "transparent")
//                     }
//                   >
//                     <span
//                       style={{
//                         fontSize: 10,
//                         letterSpacing: "0.2em",
//                         textTransform: "uppercase",
//                         color: "#C9A24A",
//                       }}
//                     >
//                       {key}
//                     </span>
//                     <span
//                       className="fp"
//                       style={{
//                         fontSize: "0.95rem",
//                         fontWeight: 500,
//                         color: "#2B1A12",
//                       }}
//                     >
//                       {value}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>

//         {/* Related */}
//         {related.length > 0 && (
//           <div style={{ marginTop: 60 }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 marginBottom: 24,
//               }}
//             >
//               <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
//               <span
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: "0.28em",
//                   textTransform: "uppercase",
//                   color: "#C9A24A",
//                 }}
//               >
//                 منتجات مشابهة
//               </span>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
//                 gap: 16,
//               }}
//             >
//               {related.map((p, i) => (
//                 <ProductCard
//                   key={p.id}
//                   product={p}
//                   index={i}
//                   onNavigate={(relatedId) => navigate(`/product/${relatedId}`)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </main>

//       {zoomed && (
//         <div
//           onClick={() => setZoomed(false)}
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 300,
//             background: "rgba(0,0,0,0.93)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 16,
//           }}
//         >
//           <img
//             src={product.images[activeImg]}
//             alt=""
//             style={{
//               maxWidth: "100%",
//               maxHeight: "100%",
//               objectFit: "contain",
//             }}
//           />
//           <button
//             onClick={() => setZoomed(false)}
//             style={{
//               position: "absolute",
//               top: 16,
//               right: 16,
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: "rgba(255,255,255,0.6)",
//             }}
//           >
//             <svg
//               width="28"
//               height="28"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//             >
//               <path d="M18 6 6 18M6 6l12 12" />
//             </svg>   
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MOCK_PRODUCTS from "../assets/data";
import ProductCard from "../components/ProductCard";
import { supabase } from "../supabaseClient.js";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "2001092846526";

const BADGE_STYLES = {
  الأفضل: { bg: "#5A341A", color: "#fff" },
  جديد:   { bg: "#C9A24A", color: "#fff" },
  محدود:  { bg: "#2B1A12", color: "#C9A24A" },
  مميز:   { bg: "#EFE8DD", color: "#5A341A" },
  مخصص:  { bg: "#7A5A3A", color: "#fff" },
};

const TABS = [
  { key: "description", label: "وصف المنتج" },
  { key: "materials",   label: "الخامات المستخدمة" },
  { key: "details",     label: "التفاصيل" },
];

const TRUST_BADGES = [
  { icon: "🚚", title: "توصيل مجاني", sub: "طلبات فوق 20,000 EGP" },
  { icon: "🔨", title: "صناعة يدوية", sub: "حرفيون ماهرون" },
  { icon: "🛡️", title: "ضمان 3 سنوات", sub: "ضمان هيكلي كامل" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function toDisplayString(val) {
  if (val === null || val === undefined) return "—";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) return val.map(toDisplayString).join("، ");
  if (typeof val === "object") {
    if (val.label !== undefined) return String(val.label);
    if (val.value !== undefined) return String(val.value);
    if (val.name  !== undefined) return String(val.name);
    return Object.values(val).filter((v) => typeof v !== "object").join(" — ") || JSON.stringify(val);
  }
  return String(val);
}

/**
 * Logs the order to Supabase `orders` table.
 * Silent — never throws; errors are only logged to console.
 */
async function logOrder({ product, qty }) {
  try {
    const payload = {
      product_id:      String(product.id),
      product_name:    product.name    || product.nameAr || "",
      product_name_ar: product.nameAr  || product.name   || "",
      product_image:   (product.images || [])[0] || null,
      category:        product.category || null,
      quantity:        qty,
      unit_price:      Number(product.price),
      total_price:     Number(product.price) * qty,
      status:          "pending",
    };
    const { error } = await supabase.from("orders").insert([payload]);
    if (error) console.error("[logOrder] Supabase error:", error.message);
  } catch (err) {
    console.error("[logOrder] Exception:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ChevronIcon = ({ direction = "right" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
    style={{ transform: direction === "left" ? "scaleX(-1)" : "none" }}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Image Gallery
// ─────────────────────────────────────────────────────────────────────────────
function ImageGallery({ images = [], productName = "", badge }) {
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const badgeStyle = badge ? BADGE_STYLES[badge] : null;
  const safeImages = images.length > 0 ? images : ["/placeholder.jpg"];

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e) => {
      if (e.key === "Escape")     setZoomed(false);
      if (e.key === "ArrowLeft")  setActiveImg((i) => (i + 1) % safeImages.length);
      if (e.key === "ArrowRight") setActiveImg((i) => (i - 1 + safeImages.length) % safeImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed, safeImages.length]);

  useEffect(() => {
    document.body.style.overflow = zoomed ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [zoomed]);

  const arrowBtn = (dir, onClick) => (
    <button onClick={onClick} aria-label={dir === "right" ? "الصورة السابقة" : "الصورة التالية"}
      style={{ position: "absolute", top: "50%", [dir]: 12, transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", border: "1px solid rgba(201,162,74,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A341A", transition: "background 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
    ><ChevronIcon direction={dir} /></button>
  );

  return (
    <>
      <div>
        {/* Main image */}
        <div role="button" tabIndex={0} aria-label={`عرض الصورة مكبّرة: ${productName}`}
          onClick={() => setZoomed(true)}
          onKeyDown={(e) => e.key === "Enter" && setZoomed(true)}
          style={{ position: "relative", paddingBottom: "100%", overflow: "hidden", background: "#F5F1EA", cursor: "zoom-in" }}>
          <img src={safeImages[activeImg]} alt={productName} loading="eager"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
          {/* Overlays */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(135deg,rgba(90,52,26,.08),transparent)" }} />
          <div style={{ position: "absolute", top: 12, left: 12, width: 40, height: 40, borderTop: "2px solid rgba(201,162,74,.5)", borderLeft: "2px solid rgba(201,162,74,.5)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 40, height: 40, borderBottom: "2px solid rgba(201,162,74,.5)", borderRight: "2px solid rgba(201,162,74,.5)", pointerEvents: "none" }} />
          <div className="spin-slow" style={{ position: "absolute", top: 14, right: 14, width: 60, height: 60, border: "1px solid rgba(201,162,74,.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span className="fp" style={{ fontStyle: "italic", fontSize: 9, color: "#C9A24A" }}>فاخر</span>
          </div>
          {badgeStyle && (
            <div style={{ position: "absolute", top: 12, left: 60, padding: "4px 10px", fontSize: 10, fontWeight: 700, background: badgeStyle.bg, color: badgeStyle.color, pointerEvents: "none" }}>{badge}</div>
          )}
          <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,.82)", backdropFilter: "blur(4px)", padding: "3px 10px", fontSize: 10, color: "#5A341A", pointerEvents: "none" }}>
            {activeImg + 1} / {safeImages.length}
          </div>
          {safeImages.length > 1 && (
            <>
              {arrowBtn("right", (e) => { e.stopPropagation(); setActiveImg((i) => (i - 1 + safeImages.length) % safeImages.length); })}
              {arrowBtn("left",  (e) => { e.stopPropagation(); setActiveImg((i) => (i + 1) % safeImages.length); })}
            </>
          )}
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(safeImages.length, 5)}, 1fr)`, gap: 8, marginTop: 8 }}>
            {safeImages.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} aria-label={`الصورة ${i + 1}`} aria-pressed={activeImg === i}
                style={{ overflow: "hidden", aspectRatio: "1", background: "#F5F1EA", border: "none", cursor: "pointer", padding: 0, outline: activeImg === i ? "2px solid #C9A24A" : "1px solid #EFE8DD", opacity: activeImg === i ? 1 : 0.55, transition: "opacity .2s, outline .2s" }}
                onMouseEnter={(e) => { if (activeImg !== i) e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={(e) => { if (activeImg !== i) e.currentTarget.style.opacity = "0.55"; }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div role="dialog" aria-modal="true" aria-label="عرض الصورة مكبّرة"
          onClick={() => setZoomed(false)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <img src={safeImages[activeImg]} alt={productName} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} />
          <button onClick={() => setZoomed(false)} aria-label="إغلاق"
            style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,.1)", border: "none", cursor: "pointer", color: "rgba(255,255,255,.8)", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          {safeImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i - 1 + safeImages.length) % safeImages.length); }} aria-label="الصورة السابقة"
                style={{ position: "absolute", top: "50%", right: 20, transform: "translateY(-50%)", background: "rgba(255,255,255,.1)", border: "none", cursor: "pointer", color: "#fff", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronIcon direction="right" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i + 1) % safeImages.length); }} aria-label="الصورة التالية"
                style={{ position: "absolute", top: "50%", left: 20, transform: "translateY(-50%)", background: "rgba(255,255,255,.1)", border: "none", cursor: "pointer", color: "#fff", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronIcon direction="left" />
              </button>
              <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
                {safeImages.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setActiveImg(i); }} aria-label={`الانتقال للصورة ${i + 1}`}
                    style={{ width: activeImg === i ? 20 : 8, height: 8, borderRadius: 4, background: activeImg === i ? "#C9A24A" : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", transition: "all .25s", padding: 0 }} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Quantity Selector
// ─────────────────────────────────────────────────────────────────────────────
function QuantitySelector({ qty, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "#7A5A3A" }}>الكمية</span>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid #EFE8DD" }}>
        <button onClick={() => onChange(Math.max(1, qty - 1))} disabled={qty <= 1} aria-label="تقليل الكمية"
          style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: qty <= 1 ? "not-allowed" : "pointer", color: qty <= 1 ? "#C8BEB5" : "#5A341A", fontSize: 18, opacity: qty <= 1 ? 0.4 : 1 }}
          onMouseEnter={(e) => { if (qty > 1) e.currentTarget.style.background = "#F5F1EA"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}>−</button>
        <span style={{ width: 40, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#2B1A12", borderLeft: "1px solid #EFE8DD", borderRight: "1px solid #EFE8DD" }}>{qty}</span>
        <button onClick={() => onChange(qty + 1)} aria-label="زيادة الكمية"
          style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#5A341A", fontSize: 18 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1EA")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>+</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Product Tabs
// ─────────────────────────────────────────────────────────────────────────────
function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <div style={{ marginTop: 64 }}>
      <div className="no-scrollbar" role="tablist" aria-label="تبويبات المنتج"
        style={{ display: "flex", borderBottom: "1px solid #EFE8DD", marginBottom: 40, overflowX: "auto" }}>
        {TABS.map(({ key, label }) => (
          <button key={key} role="tab" aria-selected={activeTab === key} onClick={() => setActiveTab(key)}
            style={{ paddingBottom: 14, paddingTop: 4, paddingLeft: 24, paddingRight: 24, fontSize: 12, letterSpacing: ".12em", fontWeight: 500, border: "none", borderBottom: activeTab === key ? "2px solid #C9A24A" : "2px solid transparent", background: "none", cursor: "pointer", whiteSpace: "nowrap", color: activeTab === key ? "#5A341A" : "#9A8A7A", transition: "color .2s", marginBottom: -1 }}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === "description" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 18, height: 1, background: "#C9A24A" }} />
              <p style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "#C9A24A" }}>وصف المنتج</p>
            </div>
            <p className="fp" style={{ fontSize: "1.3rem", fontStyle: "italic", color: "#5A341A", lineHeight: 1.4, marginBottom: 16 }}>«حيث يلتقي الإتقان بالراحة»</p>
            <p style={{ fontSize: 14, color: "#7A5A3A", lineHeight: 1.9, direction: "rtl" }}>{product.description}</p>
          </div>
          <div style={{ position: "relative", paddingBottom: "75%", overflow: "hidden", background: "#EFE8DD" }}>
            <img src={product.images?.[1] || product.images?.[0] || "/placeholder.jpg"} alt={`${product.name} - تفاصيل`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(43,26,18,.35),transparent)" }} />
            <div className="float-in" style={{ position: "absolute", bottom: 16, left: 16, right: 16, background: "rgba(255,255,255,.92)", backdropFilter: "blur(4px)", borderRight: "2px solid #C9A24A", padding: "10px 14px", direction: "rtl" }}>
              <p style={{ fontSize: 10, letterSpacing: ".18em", color: "#C9A24A", marginBottom: 3 }}>وعد الحرفي</p>
              <p className="fp" style={{ fontSize: 13, color: "#2B1A12" }}>كل قطعة موقّعة يدوياً من الحرفي الأساسي</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "materials" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,220px),1fr))", gap: 1, background: "#EFE8DD" }}>
          {(product.materials || []).map((m, i) => (
            <div key={i} style={{ background: "#fff", padding: "28px 24px", transition: "background .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1EA")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}>
              <div style={{ width: 20, height: 1, background: "#C9A24A", marginBottom: 14 }} />
              <p style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "#C9A24A", marginBottom: 6 }}>الخامة {i + 1}</p>
              <p className="fp" style={{ fontSize: "1.1rem", fontWeight: 500, color: "#2B1A12" }}>{toDisplayString(m)}</p>
            </div>
          ))}
          <div style={{ background: "#5A341A", padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p className="fp" style={{ fontStyle: "italic", fontSize: "1rem", color: "#C9A24A", lineHeight: 1.5, marginBottom: 8, direction: "rtl" }}>«نختار فقط أفضل الخامات لكل قطعة أشري»</p>
            <p style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>التزامنا</p>
          </div>
        </div>
      )}

      {activeTab === "details" && (
        <div style={{ border: "1px solid #EFE8DD", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))" }}>
          {Object.entries(product.details || {}).length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center", color: "#9A8A7A", fontSize: 13, direction: "rtl" }}>لا توجد تفاصيل إضافية</div>
          ) : (
            Object.entries(product.details).map(([key, value], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #EFE8DD", direction: "rtl", transition: "background .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1EA")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <span style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#C9A24A" }}>{toDisplayString(key)}</span>
                <span className="fp" style={{ fontSize: ".95rem", fontWeight: 500, color: "#2B1A12" }}>{toDisplayString(value)}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Related Products
// ─────────────────────────────────────────────────────────────────────────────
function RelatedProducts({ related }) {
  const navigate = useNavigate();
  if (!related || related.length === 0) return null;
  return (
    <section aria-label="منتجات مشابهة" style={{ marginTop: 64 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
        <span style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "#C9A24A" }}>منتجات مشابهة</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: 16 }}>
        {related.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onNavigate={(id) => navigate(`/product/${id}`)} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────────────────────────────────────
function Breadcrumb({ productName }) {
  const navigate = useNavigate();
  return (
    <nav aria-label="مسار التنقل" style={{ background: "#fff", borderBottom: "1px solid #EFE8DD" }}>
      <ol style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#7A5A3A", flexWrap: "wrap", direction: "rtl", listStyle: "none" }}>
        <li><button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A5A3A", fontSize: 11, padding: 0 }}>الرئيسية</button></li>
        <li aria-hidden="true" style={{ color: "#C9A24A" }}>/</li>
        <li><button onClick={() => navigate("/products")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A5A3A", fontSize: 11, padding: 0 }}>المنتجات</button></li>
        <li aria-hidden="true" style={{ color: "#C9A24A" }}>/</li>
        <li><span style={{ color: "#5A341A", fontWeight: 500 }}>{productName}</span></li>
      </ol>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Not Found
// ─────────────────────────────────────────────────────────────────────────────
function ProductNotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "100px 16px" }}>
      <p className="fp" style={{ fontSize: 22, color: "#5A341A", marginBottom: 8 }}>المنتج غير موجود</p>
      <p style={{ fontSize: 13, color: "#9A8A7A", marginBottom: 24 }}>ربما تم حذف المنتج أو تغيير الرابط.</p>
      <button onClick={() => navigate("/products")}
        style={{ background: "#5A341A", color: "#fff", padding: "12px 32px", border: "none", cursor: "pointer", fontSize: 13 }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#7A5A3A")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#5A341A")}>
        العودة للمتجر
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main ProductPage
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductPage({ allProducts = MOCK_PRODUCTS }) {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [ordering, setOrdering] = useState(false);

  const products = allProducts.map((p, i) => ({
    ...p,
    id: p.id != null ? String(p.id) : String(i + 1),
  }));

  const product = state?.product
    ? products.find((p) => p.id === String(state.product.id)) ?? state.product
    : products.find((p) => p.id === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQty(1);
  }, [id]);

  const handleWA = useCallback(async () => {
    if (!product || ordering) return;
    setOrdering(true);

    // Log to Supabase first (awaited so we capture the order before the tab opens)
    await logOrder({ product, qty });

    // Build WhatsApp message
    const lines = [
      "مرحباً، أود طلب:",
      "",
      `🪑 *${product.name || product.nameAr}*`,
      `🆔 رقم المنتج: ${product.id}`,
      `📦 الكمية: ${qty}`,
      `💰 السعر الإجمالي: ${(product.price * qty).toLocaleString()} EGP`,
    ];
    if (product.materials?.length) {
      lines.push("", "الخامات:");
      product.materials.forEach((m) => lines.push(`• ${toDisplayString(m)}`));
    }
    if (product.description) lines.push("", `الوصف: ${product.description}`);
    lines.push("", "يرجى تأكيد الطلب وتفاصيل التوصيل. شكراً!");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOrdering(false);
  }, [product, qty, ordering]);

  if (!product) return <ProductNotFound />;

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const totalPrice = (product.price * qty).toLocaleString();

  return (
    <div className="page-in" style={{ width: "100%" }}>
      <Header />
      <Breadcrumb productName={product.nameAr || product.name} />

      <main style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "32px 16px 100px" }}>
        {/* 2-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: 48, alignItems: "start" }}>

          <ImageGallery images={product.images || []} productName={product.name} badge={product.badge} />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Category */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24A" }} />
              <span style={{ fontSize: 10, letterSpacing: ".28em", color: "#C9A24A", textTransform: "uppercase" }}>{product.category}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="fp" style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 700, lineHeight: 1.1, color: "#2B1A12" }}>{product.name}</h1>
              {product.nameAr && product.nameAr !== product.name && (
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "#7A5A3A", marginTop: 4, direction: "rtl" }}>{product.nameAr}</p>
              )}
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span className="fp" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#5A341A", lineHeight: 1 }}>{totalPrice}</span>
              <span style={{ fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#7A5A3A" }}>EGP</span>
              {qty > 1 && <span style={{ fontSize: 11, color: "#C9A24A" }}>({product.price.toLocaleString()} × {qty})</span>}
            </div>

            <div style={{ height: 1, background: "#EFE8DD" }} />
            <QuantitySelector qty={qty} onChange={setQty} />

            {/* CTA */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {product.inStock ? (
                <button onClick={handleWA} disabled={ordering}
                  style={{ flex: 1, minWidth: 200, background: "#25D366", color: "#fff", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 16px", border: "none", cursor: ordering ? "not-allowed" : "pointer", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background .2s", opacity: ordering ? 0.8 : 1 }}
                  onMouseEnter={(e) => { if (!ordering) e.currentTarget.style.background = "#128C7E"; }}
                  onMouseLeave={(e) => { if (!ordering) e.currentTarget.style.background = "#25D366"; }}>
                  {ordering ? (
                    <>
                      <span style={{ width: 15, height: 15, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                      جاري التسجيل...
                    </>
                  ) : (
                    <><WhatsAppIcon /> الطلب من واتساب — {totalPrice} EGP</>
                  )}
                </button>
              ) : (
                <div style={{ flex: 1, minWidth: 200, background: "#EFE8DD", color: "#7A5A3A", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "not-allowed" }}>
                  غير متوفر حالياً
                </div>
              )}
              <button onClick={() => navigate("/products")} className="sweep-btn"
                style={{ background: "#5A341A", color: "#fff", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 24px", border: "none", cursor: "pointer", fontWeight: 500 }}>
                <span>تصفح المزيد</span>
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {TRUST_BADGES.map(({ icon, title, sub }) => (
                <div key={title} style={{ background: "#F5F1EA", border: "1px solid #EFE8DD", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 3 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 500, color: "#5A341A", direction: "rtl" }}>{title}</span>
                  <span style={{ fontSize: 9, color: "#7A5A3A", direction: "rtl" }}>{sub}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 10, letterSpacing: ".12em", color: "rgba(122,90,58,.55)", direction: "rtl" }}>
              رقم المنتج: <span style={{ color: "#C9A24A" }}>{product.id}</span>
            </p>
          </div>
        </div>

        <ProductTabs product={product} />
        <RelatedProducts related={related} />
      </main>
    </div>
  );
}