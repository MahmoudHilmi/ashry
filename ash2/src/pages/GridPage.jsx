// /**
//  * src/pages/GridPage.jsx
//  * ─────────────────────────────────────────────────────────────────
//  * Product catalog grid with search, category filter and sort.
//  * Receives the full products array as a prop (loaded once in App).
//  * ─────────────────────────────────────────────────────────────────
//  */
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import ProductCard from "../components/ProductCard";

// const CATEGORIES = ["الجميع", "غرف نوم ماستر", "غرف نوم أطفال", "قطع منفردة"];
// const SORT_OPTIONS = [
//   { label: "مميز",                    value: "featured"   },
//   { label: "السعر: من الأقل للأعلى", value: "price_asc"  },
//   { label: "السعر: من الأعلى للأقل", value: "price_desc" },
//   { label: "الاسم: أ → ي",           value: "name_asc"   },
// ];

// // Six grey skeleton cards shown while products load
// function SkeletonCard() {
//   return (
//     <div style={{ background:"#fff", border:"1px solid #EFE8DD", overflow:"hidden" }}>
//       <div style={{ paddingBottom:"75%", background:"#EFE8DD",
//         backgroundImage:"linear-gradient(90deg,#EFE8DD 25%,#F5F1EA 50%,#EFE8DD 75%)",
//         backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }} />
//       <div style={{ padding:16 }}>
//         {[["33%",12],["66%",18],["100%",12],["80%",12]].map(([w,h],i)=>(
//           <div key={i} style={{ height:h, background:"#EFE8DD", borderRadius:3,
//             width:w, marginBottom:10,
//             backgroundImage:"linear-gradient(90deg,#EFE8DD 25%,#F5F1EA 50%,#EFE8DD 75%)",
//             backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function GridPage({ products, loading, error }) {
//   const navigate  = useNavigate();
//   const searchRef = useRef(null);

//   const [category, setCategory] = useState("الجميع");
//   const [sort,     setSort]     = useState("featured");
//   const [search,   setSearch]   = useState("");

//   // ── Filter → search → sort ─────────────────────────────────────
//   const displayed = products
//     .filter(p => category === "الجميع" || p.category === category)
//     .filter(p => {
//       const q = search.toLowerCase();
//       return !q
//         || p.name.toLowerCase().includes(q)
//         || p.nameAr.includes(q)
//         || p.description.toLowerCase().includes(q)
//         || p.materials.some(m => m.toLowerCase().includes(q));
//     })
//     .sort((a, b) => {
//       if (sort === "price_asc")  return a.price - b.price;
//       if (sort === "price_desc") return b.price - a.price;
//       if (sort === "name_asc")   return a.name.localeCompare(b.name);
//       return 0; // featured — keep original order
//     });

//   return (
//     <div className="page-in" style={{ width:"100%" }}>

//       {/* ── Page header ─────────────────────────────────────────── */}
//       <div className="dot-bg" style={{ background:"#EFE8DD",
//         borderBottom:"1px solid rgba(201,162,74,0.2)", width:"100%" }}>
//         <div style={{ width:"100%", maxWidth:1280, margin:"0 auto", padding:"40px 16px" }}>

//           <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
//             <div style={{ width:28, height:1, background:"#C9A24A" }} />
//             <span style={{ fontSize:10, letterSpacing:"0.28em",
//               textTransform:"uppercase", color:"#C9A24A" }}>مجموعاتنا</span>
//           </div>

//           <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//             <div>
//               <h1 className="fp" style={{ fontSize:"clamp(1.7rem,5vw,3.2rem)",
//                 fontWeight:800, color:"#2B1A12", lineHeight:1.15 }}>
//                 المصنوعات اليدوية
//               </h1>
//               <p style={{ color:"#7A5A3A", fontSize:14, marginTop:6, direction:"rtl" }}>
//                 قطع مصنوعة بعناية لتدوم معك
//               </p>
//             </div>

//             {/* Search input */}
//             <div style={{ display:"flex", alignItems:"center",
//               border:"1px solid rgba(201,162,74,0.3)", background:"#fff",
//               overflow:"hidden", width:"100%", maxWidth:320 }}>
//               <svg style={{ margin:"0 10px", color:"#7A5A3A", flexShrink:0 }}
//                 width="15" height="15" viewBox="0 0 24 24"
//                 fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <input
//                 ref={searchRef}
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="ابحث عن منتج..."
//                 style={{ flex:1, minWidth:0, border:"none", outline:"none",
//                   padding:"10px 8px", fontSize:13, color:"#2B1A12",
//                   background:"transparent", direction:"rtl" }}
//               />
//               {search && (
//                 <button onClick={() => setSearch("")}
//                   style={{ marginLeft:8, background:"none", border:"none",
//                     cursor:"pointer", color:"rgba(122,90,58,0.5)",
//                     flexShrink:0, padding:"0 8px" }}>
//                   <svg width="13" height="13" viewBox="0 0 24 24"
//                     fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M18 6 6 18M6 6l12 12"/>
//                   </svg>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Sticky filter bar ────────────────────────────────────── */}
//       <div style={{ background:"#fff", borderBottom:"1px solid #EFE8DD",
//         position:"sticky", top:64, zIndex:40, width:"100%" }}>
//         <div style={{ width:"100%", maxWidth:1280, margin:"0 auto",
//           padding:"0 16px", display:"flex", alignItems:"center",
//           justifyContent:"space-between", gap:8 }}>

//           {/* Category pills */}
//           <div className="no-scrollbar" style={{ display:"flex",
//             alignItems:"center", gap:2, overflowX:"auto", flex:1, minWidth:0 }}>
//             {CATEGORIES.map(cat => (
//               <button key={cat} onClick={() => setCategory(cat)}
//                 style={{ flexShrink:0, padding:"10px 12px", fontSize:10,
//                   letterSpacing:"0.08em", textTransform:"uppercase",
//                   fontWeight:500, border:"none", cursor:"pointer",
//                   whiteSpace:"nowrap", transition:"all 0.2s",
//                   background: category === cat ? "#5A341A" : "transparent",
//                   color:       category === cat ? "#fff"    : "#7A5A3A" }}>
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Sort + count */}
//           <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
//             <span style={{ fontSize:10, color:"#7A5A3A", whiteSpace:"nowrap" }}
//               className="hidden-mobile">
//               {loading ? "جاري التحميل..." : `${displayed.length} نتائج`}
//             </span>
//             <select value={sort} onChange={e => setSort(e.target.value)}
//               style={{ fontSize:10, border:"1px solid #EFE8DD", background:"#fff",
//                 color:"#7A5A3A", padding:"7px 10px", outline:"none",
//                 cursor:"pointer", direction:"rtl", maxWidth:140 }}>
//               {SORT_OPTIONS.map(o => (
//                 <option key={o.value} value={o.value}>{o.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* ── Grid ─────────────────────────────────────────────────── */}
//       <main style={{ width:"100%", maxWidth:1280, margin:"0 auto",
//         padding:"28px 16px 80px" }}>

//         {/* Error state */}
//         {error && (
//           <div style={{ textAlign:"center", padding:"60px 16px" }}>
//             <p className="fp" style={{ fontSize:20, color:"#5A341A", marginBottom:8 }}>
//               فشل في تحميل المنتجات
//             </p>
//             <p style={{ color:"#7A5A3A", fontSize:13 }}>{error}</p>
//           </div>
//         )}

//         {/* Skeleton loading */}
//         {loading && (
//           <div style={{ display:"grid",
//             gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
//             gap:16 }}>
//             {Array(6).fill(0).map((_,i) => <SkeletonCard key={i}/>)}
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && !error && displayed.length === 0 && (
//           <div style={{ textAlign:"center", padding:"80px 16px" }}>
//             <div className="fp" style={{ fontSize:48, color:"#EFE8DD", marginBottom:16 }}>∅</div>
//             <p className="fp" style={{ fontSize:20, color:"#5A341A", marginBottom:8 }}>
//               لا توجد نتائج
//             </p>
//             <p style={{ color:"#7A5A3A", fontSize:13, marginBottom:24 }}>
//               جرّب تعديل خيارات البحث أو الفلتر
//             </p>
//             <button onClick={() => { setCategory("الجميع"); setSearch(""); }}
//               style={{ background:"#5A341A", color:"#fff", fontSize:12,
//                 letterSpacing:"0.12em", textTransform:"uppercase",
//                 padding:"12px 32px", border:"none", cursor:"pointer" }}>
//               مسح الفلاتر
//             </button>
//           </div>
//         )}

//         {/* Product cards */}
//         {!loading && !error && displayed.length > 0 && (
//           <>
//             <p style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase",
//               color:"rgba(122,90,58,0.55)", marginBottom:20, direction:"rtl" }}>
//               عرض {displayed.length} من {products.length} منتجات
//               {category !== "الجميع" && ` · ${category}`}
//               {search && ` · "${search}"`}
//             </p>

//             <div style={{ display:"grid",
//               gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
//               gap:16 }}>
//               {displayed.map((product, i) => (
//                 // Each card navigates to /product/:id via React Router
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   index={i}
//                   onNavigate={(id) => navigate(`/product/${id}`)}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }