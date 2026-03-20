// import { useState, useEffect, useRef, useCallback } from "react";
// import { supabase } from "../supabaseClient.js";

// const ADMIN_PASSWORD = "ashry2025";

// // ─── STYLES ───────────────────────────────────────────────────────────────────
// const DashboardStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Tajawal:wght@300;400;500;700&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     body { font-family: 'Tajawal', sans-serif; }

//     @keyframes fadeIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes slideIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes spin    { to { transform:rotate(360deg); } }
//     @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
//     @keyframes shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }

//     .fade-in   { animation: fadeIn  0.3s ease both; }
//     .slide-in  { animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1) both; }
//     .spin-anim { animation: spin    0.8s linear infinite; }
//     .shimmer   { background:linear-gradient(90deg,#f0f0f0 25%,#f8f8f8 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:6px; }

//     .db-input {
//       width:100%; padding:10px 14px; border:1.5px solid #E8E0D5; border-radius:8px;
//       font-size:13px; font-family:'Tajawal',sans-serif; color:#2B1A12;
//       background:#FDFAF6; outline:none; transition:border-color .2s,box-shadow .2s; direction:rtl;
//     }
//     .db-input:focus { border-color:#C9A24A; box-shadow:0 0 0 3px rgba(201,162,74,.12); }
//     .db-input::placeholder { color:#B5A090; }

//     .db-btn {
//       padding:10px 20px; border:none; border-radius:8px; cursor:pointer;
//       font-family:'Tajawal',sans-serif; font-size:13px; font-weight:600;
//       transition:all .2s; display:inline-flex; align-items:center; gap:7px; white-space:nowrap;
//     }
//     .db-btn-primary { background:#5A341A; color:#fff; }
//     .db-btn-primary:hover:not(:disabled) { background:#7A4A28; transform:translateY(-1px); box-shadow:0 4px 16px rgba(90,52,26,.25); }
//     .db-btn-gold { background:#C9A24A; color:#fff; }
//     .db-btn-gold:hover:not(:disabled) { background:#B8912A; transform:translateY(-1px); }
//     .db-btn-danger { background:#fff; color:#C0392B; border:1.5px solid #FADBD8; }
//     .db-btn-danger:hover:not(:disabled) { background:#FEF0EE; }
//     .db-btn-ghost { background:transparent; color:#7A5A3A; border:1.5px solid #E8E0D5; }
//     .db-btn-ghost:hover:not(:disabled) { background:#F5F1EA; }
//     .db-btn:disabled { opacity:.5; cursor:not-allowed !important; transform:none !important; }

//     .tag-chip { display:inline-flex; align-items:center; gap:5px; background:#F5F1EA; border:1px solid #E8E0D5; border-radius:20px; padding:3px 10px 3px 6px; font-size:11px; color:#5A341A; }
//     .tag-chip .chip-remove { background:none; border:none; cursor:pointer; color:#999; font-size:14px; line-height:1; padding:0; display:flex; align-items:center; }
//     .tag-chip .chip-remove:hover { color:#C0392B; }

//     .upload-zone { border:2px dashed #E8E0D5; border-radius:10px; padding:24px 20px; text-align:center; cursor:pointer; transition:all .2s; background:#FDFAF6; user-select:none; }
//     .upload-zone:hover,.upload-zone.drag-over { border-color:#C9A24A; background:#FFF8EE; }

//     .img-thumb { position:relative; width:76px; height:76px; border-radius:8px; overflow:hidden; border:1px solid #E8E0D5; flex-shrink:0; }
//     .img-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
//     .img-thumb .remove-btn { position:absolute; top:3px; right:3px; width:20px; height:20px; background:rgba(192,57,43,.88); color:#fff; border:none; border-radius:50%; cursor:pointer; font-size:13px; display:flex; align-items:center; justify-content:center; line-height:1; }

//     .product-row { transition:background .15s; }
//     .product-row:hover { background:#FDFAF6; }

//     .toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); padding:12px 24px; border-radius:10px; font-size:13px; font-weight:600; z-index:9999; animation:fadeIn .3s ease; white-space:nowrap; pointer-events:none; }
//     .toast-success { background:#27AE60; color:#fff; }
//     .toast-error   { background:#C0392B; color:#fff; }
//     .toast-info    { background:#2980B9; color:#fff; }

//     /* Responsive */
//     .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
//     .form-grid  { display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:16px; }
//     .desktop-table { display:block; }
//     .mobile-cards  { display:none; }

//     @media (max-width:900px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }
//     @media (max-width:640px) {
//       .stats-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
//       .form-grid  { grid-template-columns:1fr; }
//       .desktop-table { display:none !important; }
//       .mobile-cards  { display:flex !important; flex-direction:column; gap:10px; padding:12px; }
//       .header-wrap { flex-wrap:wrap; gap:10px; height:auto !important; padding:14px 16px !important; }
//       .header-actions { width:100%; display:flex; gap:8px; }
//       .header-actions .db-btn { flex:1; justify-content:center; }
//       .table-topbar { flex-direction:column !important; align-items:stretch !important; }
//       .table-topbar input { width:100% !important; }
//       .form-actions { flex-direction:column; }
//       .form-actions .db-btn { width:100%; justify-content:center; }
//     }

//     ::-webkit-scrollbar { width:5px; height:5px; }
//     ::-webkit-scrollbar-track { background:#F5F1EA; }
//     ::-webkit-scrollbar-thumb { background:#C9A24A55; border-radius:3px; }
//   `}</style>
// );

// // ─── SPINNER ──────────────────────────────────────────────────────────────────
// const Spinner = ({ size = 16, color = "#fff" }) => (
//   <span
//     className="spin-anim"
//     style={{
//       display: "inline-block",
//       width: size,
//       height: size,
//       border: `2px solid ${color}`,
//       borderTopColor: "transparent",
//       borderRadius: "50%",
//       flexShrink: 0,
//     }}
//   />
// );

// // ─── TOAST ────────────────────────────────────────────────────────────────────
// function Toast({ msg, type, onClose }) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 3200);
//     return () => clearTimeout(t);
//   }, [onClose]);
//   return <div className={`toast toast-${type}`}>{msg}</div>;
// }

// // ─── LOGIN ────────────────────────────────────────────────────────────────────
// function LoginScreen({ onLogin }) {
//   const [pass, setPass] = useState("");
//   const [error, setError] = useState("");
//   const [shaking, setShaking] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!pass.trim()) {
//       setError("أدخل كلمة المرور");
//       return;
//     }
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 400)); // simulate latency
//     if (pass === ADMIN_PASSWORD) {
//       onLogin();
//     } else {
//       setError("كلمة المرور غلط ❌");
//       setShaking(true);
//       setTimeout(() => setShaking(false), 500);
//     }
//     setLoading(false);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#F7F3EE",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           background: "#fff",
//           padding: "clamp(24px,6vw,44px)",
//           borderRadius: 18,
//           border: "1px solid #E8E0D5",
//           width: "100%",
//           maxWidth: 380,
//           textAlign: "center",
//           boxShadow: "0 10px 48px rgba(90,52,26,.12)",
//           animation: shaking ? "shake .4s ease" : "fadeIn .35s ease both",
//         }}
//       >
//         <div
//           style={{
//             width: 58,
//             height: 58,
//             background: "#2B1A12",
//             borderRadius: 14,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "0 auto 18px",
//           }}
//         >
//           <svg width="26" height="26" viewBox="0 0 24 24" fill="#C9A24A">
//             <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
//           </svg>
//         </div>
//         <p
//           style={{
//             fontSize: 10,
//             letterSpacing: ".28em",
//             textTransform: "uppercase",
//             color: "#C9A24A",
//             marginBottom: 5,
//             fontWeight: 700,
//           }}
//         >
//           لوحة التحكم
//         </p>
//         <h1
//           style={{
//             fontSize: 21,
//             fontWeight: 700,
//             color: "#2B1A12",
//             marginBottom: 5,
//             fontFamily: "'Playfair Display',serif",
//             fontStyle: "italic",
//           }}
//         >
//           Al Ashry Furniture
//         </h1>
//         <p style={{ fontSize: 12, color: "#9A8A7A", marginBottom: 28 }}>
//           أدخل كلمة المرور للمتابعة
//         </p>

//         <input
//           id="admin-pass"
//           name="admin-pass"
//           type="password"
//           autoComplete="current-password"
//           placeholder="كلمة المرور"
//           value={pass}
//           onChange={(e) => {
//             setPass(e.target.value);
//             setError("");
//           }}
//           onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//           style={{
//             width: "100%",
//             padding: "12px 16px",
//             border: `1.5px solid ${error ? "#C0392B" : "#E8E0D5"}`,
//             borderRadius: 10,
//             marginBottom: 6,
//             fontSize: 14,
//             outline: "none",
//             direction: "rtl",
//             fontFamily: "'Tajawal',sans-serif",
//             background: "#FDFAF6",
//             color: "#2B1A12",
//             transition: "border-color .2s",
//           }}
//         />
//         {error && (
//           <p
//             style={{
//               fontSize: 12,
//               color: "#C0392B",
//               marginBottom: 10,
//               textAlign: "right",
//             }}
//           >
//             {error}
//           </p>
//         )}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           style={{
//             width: "100%",
//             background: "#5A341A",
//             color: "#fff",
//             padding: "13px",
//             border: "none",
//             borderRadius: 10,
//             fontSize: 14,
//             cursor: loading ? "not-allowed" : "pointer",
//             fontWeight: 700,
//             fontFamily: "'Tajawal',sans-serif",
//             marginTop: 4,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 8,
//             opacity: loading ? 0.7 : 1,
//           }}
//           onMouseEnter={(e) =>
//             !loading && (e.currentTarget.style.background = "#7A4A28")
//           }
//           onMouseLeave={(e) => (e.currentTarget.style.background = "#5A341A")}
//         >
//           {loading && <Spinner />}
//           {loading ? "جاري التحقق..." : "دخول"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── IMAGE UPLOADER ───────────────────────────────────────────────────────────
// function ImageUploader({ images, onChange }) {
//   const [uploading, setUploading] = useState(false);
//   const [dragOver, setDragOver] = useState(false);
//   const inputRef = useRef(null);

//   const uploadFile = async (file) => {
//     if (!file.type.startsWith("image/")) return null;
//     const ext = file.name.split(".").pop().toLowerCase();
//     const safeName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
//     const { error } = await supabase.storage
//       .from("products")
//       .upload(safeName, file, { cacheControl: "3600", upsert: false });
//     if (error) {
//       console.error("Upload error:", error.message);
//       return null;
//     }
//     const { data } = supabase.storage.from("products").getPublicUrl(safeName);
//     return data.publicUrl;
//   };

//   const handleFiles = async (files) => {
//     const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
//     if (!valid.length) return;
//     setUploading(true);
//     const urls = await Promise.all(valid.map(uploadFile));
//     onChange([...images, ...urls.filter(Boolean)]);
//     setUploading(false);
//   };

//   return (
//     <div>
//       <label
//         htmlFor="img-upload"
//         style={{
//           display: "block",
//           fontSize: 12,
//           fontWeight: 600,
//           color: "#5A341A",
//           marginBottom: 8,
//           direction: "rtl",
//         }}
//       >
//         صور المنتج
//       </label>

//       {(images.length > 0 || uploading) && (
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 8,
//             marginBottom: 12,
//           }}
//         >
//           {images.map((url, i) => (
//             <div key={`${url}-${i}`} className="img-thumb">
//               <img src={url} alt={`صورة ${i + 1}`} loading="lazy" />
//               <button
//                 className="remove-btn"
//                 type="button"
//                 aria-label="حذف الصورة"
//                 onClick={() => onChange(images.filter((_, idx) => idx !== i))}
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//           {uploading && (
//             <div
//               className="img-thumb"
//               style={{
//                 background: "#F5F1EA",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Spinner size={20} color="#C9A24A" />
//             </div>
//           )}
//         </div>
//       )}

//       <div
//         id="img-upload"
//         role="button"
//         tabIndex={0}
//         className={`upload-zone${dragOver ? " drag-over" : ""}`}
//         onClick={() => !uploading && inputRef.current?.click()}
//         onKeyDown={(e) =>
//           e.key === "Enter" && !uploading && inputRef.current?.click()
//         }
//         onDragOver={(e) => {
//           e.preventDefault();
//           setDragOver(true);
//         }}
//         onDragLeave={() => setDragOver(false)}
//         onDrop={(e) => {
//           e.preventDefault();
//           setDragOver(false);
//           handleFiles(e.dataTransfer.files);
//         }}
//       >
//         <input
//           ref={inputRef}
//           id="file-input"
//           name="file-input"
//           type="file"
//           accept="image/*"
//           multiple
//           style={{ display: "none" }}
//           onChange={(e) => handleFiles(e.target.files)}
//         />
//         {uploading ? (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 10,
//               color: "#C9A24A",
//             }}
//           >
//             <Spinner size={18} color="#C9A24A" />
//             <span style={{ fontSize: 13, fontWeight: 600 }}>جاري الرفع...</span>
//           </div>
//         ) : (
//           <>
//             <div style={{ fontSize: 28, marginBottom: 8 }}>📸</div>
//             <p
//               style={{
//                 fontSize: 13,
//                 color: "#5A341A",
//                 fontWeight: 600,
//                 marginBottom: 4,
//               }}
//             >
//               اضغط لرفع صورة أو اسحبها هنا
//             </p>
//             <p style={{ fontSize: 11, color: "#9A8A7A" }}>
//               PNG · JPG · WEBP — يمكن رفع أكثر من صورة
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── TAG INPUT ────────────────────────────────────────────────────────────────
// function TagInput({ id, label, values, onChange, placeholder }) {
//   const [input, setInput] = useState("");
//   const add = () => {
//     const v = input.trim();
//     if (v && !values.includes(v)) onChange([...values, v]);
//     setInput("");
//   };
//   return (
//     <div>
//       <label
//         htmlFor={id}
//         style={{
//           display: "block",
//           fontSize: 12,
//           fontWeight: 600,
//           color: "#5A341A",
//           marginBottom: 6,
//           direction: "rtl",
//         }}
//       >
//         {label}
//       </label>
//       <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//         <input
//           id={id}
//           name={id}
//           className="db-input"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
//           placeholder={placeholder}
//           style={{ flex: 1 }}
//         />
//         <button
//           type="button"
//           className="db-btn db-btn-ghost"
//           onClick={add}
//           style={{ flexShrink: 0, padding: "10px 16px" }}
//           aria-label="إضافة"
//         >
//           +
//         </button>
//       </div>
//       {values.length > 0 && (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//           {values.map((v, i) => (
//             <span key={`${v}-${i}`} className="tag-chip">
//               <button
//                 type="button"
//                 className="chip-remove"
//                 onClick={() => onChange(values.filter((_, idx) => idx !== i))}
//                 aria-label={`حذف ${v}`}
//               >
//                 ×
//               </button>
//               {v}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── PRODUCT FORM ─────────────────────────────────────────────────────────────
// const EMPTY_FORM = {
//   name: "",
//   nameAr: "",
//   category: "",
//   price: "",
//   description: "",
//   badge: "",
//   inStock: true,
//   images: [],
//   materials: [],
//   details: {},
// };

// function ProductForm({ initial, onSave, onCancel, saving }) {
//   const [form, setForm] = useState(() =>
//     initial
//       ? {
//           ...EMPTY_FORM,
//           ...initial,
//           images: Array.isArray(initial.images) ? initial.images : [],
//           materials: Array.isArray(initial.materials) ? initial.materials : [],
//         }
//       : { ...EMPTY_FORM },
//   );
//   const set = useCallback((k, v) => setForm((f) => ({ ...f, [k]: v })), []);

//   const handleSubmit = () => {
//     if (!form.nameAr && !form.name) {
//       alert("أدخل اسم المنتج (عربي أو إنجليزي)");
//       return;
//     }
//     if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
//       alert("أدخل سعراً صحيحاً");
//       return;
//     }
//     onSave(form);
//   };

//   return (
//     <div
//       className="slide-in"
//       style={{
//         background: "#fff",
//         border: "1px solid #E8E0D5",
//         borderRadius: 14,
//         padding: "clamp(16px,4vw,28px)",
//         marginBottom: 24,
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 22,
//           gap: 12,
//           flexWrap: "wrap",
//         }}
//       >
//         <h2
//           style={{
//             fontSize: 17,
//             fontWeight: 700,
//             color: "#2B1A12",
//             fontFamily: "'Playfair Display',serif",
//           }}
//         >
//           {initial?.id ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}
//         </h2>
//         <button
//           type="button"
//           className="db-btn db-btn-ghost"
//           onClick={onCancel}
//           style={{ fontSize: 12 }}
//         >
//           ✕ إغلاق
//         </button>
//       </div>

//       {/* Fields grid */}
//       <div className="form-grid">
//         <div>
//           <label
//             htmlFor="f-nameAr"
//             style={{
//               display: "block",
//               fontSize: 12,
//               fontWeight: 600,
//               color: "#5A341A",
//               marginBottom: 6,
//               direction: "rtl",
//             }}
//           >
//             الاسم بالعربي *
//           </label>
//           <input
//             id="f-nameAr"
//             name="nameAr"
//             className="db-input"
//             value={form.nameAr}
//             onChange={(e) => set("nameAr", e.target.value)}
//             placeholder="كرسي فاخر"
//             autoComplete="off"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="f-name"
//             style={{
//               display: "block",
//               fontSize: 12,
//               fontWeight: 600,
//               color: "#5A341A",
//               marginBottom: 6,
//             }}
//           >
//             الاسم بالإنجليزي
//           </label>
//           <input
//             id="f-name"
//             name="name"
//             className="db-input"
//             value={form.name}
//             onChange={(e) => set("name", e.target.value)}
//             placeholder="Luxury Chair"
//             style={{ direction: "ltr" }}
//             autoComplete="off"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="f-category"
//             style={{
//               display: "block",
//               fontSize: 12,
//               fontWeight: 600,
//               color: "#5A341A",
//               marginBottom: 6,
//               direction: "rtl",
//             }}
//           >
//             الفئة
//           </label>
//           <input
//             id="f-category"
//             name="category"
//             className="db-input"
//             value={form.category}
//             onChange={(e) => set("category", e.target.value)}
//             placeholder="كراسي"
//             autoComplete="off"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="f-price"
//             style={{
//               display: "block",
//               fontSize: 12,
//               fontWeight: 600,
//               color: "#5A341A",
//               marginBottom: 6,
//               direction: "rtl",
//             }}
//           >
//             السعر (EGP) *
//           </label>
//           <input
//             id="f-price"
//             name="price"
//             type="number"
//             min="1"
//             className="db-input"
//             value={form.price}
//             onChange={(e) => set("price", e.target.value)}
//             placeholder="5000"
//             style={{ direction: "ltr" }}
//             autoComplete="off"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="f-badge"
//             style={{
//               display: "block",
//               fontSize: 12,
//               fontWeight: 600,
//               color: "#5A341A",
//               marginBottom: 6,
//               direction: "rtl",
//             }}
//           >
//             الشارة
//           </label>
//           <select
//             id="f-badge"
//             name="badge"
//             className="db-input"
//             value={form.badge}
//             onChange={(e) => set("badge", e.target.value)}
//           >
//             <option value="">بدون شارة</option>
//             {["الأفضل", "جديد", "محدود", "مميز", "مخصص"].map((b) => (
//               <option key={b} value={b}>
//                 {b}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//             paddingTop: 20,
//           }}
//         >
//           <label
//             htmlFor="f-instock"
//             style={{
//               fontSize: 12,
//               fontWeight: 600,
//               color: "#5A341A",
//               cursor: "pointer",
//             }}
//           >
//             متوفر في المخزن؟
//           </label>
//           <div
//             id="f-instock"
//             role="switch"
//             aria-checked={form.inStock}
//             tabIndex={0}
//             onClick={() => set("inStock", !form.inStock)}
//             onKeyDown={(e) => e.key === " " && set("inStock", !form.inStock)}
//             style={{
//               width: 44,
//               height: 24,
//               borderRadius: 12,
//               background: form.inStock ? "#27AE60" : "#D0C8BE",
//               cursor: "pointer",
//               position: "relative",
//               transition: "background .2s",
//               flexShrink: 0,
//               outline: "none",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 3,
//                 left: form.inStock ? 23 : 3,
//                 width: 18,
//                 height: 18,
//                 borderRadius: "50%",
//                 background: "#fff",
//                 transition: "left .2s",
//                 boxShadow: "0 1px 4px rgba(0,0,0,.18)",
//               }}
//             />
//           </div>
//           <span
//             style={{
//               fontSize: 11,
//               color: form.inStock ? "#27AE60" : "#C0392B",
//               fontWeight: 600,
//             }}
//           >
//             {form.inStock ? "متوفر" : "غير متوفر"}
//           </span>
//         </div>
//       </div>

//       {/* Description */}
//       <div style={{ marginTop: 16 }}>
//         <label
//           htmlFor="f-desc"
//           style={{
//             display: "block",
//             fontSize: 12,
//             fontWeight: 600,
//             color: "#5A341A",
//             marginBottom: 6,
//             direction: "rtl",
//           }}
//         >
//           الوصف
//         </label>
//         <textarea
//           id="f-desc"
//           name="description"
//           className="db-input"
//           value={form.description}
//           onChange={(e) => set("description", e.target.value)}
//           placeholder="وصف المنتج..."
//           rows={3}
//           style={{ resize: "vertical" }}
//         />
//       </div>

//       {/* Images + Materials */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
//           gap: 20,
//           marginTop: 20,
//         }}
//       >
//         <ImageUploader
//           images={form.images}
//           onChange={(v) => set("images", v)}
//         />
//         <TagInput
//           id="f-materials"
//           label="المواد"
//           values={form.materials}
//           onChange={(v) => set("materials", v)}
//           placeholder="مثال: خشب زان"
//         />
//       </div>

//       {/* Actions */}
//       <div
//         className="form-actions"
//         style={{
//           display: "flex",
//           gap: 10,
//           marginTop: 24,
//           justifyContent: "flex-end",
//         }}
//       >
//         <button
//           type="button"
//           className="db-btn db-btn-ghost"
//           onClick={onCancel}
//           disabled={saving}
//         >
//           إلغاء
//         </button>
//         <button
//           type="button"
//           className="db-btn db-btn-primary"
//           onClick={handleSubmit}
//           disabled={saving}
//         >
//           {saving && <Spinner />}
//           {saving
//             ? "جاري الحفظ..."
//             : initial?.id
//               ? "حفظ التعديلات"
//               : "إضافة المنتج"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── MOBILE PRODUCT CARD ─────────────────────────────────────────────────────
// function MobileCard({ p, onEdit, onDelete }) {
//   const imgs = Array.isArray(p.images) ? p.images : [];
//   return (
//     <div
//       className="fade-in"
//       style={{
//         background: "#fff",
//         border: "1px solid #E8E0D5",
//         borderRadius: 12,
//         padding: 14,
//         display: "flex",
//         gap: 12,
//       }}
//     >
//       {imgs[0] ? (
//         <img
//           src={imgs[0]}
//           alt={p.nameAr || p.name}
//           style={{
//             width: 64,
//             height: 64,
//             objectFit: "cover",
//             borderRadius: 8,
//             border: "1px solid #E8E0D5",
//             flexShrink: 0,
//           }}
//           loading="lazy"
//         />
//       ) : (
//         <div
//           style={{
//             width: 64,
//             height: 64,
//             background: "#F5F1EA",
//             borderRadius: 8,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 26,
//             flexShrink: 0,
//           }}
//         >
//           🪑
//         </div>
//       )}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: 4,
//           }}
//         >
//           <p
//             style={{
//               fontWeight: 700,
//               color: "#2B1A12",
//               fontSize: 14,
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {p.nameAr || p.name || "—"}
//           </p>
//           <span
//             style={{
//               fontSize: 9,
//               color: "#9A8A7A",
//               flexShrink: 0,
//               marginRight: 4,
//             }}
//           >
//             #{p.id}
//           </span>
//         </div>
//         <div
//           style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}
//         >
//           {p.category && (
//             <span
//               style={{
//                 background: "#F5F1EA",
//                 border: "1px solid #E8E0D5",
//                 borderRadius: 20,
//                 padding: "2px 8px",
//                 fontSize: 10,
//                 color: "#5A341A",
//                 fontWeight: 600,
//               }}
//             >
//               {p.category}
//             </span>
//           )}
//           {p.badge && (
//             <span
//               style={{
//                 background: "#FFF8E8",
//                 border: "1px solid #C9A24A44",
//                 borderRadius: 20,
//                 padding: "2px 8px",
//                 fontSize: 10,
//                 color: "#C9A24A",
//                 fontWeight: 600,
//               }}
//             >
//               {p.badge}
//             </span>
//           )}
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 4,
//               fontSize: 10,
//               fontWeight: 600,
//               color: p.inStock ? "#27AE60" : "#C0392B",
//             }}
//           >
//             <span
//               style={{
//                 width: 6,
//                 height: 6,
//                 borderRadius: "50%",
//                 background: p.inStock ? "#27AE60" : "#C0392B",
//                 flexShrink: 0,
//               }}
//             />
//             {p.inStock ? "متوفر" : "نفذ"}
//           </span>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <p
//             style={{
//               fontWeight: 700,
//               color: "#5A341A",
//               fontSize: 14,
//               fontFamily: "'Playfair Display',serif",
//             }}
//           >
//             {Number(p.price).toLocaleString()} EGP
//           </p>
//           <div style={{ display: "flex", gap: 6 }}>
//             <button
//               type="button"
//               className="db-btn db-btn-ghost"
//               onClick={() => onEdit(p)}
//               style={{ padding: "5px 10px", fontSize: 11 }}
//               aria-label="تعديل"
//             >
//               ✏️
//             </button>
//             <button
//               type="button"
//               className="db-btn db-btn-danger"
//               onClick={() => onDelete(p.id)}
//               style={{ padding: "5px 10px", fontSize: 11 }}
//               aria-label="حذف"
//             >
//               🗑️
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── DASHBOARD ────────────────────────────────────────────────────────────────
// export default function Dashboard() {
//   const [auth, setAuth] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [formMode, setFormMode] = useState(null); // null | "new" | "edit"
//   const [editProduct, setEditProduct] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [search, setSearch] = useState("");

//   const showToast = useCallback(
//     (msg, type = "success") => setToast({ msg, type, key: Date.now() }),
//     [],
//   );

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("products")
//       .select("*")
//       .order("id", { ascending: false });
//     if (error) {
//       showToast("فشل تحميل المنتجات: " + error.message, "error");
//     } else {
//       setProducts(data || []);
//     }
//     setLoading(false);
//   }, [showToast]);

//   useEffect(() => {
//     if (auth) fetchProducts();
//   }, [auth, fetchProducts]);

//   // Guard
//   if (!auth)
//     return (
//       <>
//         <DashboardStyles />
//         <LoginScreen onLogin={() => setAuth(true)} />
//       </>
//     );

//   // ── open form ──
//   const openNew = () => {
//     setEditProduct(null);
//     setFormMode("new");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   const openEdit = (p) => {
//     setEditProduct(p);
//     setFormMode("edit");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   const closeForm = () => {
//     setFormMode(null);
//     setEditProduct(null);
//   };

//   // ── save ──
//   const handleSave = async (form) => {
//     setSaving(true);
//     const payload = {
//       name: form.name || "",
//       nameAr: form.nameAr || "",
//       category: form.category || "",
//       price: Number(form.price),
//       description: form.description || "",
//       badge: form.badge || null,
//       inStock: !!form.inStock,
//       images: Array.isArray(form.images) ? form.images : [],
//       materials: Array.isArray(form.materials) ? form.materials : [],
//       details:
//         form.details &&
//         typeof form.details === "object" &&
//         !Array.isArray(form.details)
//           ? form.details
//           : {},
//     };

//     if (formMode === "edit" && editProduct?.id) {
//       const { error } = await supabase
//         .from("products")
//         .update(payload)
//         .eq("id", editProduct.id);
//       if (error) showToast("فشل التعديل: " + error.message, "error");
//       else {
//         showToast("تم تعديل المنتج ✓");
//         closeForm();
//         fetchProducts();
//       }
//     } else {
//       const { error } = await supabase.from("products").insert([payload]);
//       if (error) showToast("فشل الإضافة: " + error.message, "error");
//       else {
//         showToast("تم إضافة المنتج ✓");
//         closeForm();
//         fetchProducts();
//       }
//     }
//     setSaving(false);
//   };

//   // ── delete ──
//   const handleDelete = async (id) => {
//     const { error } = await supabase.from("products").delete().eq("id", id);
//     if (error) showToast("فشل الحذف: " + error.message, "error");
//     else {
//       showToast("تم حذف المنتج");
//       fetchProducts();
//     }
//     setDeleteId(null);
//   };

//   const filtered = products.filter((p) => {
//     const q = search.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       (p.nameAr || "").includes(q) ||
//       (p.name || "").toLowerCase().includes(q) ||
//       (p.category || "").includes(q)
//     );
//   });

//   const stats = {
//     total: products.length,
//     inStock: products.filter((p) => p.inStock).length,
//     categories: new Set(products.map((p) => p.category).filter(Boolean)).size,
//     avgPrice: products.length
//       ? Math.round(
//           products.reduce((s, p) => s + Number(p.price), 0) / products.length,
//         )
//       : 0,
//   };

//   return (
//     <>
//       <DashboardStyles />
//       <div
//         style={{ minHeight: "100vh", background: "#F7F3EE", direction: "rtl" }}
//       >
//         {/* ── HEADER ── */}
//         <div
//           style={{
//             background: "#2B1A12",
//             padding: "0 24px",
//             position: "sticky",
//             top: 0,
//             zIndex: 50,
//           }}
//         >
//           <div
//             className="header-wrap"
//             style={{
//               maxWidth: 1200,
//               margin: "0 auto",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               height: 64,
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//               <div
//                 style={{
//                   width: 34,
//                   height: 34,
//                   background: "#C9A24A",
//                   borderRadius: 9,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
//                   <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
//                   <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
//                 </svg>
//               </div>
//               <div>
//                 <p
//                   style={{
//                     color: "#C9A24A",
//                     fontSize: 10,
//                     letterSpacing: ".22em",
//                     textTransform: "uppercase",
//                     fontWeight: 700,
//                   }}
//                 >
//                   لوحة التحكم
//                 </p>
//                 <p
//                   style={{
//                     color: "#fff",
//                     fontSize: 14,
//                     fontWeight: 600,
//                     fontFamily: "'Playfair Display',serif",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   Al Ashry Furniture
//                 </p>
//               </div>
//             </div>
//             <div className="header-actions" style={{ display: "flex", gap: 8 }}>
//               <button
//                 type="button"
//                 className="db-btn db-btn-gold"
//                 onClick={openNew}
//                 style={{ fontSize: 12 }}
//               >
//                 <svg
//                   width="13"
//                   height="13"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path d="M12 5v14M5 12h14" />
//                 </svg>
//                 منتج جديد
//               </button>
//               <button
//                 type="button"
//                 className="db-btn db-btn-ghost"
//                 onClick={() => setAuth(false)}
//                 style={{
//                   fontSize: 12,
//                   color: "#EFE8DD",
//                   borderColor: "rgba(239,232,221,.25)",
//                 }}
//               >
//                 خروج
//               </button>
//             </div>
//           </div>
//         </div>

//         <div
//           style={{
//             maxWidth: 1200,
//             margin: "0 auto",
//             padding: "24px 16px 60px",
//           }}
//         >
//           {/* ── STATS ── */}
//           <div className="stats-grid" style={{ marginBottom: 24 }}>
//             {[
//               {
//                 label: "إجمالي المنتجات",
//                 value: stats.total,
//                 icon: "📦",
//                 color: "#5A341A",
//               },
//               {
//                 label: "متوفر في المخزن",
//                 value: stats.inStock,
//                 icon: "✅",
//                 color: "#27AE60",
//               },
//               {
//                 label: "الفئات",
//                 value: stats.categories,
//                 icon: "🏷️",
//                 color: "#C9A24A",
//               },
//               {
//                 label: "متوسط السعر",
//                 value: `${stats.avgPrice.toLocaleString()} EGP`,
//                 icon: "💰",
//                 color: "#2980B9",
//               },
//             ].map((s, i) => (
//               <div
//                 key={i}
//                 className="fade-in"
//                 style={{
//                   background: "#fff",
//                   border: "1px solid #E8E0D5",
//                   borderRadius: 12,
//                   padding: "16px 18px",
//                   animationDelay: `${i * 55}ms`,
//                 }}
//               >
//                 <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
//                 <p
//                   style={{
//                     fontSize: 20,
//                     fontWeight: 800,
//                     color: s.color,
//                     fontFamily: "'Playfair Display',serif",
//                     lineHeight: 1,
//                   }}
//                 >
//                   {s.value}
//                 </p>
//                 <p style={{ fontSize: 11, color: "#9A8A7A", marginTop: 4 }}>
//                   {s.label}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* ── FORM ── */}
//           {formMode && (
//             <ProductForm
//               key={formMode === "edit" ? `edit-${editProduct?.id}` : "new"}
//               initial={formMode === "edit" ? editProduct : null}
//               onSave={handleSave}
//               onCancel={closeForm}
//               saving={saving}
//             />
//           )}

//           {/* ── TABLE ── */}
//           <div
//             style={{
//               background: "#fff",
//               border: "1px solid #E8E0D5",
//               borderRadius: 14,
//               overflow: "hidden",
//             }}
//           >
//             {/* top bar */}
//             <div
//               className="table-topbar"
//               style={{
//                 padding: "16px 20px",
//                 borderBottom: "1px solid #E8E0D5",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: 12,
//                 flexWrap: "wrap",
//               }}
//             >
//               <h2
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 700,
//                   color: "#2B1A12",
//                   fontFamily: "'Playfair Display',serif",
//                 }}
//               >
//                 المنتجات {!loading && `(${filtered.length})`}
//               </h2>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   border: "1.5px solid #E8E0D5",
//                   borderRadius: 8,
//                   background: "#FDFAF6",
//                   overflow: "hidden",
//                   flex: 1,
//                   maxWidth: 280,
//                 }}
//               >
//                 <svg
//                   style={{ margin: "0 10px", color: "#9A8A7A", flexShrink: 0 }}
//                   width="13"
//                   height="13"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="11" cy="11" r="8" />
//                   <path d="m21 21-4.35-4.35" />
//                 </svg>
//                 <input
//                   id="search-products"
//                   name="search-products"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="بحث بالاسم أو الفئة..."
//                   style={{
//                     flex: 1,
//                     border: "none",
//                     outline: "none",
//                     padding: "9px 4px",
//                     fontSize: 13,
//                     background: "transparent",
//                     color: "#2B1A12",
//                     direction: "rtl",
//                     fontFamily: "'Tajawal',sans-serif",
//                   }}
//                 />
//                 {search && (
//                   <button
//                     type="button"
//                     onClick={() => setSearch("")}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       color: "#9A8A7A",
//                       padding: "0 10px",
//                       fontSize: 16,
//                     }}
//                   >
//                     ×
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Desktop table */}
//             <div className="desktop-table" style={{ overflowX: "auto" }}>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   fontSize: 13,
//                 }}
//               >
//                 <thead>
//                   <tr style={{ background: "#F7F3EE" }}>
//                     {[
//                       "#",
//                       "الصورة",
//                       "الاسم",
//                       "الفئة",
//                       "السعر",
//                       "المخزن",
//                       "الشارة",
//                       "إجراءات",
//                     ].map((h) => (
//                       <th
//                         key={h}
//                         style={{
//                           padding: "11px 14px",
//                           textAlign: "right",
//                           fontSize: 10,
//                           fontWeight: 700,
//                           color: "#7A5A3A",
//                           letterSpacing: ".1em",
//                           textTransform: "uppercase",
//                           borderBottom: "1px solid #E8E0D5",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading &&
//                     Array(5)
//                       .fill(0)
//                       .map((_, i) => (
//                         <tr key={i}>
//                           {Array(8)
//                             .fill(0)
//                             .map((_, j) => (
//                               <td key={j} style={{ padding: "14px" }}>
//                                 <div
//                                   className="shimmer"
//                                   style={{
//                                     height: 15,
//                                     width: j === 1 ? 48 : "75%",
//                                   }}
//                                 />
//                               </td>
//                             ))}
//                         </tr>
//                       ))}
//                   {!loading &&
//                     filtered.map((p, i) => {
//                       const imgs = Array.isArray(p.images) ? p.images : [];
//                       return (
//                         <tr
//                           key={p.id}
//                           className="product-row fade-in"
//                           style={{
//                             borderBottom: "1px solid #F0EBE3",
//                             animationDelay: `${i * 35}ms`,
//                           }}
//                         >
//                           <td
//                             style={{
//                               padding: "11px 14px",
//                               color: "#9A8A7A",
//                               fontSize: 10,
//                             }}
//                           >
//                             #{p.id}
//                           </td>
//                           <td style={{ padding: "11px 14px" }}>
//                             {imgs[0] ? (
//                               <img
//                                 src={imgs[0]}
//                                 alt=""
//                                 style={{
//                                   width: 50,
//                                   height: 42,
//                                   objectFit: "cover",
//                                   borderRadius: 7,
//                                   border: "1px solid #E8E0D5",
//                                   display: "block",
//                                 }}
//                                 loading="lazy"
//                               />
//                             ) : (
//                               <div
//                                 style={{
//                                   width: 50,
//                                   height: 42,
//                                   background: "#F5F1EA",
//                                   borderRadius: 7,
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                   fontSize: 20,
//                                 }}
//                               >
//                                 🪑
//                               </div>
//                             )}
//                           </td>
//                           <td style={{ padding: "11px 14px", maxWidth: 180 }}>
//                             <p
//                               style={{
//                                 fontWeight: 700,
//                                 color: "#2B1A12",
//                                 marginBottom: 2,
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               {p.nameAr || p.name || "—"}
//                             </p>
//                             {p.nameAr && p.name && (
//                               <p
//                                 style={{
//                                   fontSize: 10,
//                                   color: "#9A8A7A",
//                                   overflow: "hidden",
//                                   textOverflow: "ellipsis",
//                                   whiteSpace: "nowrap",
//                                 }}
//                               >
//                                 {p.name}
//                               </p>
//                             )}
//                           </td>
//                           <td style={{ padding: "11px 14px" }}>
//                             <span
//                               style={{
//                                 background: "#F5F1EA",
//                                 border: "1px solid #E8E0D5",
//                                 borderRadius: 20,
//                                 padding: "3px 10px",
//                                 fontSize: 10,
//                                 color: "#5A341A",
//                                 fontWeight: 600,
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               {p.category || "—"}
//                             </span>
//                           </td>
//                           <td
//                             style={{
//                               padding: "11px 14px",
//                               fontWeight: 700,
//                               color: "#5A341A",
//                               fontFamily: "'Playfair Display',serif",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             {Number(p.price).toLocaleString()} EGP
//                           </td>
//                           <td style={{ padding: "11px 14px" }}>
//                             <span
//                               style={{
//                                 display: "inline-flex",
//                                 alignItems: "center",
//                                 gap: 5,
//                                 fontSize: 10,
//                                 fontWeight: 700,
//                                 color: p.inStock ? "#27AE60" : "#C0392B",
//                               }}
//                             >
//                               <span
//                                 style={{
//                                   width: 7,
//                                   height: 7,
//                                   borderRadius: "50%",
//                                   background: p.inStock ? "#27AE60" : "#C0392B",
//                                   flexShrink: 0,
//                                 }}
//                               />
//                               {p.inStock ? "متوفر" : "نفذ"}
//                             </span>
//                           </td>
//                           <td style={{ padding: "11px 14px" }}>
//                             {p.badge ? (
//                               <span
//                                 style={{
//                                   background: "#FFF8E8",
//                                   border: "1px solid #C9A24A44",
//                                   borderRadius: 20,
//                                   padding: "3px 10px",
//                                   fontSize: 10,
//                                   color: "#C9A24A",
//                                   fontWeight: 600,
//                                 }}
//                               >
//                                 {p.badge}
//                               </span>
//                             ) : (
//                               <span style={{ color: "#C0C0C0", fontSize: 10 }}>
//                                 —
//                               </span>
//                             )}
//                           </td>
//                           <td style={{ padding: "11px 14px" }}>
//                             <div style={{ display: "flex", gap: 6 }}>
//                               <button
//                                 type="button"
//                                 className="db-btn db-btn-ghost"
//                                 onClick={() => openEdit(p)}
//                                 style={{ padding: "6px 11px", fontSize: 11 }}
//                               >
//                                 ✏️ تعديل
//                               </button>
//                               <button
//                                 type="button"
//                                 className="db-btn db-btn-danger"
//                                 onClick={() => setDeleteId(p.id)}
//                                 style={{ padding: "6px 11px", fontSize: 11 }}
//                               >
//                                 🗑️ حذف
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   {!loading && filtered.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={8}
//                         style={{
//                           padding: "64px 16px",
//                           textAlign: "center",
//                           color: "#9A8A7A",
//                         }}
//                       >
//                         <div style={{ fontSize: 38, marginBottom: 10 }}>📦</div>
//                         <p
//                           style={{
//                             fontSize: 14,
//                             fontWeight: 600,
//                             color: "#5A341A",
//                             marginBottom: 4,
//                           }}
//                         >
//                           {search ? "لا توجد نتائج" : "لا توجد منتجات بعد"}
//                         </p>
//                         {!search && (
//                           <button
//                             type="button"
//                             className="db-btn db-btn-gold"
//                             onClick={openNew}
//                             style={{ marginTop: 12, fontSize: 12 }}
//                           >
//                             ➕ أضف أول منتج
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile cards */}
//             <div className="mobile-cards">
//               {loading &&
//                 Array(3)
//                   .fill(0)
//                   .map((_, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         background: "#fff",
//                         border: "1px solid #E8E0D5",
//                         borderRadius: 12,
//                         padding: 14,
//                         display: "flex",
//                         gap: 12,
//                       }}
//                     >
//                       <div
//                         className="shimmer"
//                         style={{
//                           width: 64,
//                           height: 64,
//                           borderRadius: 8,
//                           flexShrink: 0,
//                         }}
//                       />
//                       <div style={{ flex: 1 }}>
//                         <div
//                           className="shimmer"
//                           style={{ height: 13, width: "55%", marginBottom: 8 }}
//                         />
//                         <div
//                           className="shimmer"
//                           style={{ height: 11, width: "35%", marginBottom: 8 }}
//                         />
//                         <div
//                           className="shimmer"
//                           style={{ height: 11, width: "45%" }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//               {!loading &&
//                 filtered.map((p) => (
//                   <MobileCard
//                     key={p.id}
//                     p={p}
//                     onEdit={openEdit}
//                     onDelete={(id) => setDeleteId(id)}
//                   />
//                 ))}
//               {!loading && filtered.length === 0 && (
//                 <div
//                   style={{
//                     textAlign: "center",
//                     padding: "48px 16px",
//                     color: "#9A8A7A",
//                   }}
//                 >
//                   <div style={{ fontSize: 36, marginBottom: 10 }}>📦</div>
//                   <p
//                     style={{ fontSize: 14, fontWeight: 600, color: "#5A341A" }}
//                   >
//                     {search ? "لا توجد نتائج" : "لا توجد منتجات"}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── DELETE MODAL ── */}
//         {deleteId && (
//           <div
//             role="dialog"
//             aria-modal="true"
//             style={{
//               position: "fixed",
//               inset: 0,
//               background: "rgba(0,0,0,.48)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               zIndex: 1000,
//               backdropFilter: "blur(4px)",
//               padding: 20,
//             }}
//             onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}
//           >
//             <div
//               className="fade-in"
//               style={{
//                 background: "#fff",
//                 borderRadius: 16,
//                 padding: 32,
//                 maxWidth: 360,
//                 width: "100%",
//                 textAlign: "center",
//               }}
//             >
//               <div style={{ fontSize: 42, marginBottom: 14 }}>🗑️</div>
//               <h3
//                 style={{
//                   fontSize: 17,
//                   fontWeight: 700,
//                   color: "#2B1A12",
//                   marginBottom: 8,
//                   fontFamily: "'Playfair Display',serif",
//                 }}
//               >
//                 حذف المنتج؟
//               </h3>
//               <p style={{ fontSize: 13, color: "#7A5A3A", marginBottom: 24 }}>
//                 هذا الإجراء لا يمكن التراجع عنه.
//               </p>
//               <div
//                 style={{ display: "flex", gap: 10, justifyContent: "center" }}
//               >
//                 <button
//                   type="button"
//                   className="db-btn db-btn-ghost"
//                   onClick={() => setDeleteId(null)}
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   type="button"
//                   className="db-btn"
//                   onClick={() => handleDelete(deleteId)}
//                   style={{
//                     background: "#C0392B",
//                     color: "#fff",
//                     padding: "10px 24px",
//                   }}
//                 >
//                   نعم، احذف
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── TOAST ── */}
//         {toast && (
//           <Toast
//             key={toast.key}
//             msg={toast.msg}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         )}
//       </div>
//     </>
//   );
// }
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "../supabaseClient.js";
import AnalyticsSection from "./Analyticssection.jsx";
import {
  ShieldCheck,
  Plus,
  Search,
  RefreshCw,
  Briefcase,
  LogOut,
  Package,
  ClipboardList,
  BarChart2,
  Trash2,
  ImagePlus,
  Sofa,
  Clock,
  CheckCircle2,
  Wallet,
  Tag,
  Pencil,
  Eye,
  XCircle,
  X,
} from "lucide-react";

const ADMIN_PASSWORD = "ashry2025";

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const DashboardStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Tajawal:wght@300;400;500;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Tajawal', sans-serif; }

    @keyframes fadeIn  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes spin    { to{transform:rotate(360deg)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }

    .fade-in   { animation: fadeIn  0.3s ease both; }
    .slide-in  { animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1) both; }
    .spin-anim { animation: spin    0.8s linear infinite; }
    .shimmer   { background:linear-gradient(90deg,#f0f0f0 25%,#f8f8f8 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:6px; }

    .db-input {
      width:100%; padding:10px 14px; border:1.5px solid #E8E0D5; border-radius:8px;
      font-size:13px; font-family:'Tajawal',sans-serif; color:#2B1A12;
      background:#FDFAF6; outline:none; transition:border-color .2s,box-shadow .2s; direction:rtl;
    }
    .db-input:focus { border-color:#C9A24A; box-shadow:0 0 0 3px rgba(201,162,74,.12); }
    .db-input::placeholder { color:#B5A090; }

    .db-btn {
      padding:10px 20px; border:none; border-radius:8px; cursor:pointer;
      font-family:'Tajawal',sans-serif; font-size:13px; font-weight:600;
      transition:all .2s; display:inline-flex; align-items:center; gap:7px; white-space:nowrap;
    }
    .db-btn-primary { background:#5A341A; color:#fff; }
    .db-btn-primary:hover:not(:disabled) { background:#7A4A28; transform:translateY(-1px); box-shadow:0 4px 16px rgba(90,52,26,.25); }
    .db-btn-gold { background:#C9A24A; color:#fff; }
    .db-btn-gold:hover:not(:disabled) { background:#B8912A; transform:translateY(-1px); }
    .db-btn-danger { background:#fff; color:#C0392B; border:1.5px solid #FADBD8; }
    .db-btn-danger:hover:not(:disabled) { background:#FEF0EE; }
    .db-btn-ghost { background:transparent; color:#7A5A3A; border:1.5px solid #E8E0D5; }
    .db-btn-ghost:hover:not(:disabled) { background:#F5F1EA; }
    .db-btn:disabled { opacity:.5; cursor:not-allowed !important; transform:none !important; }

    .tag-chip { display:inline-flex; align-items:center; gap:5px; background:#F5F1EA; border:1px solid #E8E0D5; border-radius:20px; padding:3px 10px 3px 6px; font-size:11px; color:#5A341A; }
    .tag-chip .chip-remove { background:none; border:none; cursor:pointer; color:#999; font-size:14px; line-height:1; padding:0; display:flex; align-items:center; }
    .tag-chip .chip-remove:hover { color:#C0392B; }

    .upload-zone { border:2px dashed #E8E0D5; border-radius:10px; padding:24px 20px; text-align:center; cursor:pointer; transition:all .2s; background:#FDFAF6; user-select:none; }
    .upload-zone:hover,.upload-zone.drag-over { border-color:#C9A24A; background:#FFF8EE; }

    .img-thumb { position:relative; width:76px; height:76px; border-radius:8px; overflow:hidden; border:1px solid #E8E0D5; flex-shrink:0; }
    .img-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
    .img-thumb .remove-btn { position:absolute; top:3px; right:3px; width:20px; height:20px; background:rgba(192,57,43,.88); color:#fff; border:none; border-radius:50%; cursor:pointer; font-size:13px; display:flex; align-items:center; justify-content:center; line-height:1; }

    .product-row,.order-row { transition:background .15s; }
    .product-row:hover,.order-row:hover { background:#FDFAF6; }

    .toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); padding:12px 24px; border-radius:10px; font-size:13px; font-weight:600; z-index:9999; animation:fadeIn .3s ease; white-space:nowrap; pointer-events:none; }
    .toast-success { background:#27AE60; color:#fff; }
    .toast-error   { background:#C0392B; color:#fff; }
    .toast-info    { background:#2980B9; color:#fff; }

    .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
    .form-grid  { display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:16px; }
    .desktop-table { display:block; }
    .mobile-cards  { display:none; }

    .tab-nav-btn { padding:10px 20px; border:none; border-bottom:2px solid transparent; background:none; cursor:pointer; font-family:'Tajawal',sans-serif; font-size:13px; font-weight:600; color:#9A8A7A; transition:color .2s,border-color .2s; white-space:nowrap; display:inline-flex; align-items:center; gap:6px; }
    .tab-nav-btn.active { color:#5A341A; border-bottom-color:#C9A24A; }

    .status-badge { display:inline-flex; align-items:center; gap:5px; border-radius:20px; padding:3px 10px; font-size:10px; font-weight:700; white-space:nowrap; }

    @media (max-width:900px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }
    @media (max-width:640px) {
      .stats-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
      .form-grid  { grid-template-columns:1fr; }
      .desktop-table { display:none !important; }
      .mobile-cards  { display:flex !important; flex-direction:column; gap:10px; padding:12px; }
      .header-wrap { flex-wrap:wrap; gap:10px; height:auto !important; padding:14px 16px !important; }
      .header-actions { width:100%; display:flex; gap:8px; }
      .header-actions .db-btn { flex:1; justify-content:center; }
      .table-topbar { flex-direction:column !important; align-items:stretch !important; }
      .form-actions { flex-direction:column; }
      .form-actions .db-btn { width:100%; justify-content:center; }
    }

    ::-webkit-scrollbar { width:5px; height:5px; }
    ::-webkit-scrollbar-track { background:#F5F1EA; }
    ::-webkit-scrollbar-thumb { background:#C9A24A55; border-radius:3px; }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────
const Spinner = ({ size = 16, color = "#fff" }) => (
  <span
    className="spin-anim"
    style={{
      display: "inline-block",
      width: size,
      height: size,
      border: `2px solid ${color}`,
      borderTopColor: "transparent",
      borderRadius: "50%",
      flexShrink: 0,
    }}
  />
);

// Placeholder icon for products with no image
const ProductPlaceholder = ({ size = 20 }) => (
  <Sofa size={size} color="#C9A24A" strokeWidth={1.5} />
);

function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);
  return <div className={`toast toast-${type}`}>{msg}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Status config
// ─────────────────────────────────────────────────────────────────────────────
const ORDER_STATUSES = {
  pending: {
    label: "قيد الانتظار",
    bg: "#FFF8E8",
    color: "#C9A24A",
    dot: "#C9A24A",
  },
  confirmed: { label: "مؤكد", bg: "#EBF5FB", color: "#2980B9", dot: "#2980B9" },
  delivered: {
    label: "تم التوصيل",
    bg: "#EAFAF1",
    color: "#27AE60",
    dot: "#27AE60",
  },
  cancelled: { label: "ملغي", bg: "#FDECEA", color: "#C0392B", dot: "#C0392B" },
};

function StatusBadge({ status }) {
  const cfg = ORDER_STATUSES[status] || ORDER_STATUSES.pending;
  return (
    <span
      className="status-badge"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: cfg.dot,
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Delete Confirm Modal — reused for both products & orders
// ─────────────────────────────────────────────────────────────────────────────
function DeleteModal({
  title = "حذف؟",
  message = "هذا الإجراء لا يمكن التراجع عنه.",
  onConfirm,
  onCancel,
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.48)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="fade-in"
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          maxWidth: 360,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            background: "#FEF0EE",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <Trash2 size={24} color="#C0392B" strokeWidth={1.8} />
        </div>
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#2B1A12",
            marginBottom: 8,
            fontFamily: "'Playfair Display',serif",
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: 13, color: "#7A5A3A", marginBottom: 24 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            type="button"
            className="db-btn db-btn-ghost"
            onClick={onCancel}
          >
            إلغاء
          </button>
          <button
            type="button"
            className="db-btn"
            onClick={onConfirm}
            style={{
              background: "#C0392B",
              color: "#fff",
              padding: "10px 24px",
            }}
          >
            نعم، احذف
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Login Screen
// ─────────────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!pass.trim()) {
      setError("أدخل كلمة المرور");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (pass === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("كلمة المرور غلط");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F7F3EE",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "clamp(24px,6vw,44px)",
          borderRadius: 18,
          border: "1px solid #E8E0D5",
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
          boxShadow: "0 10px 48px rgba(90,52,26,.12)",
          animation: shaking ? "shake .4s ease" : "fadeIn .35s ease both",
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            background: "#2B1A12",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
          }}
        >
          <ShieldCheck size={26} color="#C9A24A" />
        </div>
        <p
          style={{
            fontSize: 10,
            letterSpacing: ".28em",
            textTransform: "uppercase",
            color: "#C9A24A",
            marginBottom: 5,
            fontWeight: 700,
          }}
        >
          لوحة التحكم
        </p>
        <h1
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: "#2B1A12",
            marginBottom: 5,
            fontFamily: "'Playfair Display',serif",
            fontStyle: "italic",
          }}
        >
          Al Ashry Furniture
        </h1>
        <p style={{ fontSize: 12, color: "#9A8A7A", marginBottom: 28 }}>
          أدخل كلمة المرور للمتابعة
        </p>
        <input
          id="admin-pass"
          name="admin-pass"
          type="password"
          autoComplete="current-password"
          placeholder="كلمة المرور"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: `1.5px solid ${error ? "#C0392B" : "#E8E0D5"}`,
            borderRadius: 10,
            marginBottom: 6,
            fontSize: 14,
            outline: "none",
            direction: "rtl",
            fontFamily: "'Tajawal',sans-serif",
            background: "#FDFAF6",
            color: "#2B1A12",
            transition: "border-color .2s",
          }}
        />
        {error && (
          <p
            style={{
              fontSize: 12,
              color: "#C0392B",
              marginBottom: 10,
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              gap: 5,
              justifyContent: "flex-end",
            }}
          >
            <XCircle size={13} />
            {error}
          </p>
        )}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: "#5A341A",
            color: "#fff",
            padding: "13px",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700,
            fontFamily: "'Tajawal',sans-serif",
            marginTop: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) =>
            !loading && (e.currentTarget.style.background = "#7A4A28")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "#5A341A")}
        >
          {loading && <Spinner />}
          {loading ? "جاري التحقق..." : "دخول"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Image Uploader
// ─────────────────────────────────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file.type.startsWith("image/")) return null;
    const ext = file.name.split(".").pop().toLowerCase();
    const safeName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("products")
      .upload(safeName, file, { cacheControl: "3600", upsert: false });
    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }
    const { data } = supabase.storage.from("products").getPublicUrl(safeName);
    return data.publicUrl;
  };

  const handleFiles = async (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!valid.length) return;
    setUploading(true);
    const urls = await Promise.all(valid.map(uploadFile));
    onChange([...images, ...urls.filter(Boolean)]);
    setUploading(false);
  };

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "#5A341A",
          marginBottom: 8,
          direction: "rtl",
        }}
      >
        صور المنتج
      </label>
      {(images.length > 0 || uploading) && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {images.map((url, i) => (
            <div key={`${url}-${i}`} className="img-thumb">
              <img src={url} alt={`صورة ${i + 1}`} loading="lazy" />
              <button
                className="remove-btn"
                type="button"
                aria-label="حذف الصورة"
                onClick={() => onChange(images.filter((_, idx) => idx !== i))}
              >
                <X size={11} strokeWidth={3} />
              </button>
            </div>
          ))}
          {uploading && (
            <div
              className="img-thumb"
              style={{
                background: "#F5F1EA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner size={20} color="#C9A24A" />
            </div>
          )}
        </div>
      )}
      <div
        role="button"
        tabIndex={0}
        className={`upload-zone${dragOver ? " drag-over" : ""}`}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) =>
          e.key === "Enter" && !uploading && inputRef.current?.click()
        }
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: "#C9A24A",
            }}
          >
            <Spinner size={18} color="#C9A24A" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>جاري الرفع...</span>
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: 8,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ImagePlus size={28} color="#C9A24A" strokeWidth={1.5} />
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#5A341A",
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              اضغط لرفع صورة أو اسحبها هنا
            </p>
            <p style={{ fontSize: 11, color: "#9A8A7A" }}>
              PNG · JPG · WEBP — يمكن رفع أكثر من صورة
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tag Input
// ─────────────────────────────────────────────────────────────────────────────
function TagInput({ id, label, values, onChange, placeholder }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setInput("");
  };
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "#5A341A",
          marginBottom: 6,
          direction: "rtl",
        }}
      >
        {label}
      </label>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          id={id}
          name={id}
          className="db-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="db-btn db-btn-ghost"
          onClick={add}
          style={{ flexShrink: 0, padding: "10px 16px" }}
          aria-label="إضافة"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>
      {values.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {values.map((v, i) => (
            <span key={`${v}-${i}`} className="tag-chip">
              <button
                type="button"
                className="chip-remove"
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}
                aria-label={`حذف ${v}`}
              >
                <X size={11} strokeWidth={2.5} />
              </button>
              {v}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Product Form
// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: "",
  nameAr: "",
  category: "",
  price: "",
  description: "",
  badge: "",
  inStock: true,
  images: [],
  materials: [],
  details: {},
};

function ProductForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          ...EMPTY_FORM,
          ...initial,
          images: Array.isArray(initial.images) ? initial.images : [],
          materials: Array.isArray(initial.materials) ? initial.materials : [],
        }
      : { ...EMPTY_FORM },
  );
  const set = useCallback((k, v) => setForm((f) => ({ ...f, [k]: v })), []);

  const handleSubmit = () => {
    if (!form.nameAr && !form.name) {
      alert("أدخل اسم المنتج");
      return;
    }
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      alert("أدخل سعراً صحيحاً");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="slide-in"
      style={{
        background: "#fff",
        border: "1px solid #E8E0D5",
        borderRadius: 14,
        padding: "clamp(16px,4vw,28px)",
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#2B1A12",
            fontFamily: "'Playfair Display',serif",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {initial?.id ? (
            <>
              <Pencil size={16} color="#C9A24A" /> تعديل المنتج
            </>
          ) : (
            <>
              <Plus size={16} color="#C9A24A" strokeWidth={2.5} /> إضافة منتج
              جديد
            </>
          )}
        </h2>
        <button
          type="button"
          className="db-btn db-btn-ghost"
          onClick={onCancel}
          style={{ fontSize: 12 }}
        >
          <X size={13} /> إغلاق
        </button>
      </div>

      <div className="form-grid">
        {[
          {
            id: "f-nameAr",
            name: "nameAr",
            label: "الاسم بالعربي *",
            placeholder: "كرسي فاخر",
            dir: "rtl",
          },
          {
            id: "f-name",
            name: "name",
            label: "الاسم بالإنجليزي",
            placeholder: "Luxury Chair",
            dir: "ltr",
          },
          {
            id: "f-cat",
            name: "category",
            label: "الفئة",
            placeholder: "كراسي",
            dir: "rtl",
          },
        ].map(({ id, name, label, placeholder, dir }) => (
          <div key={id}>
            <label
              htmlFor={id}
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#5A341A",
                marginBottom: 6,
                direction: "rtl",
              }}
            >
              {label}
            </label>
            <input
              id={id}
              name={name}
              className="db-input"
              value={form[name]}
              onChange={(e) => set(name, e.target.value)}
              placeholder={placeholder}
              style={{ direction: dir }}
              autoComplete="off"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="f-price"
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              marginBottom: 6,
              direction: "rtl",
            }}
          >
            السعر (EGP) *
          </label>
          <input
            id="f-price"
            name="price"
            type="number"
            min="1"
            className="db-input"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="5000"
            style={{ direction: "ltr" }}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="f-badge"
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              marginBottom: 6,
              direction: "rtl",
            }}
          >
            الشارة
          </label>
          <select
            id="f-badge"
            name="badge"
            className="db-input"
            value={form.badge}
            onChange={(e) => set("badge", e.target.value)}
          >
            <option value="">بدون شارة</option>
            {["الأفضل", "جديد", "محدود", "مميز", "مخصص"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingTop: 20,
          }}
        >
          <label
            htmlFor="f-instock"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              cursor: "pointer",
            }}
          >
            متوفر في المخزن؟
          </label>
          <div
            id="f-instock"
            role="switch"
            aria-checked={form.inStock}
            tabIndex={0}
            onClick={() => set("inStock", !form.inStock)}
            onKeyDown={(e) =>
              e.key === " " &&
              (e.preventDefault(), set("inStock", !form.inStock))
            }
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              background: form.inStock ? "#27AE60" : "#D0C8BE",
              cursor: "pointer",
              position: "relative",
              transition: "background .2s",
              flexShrink: 0,
              outline: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: form.inStock ? 23 : 3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                transition: "left .2s",
                boxShadow: "0 1px 4px rgba(0,0,0,.18)",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 11,
              color: form.inStock ? "#27AE60" : "#C0392B",
              fontWeight: 600,
            }}
          >
            {form.inStock ? "متوفر" : "غير متوفر"}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label
          htmlFor="f-desc"
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: "#5A341A",
            marginBottom: 6,
            direction: "rtl",
          }}
        >
          الوصف
        </label>
        <textarea
          id="f-desc"
          name="description"
          className="db-input"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="وصف المنتج..."
          rows={3}
          style={{ resize: "vertical" }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        <ImageUploader
          images={form.images}
          onChange={(v) => set("images", v)}
        />
        <TagInput
          id="f-materials"
          label="المواد"
          values={form.materials}
          onChange={(v) => set("materials", v)}
          placeholder="مثال: خشب زان"
        />
      </div>

      <div
        className="form-actions"
        style={{
          display: "flex",
          gap: 10,
          marginTop: 24,
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          className="db-btn db-btn-ghost"
          onClick={onCancel}
          disabled={saving}
        >
          إلغاء
        </button>
        <button
          type="button"
          className="db-btn db-btn-primary"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving && <Spinner />}
          {saving
            ? "جاري الحفظ..."
            : initial?.id
              ? "حفظ التعديلات"
              : "إضافة المنتج"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Product Card
// ─────────────────────────────────────────────────────────────────────────────
function MobileProductCard({ p, onEdit, onDelete }) {
  const imgs = Array.isArray(p.images) ? p.images : [];
  return (
    <div
      className="fade-in"
      style={{
        background: "#fff",
        border: "1px solid #E8E0D5",
        borderRadius: 12,
        padding: 14,
        display: "flex",
        gap: 12,
      }}
    >
      {imgs[0] ? (
        <img
          src={imgs[0]}
          alt={p.nameAr || p.name}
          style={{
            width: 64,
            height: 64,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #E8E0D5",
            flexShrink: 0,
          }}
          loading="lazy"
        />
      ) : (
        <div
          style={{
            width: 64,
            height: 64,
            background: "#F5F1EA",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ProductPlaceholder size={26} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <p
            style={{
              fontWeight: 700,
              color: "#2B1A12",
              fontSize: 14,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {p.nameAr || p.name || "—"}
          </p>
          <span style={{ fontSize: 9, color: "#9A8A7A", flexShrink: 0 }}>
            #{p.id}
          </span>
        </div>
        <div
          style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}
        >
          {p.category && (
            <span
              style={{
                background: "#F5F1EA",
                border: "1px solid #E8E0D5",
                borderRadius: 20,
                padding: "2px 8px",
                fontSize: 10,
                color: "#5A341A",
                fontWeight: 600,
              }}
            >
              {p.category}
            </span>
          )}
          {p.badge && (
            <span
              style={{
                background: "#FFF8E8",
                border: "1px solid #C9A24A44",
                borderRadius: 20,
                padding: "2px 8px",
                fontSize: 10,
                color: "#C9A24A",
                fontWeight: 600,
              }}
            >
              {p.badge}
            </span>
          )}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              fontWeight: 600,
              color: p.inStock ? "#27AE60" : "#C0392B",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: p.inStock ? "#27AE60" : "#C0392B",
                flexShrink: 0,
              }}
            />
            {p.inStock ? "متوفر" : "نفذ"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              color: "#5A341A",
              fontSize: 14,
              fontFamily: "'Playfair Display',serif",
            }}
          >
            {Number(p.price).toLocaleString()} EGP
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              type="button"
              className="db-btn db-btn-ghost"
              onClick={() => onEdit(p)}
              style={{ padding: "5px 10px", fontSize: 11 }}
            >
              <Pencil size={13} />
            </button>
            <button
              type="button"
              className="db-btn db-btn-danger"
              onClick={() => onDelete(p.id)}
              style={{ padding: "5px 10px", fontSize: 11 }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Order Detail Modal
// ─────────────────────────────────────────────────────────────────────────────
function OrderDetailModal({ order, onClose, onStatusChange, saving }) {
  if (!order) return null;
  const date = new Date(order.created_at);
  const dateStr = date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.48)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="fade-in"
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "clamp(20px,5vw,32px)",
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#C9A24A",
                marginBottom: 3,
              }}
            >
              تفاصيل الطلب
            </p>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#2B1A12",
                fontFamily: "'Playfair Display',serif",
              }}
            >
              طلب #{order.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9A8A7A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Product info */}
        <div
          style={{
            display: "flex",
            gap: 14,
            padding: 16,
            background: "#F7F3EE",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          {order.product_image ? (
            <img
              src={order.product_image}
              alt={order.product_name_ar || order.product_name}
              style={{
                width: 72,
                height: 72,
                objectFit: "cover",
                borderRadius: 8,
                flexShrink: 0,
                border: "1px solid #E8E0D5",
              }}
            />
          ) : (
            <div
              style={{
                width: 72,
                height: 72,
                background: "#EFE8DD",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ProductPlaceholder size={30} />
            </div>
          )}
          <div style={{ flex: 1, direction: "rtl" }}>
            <p
              style={{
                fontWeight: 700,
                color: "#2B1A12",
                fontSize: 15,
                marginBottom: 3,
                fontFamily: "'Playfair Display',serif",
              }}
            >
              {order.product_name_ar || order.product_name}
            </p>
            {order.product_name &&
              order.product_name_ar &&
              order.product_name !== order.product_name_ar && (
                <p style={{ fontSize: 11, color: "#9A8A7A", marginBottom: 5 }}>
                  {order.product_name}
                </p>
              )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {order.category && (
                <span
                  style={{
                    background: "#fff",
                    border: "1px solid #E8E0D5",
                    borderRadius: 20,
                    padding: "2px 8px",
                    fontSize: 10,
                    color: "#5A341A",
                    fontWeight: 600,
                  }}
                >
                  {order.category}
                </span>
              )}
              <span
                style={{
                  background: "#fff",
                  border: "1px solid #E8E0D5",
                  borderRadius: 20,
                  padding: "2px 8px",
                  fontSize: 10,
                  color: "#7A5A3A",
                }}
              >
                رقم المنتج: {order.product_id}
              </span>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            { label: "الكمية", value: `${order.quantity} قطعة` },
            {
              label: "سعر الوحدة",
              value: `${Number(order.unit_price).toLocaleString()} EGP`,
            },
            {
              label: "الإجمالي",
              value: `${Number(order.total_price).toLocaleString()} EGP`,
              highlight: true,
            },
            { label: "تاريخ الطلب", value: dateStr },
            { label: "وقت الطلب", value: timeStr },
            { label: "رقم الطلب", value: `#${order.id}` },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              style={{
                background: "#F7F3EE",
                borderRadius: 8,
                padding: "12px 14px",
                direction: "rtl",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "#9A8A7A",
                  marginBottom: 4,
                  letterSpacing: ".1em",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: highlight ? "#5A341A" : "#2B1A12",
                  fontFamily: highlight
                    ? "'Playfair Display',serif"
                    : undefined,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {order.notes && (
          <div
            style={{
              background: "#FFFBF2",
              border: "1px solid #F0E0B0",
              borderRadius: 8,
              padding: "12px 14px",
              marginBottom: 20,
              direction: "rtl",
            }}
          >
            <p
              style={{
                fontSize: 10,
                color: "#C9A24A",
                marginBottom: 4,
                letterSpacing: ".1em",
              }}
            >
              ملاحظات
            </p>
            <p style={{ fontSize: 13, color: "#5A341A" }}>{order.notes}</p>
          </div>
        )}

        {/* Status buttons */}
        <div style={{ marginBottom: 20, direction: "rtl" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              marginBottom: 10,
            }}
          >
            تغيير الحالة
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(ORDER_STATUSES).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                onClick={() => onStatusChange(order.id, key)}
                disabled={saving || order.status === key}
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: `1.5px solid ${order.status === key ? cfg.dot : "#E8E0D5"}`,
                  background: order.status === key ? cfg.bg : "#fff",
                  color: order.status === key ? cfg.color : "#7A5A3A",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor:
                    saving || order.status === key ? "default" : "pointer",
                  transition: "all .2s",
                  fontFamily: "'Tajawal',sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: cfg.dot,
                    flexShrink: 0,
                  }}
                />
                {cfg.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="db-btn db-btn-ghost"
          onClick={onClose}
          style={{ width: "100%", justifyContent: "center" }}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Orders Section
// ─────────────────────────────────────────────────────────────────────────────
function OrdersSection({ showToast }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) showToast("فشل تحميل الطلبات: " + error.message, "error");
    else setOrders(data || []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setSaving(true);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    if (error) {
      showToast("فشل تحديث الحالة: " + error.message, "error");
    } else {
      showToast("تم تحديث حالة الطلب ✓");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
      setSelectedOrder((prev) =>
        prev?.id === orderId ? { ...prev, status: newStatus } : prev,
      );
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) showToast("فشل الحذف: " + error.message, "error");
    else {
      showToast("تم حذف الطلب");
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (selectedOrder?.id === id) setSelectedOrder(null);
    }
    setDeleteId(null);
  };

  const filtered = orders.filter((o) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      (o.product_name_ar || "").includes(q) ||
      (o.product_name || "").toLowerCase().includes(q) ||
      String(o.id).includes(q);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + Number(o.total_price), 0),
  };

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          {
            label: "إجمالي الطلبات",
            value: orderStats.total,
            icon: <ClipboardList size={20} color="#5A341A" strokeWidth={1.8} />,
            color: "#5A341A",
          },
          {
            label: "قيد الانتظار",
            value: orderStats.pending,
            icon: <Clock size={20} color="#C9A24A" strokeWidth={1.8} />,
            color: "#C9A24A",
          },
          {
            label: "مؤكد",
            value: orderStats.confirmed,
            icon: <CheckCircle2 size={20} color="#2980B9" strokeWidth={1.8} />,
            color: "#2980B9",
          },
          {
            label: "إجمالي الإيرادات",
            value: `${orderStats.revenue.toLocaleString()} EGP`,
            icon: <Wallet size={20} color="#27AE60" strokeWidth={1.8} />,
            color: "#27AE60",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="fade-in"
            style={{
              background: "#fff",
              border: "1px solid #E8E0D5",
              borderRadius: 12,
              padding: "16px 18px",
              animationDelay: `${i * 55}ms`,
            }}
          >
            <div style={{ marginBottom: 6 }}>{s.icon}</div>
            <p
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: s.color,
                fontFamily: "'Playfair Display',serif",
                lineHeight: 1,
              }}
            >
              {s.value}
            </p>
            <p style={{ fontSize: 11, color: "#9A8A7A", marginTop: 4 }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #E8E0D5",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div
          className="table-topbar"
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #E8E0D5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2B1A12",
              fontFamily: "'Playfair Display',serif",
            }}
          >
            سجل الطلبات {!loading && `(${filtered.length})`}
          </h2>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {/* Status filter pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                ["all", "الكل"],
                ...Object.entries(ORDER_STATUSES).map(([k, v]) => [k, v.label]),
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatusFilter(key)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 20,
                    border: `1.5px solid ${statusFilter === key ? "#C9A24A" : "#E8E0D5"}`,
                    background: statusFilter === key ? "#FFF8E8" : "#fff",
                    color: statusFilter === key ? "#C9A24A" : "#7A5A3A",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .2s",
                    fontFamily: "'Tajawal',sans-serif",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #E8E0D5",
                borderRadius: 8,
                background: "#FDFAF6",
                overflow: "hidden",
                minWidth: 200,
              }}
            >
              <Search
                size={13}
                color="#9A8A7A"
                style={{ margin: "0 10px", flexShrink: 0 }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث في الطلبات..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "9px 4px",
                  fontSize: 13,
                  background: "transparent",
                  color: "#2B1A12",
                  direction: "rtl",
                  fontFamily: "'Tajawal',sans-serif",
                }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9A8A7A",
                    padding: "0 10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="button"
              className="db-btn db-btn-ghost"
              onClick={fetchOrders}
              style={{ padding: "8px 14px", fontSize: 12 }}
              title="تحديث"
            >
              <RefreshCw size={14} /> تحديث
            </button>
          </div>
        </div>

        {/* Desktop table */}
        <div className="desktop-table" style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#F7F3EE" }}>
                {[
                  "#",
                  "المنتج",
                  "الكمية",
                  "الإجمالي",
                  "الحالة",
                  "التاريخ",
                  "إجراءات",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "11px 14px",
                      textAlign: "right",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#7A5A3A",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #E8E0D5",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      {Array(7)
                        .fill(0)
                        .map((_, j) => (
                          <td key={j} style={{ padding: 14 }}>
                            <div
                              className="shimmer"
                              style={{
                                height: 14,
                                width: j === 1 ? 140 : "70%",
                              }}
                            />
                          </td>
                        ))}
                    </tr>
                  ))}
              {!loading &&
                filtered.map((o, i) => {
                  const date = new Date(o.created_at);
                  const dateStr = date.toLocaleDateString("ar-EG", {
                    month: "short",
                    day: "numeric",
                  });
                  const timeStr = date.toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr
                      key={o.id}
                      className="order-row fade-in"
                      style={{
                        borderBottom: "1px solid #F0EBE3",
                        animationDelay: `${i * 30}ms`,
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 14px",
                          color: "#9A8A7A",
                          fontSize: 11,
                        }}
                      >
                        #{o.id}
                      </td>
                      <td style={{ padding: "12px 14px", maxWidth: 220 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          {o.product_image ? (
                            <img
                              src={o.product_image}
                              alt=""
                              style={{
                                width: 40,
                                height: 36,
                                objectFit: "cover",
                                borderRadius: 6,
                                border: "1px solid #E8E0D5",
                                flexShrink: 0,
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <div
                              style={{
                                width: 40,
                                height: 36,
                                background: "#F5F1EA",
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <ProductPlaceholder size={18} />
                            </div>
                          )}
                          <div style={{ direction: "rtl", minWidth: 0 }}>
                            <p
                              style={{
                                fontWeight: 700,
                                color: "#2B1A12",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontSize: 13,
                              }}
                            >
                              {o.product_name_ar || o.product_name || "—"}
                            </p>
                            {o.category && (
                              <p style={{ fontSize: 10, color: "#9A8A7A" }}>
                                {o.category}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 14px", textAlign: "center" }}>
                        <span
                          style={{
                            background: "#F5F1EA",
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#5A341A",
                          }}
                        >
                          {o.quantity}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 14px",
                          fontWeight: 700,
                          color: "#5A341A",
                          fontFamily: "'Playfair Display',serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {Number(o.total_price).toLocaleString()} EGP
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <StatusBadge status={o.status} />
                      </td>
                      <td
                        style={{
                          padding: "12px 14px",
                          color: "#7A5A3A",
                          fontSize: 11,
                          whiteSpace: "nowrap",
                        }}
                      >
                        <p>{dateStr}</p>
                        <p style={{ color: "#9A8A7A" }}>{timeStr}</p>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            type="button"
                            className="db-btn db-btn-ghost"
                            onClick={() => setSelectedOrder(o)}
                            style={{
                              padding: "6px 11px",
                              fontSize: 11,
                              gap: 5,
                            }}
                          >
                            <Eye size={13} /> عرض
                          </button>
                          <button
                            type="button"
                            className="db-btn db-btn-danger"
                            onClick={() => setDeleteId(o.id)}
                            style={{ padding: "6px 11px", fontSize: 11 }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding: "64px 16px",
                      textAlign: "center",
                      color: "#9A8A7A",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <ClipboardList
                        size={38}
                        color="#C9A24A"
                        strokeWidth={1.2}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#5A341A",
                      }}
                    >
                      {search || statusFilter !== "all"
                        ? "لا توجد نتائج"
                        : "لا توجد طلبات بعد"}
                    </p>
                    <p style={{ fontSize: 12, color: "#9A8A7A", marginTop: 6 }}>
                      الطلبات ستظهر هنا تلقائياً عند تسجيلها
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mobile-cards">
          {loading &&
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid #E8E0D5",
                    borderRadius: 12,
                    padding: 14,
                    display: "flex",
                    gap: 12,
                  }}
                >
                  <div
                    className="shimmer"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      className="shimmer"
                      style={{ height: 13, width: "60%", marginBottom: 8 }}
                    />
                    <div
                      className="shimmer"
                      style={{ height: 11, width: "40%", marginBottom: 8 }}
                    />
                    <div
                      className="shimmer"
                      style={{ height: 11, width: "50%" }}
                    />
                  </div>
                </div>
              ))}
          {!loading &&
            filtered.map((o) => {
              const dateStr = new Date(o.created_at).toLocaleDateString(
                "ar-EG",
                { month: "short", day: "numeric", year: "numeric" },
              );
              return (
                <div
                  key={o.id}
                  className="fade-in"
                  style={{
                    background: "#fff",
                    border: "1px solid #E8E0D5",
                    borderRadius: 12,
                    padding: 14,
                    display: "flex",
                    gap: 12,
                  }}
                >
                  {o.product_image ? (
                    <img
                      src={o.product_image}
                      alt={o.product_name_ar}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #E8E0D5",
                        flexShrink: 0,
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        background: "#F5F1EA",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ProductPlaceholder size={26} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          color: "#2B1A12",
                          fontSize: 13,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {o.product_name_ar || o.product_name}
                      </p>
                      <span
                        style={{ fontSize: 9, color: "#9A8A7A", flexShrink: 0 }}
                      >
                        #{o.id}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        marginBottom: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <StatusBadge status={o.status} />
                      <span style={{ fontSize: 10, color: "#9A8A7A" }}>
                        {dateStr}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          color: "#5A341A",
                          fontSize: 13,
                          fontFamily: "'Playfair Display',serif",
                        }}
                      >
                        {Number(o.total_price).toLocaleString()} EGP
                      </p>
                      <div style={{ display: "flex", gap: 5 }}>
                        <button
                          type="button"
                          className="db-btn db-btn-ghost"
                          onClick={() => setSelectedOrder(o)}
                          style={{ padding: "4px 9px", fontSize: 11 }}
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          className="db-btn db-btn-danger"
                          onClick={() => setDeleteId(o.id)}
                          style={{ padding: "4px 9px", fontSize: 11 }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {!loading && filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "48px 16px",
                color: "#9A8A7A",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <ClipboardList size={36} color="#C9A24A" strokeWidth={1.2} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#5A341A" }}>
                لا توجد طلبات
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          saving={saving}
        />
      )}

      {deleteId && (
        <DeleteModal
          title="حذف الطلب؟"
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Products Section
// ─────────────────────────────────────────────────────────────────────────────
function ProductsSection({ showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formMode, setFormMode] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (error) showToast("فشل تحميل المنتجات: " + error.message, "error");
    else setProducts(data || []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openNew = () => {
    setEditProduct(null);
    setFormMode("new");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openEdit = (p) => {
    setEditProduct(p);
    setFormMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closeForm = () => {
    setFormMode(null);
    setEditProduct(null);
  };

  const handleSave = async (form) => {
    setSaving(true);
    const payload = {
      name: form.name || "",
      nameAr: form.nameAr || "",
      category: form.category || "",
      price: Number(form.price),
      description: form.description || "",
      badge: form.badge || null,
      inStock: !!form.inStock,
      images: Array.isArray(form.images) ? form.images : [],
      materials: Array.isArray(form.materials) ? form.materials : [],
      details:
        form.details &&
        typeof form.details === "object" &&
        !Array.isArray(form.details)
          ? form.details
          : {},
    };

    if (formMode === "edit" && editProduct?.id) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editProduct.id);
      if (error) showToast("فشل التعديل: " + error.message, "error");
      else {
        showToast("تم تعديل المنتج ✓");
        closeForm();
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (error) showToast("فشل الإضافة: " + error.message, "error");
      else {
        showToast("تم إضافة المنتج ✓");
        closeForm();
        fetchProducts();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) showToast("فشل الحذف: " + error.message, "error");
    else {
      showToast("تم حذف المنتج");
      fetchProducts();
    }
    setDeleteId(null);
  };

  const filtered = products.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.nameAr || "").includes(q) ||
      (p.name || "").toLowerCase().includes(q) ||
      (p.category || "").includes(q)
    );
  });

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.inStock).length,
    categories: new Set(products.map((p) => p.category).filter(Boolean)).size,
    avgPrice: products.length
      ? Math.round(
          products.reduce((s, p) => s + Number(p.price), 0) / products.length,
        )
      : 0,
  };

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          {
            label: "إجمالي المنتجات",
            value: stats.total,
            icon: <Package size={20} color="#5A341A" strokeWidth={1.8} />,
            color: "#5A341A",
          },
          {
            label: "متوفر في المخزن",
            value: stats.inStock,
            icon: <CheckCircle2 size={20} color="#27AE60" strokeWidth={1.8} />,
            color: "#27AE60",
          },
          {
            label: "الفئات",
            value: stats.categories,
            icon: <Tag size={20} color="#C9A24A" strokeWidth={1.8} />,
            color: "#C9A24A",
          },
          {
            label: "متوسط السعر",
            value: `${stats.avgPrice.toLocaleString()} EGP`,
            icon: <Wallet size={20} color="#2980B9" strokeWidth={1.8} />,
            color: "#2980B9",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="fade-in"
            style={{
              background: "#fff",
              border: "1px solid #E8E0D5",
              borderRadius: 12,
              padding: "16px 18px",
              animationDelay: `${i * 55}ms`,
            }}
          >
            <div style={{ marginBottom: 6 }}>{s.icon}</div>
            <p
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: s.color,
                fontFamily: "'Playfair Display',serif",
                lineHeight: 1,
              }}
            >
              {s.value}
            </p>
            <p style={{ fontSize: 11, color: "#9A8A7A", marginTop: 4 }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          className="db-btn db-btn-gold"
          onClick={openNew}
          style={{ fontSize: 12 }}
        >
          <Plus size={13} strokeWidth={2.5} /> منتج جديد
        </button>
      </div>

      {formMode && (
        <ProductForm
          key={formMode === "edit" ? `edit-${editProduct?.id}` : "new"}
          initial={formMode === "edit" ? editProduct : null}
          onSave={handleSave}
          onCancel={closeForm}
          saving={saving}
        />
      )}

      <div
        style={{
          background: "#fff",
          border: "1px solid #E8E0D5",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div
          className="table-topbar"
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #E8E0D5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2B1A12",
              fontFamily: "'Playfair Display',serif",
            }}
          >
            المنتجات {!loading && `(${filtered.length})`}
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1.5px solid #E8E0D5",
              borderRadius: 8,
              background: "#FDFAF6",
              overflow: "hidden",
              flex: 1,
              maxWidth: 280,
            }}
          >
            <Search
              size={13}
              color="#9A8A7A"
              style={{ margin: "0 10px", flexShrink: 0 }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث بالاسم أو الفئة..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "9px 4px",
                fontSize: 13,
                background: "transparent",
                color: "#2B1A12",
                direction: "rtl",
                fontFamily: "'Tajawal',sans-serif",
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9A8A7A",
                  padding: "0 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Desktop table */}
        <div className="desktop-table" style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#F7F3EE" }}>
                {[
                  "#",
                  "الصورة",
                  "الاسم",
                  "الفئة",
                  "السعر",
                  "المخزن",
                  "الشارة",
                  "إجراءات",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "11px 14px",
                      textAlign: "right",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#7A5A3A",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #E8E0D5",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      {Array(8)
                        .fill(0)
                        .map((_, j) => (
                          <td key={j} style={{ padding: 14 }}>
                            <div
                              className="shimmer"
                              style={{
                                height: 15,
                                width: j === 1 ? 48 : "75%",
                              }}
                            />
                          </td>
                        ))}
                    </tr>
                  ))}
              {!loading &&
                filtered.map((p, i) => {
                  const imgs = Array.isArray(p.images) ? p.images : [];
                  return (
                    <tr
                      key={p.id}
                      className="product-row fade-in"
                      style={{
                        borderBottom: "1px solid #F0EBE3",
                        animationDelay: `${i * 35}ms`,
                      }}
                    >
                      <td
                        style={{
                          padding: "11px 14px",
                          color: "#9A8A7A",
                          fontSize: 10,
                        }}
                      >
                        #{p.id}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        {imgs[0] ? (
                          <img
                            src={imgs[0]}
                            alt=""
                            style={{
                              width: 50,
                              height: 42,
                              objectFit: "cover",
                              borderRadius: 7,
                              border: "1px solid #E8E0D5",
                              display: "block",
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            style={{
                              width: 50,
                              height: 42,
                              background: "#F5F1EA",
                              borderRadius: 7,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ProductPlaceholder size={20} />
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "11px 14px", maxWidth: 180 }}>
                        <p
                          style={{
                            fontWeight: 700,
                            color: "#2B1A12",
                            marginBottom: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.nameAr || p.name || "—"}
                        </p>
                        {p.nameAr && p.name && (
                          <p
                            style={{
                              fontSize: 10,
                              color: "#9A8A7A",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {p.name}
                          </p>
                        )}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <span
                          style={{
                            background: "#F5F1EA",
                            border: "1px solid #E8E0D5",
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 10,
                            color: "#5A341A",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.category || "—"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontWeight: 700,
                          color: "#5A341A",
                          fontFamily: "'Playfair Display',serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {Number(p.price).toLocaleString()} EGP
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 10,
                            fontWeight: 700,
                            color: p.inStock ? "#27AE60" : "#C0392B",
                          }}
                        >
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: p.inStock ? "#27AE60" : "#C0392B",
                              flexShrink: 0,
                            }}
                          />
                          {p.inStock ? "متوفر" : "نفذ"}
                        </span>
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        {p.badge ? (
                          <span
                            style={{
                              background: "#FFF8E8",
                              border: "1px solid #C9A24A44",
                              borderRadius: 20,
                              padding: "3px 10px",
                              fontSize: 10,
                              color: "#C9A24A",
                              fontWeight: 600,
                            }}
                          >
                            {p.badge}
                          </span>
                        ) : (
                          <span style={{ color: "#C0C0C0", fontSize: 10 }}>
                            —
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            type="button"
                            className="db-btn db-btn-ghost"
                            onClick={() => openEdit(p)}
                            style={{
                              padding: "6px 11px",
                              fontSize: 11,
                              gap: 5,
                            }}
                          >
                            <Pencil size={12} /> تعديل
                          </button>
                          <button
                            type="button"
                            className="db-btn db-btn-danger"
                            onClick={() => setDeleteId(p.id)}
                            style={{
                              padding: "6px 11px",
                              fontSize: 11,
                              gap: 5,
                            }}
                          >
                            <Trash2 size={12} /> حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: "64px 16px",
                      textAlign: "center",
                      color: "#9A8A7A",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Package size={38} color="#C9A24A" strokeWidth={1.2} />
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#5A341A",
                        marginBottom: 4,
                      }}
                    >
                      {search ? "لا توجد نتائج" : "لا توجد منتجات بعد"}
                    </p>
                    {!search && (
                      <button
                        type="button"
                        className="db-btn db-btn-gold"
                        onClick={openNew}
                        style={{ marginTop: 12, fontSize: 12 }}
                      >
                        <Plus size={13} strokeWidth={2.5} /> أضف أول منتج
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mobile-cards">
          {loading &&
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid #E8E0D5",
                    borderRadius: 12,
                    padding: 14,
                    display: "flex",
                    gap: 12,
                  }}
                >
                  <div
                    className="shimmer"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      className="shimmer"
                      style={{ height: 13, width: "55%", marginBottom: 8 }}
                    />
                    <div
                      className="shimmer"
                      style={{ height: 11, width: "35%", marginBottom: 8 }}
                    />
                    <div
                      className="shimmer"
                      style={{ height: 11, width: "45%" }}
                    />
                  </div>
                </div>
              ))}
          {!loading &&
            filtered.map((p) => (
              <MobileProductCard
                key={p.id}
                p={p}
                onEdit={openEdit}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          {!loading && filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "48px 16px",
                color: "#9A8A7A",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Package size={36} color="#C9A24A" strokeWidth={1.2} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#5A341A" }}>
                {search ? "لا توجد نتائج" : "لا توجد منتجات"}
              </p>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <DeleteModal
          title="حذف المنتج؟"
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (msg, type = "success") => setToast({ msg, type, key: Date.now() }),
    [],
  );

  if (!auth)
    return (
      <>
        <DashboardStyles />
        <LoginScreen onLogin={() => setAuth(true)} />
      </>
    );

  return (
    <>
      <DashboardStyles />
      <div
        style={{ minHeight: "100vh", background: "#F7F3EE", direction: "rtl" }}
      >
        {/* Header */}
        <div
          style={{
            background: "#2B1A12",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            className="header-wrap"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 64,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: "#C9A24A",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Briefcase size={17} color="white" />
              </div>
              <div>
                <p
                  style={{
                    color: "#C9A24A",
                    fontSize: 10,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  لوحة التحكم
                </p>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'Playfair Display',serif",
                    fontStyle: "italic",
                  }}
                >
                  Al Ashry Furniture
                </p>
              </div>
            </div>
            <div className="header-actions" style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className="db-btn db-btn-ghost"
                onClick={() => setAuth(false)}
                style={{
                  fontSize: 12,
                  color: "#EFE8DD",
                  borderColor: "rgba(239,232,221,.25)",
                }}
              >
                <LogOut size={13} /> خروج
              </button>
            </div>
          </div>
        </div>

        {/* Tab Nav */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E8E0D5",
            position: "sticky",
            top: 64,
            zIndex: 40,
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 16px",
              display: "flex",
              overflowX: "auto",
            }}
          >
            <button
              className={`tab-nav-btn${activeTab === "products" ? " active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <Package size={14} /> المنتجات
            </button>
            <button
              className={`tab-nav-btn${activeTab === "orders" ? " active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <ClipboardList size={14} /> الطلبات
            </button>
            <button
              className={`tab-nav-btn${activeTab === "analytics" ? " active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart2 size={14} /> التحليلات
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px 16px 60px",
          }}
        >
          {activeTab === "products" && (
            <ProductsSection showToast={showToast} />
          )}
          {activeTab === "orders" && <OrdersSection showToast={showToast} />}
          {activeTab === "analytics" && (
            <AnalyticsSection showToast={showToast} />
          )}
        </div>

        {toast && (
          <Toast
            key={toast.key}
            msg={toast.msg}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}
