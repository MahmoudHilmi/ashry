/**
 * src/components/ProductCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Single product card shown in the grid.
 * onNavigate(id) is called when the card is clicked — the parent
 * (GridPage) uses React Router's navigate() to go to /product/:id.
 * ─────────────────────────────────────────────────────────────────
 */
import { useState } from "react";

const WHATSAPP_NUMBER = "201026226361"; // ← User updated WhatsApp number

const badgeStyle = {
  الأفضل: { bg: "#5A341A", color: "#fff" },
  جديد: { bg: "#C9A24A", color: "#fff" },
  محدود: { bg: "#2B1A12", color: "#C9A24A" },
  مميز: { bg: "#EFE8DD", color: "#5A341A" },
  مخصص: { bg: "#7A5A3A", color: "#fff" },
};

const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ProductCard({ product, index, onNavigate }) {
  const [hov, setHov] = useState(false);
  const badge = product.badge ? badgeStyle[product.badge] : null;

  // WhatsApp quick-order (stops card click from firing)
  const handleWA = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `مرحباً، أود الاستفسار عن:\n\n🪑 *${product.name}*\n🆔 رقم المنتج: ${product.id}\n💰 السعر: ${product.price.toLocaleString()} EGP\n🔩 المواد: ${product.materials.join("، ")}\n\nأرجو التواصل معي. شكراً!`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div
      onClick={() => onNavigate(product.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: "1px solid #EFE8DD",
        overflow: "hidden",
        cursor: "pointer",
        animation: "cardIn 0.5s ease both",
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
      {/* ── Image ──────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          paddingBottom: "75%",
          overflow: "hidden",
          background: "#F5F1EA",
          flexShrink: 0,
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="img-zoom"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark gradient on hover */}
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

        {/* Badge */}
        {badge && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "3px 10px",
              fontSize: 10,
              fontWeight: 700,
              background: badge.bg,
              color: badge.color,
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Out of stock overlay */}
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

        {/* Hover corner accents + CTA hint */}
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

      {/* ── Body ───────────────────────────────────────────── */}
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
          <span style={{ fontSize: 9, color: "rgba(122,90,58,0.45)" }}>
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
          {product.name}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: "rgba(122,90,58,0.7)",
            marginBottom: 10,
            direction: "rtl",
          }}
        >
          {product.nameAr}
        </p>

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

        {/* Material chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginBottom: 12,
          }}
        >
          {product.materials.slice(0, 2).map((m) => (
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
          {product.materials.length > 2 && (
            <span
              style={{
                fontSize: 9,
                border: "1px solid #EFE8DD",
                color: "#C9A24A",
                padding: "2px 7px",
                background: "#F5F1EA",
              }}
            >
              +{product.materials.length - 2}
            </span>
          )}
        </div>

        {/* Price + CTA row */}
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
