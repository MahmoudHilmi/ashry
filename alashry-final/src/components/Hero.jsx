import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import Header from "./Header";

const STATS = [
  { num: "20+", label: "عاماً من الخبرة", sub: "Years of craft" },
  { num: "500+", label: "قطعة مميزة", sub: "Unique pieces" },
  { num: "4k+", label: "عائلة سعيدة", sub: "Happy families" },
];

const CATEGORIES = [
  {
    emoji: "🛏",
    name: "غرف نوم",
    count: "+80 قطعة",
    href: "/products?cat=bedroom",
  },
  {
    emoji: "🧸",
    name: "غرف أطفال",
    count: "+60 قطعة",
    href: "/products?cat=kids",
  },
  {
    emoji: "🛋",
    name: "قطع منفردة",
    count: "+40 قطعة",
    href: "/products?cat=single",
  },
];

/* ─── tiny spring counter hook ─────────────────────────────────── */
function useCountUp(target, active, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const isPlus = String(target).endsWith("+");
    const num = parseInt(target);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      setVal(Math.floor(eased * num) + (isPlus ? "+" : ""));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active]);
  return val || "0";
}

function StatItem({ num, label, sub, active }) {
  const val = useCountUp(num, active);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
          fontWeight: 700,
          color: "#C9A24A",
          lineHeight: 1,
          letterSpacing: "-0.01em",
        }}
      >
        {val}
      </span>
      <span style={{ fontSize: 13, color: "#EFE8DD", fontWeight: 500 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(201,162,74,0.5)",
        }}
      >
        {sub}
      </span>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [vis, setVis] = useState(false); // entrance animation
  const [statsOn, setStatsOn] = useState(false); // counter trigger
  const [hovCat, setHovCat] = useState(null);

  /* entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* trigger counter when stats bar enters viewport */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsOn(true);
      },
      { threshold: 0.4 },
    );
    if (statsRef.current) ob.observe(statsRef.current);
    return () => ob.disconnect();
  }, []);

  /* staggered fade-up helper */
  const up = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  });

    const handleWA = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `مرحباً، أود الاستفسار عن:\n\n🪑 *${product.name}*\n🆔 رقم المنتج: ${product.id}\n💰 السعر: ${product.price.toLocaleString()} EGP\n🔩 المواد: ${product.materials.join("، ")}\n\nأرجو التواصل معي. شكراً!`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Tajawal:wght@300;400;500;700&display=swap');

        .hero-root *,
        .hero-root *::before,
        .hero-root *::after { box-sizing: border-box; }

        /* subtle grain overlay */
        .hero-grain::before {
          content: '';
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px;
          opacity: 0.5;
        }

        /* dot pattern */
        .dot-bg {
          background-image: radial-gradient(circle, #C9A24A18 1px, transparent 1px);
          background-size: 22px 22px;
        }

        /* spinning ring */
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .spin-ring { animation: spinRing 22s linear infinite; }

        /* floating card */
        @keyframes floatCard {
          0%,100% { transform: translateY(0);   }
          50%     { transform: translateY(-7px); }
        }
        .float-card { animation: floatCard 4.5s ease-in-out infinite; }

        /* gold sweep button */
        .btn-sweep { position: relative; overflow: hidden; isolation: isolate; }
        .btn-sweep::after {
          content: ''; position: absolute; inset: 0;
          background: #C9A24A; transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(.4,0,.2,1); z-index: 0;
        }
        .btn-sweep:hover::after { transform: translateX(0); }
        .btn-sweep > * { position: relative; z-index: 1; }

        /* outline btn hover */
        .btn-outline-gold {
          border: 1px solid rgba(201,162,74,0.5);
          transition: border-color 0.3s, background 0.3s, color 0.3s;
        }
        .btn-outline-gold:hover {
          border-color: #C9A24A; background: #C9A24A; color: #fff;
        }

        /* category card */
        .cat-card {
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s, background 0.3s;
        }
        .cat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 48px rgba(43,26,18,0.18);
          background: rgba(201,162,74,0.12) !important;
        }

        /* scrollbar */
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#F5F1EA; }
        ::-webkit-scrollbar-thumb { background:#C9A24A55; border-radius:2px; }

        /* diagonal divider shape */
        .diagonal-cut {
          clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
        }

        /* marquee */
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .marquee-track { animation: marquee 18s linear infinite; will-change: transform; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div
        className="hero-root"
        style={{
          fontFamily: "'Tajawal',sans-serif",
          background: "#F5F1EA",
          color: "#2B1A12",
          overflowX: "hidden",
        }}
      >
        <Header />

        {/* ═══════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════ */}
        <section
          className="hero-grain"
          style={{
            position: "relative",
            minHeight: "calc(100vh - 68px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            overflow: "hidden",
          }}
        >
          {/* Dot texture */}
          <div
            className="dot-bg"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.4,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Warm ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "-15%",
              right: "10%",
              width: "55vw",
              height: "55vw",
              maxWidth: 700,
              background:
                "radial-gradient(circle, rgba(201,162,74,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* ── LEFT PANEL ──────────────────────────────── */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(40px,7vw,96px) clamp(24px,5vw,72px)",
              minHeight: "100%",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                ...up(0),
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div style={{ width: 36, height: 1, background: "#C9A24A" }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#C9A24A",
                  fontWeight: 500,
                }}
              >
                Est. 2005 · Premium Furniture
              </span>
              <div style={{ width: 36, height: 1, background: "#C9A24A" }} />
            </div>

            {/* Main heading — large, editorial */}
            <h1
              style={{
                ...up(120),
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.8rem,6vw,5.2rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                color: "#2B1A12",
                marginBottom: 0,
                letterSpacing: "-0.02em",
              }}
            >
              مصممة <br />
              <em style={{ color: "#5A341A", fontStyle: "italic" }}>
                تعيش
              </em>{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                سنين
                {/* gold underline accent */}
                <span
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "linear-gradient(90deg,#C9A24A,#EFE8DD)",
                    transform: vis ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.8s cubic-bezier(.4,0,.2,1) 600ms",
                  }}
                />
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                ...up(220),
                fontSize: "clamp(1rem,2vw,1.4rem)",
                fontWeight: 300,
                color: "#7A5A3A",
                letterSpacing: "0.04em",
                marginTop: 16,
                marginBottom: 12,
                direction: "rtl",
              }}
            >
              فخامة تعيش معاك سنين
            </p>

            {/* Body copy */}
            <p
              style={{
                ...up(300),
                fontSize: 14,
                lineHeight: 1.9,
                color: "#7A5A3A",
                maxWidth: 420,
                marginBottom: 36,
              }}
            >
              كل قطعة في مجموعتنا شهادة على براعة الحرفيين وإتقانهم — خشب مختار،
              جلد أصيل، وتصميم يتحدى الزمن.
            </p>

            {/* CTA row */}
            <div
              style={{
                ...up(420),
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              {/* Primary */}
              <button
                onClick={() => navigate("/products")}
                className="btn-sweep"
                style={{
                  background: "#5A341A",
                  color: "#fff",
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "14px 36px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Tajawal',sans-serif",
                  fontWeight: 500,
                }}
              >
                <span>اكتشف المجموعة</span>
              </button>

              {/* Secondary */}
              <button
                onClick={() => navigate("/products")}
                className="btn-outline-gold"
                style={{
                  background: "transparent",
                  color: "#5A341A",
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  cursor: "pointer",
                  fontFamily: "'Tajawal',sans-serif",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                تصفح المنتجات
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Stats row */}
            <div
              style={{
                ...up(540),
                display: "flex",
                gap: 32,
                marginTop: 44,
                paddingTop: 28,
                borderTop: "1px solid #EFE8DD",
                flexWrap: "wrap",
              }}
            >
              {STATS.map((s, i) => (
                <StatItem key={i} {...s} active={statsOn} />
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ─────────────────────────────── */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              minHeight: 360,
              overflow: "hidden",
              display: "flex",
              alignItems: "stretch",
            }}
          >
            {/* Slider fills the whole right panel */}
            <div style={{ position: "absolute", inset: 0 }}>
              <Slider />
            </div>

            {/* Dark vignette overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(90,52,26,0.25) 0%, transparent 55%)",
                pointerEvents: "none",
              }}
            />

            {/* Spinning ring badge — top-right */}
            <div
              className="spin-ring"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 80,
                height: 80,
                border: "1px solid rgba(201,162,74,0.55)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic",
                  fontSize: 11,
                  color: "#C9A24A",
                  letterSpacing: "0.05em",
                }}
              >
                الفخامة
              </span>
            </div>

            {/* Floating info card — bottom-left */}
            <div
              className="float-card"
              style={{
                position: "absolute",
                bottom: 28,
                left: 20,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                borderLeft: "3px solid #C9A24A",
                padding: "14px 18px",
                maxWidth: 220,
                boxShadow: "0 20px 60px rgba(43,26,18,0.2)",
              }}
            >
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A24A",
                  marginBottom: 5,
                }}
              >
                أحدث قطع 2026
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 14,
                  color: "#2B1A12",
                  lineHeight: 1.5,
                }}
              >
                الأفضل في القطع لمنزلك
              </p>
            </div>

            {/* Gold corner accents */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                width: 48,
                height: 48,
                borderBottom: "2px solid rgba(201,162,74,0.65)",
                borderRight: "2px solid rgba(201,162,74,0.65)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 48,
                height: 48,
                borderTop: "2px solid rgba(201,162,74,0.65)",
                borderLeft: "2px solid rgba(201,162,74,0.65)",
                pointerEvents: "none",
              }}
            />

            {/* Image counter pill (decorative) */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                right: 20,
                background: "rgba(43,26,18,0.7)",
                backdropFilter: "blur(6px)",
                padding: "4px 12px",
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "rgba(239,232,221,0.8)",
              }}
            >
              01 / 04
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            MARQUEE STRIP
        ═══════════════════════════════════════════════════ */}
        <div
          style={{
            background: "#C9A24A",
            overflow: "hidden",
            padding: "10px 0",
            borderTop: "1px solid rgba(201,162,74,0.3)",
          }}
        >
          <div
            className="marquee-track"
            style={{
              display: "flex",
              gap: 0,
              width: "max-content",
            }}
          >
            {[...Array(2)].map((_, rep) =>
              [
                "صناعة يدوية ✦",
                "خشب صلب ✦",
                "جلد إيطالي ✦",
                "تصميم مصري ✦",
                "ضمان 3 سنوات ✦",
                "توصيل مجاني ✦",
                "تخصيص حسب الطلب ✦",
              ].map((t, i) => (
                <span
                  key={`${rep}-${i}`}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#2B1A12",
                    fontWeight: 700,
                    padding: "0 28px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t}
                </span>
              )),
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            CATEGORY STRIP
        ═══════════════════════════════════════════════════ */}
        <section
          ref={statsRef}
          style={{
            background: "#2B1A12",
            padding: "clamp(28px,4vw,48px) clamp(16px,4vw,48px)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%,200px), 1fr))",
              gap: 2,
              background: "rgba(201,162,74,0.1)",
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.name}
                className="cat-card"
                onClick={() => navigate(cat.href)}
                style={{
                  background: "transparent",
                  padding: "32px 28px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  borderRight:
                    i < CATEGORIES.length - 1
                      ? "1px solid rgba(201,162,74,0.15)"
                      : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Number label */}
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 11,
                    color: "rgba(201,162,74,0.35)",
                    letterSpacing: "0.1em",
                  }}
                >
                  0{i + 1}
                </span>

                {/* Icon area */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    border: "1px solid rgba(201,162,74,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginTop: 8,
                  }}
                >
                  {cat.emoji}
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#EFE8DD",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {cat.name}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#C9A24A",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {cat.count}
                  </p>
                </div>

                {/* Hover arrow */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(201,162,74,0.5)",
                    marginTop: 4,
                    transition: "color 0.2s",
                  }}
                >
                  تصفح
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
