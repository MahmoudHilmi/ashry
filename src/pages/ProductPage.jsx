import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import {
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingBag,
  Truck,
  Hammer,
  ShieldCheck,
  ZoomIn,
  Minus,
  Plus,
  ArrowLeft,
  Package,
} from "lucide-react";

const WHATSAPP_NUMBER = "2001092846526";

const badgeStyle = {
  الأفضل: { bg: "#5A341A", color: "#fff" },
  جديد: { bg: "#C9A24A", color: "#fff" },
  محدود: { bg: "#2B1A12", color: "#C9A24A" },
  مميز: { bg: "#EFE8DD", color: "#5A341A" },
  مخصص: { bg: "#7A5A3A", color: "#fff" },
};

export default function ProductPage({ allProducts = [] }) {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // ── use allProducts directly — no MOCK fallback ──
  const productList = Array.isArray(allProducts) ? allProducts : [];

  // product can come from router state (fast) or from the list (on refresh)
  const product =
    state?.product || productList.find((p) => String(p.id) === String(id));

  // safe helpers
  const images = Array.isArray(product?.images) ? product.images : [];
  const materials = Array.isArray(product?.materials) ? product.materials : [];
  const details =
    product?.details &&
    typeof product.details === "object" &&
    !Array.isArray(product.details)
      ? product.details
      : {};

  // related — same category, different product, from real list
  const related = productList
    .filter(
      (p) => String(p.id) !== String(id) && p.category === product?.category,
    )
    .slice(0, 3);

  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImg(0);
    setQty(1);
    setActiveTab("description");
  }, [id]);

  // ── not found ──
  if (!product) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", padding: "120px 16px" }}>
          <Package size={52} color="#C9A24A" style={{ marginBottom: 16 }} />
          <p
            className="fp"
            style={{ fontSize: 22, color: "#5A341A", marginBottom: 8 }}
          >
            المنتج غير موجود
          </p>
          <p style={{ fontSize: 13, color: "#7A5A3A", marginBottom: 28 }}>
            ربما تم حذف المنتج أو الرابط غير صحيح
          </p>
          <button
            onClick={() => navigate("/products")}
            style={{
              background: "#5A341A",
              color: "#fff",
              padding: "12px 32px",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            العودة للمتجر
          </button>
        </div>
      </>
    );
  }

  const badge = product.badge ? badgeStyle[product.badge] : null;

  const handleWA = () => {
    const msg = encodeURIComponent(
      `مرحباً، أود طلب:\n\n🪑 *${product.nameAr || product.name}*\n🆔 رقم المنتج: ${product.id}\n📦 الكمية: ${qty}\n💰 السعر الإجمالي: ${(product.price * qty).toLocaleString()} EGP\n\nالمواد:\n${materials.map((m) => `• ${m}`).join("\n")}\n\nالوصف: ${product.description || ""}\n\nيرجى تأكيد الطلب وتفاصيل التوصيل. شكراً!`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="page-in" style={{ width: "100%" }}>
      <Header />

      {/* ── Breadcrumb ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #EFE8DD",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#7A5A3A",
            flexWrap: "wrap",
            direction: "rtl",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#7A5A3A",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Home size={12} /> الرئيسية
          </button>
          <ChevronLeft size={12} color="#C9A24A" />
          <button
            onClick={() => navigate("/products")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#7A5A3A",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ShoppingBag size={12} /> المنتجات
          </button>
          <ChevronLeft size={12} color="#C9A24A" />
          <span style={{ color: "#5A341A", fontWeight: 500 }}>
            {product.nameAr || product.name}
          </span>
        </div>
      </div>

      <main
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "28px 16px 80px",
        }}
      >
        {/* ── Main 2-col ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Images */}
          <div>
            {/* Main image */}
            {/* Zoom hint */}
            {images.length > 0 && (
              <>
                <div
                  style={{
                    position: "absolute",
                    bottom: 44,
                    left: 12,
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(4px)",
                    borderRadius: 6,
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    pointerEvents: "none",
                  }}
                >
                  <ZoomIn size={12} color="#fff" />
                  <span style={{ fontSize: 10, color: "#fff" }}>تكبير</span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(4px)",
                    padding: "3px 10px",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "#5A341A",
                  }}
                >
                  {activeImg + 1} / {images.length}
                </div>
              </>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      overflow: "hidden",
                      aspectRatio: "1",
                      background: "#F5F1EA",
                      border: "none",
                      cursor: "pointer",
                      outline:
                        activeImg === i
                          ? "2px solid #C9A24A"
                          : "1px solid #EFE8DD",
                      opacity: activeImg === i ? 1 : 0.6,
                      transition: "all 0.2s",
                      padding: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={`صورة ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Category */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24A" }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  color: "#C9A24A",
                  textTransform: "uppercase",
                }}
              >
                {product.category}
              </span>
            </div>

            {/* Name */}
            <div>
              <h1
                className="fp"
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#2B1A12",
                }}
              >
                {product.nameAr || product.name}
              </h1>
              {product.nameAr && product.name && (
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "#7A5A3A",
                    marginTop: 4,
                    direction: "ltr",
                  }}
                >
                  {product.name}
                </p>
              )}
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                className="fp"
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "#5A341A",
                  lineHeight: 1,
                }}
              >
                {(product.price * qty).toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#7A5A3A",
                }}
              >
                EGP
              </span>
              {qty > 1 && (
                <span style={{ fontSize: 11, color: "#C9A24A" }}>
                  ({product.price.toLocaleString()} × {qty})
                </span>
              )}
            </div>

            <div style={{ height: 1, background: "#EFE8DD" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#7A5A3A",
                }}
              >
                الكمية
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #EFE8DD",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#5A341A",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#F5F1EA")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  <Minus size={14} />
                </button>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#2B1A12",
                    borderLeft: "1px solid #EFE8DD",
                    borderRight: "1px solid #EFE8DD",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#5A341A",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#F5F1EA")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {product.inStock ? (
                <button
                  onClick={handleWA}
                  style={{
                    flex: 1,
                    minWidth: 200,
                    background: "#25D366",
                    color: "#fff",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "14px 16px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#128C7E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#25D366")
                  }
                >
                  <MessageCircle size={16} /> الطلب من واتساب —{" "}
                  {(product.price * qty).toLocaleString()} EGP
                </button>
              ) : (
                <div
                  style={{
                    flex: 1,
                    minWidth: 200,
                    background: "#EFE8DD",
                    color: "#7A5A3A",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "not-allowed",
                  }}
                >
                  غير متوفر حالياً
                </div>
              )}
              <button
                onClick={() => navigate("/products")}
                className="sweep-btn"
                style={{
                  background: "#5A341A",
                  color: "#fff",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>العودة للمتجر</span>
                <ArrowLeft size={14} />
              </button>
            </div>

            {/* Trust badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {[
                [
                  <Truck size={18} color="#C9A24A" />,
                  "توصيل مجاني",
                  "طلبات فوق 20000 EGP",
                ],
                [
                  <Hammer size={18} color="#C9A24A" />,
                  "صناعة يدوية",
                  "حرفيون ماهرون",
                ],
                [
                  <ShieldCheck size={18} color="#C9A24A" />,
                  "ضمان 3 سنوات",
                  "ضمان هيكلي",
                ],
              ].map(([icon, label, sub]) => (
                <div
                  key={label}
                  style={{
                    background: "#F5F1EA",
                    border: "1px solid #EFE8DD",
                    padding: "10px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 3,
                  }}
                >
                  {icon}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#5A341A",
                      direction: "rtl",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{ fontSize: 9, color: "#7A5A3A", direction: "rtl" }}
                  >
                    {sub}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "rgba(122,90,58,0.55)",
                direction: "rtl",
              }}
            >
              رقم المنتج: <span style={{ color: "#C9A24A" }}>{product.id}</span>
            </p>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ marginTop: 60 }}>
          <div
            className="no-scrollbar"
            style={{
              display: "flex",
              borderBottom: "1px solid #EFE8DD",
              gap: 24,
              marginBottom: 36,
              overflowX: "auto",
            }}
          >
            {[
              ["description", "وصف المنتج"],
              ["materials", "الخامات المستخدمة"],
              ["details", "التفاصيل"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  paddingBottom: 14,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                  border: "none",
                  borderBottom:
                    activeTab === key
                      ? "2px solid #C9A24A"
                      : "2px solid transparent",
                  background: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  color: activeTab === key ? "#5A341A" : "#7A5A3A",
                  transition: "color 0.2s",
                  marginBottom: -1,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Description tab */}
          {activeTab === "description" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: 40,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{ width: 18, height: 1, background: "#C9A24A" }}
                  />
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#C9A24A",
                    }}
                  >
                    وصف المنتج
                  </p>
                </div>
                <p
                  className="fp"
                  style={{
                    fontSize: "1.3rem",
                    fontStyle: "italic",
                    color: "#5A341A",
                    lineHeight: 1.4,
                    marginBottom: 16,
                  }}
                >
                  «حيث يلتقي الإتقان بالراحة»
                </p>
                <p style={{ fontSize: 14, color: "#7A5A3A", lineHeight: 1.9 }}>
                  {product.description}
                </p>
              </div>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "75%",
                  overflow: "hidden",
                  background: "#EFE8DD",
                }}
              >
                {(images[1] || images[0]) && (
                  <img
                    src={images[1] || images[0]}
                    alt="تفاصيل"
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
                  }}
                />
                <div
                  className="float-in"
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(4px)",
                    borderRight: "2px solid #C9A24A",
                    padding: "10px 14px",
                    direction: "rtl",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "#C9A24A",
                      marginBottom: 3,
                    }}
                  >
                    وعد الحرفي
                  </p>
                  <p className="fp" style={{ fontSize: 13, color: "#2B1A12" }}>
                    كل قطعة موقّعة يدوياً من الحرفي الأساسي
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Materials tab */}
          {activeTab === "materials" &&
            (materials.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 16px",
                  color: "#9A8A7A",
                  fontSize: 13,
                }}
              >
                لا توجد خامات مسجلة
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
                  gap: 1,
                  background: "#EFE8DD",
                }}
              >
                {materials.map((m, i) => (
                  <div
                    key={i}
                    style={{ background: "#fff", padding: "28px 24px" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F5F1EA")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    <div
                      style={{
                        width: 20,
                        height: 1,
                        background: "#C9A24A",
                        marginBottom: 14,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#C9A24A",
                        marginBottom: 6,
                      }}
                    >
                      الخامة {i + 1}
                    </p>
                    <p
                      className="fp"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "#2B1A12",
                      }}
                    >
                      {m}
                    </p>
                  </div>
                ))}
                <div
                  style={{
                    background: "#5A341A",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    className="fp"
                    style={{
                      fontStyle: "italic",
                      fontSize: "1rem",
                      color: "#C9A24A",
                      lineHeight: 1.5,
                      marginBottom: 8,
                      direction: "rtl",
                    }}
                  >
                    «نختار فقط أفضل الخامات لكل قطعة أشري»
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    التزامنا
                  </p>
                </div>
              </div>
            ))}

          {/* Details tab */}
          {activeTab === "details" &&
            (Object.entries(details).length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 16px",
                  color: "#9A8A7A",
                  fontSize: 13,
                  direction: "rtl",
                }}
              >
                لا توجد تفاصيل إضافية
              </div>
            ) : (
              <div style={{ border: "1px solid #EFE8DD" }}>
                {Object.entries(details).map(([key, value], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 20px",
                      borderBottom: "1px solid #EFE8DD",
                      direction: "rtl",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F5F1EA")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#C9A24A",
                      }}
                    >
                      {key}
                    </span>
                    <span
                      className="fp"
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: "#2B1A12",
                      }}
                    >
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
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
                منتجات مشابهة
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: 16,
              }}
            >
              {related.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onNavigate={(relatedId) => navigate(`/product/${relatedId}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Zoom modal ── */}
      {zoomed && images[activeImg] && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0,0,0,0.93)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <img
            src={images[activeImg]}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              cursor: "pointer",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg((i) => (i - 1 + images.length) % images.length);
                }}
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.12)",
                  border: "none",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg((i) => (i + 1) % images.length);
                }}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.12)",
                  border: "none",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
