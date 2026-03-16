import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import ProductPage from "../pages/ProductPage";
import { supabase } from "../supabaseClient.js";

const SORT_OPTIONS = [
  { label: "مميز", value: "featured" },
  { label: "السعر: من الأقل للأعلى", value: "price_asc" },
  { label: "السعر: من الأعلى للأقل", value: "price_desc" },
  { label: "الاسم: أ → ي", value: "name_asc" },
];

const WHATSAPP_NUMBER = "201092846526";

const badgeStyle = {
  الأفضل: { bg: "#5A341A", color: "#fff" },
  جديد: { bg: "#C9A24A", color: "#fff" },
  محدود: { bg: "#2B1A12", color: "#C9A24A" },
  مميز: { bg: "#EFE8DD", color: "#5A341A" },
  مخصص: { bg: "#7A5A3A", color: "#fff" },
};

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Tajawal:wght@300;400;500;700&display=swap');

    html, body {
      margin: 0; padding: 0;
      width: 100%; max-width: 100%;
      overflow-x: hidden;
      -webkit-text-size-adjust: 100%;
    }

    @keyframes cardIn {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes spinIt { to { transform: rotate(360deg); } }
    @keyframes floatUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .page-in   { animation: pageIn 0.4s cubic-bezier(0.4,0,0.2,1) both; }
    .spin-slow { animation: spinIt 22s linear infinite; }
    .float-in  { animation: floatUp 0.7s ease 0.5s both; }

    .dot-bg {
      background-image: radial-gradient(circle, #C9A24A14 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #F5F1EA; }
    ::-webkit-scrollbar-thumb { background: #C9A24A55; border-radius: 2px; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .underline-nav { position: relative; }
    .underline-nav::after {
      content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
      height: 1px; background: #C9A24A;
      transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
    }
    .underline-nav:hover::after { transform: scaleX(1); }

    .img-zoom { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
    .img-zoom:hover { transform: scale(1.06); }

    .sweep-btn { position: relative; overflow: hidden; }
    .sweep-btn::after {
      content: ''; position: absolute; inset: 0;
      background: #C9A24A; transform: translateX(-101%);
      transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); z-index: 0;
    }
    .sweep-btn:hover::after { transform: translateX(0); }
    .sweep-btn > * { position: relative; z-index: 1; }

    @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
    @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
  `}</style>
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  return <Header />;
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #EFE8DD",
        overflow: "hidden",
      }}
      className="animate-pulse"
    >
      <div style={{ paddingBottom: "75%", background: "#EFE8DD" }} />
      <div style={{ padding: 16 }}>
        {[
          ["33%", 12],
          ["66%", 18],
          ["100%", 12],
          ["80%", 12],
        ].map(([w, h], i) => (
          <div
            key={i}
            style={{
              height: h,
              background: "#EFE8DD",
              borderRadius: 3,
              width: w,
              marginBottom: 10,
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <div
            style={{
              height: 28,
              background: "#EFE8DD",
              borderRadius: 3,
              width: "40%",
            }}
          />
          <div
            style={{
              height: 36,
              background: "#EFE8DD",
              borderRadius: 3,
              width: "42%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [hov, setHov] = useState(false);
  const badge = product.badge ? badgeStyle[product.badge] : null;
  const navigate = useNavigate();

  const handleWA = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `مرحباً، أود الاستفسار عن:\n\n🪑 *${product.nameAr || product.name}*\n🆔 رقم المنتج: ${product.id}\n💰 السعر: ${product.price.toLocaleString()} EGP\n🔩 المواد: ${(product.materials || []).join("، ")}\n\nأرجو التواصل معي. شكراً!`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const images = product.images || [];
  const materials = product.materials || [];

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: "1px solid #EFE8DD",
        overflow: "hidden",
        cursor: "pointer",
        animation: `cardIn 0.5s ease both`,
        animationDelay: `${index * 65}ms`,
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
        boxShadow: hov
          ? "0 12px 40px rgba(90,52,26,0.13)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          paddingBottom: "75%",
          overflow: "hidden",
          background: "#F5F1EA",
          flexShrink: 0,
        }}
      >
        {images[0] && (
          <img
            src={images[0]}
            alt={product.nameAr || product.name}
            className="img-zoom"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(43,26,18,0.3), transparent)",
            opacity: hov ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        {badge && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "3px 10px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.05em",
              background: badge.bg,
              color: badge.color,
            }}
          >
            {product.badge}
          </div>
        )}

        {!product.inStock && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "#2B1A12",
                color: "#fff",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 14px",
              }}
            >
              غير موجودة حاليا
            </span>
          </div>
        )}

        {hov && (
          <>
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 24,
                height: 24,
                borderTop: "1px solid rgba(201,162,74,0.7)",
                borderLeft: "1px solid rgba(201,162,74,0.7)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 24,
                height: 24,
                borderBottom: "1px solid rgba(201,162,74,0.7)",
                borderRight: "1px solid rgba(201,162,74,0.7)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: "#5A341A",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "7px 14px",
                  fontWeight: 500,
                }}
              >
                عرض التفاصيل ←
              </span>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A24A",
              fontWeight: 500,
            }}
          >
            {product.category}
          </span>
          <span
            style={{
              fontSize: 9,
              color: "rgba(122,90,58,0.45)",
              letterSpacing: "0.05em",
            }}
          >
            {product.id}
          </span>
        </div>

        <h3
          className="fp"
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#2B1A12",
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {product.nameAr || product.name}
        </h3>

        <p
          className="line-clamp-2"
          style={{
            fontSize: 12,
            color: "#7A5A3A",
            lineHeight: 1.7,
            marginBottom: 12,
            flex: 1,
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginBottom: 12,
          }}
        >
          {materials.slice(0, 2).map((m) => (
            <span
              key={m}
              style={{
                fontSize: 9,
                border: "1px solid #EFE8DD",
                color: "#7A5A3A",
                padding: "2px 7px",
                background: "#F5F1EA",
              }}
            >
              {m}
            </span>
          ))}
          {materials.length > 2 && (
            <span
              style={{
                fontSize: 9,
                border: "1px solid #EFE8DD",
                color: "#C9A24A",
                padding: "2px 7px",
                background: "#F5F1EA",
              }}
            >
              +{materials.length - 2}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid #EFE8DD",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(122,90,58,0.55)",
                marginBottom: 2,
              }}
            >
              السعر
            </p>
            <p
              className="fp"
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#5A341A",
                lineHeight: 1,
              }}
            >
              {product.price.toLocaleString()}{" "}
              <span style={{ fontSize: 10, fontWeight: 400, color: "#7A5A3A" }}>
                EGP
              </span>
            </p>
          </div>

          {product.inStock ? (
            <button
              onClick={handleWA}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#25D366",
                color: "#fff",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "8px 12px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#128C7E")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#25D366")
              }
            >
              {WA_ICON} اطلب الان
            </button>
          ) : (
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "8px 12px",
                border: "1px solid #EFE8DD",
                color: "rgba(122,90,58,0.45)",
              }}
            >
              غير متوفر
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GRID PAGE ────────────────────────────────────────────────────────────────
function GridPage({ products, loading, error }) {
  const [categories, setCategories] = useState(["الجميع"]);
  const [category, setCategory] = useState("الجميع");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // بناء الـ categories من الـ products اللي اتجبت من Supabase
  useEffect(() => {
    if (products.length > 0) {
      const cats = [
        "الجميع",
        ...new Set(products.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(cats);
    }
  }, [products]);

  const displayed = products
    .filter((p) => category === "الجميع" || p.category === category)
    .filter((p) => {
      const q = search.toLowerCase();
      if (!q) return true;
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.nameAr || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.materials || []).some((m) => m.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "name_asc")
        return (a.nameAr || a.name || "").localeCompare(
          b.nameAr || b.name || "",
        );
      return 0;
    });

  return (
    <div className="page-in" style={{ width: "100%" }}>
      {/* Page Header */}
      <div
        className="dot-bg"
        style={{
          background: "#EFE8DD",
          borderBottom: "1px solid rgba(201,162,74,0.2)",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "40px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#C9A24A",
              }}
            >
              مجموعاتنا
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h1
                className="fp"
                style={{
                  fontSize: "clamp(1.7rem, 5vw, 3.2rem)",
                  fontWeight: 800,
                  color: "#2B1A12",
                  lineHeight: 1.15,
                }}
              >
                المصنوعات اليدوية
              </h1>
              <p
                style={{
                  color: "#7A5A3A",
                  fontSize: 14,
                  marginTop: 6,
                  direction: "rtl",
                }}
              >
                قطع مصنوعة بعناية لتدوم معك
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(201,162,74,0.3)",
                background: "#fff",
                overflow: "hidden",
                width: "100%",
                maxWidth: 320,
              }}
            >
              <svg
                style={{ margin: "0 10px", color: "#7A5A3A", flexShrink: 0 }}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن منتج..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  padding: "10px 8px",
                  fontSize: 13,
                  color: "#2B1A12",
                  background: "transparent",
                  direction: "rtl",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    marginLeft: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(122,90,58,0.5)",
                    flexShrink: 0,
                    padding: "0 8px",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #EFE8DD",
          position: "sticky",
          top: 64,
          zIndex: 40,
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div
            className="no-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              overflowX: "auto",
              flex: 1,
              minWidth: 0,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: "10px 12px",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  background: category === cat ? "#5A341A" : "transparent",
                  color: category === cat ? "#fff" : "#7A5A3A",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <span
              className="hidden-mobile"
              style={{ fontSize: 10, color: "#7A5A3A", whiteSpace: "nowrap" }}
            >
              {loading ? "جاري التحميل..." : `${displayed.length} نتائج`}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                fontSize: 10,
                border: "1px solid #EFE8DD",
                background: "#fff",
                color: "#7A5A3A",
                padding: "7px 10px",
                outline: "none",
                cursor: "pointer",
                direction: "rtl",
                maxWidth: 140,
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "28px 16px 80px",
        }}
      >
        {error && (
          <div style={{ textAlign: "center", padding: "60px 16px" }}>
            <p
              className="fp"
              style={{ fontSize: 20, color: "#5A341A", marginBottom: 8 }}
            >
              فشل في تحميل المنتجات
            </p>
            <p style={{ color: "#7A5A3A", fontSize: 13 }}>{error}</p>
          </div>
        )}

        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        )}

        {!loading && !error && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 16px" }}>
            <div
              className="fp"
              style={{ fontSize: 48, color: "#EFE8DD", marginBottom: 16 }}
            >
              ∅
            </div>
            <p
              className="fp"
              style={{ fontSize: 20, color: "#5A341A", marginBottom: 8 }}
            >
              لا توجد نتائج
            </p>
            <p style={{ color: "#7A5A3A", fontSize: 13, marginBottom: 24 }}>
              جرّب تعديل خيارات البحث أو الفلتر
            </p>
            <button
              onClick={() => {
                setCategory("الجميع");
                setSearch("");
              }}
              style={{
                background: "#5A341A",
                color: "#fff",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "12px 32px",
                border: "none",
                cursor: "pointer",
              }}
            >
              مسح الفلاتر
            </button>
          </div>
        )}

        {!loading && !error && displayed.length > 0 && (
          <>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(122,90,58,0.55)",
                marginBottom: 20,
                direction: "rtl",
              }}
            >
              عرض {displayed.length} من {products.length} منتجات
              {category !== "الجميع" && ` · ${category}`}
              {search && ` · "${search}"`}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: 16,
              }}
            >
              {displayed.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState({ name: "grid", productId: null });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      console.log("DATA:", data); // ← أضف السطر ده
      console.log("ERROR:", error); // ← وده

      if (error) {
        console.error("Supabase error:", error);
        setError("فشل في تحميل المنتجات");
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const navigate = (pageName, productId = null) => {
    setPage({ name: pageName, productId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentProduct = page.productId
    ? products.find((p) => String(p.id) === String(page.productId))
    : null;

  return (
    <>
      <GlobalStyles />
      <div
        style={{
          minHeight: "100vh",
          background: "#F5F1EA",
          color: "#2B1A12",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <Nav onNavigate={navigate} currentPage={page.name} />

        {page.name === "grid" && (
          <GridPage
            products={products}
            loading={loading}
            error={error}
            onNavigate={navigate}
          />
        )}

        {page.name === "product" && currentProduct && (
          <ProductPage
            product={currentProduct}
            allProducts={products}
            onNavigate={navigate}
          />
        )}

        {page.name === "product" && !currentProduct && !loading && (
          <div style={{ textAlign: "center", padding: "100px 16px" }}>
            <p
              className="fp"
              style={{ fontSize: 22, color: "#5A341A", marginBottom: 20 }}
            >
              المنتج غير موجود
            </p>
            <button
              onClick={() => navigate("grid")}
              style={{
                background: "#5A341A",
                color: "#fff",
                padding: "12px 32px",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              العودة للمتجر
            </button>
          </div>
        )}

        <div
          style={{
            background: "#2B1A12",
            padding: "20px 16px",
            textAlign: "center",
          }}
        >
          <p
            className="fp"
            style={{ fontStyle: "italic", color: "#C9A24A", fontSize: 14 }}
          >
            Al Ashry Furniture · العشري للأثاث
          </p>
          <p
            style={{
              color: "rgba(239,232,221,0.35)",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            من. 2005 · أساس الصناعة في مصر
          </p>
        </div>
      </div>
    </>
  );
}
