import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient.js";

const ADMIN_PASSWORD = "ashry2025";

const DashboardStyles = () => (
  <style>{`
  * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Tajawal', sans-serif; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
    .fade-in { animation: fadeIn 0.35s ease both; }
    .slide-in { animation: slideIn 0.35s cubic-bezier(0.4,0,0.2,1) both; }
    .spin { animation: spin 0.8s linear infinite; }
    .shimmer-row { background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 6px; }
    .db-input { width: 100%; padding: 10px 14px; border: 1.5px solid #E8E0D5; border-radius: 8px; font-size: 13px; font-family: 'Tajawal', sans-serif; color: #2B1A12; background: #FDFAF6; outline: none; transition: border-color 0.2s, box-shadow 0.2s; direction: rtl; }
    .db-input:focus { border-color: #C9A24A; box-shadow: 0 0 0 3px rgba(201,162,74,0.12); }
    .db-input::placeholder { color: #B5A090; }
    .db-btn { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-family: 'Tajawal', sans-serif; font-size: 13px; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 7px; }
    .db-btn-primary { background: #5A341A; color: #fff; }
    .db-btn-primary:hover { background: #7A4A28; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(90,52,26,0.25); }
    .db-btn-danger { background: #fff; color: #C0392B; border: 1.5px solid #FADBD8; }
    .db-btn-danger:hover { background: #FEF0EE; }
    .db-btn-ghost { background: transparent; color: #7A5A3A; border: 1.5px solid #E8E0D5; }
    .db-btn-ghost:hover { background: #F5F1EA; }
    .db-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
    .product-row { transition: background 0.15s; }
    .product-row:hover { background: #FDFAF6; }
    .tag-chip { display: inline-flex; align-items: center; gap: 5px; background: #F5F1EA; border: 1px solid #E8E0D5; border-radius: 20px; padding: 3px 10px 3px 6px; font-size: 11px; color: #5A341A; }
    .tag-chip button { background: none; border: none; cursor: pointer; color: #999; font-size: 13px; line-height: 1; padding: 0; }
    .tag-chip button:hover { color: #C0392B; }
    .toast { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 600; z-index: 9999; animation: fadeIn 0.3s ease; white-space: nowrap; }
    .toast-success { background: #27AE60; color: #fff; }
    .toast-error { background: #C0392B; color: #fff; }
    .upload-zone { border: 2px dashed #E8E0D5; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; background: #FDFAF6; }
    .upload-zone:hover { border-color: #C9A24A; background: #FFF8EE; }
    .upload-zone.drag-over { border-color: #C9A24A; background: #FFF8EE; transform: scale(1.01); }
    .img-thumb { position: relative; width: 80px; height: 80px; border-radius: 8px; overflow: hidden; border: 1px solid #E8E0D5; flex-shrink: 0; }
    .img-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .img-thumb .remove-btn { position: absolute; top: 3px; right: 3px; width: 18px; height: 18px; background: rgba(192,57,43,0.85); color: #fff; border: none; border-radius: 50%; cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center; line-height: 1; }
    .img-thumb .uploading-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #F5F1EA; }
    ::-webkit-scrollbar-thumb { background: #C9A24A55; border-radius: 3px; }
  `}</style>
);

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleLogin = () => {
    if (pass === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
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
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 16,
          border: "1px solid #E8E0D5",
          width: 360,
          textAlign: "center",
          boxShadow: "0 8px 40px rgba(90,52,26,0.1)",
          animation: shaking ? "shake 0.4s ease" : "fadeIn 0.35s ease both",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            background: "#2B1A12",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#C9A24A">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        </div>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C9A24A",
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          لوحة التحكم
        </p>
        <h1
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#2B1A12",
            marginBottom: 6,
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
          }}
        >
          Al Ashry Furniture
        </h1>
        <p style={{ fontSize: 12, color: "#9A8A7A", marginBottom: 28 }}>
          أدخل كلمة المرور للمتابعة
        </p>
        <input
          type="password"
          placeholder="كلمة المرور"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: `1.5px solid ${error ? "#C0392B" : "#E8E0D5"}`,
            borderRadius: 10,
            marginBottom: 8,
            fontSize: 14,
            outline: "none",
            direction: "rtl",
            fontFamily: "'Tajawal', sans-serif",
            background: "#FDFAF6",
            color: "#2B1A12",
          }}
        />
        {error && (
          <p
            style={{
              fontSize: 12,
              color: "#C0392B",
              marginBottom: 10,
              textAlign: "right",
            }}
          >
            ❌ كلمة المرور غلط
          </p>
        )}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            background: "#5A341A",
            color: "#fff",
            padding: "13px",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            cursor: "pointer",
            fontWeight: 700,
            fontFamily: "'Tajawal', sans-serif",
            marginTop: 4,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#7A4A28")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#5A341A")}
        >
          دخول
        </button>
      </div>
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  return <div className={`toast toast-${type}`}>{msg}</div>;
}

// ─── IMAGE UPLOADER ───────────────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    // Validate file type
    if (!file.type.startsWith("image/")) return null;

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleFiles = async (files) => {
    const fileArr = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (!fileArr.length) return;

    setUploading(true);
    const urls = await Promise.all(fileArr.map(uploadFile));
    const validUrls = urls.filter(Boolean);
    onChange([...images, ...validUrls]);
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
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

      {/* Thumbnails */}
      {images.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {images.map((url, i) => (
            <div key={i} className="img-thumb">
              <img src={url} alt={`product-${i}`} />
              <button className="remove-btn" onClick={() => removeImage(i)}>
                ×
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
              <span
                className="spin"
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 20,
                  border: "2px solid #C9A24A",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Upload Zone */}
      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
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
            <span
              className="spin"
              style={{
                display: "inline-block",
                width: 18,
                height: 18,
                border: "2px solid #C9A24A",
                borderTopColor: "transparent",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600 }}>جاري الرفع...</span>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📸</div>
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
              PNG, JPG, WEBP — يمكن رفع أكثر من صورة
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAG INPUT ────────────────────────────────────────────────────────────────
function TagInput({ label, values, onChange, placeholder }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setInput("");
  };
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));
  return (
    <div>
      <label
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
          className="db-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          style={{ flex: 1 }}
        />
        <button
          className="db-btn db-btn-ghost"
          onClick={add}
          style={{ flexShrink: 0, padding: "10px 14px" }}
        >
          +
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {values.map((v, i) => (
          <span key={i} className="tag-chip">
            <button onClick={() => remove(i)}>×</button>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PRODUCT FORM ─────────────────────────────────────────────────────────────
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
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.name && !form.nameAr) return alert("الاسم مطلوب");
    if (!form.price) return alert("السعر مطلوب");
    onSave(form);
  };

  return (
    <div
      className="slide-in"
      style={{
        background: "#fff",
        border: "1px solid #E8E0D5",
        borderRadius: 14,
        padding: 28,
        marginBottom: 24,
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#2B1A12",
          marginBottom: 24,
          direction: "rtl",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {initial?.id ? "تعديل المنتج" : "إضافة منتج جديد"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              marginBottom: 6,
            }}
          >
            الاسم بالإنجليزي
          </label>
          <input
            className="db-input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Chair"
            style={{ direction: "ltr" }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              marginBottom: 6,
              direction: "rtl",
            }}
          >
            الاسم بالعربي
          </label>
          <input
            className="db-input"
            value={form.nameAr}
            onChange={(e) => set("nameAr", e.target.value)}
            placeholder="كرسي"
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              marginBottom: 6,
              direction: "rtl",
            }}
          >
            الفئة
          </label>
          <input
            className="db-input"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="كراسي"
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              marginBottom: 6,
              direction: "rtl",
            }}
          >
            السعر (EGP)
          </label>
          <input
            className="db-input"
            type="number"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="5000"
            style={{ direction: "ltr" }}
          />
        </div>
        <div>
          <label
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
            paddingTop: 22,
          }}
        >
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#5A341A",
              direction: "rtl",
            }}
          >
            متوفر في المخزن؟
          </label>
          <div
            onClick={() => set("inStock", !form.inStock)}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              background: form.inStock ? "#27AE60" : "#E0D6CC",
              cursor: "pointer",
              position: "relative",
              transition: "background 0.2s",
              flexShrink: 0,
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
                transition: "left 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label
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
          className="db-input"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="وصف المنتج..."
          rows={3}
          style={{ resize: "vertical" }}
        />
      </div>

      {/* Image Uploader + Materials */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        <ImageUploader
          images={form.images}
          onChange={(v) => set("images", v)}
        />
        <TagInput
          label="المواد"
          values={form.materials}
          onChange={(v) => set("materials", v)}
          placeholder="خشب، قماش..."
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 24,
          justifyContent: "flex-end",
        }}
      >
        <button className="db-btn db-btn-ghost" onClick={onCancel}>
          إلغاء
        </button>
        <button
          className="db-btn db-btn-primary"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving && (
            <span
              className="spin"
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                border: "2px solid #fff",
                borderTopColor: "transparent",
                borderRadius: "50%",
              }}
            />
          )}
          {initial?.id ? "حفظ التعديلات" : "إضافة المنتج"}
        </button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (auth) fetchProducts();
  }, [auth]);

  if (!auth)
    return (
      <>
        <DashboardStyles />
        <LoginScreen onLogin={() => setAuth(true)} />
      </>
    );

  const handleSave = async (form) => {
    setSaving(true);
    const payload = {
      name: form.name,
      nameAr: form.nameAr,
      category: form.category,
      price: Number(form.price),
      description: form.description,
      badge: form.badge || null,
      inStock: form.inStock,
      images: form.images,
      materials: form.materials,
      details: form.details || {},
    };
    if (editProduct?.id) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editProduct.id);
      if (error) showToast("فشل التعديل!", "error");
      else showToast("تم تعديل المنتج ✓");
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (error) showToast("فشل الإضافة!", "error");
      else showToast("تم إضافة المنتج ✓");
    }
    setSaving(false);
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) showToast("فشل الحذف!", "error");
    else {
      showToast("تم حذف المنتج");
      fetchProducts();
    }
    setDeleteId(null);
  };

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
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
    <>
      <DashboardStyles />
      <div
        style={{ minHeight: "100vh", background: "#F7F3EE", direction: "rtl" }}
      >
        {/* Header */}
        <div style={{ background: "#2B1A12", padding: "0 32px" }}>
          <div
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
                  width: 32,
                  height: 32,
                  background: "#C9A24A",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    color: "#C9A24A",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  لوحة التحكم
                </p>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                  }}
                >
                  Al Ashry Furniture
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="db-btn db-btn-primary"
                onClick={() => {
                  setShowForm(true);
                  setEditProduct(null);
                }}
                style={{ background: "#C9A24A", fontSize: 12 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                منتج جديد
              </button>
              <button
                className="db-btn db-btn-ghost"
                onClick={() => setAuth(false)}
                style={{
                  fontSize: 12,
                  color: "#EFE8DD",
                  borderColor: "rgba(239,232,221,0.2)",
                }}
              >
                تسجيل خروج
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              {
                label: "إجمالي المنتجات",
                value: stats.total,
                icon: "📦",
                color: "#5A341A",
              },
              {
                label: "متوفر في المخزن",
                value: stats.inStock,
                icon: "✅",
                color: "#27AE60",
              },
              {
                label: "الفئات",
                value: stats.categories,
                icon: "🏷️",
                color: "#C9A24A",
              },
              {
                label: "متوسط السعر",
                value: `${stats.avgPrice.toLocaleString()} EGP`,
                icon: "💰",
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
                  padding: "18px 20px",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: s.color,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {s.value}
                </p>
                <p style={{ fontSize: 11, color: "#9A8A7A", marginTop: 2 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          {(showForm || editProduct) && (
            <ProductForm
              initial={editProduct}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditProduct(null);
              }}
              saving={saving}
            />
          )}

          {/* Table */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #E8E0D5",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
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
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#2B1A12",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                المنتجات ({filtered.length})
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1.5px solid #E8E0D5",
                  borderRadius: 8,
                  background: "#FDFAF6",
                  overflow: "hidden",
                  width: 240,
                }}
              >
                <svg
                  style={{ margin: "0 10px", color: "#9A8A7A", flexShrink: 0 }}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="بحث..."
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    padding: "9px 4px",
                    fontSize: 13,
                    background: "transparent",
                    color: "#2B1A12",
                    direction: "rtl",
                    fontFamily: "'Tajawal', sans-serif",
                  }}
                />
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
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
                          padding: "12px 16px",
                          textAlign: "right",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#7A5A3A",
                          letterSpacing: "0.08em",
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
                    Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i}>
                          {Array(8)
                            .fill(0)
                            .map((_, j) => (
                              <td key={j} style={{ padding: "14px 16px" }}>
                                <div
                                  className="shimmer-row"
                                  style={{
                                    height: 16,
                                    width: j === 1 ? 48 : "80%",
                                  }}
                                />
                              </td>
                            ))}
                        </tr>
                      ))}
                  {!loading &&
                    filtered.map((p, i) => {
                      const images = Array.isArray(p.images) ? p.images : [];
                      return (
                        <tr
                          key={p.id}
                          className="product-row fade-in"
                          style={{
                            borderBottom: "1px solid #F0EBE3",
                            animationDelay: `${i * 40}ms`,
                          }}
                        >
                          <td
                            style={{
                              padding: "12px 16px",
                              color: "#9A8A7A",
                              fontSize: 11,
                            }}
                          >
                            #{p.id}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            {images[0] ? (
                              <img
                                src={images[0]}
                                alt=""
                                style={{
                                  width: 52,
                                  height: 44,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  border: "1px solid #E8E0D5",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 52,
                                  height: 44,
                                  background: "#F5F1EA",
                                  borderRadius: 8,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 20,
                                }}
                              >
                                🪑
                              </div>
                            )}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <p
                              style={{
                                fontWeight: 700,
                                color: "#2B1A12",
                                marginBottom: 2,
                              }}
                            >
                              {p.nameAr || p.name}
                            </p>
                            {p.nameAr && p.name && (
                              <p style={{ fontSize: 11, color: "#9A8A7A" }}>
                                {p.name}
                              </p>
                            )}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span
                              style={{
                                background: "#F5F1EA",
                                border: "1px solid #E8E0D5",
                                borderRadius: 20,
                                padding: "3px 10px",
                                fontSize: 11,
                                color: "#5A341A",
                                fontWeight: 600,
                              }}
                            >
                              {p.category || "—"}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "12px 16px",
                              fontWeight: 700,
                              color: "#5A341A",
                              fontFamily: "'Playfair Display', serif",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {Number(p.price).toLocaleString()} EGP
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 11,
                                fontWeight: 600,
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
                          <td style={{ padding: "12px 16px" }}>
                            {p.badge ? (
                              <span
                                style={{
                                  background: "#FFF8E8",
                                  border: "1px solid #C9A24A44",
                                  borderRadius: 20,
                                  padding: "3px 10px",
                                  fontSize: 11,
                                  color: "#C9A24A",
                                  fontWeight: 600,
                                }}
                              >
                                {p.badge}
                              </span>
                            ) : (
                              <span style={{ color: "#C0C0C0", fontSize: 11 }}>
                                —
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button
                                className="db-btn db-btn-ghost"
                                onClick={() => {
                                  setEditProduct(p);
                                  setShowForm(false);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                                style={{ padding: "6px 12px", fontSize: 11 }}
                              >
                                ✏️ تعديل
                              </button>
                              <button
                                className="db-btn db-btn-danger"
                                onClick={() => setDeleteId(p.id)}
                                style={{ padding: "6px 12px", fontSize: 11 }}
                              >
                                🗑️ حذف
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
                          padding: "60px 16px",
                          textAlign: "center",
                          color: "#9A8A7A",
                        }}
                      >
                        <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#5A341A",
                          }}
                        >
                          لا توجد منتجات
                        </p>
                        <p style={{ fontSize: 12, marginTop: 4 }}>
                          اضغط "منتج جديد" لإضافة أول منتج
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(3px)",
            }}
          >
            <div
              className="fade-in"
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 32,
                maxWidth: 360,
                width: "90%",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 16 }}>🗑️</div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#2B1A12",
                  marginBottom: 8,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                حذف المنتج؟
              </h3>
              <p style={{ fontSize: 13, color: "#7A5A3A", marginBottom: 24 }}>
                هذا الإجراء لا يمكن التراجع عنه.
              </p>
              <div
                style={{ display: "flex", gap: 10, justifyContent: "center" }}
              >
                <button
                  className="db-btn db-btn-ghost"
                  onClick={() => setDeleteId(null)}
                >
                  إلغاء
                </button>
                <button
                  className="db-btn"
                  onClick={() => handleDelete(deleteId)}
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
        )}

        {toast && (
          <Toast
            msg={toast.msg}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}
