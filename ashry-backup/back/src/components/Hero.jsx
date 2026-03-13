import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Shield,
  Truck,
  Wrench,
  Bed,
  Baby,
  Sofa,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";
import Slider from "./Slider";
import Header from "./Header";

/* ─── constants ─────────────────────────────────────────────── */
const STATS = [
  { num: "20+", label: "عاماً من الخبرة", sub: "Years of craft" },
  { num: "500+", label: "قطعة مميزة", sub: "Unique pieces" },
  { num: "4k+", label: "عائلة سعيدة", sub: "Happy families" },
];

const CATEGORIES = [
  {
    Icon: Bed,
    name: "غرف نوم",
    count: "+80 قطعة",
    href: "/products?cat=bedroom",
  },
  {
    Icon: Baby,
    name: "غرف أطفال",
    count: "+60 قطعة",
    href: "/products?cat=kids",
  },
  {
    Icon: Sofa,
    name: "قطع منفردة",
    count: "+40 قطعة",
    href: "/products?cat=single",
  },
];

const MARQUEE_ITEMS = [
  { Icon: Wrench, text: "صناعة يدوية" },
  { Icon: Shield, text: "ضمان ٣ سنوات" },
  { Icon: Truck, text: "توصيل مجاني" },
  { Icon: Star, text: "خشب صلب" },
  { Icon: Sparkles, text: "جلد إيطالي" },
  { Icon: Award, text: "تصميم مصري" },
];

/* ─── spring counter hook ────────────────────────────────────── */
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

/* ─── stat item ─────────────────────────────────────────────── */
function StatItem({ num, label, sub, active }) {
  const val = useCountUp(num, active);
  return (
    <div className="stat-item">
      <span className="stat-num">{val}</span>
      <span className="stat-label">{label}</span>
      <span className="stat-sub">{sub}</span>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────── */
export default function Hero() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [statsOn, setStatsOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsOn(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) ob.observe(statsRef.current);
    return () => ob.disconnect();
  }, []);

  const up = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Tajawal:wght@300;400;500;700&display=swap');



        :root {
          --gold: #C9A24A;
          --gold-light: rgba(201,162,74,0.15);
          --gold-muted: rgba(201,162,74,0.5);
          --dark: #2B1A12;
          --brown: #5A341A;
          --cream: #F5F1EA;
          --cream-2: #EFE8DD;
          --text-muted: #7A5A3A;
          --serif: 'Playfair Display', serif;
          --sans: 'Tajawal', sans-serif;
        }

        .hr {
          font-family: var(--sans);
          background: var(--cream);
          color: var(--dark);
          overflow-x: hidden;
          direction: ltr;
        }

        /* ── HERO SECTION ── */
        .hero-section {
          position: relative;
          min-height: calc(100svh - 64px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }

        /* dot pattern */
        .dot-bg {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image: radial-gradient(circle, #C9A24A18 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.5;
        }

        /* glow */
        .hero-glow {
          position: absolute; top: -10%; right: 8%;
          width: min(55vw, 600px); height: min(55vw, 600px);
          background: radial-gradient(circle, rgba(201,162,74,0.1) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none; z-index: 1;
        }

        /* ── LEFT PANEL ── */
        .hero-left {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; justify-content: center;
          padding: clamp(32px,6vw,88px) clamp(20px,5vw,64px);
        }

        @media (max-width: 768px) {
          .hero-left {
            padding: 36px 20px 28px;
            order: 2;
          }
        }

        .eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
        }
        .eyebrow-line { flex: 0 0 28px; height: 1px; background: var(--gold); }
        .eyebrow-text {
          font-size: 9px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--gold); font-weight: 500;
        }

        .hero-h1 {
          font-family: var(--serif);
          font-size: clamp(2.4rem, 5.5vw, 4.8rem);
          font-weight: 800; line-height: 1.1;
          color: var(--dark); letter-spacing: -0.02em;
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .hero-h1 { font-size: clamp(2.2rem, 8vw, 3rem); }
        }

        .hero-h1-italic { color: var(--brown); font-style: italic; }

        .gold-underline-wrap { position: relative; display: inline-block; }
        .gold-underline {
          position: absolute; bottom: 4px; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--cream-2));
          transform-origin: right;
          transition: transform 0.8s cubic-bezier(.4,0,.2,1) 600ms;
        }

        .hero-tagline {
          font-size: clamp(0.95rem, 1.8vw, 1.3rem);
          font-weight: 300; color: var(--text-muted);
          letter-spacing: 0.04em; margin-top: 14px; margin-bottom: 10px;
        }

        .hero-body {
          font-size: 13px; line-height: 1.9;
          color: var(--text-muted); max-width: 400px; margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .hero-body { max-width: 100%; font-size: 13px; }
        }

        /* CTA */
        .cta-row {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }

        .btn-primary {
          position: relative; overflow: hidden; isolation: isolate;
          background: var(--brown); color: #fff;
          font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 13px 32px; border: none; cursor: pointer;
          font-family: var(--sans); font-weight: 500;
          display: flex; align-items: center; gap: 8px;
          transition: color 0.35s;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: var(--gold); transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(.4,0,.2,1); z-index: 0;
        }
        .btn-primary:hover::after { transform: translateX(0); }
        .btn-primary > * { position: relative; z-index: 1; }

        .btn-secondary {
          background: transparent; color: var(--brown);
          font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 13px 24px; cursor: pointer;
          font-family: var(--sans); font-weight: 500;
          border: 1px solid rgba(201,162,74,0.45);
          display: flex; align-items: center; gap: 8px;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .btn-secondary:hover {
          background: var(--gold); color: #fff; border-color: var(--gold);
        }

        /* Stats */
        .stats-row {
          display: flex; gap: 28px; flex-wrap: wrap;
          margin-top: 40px; padding-top: 24px;
          border-top: 1px solid var(--cream-2);
        }

        @media (max-width: 480px) {
          .stats-row { gap: 20px; justify-content: space-between; }
        }

        .stat-item { display: flex; flex-direction: column; gap: 3px; }
        .stat-num {
          font-family: var(--serif);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700; color: var(--gold); line-height: 1;
        }
        .stat-label { font-size: 12px; color: var(--cream-2); font-weight: 500; }
        .stat-sub {
          font-size: 9px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--gold-muted);
        }

        /* ── RIGHT PANEL ── */
        .hero-right {
          position: relative; z-index: 2;
          min-height: 340px; overflow: hidden;
          display: flex; align-items: stretch;
        }

        @media (max-width: 768px) {
          .hero-right { min-height: 260px; order: 1; }
        }

        .hero-right-slider { position: absolute; inset: 0; }
        .hero-right-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(90,52,26,0.22) 0%, transparent 55%);
        }

        /* Spinning ring */
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .spin-ring {
          position: absolute; top: 16px; right: 16px;
          width: 72px; height: 72px;
          border: 1px solid rgba(201,162,74,0.5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          animation: spinRing 22s linear infinite;
          pointer-events: none;
        }
        .spin-ring-text {
          font-family: var(--serif); font-style: italic;
          font-size: 10px; color: var(--gold); letter-spacing: 0.05em;
        }

        /* Float card */
        @keyframes floatCard {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .float-card {
          position: absolute; bottom: 24px; left: 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-right: 3px solid var(--gold);
          padding: 12px 16px; max-width: 200px;
          animation: floatCard 4s ease-in-out infinite;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .float-card { max-width: 160px; padding: 10px 12px; }
        }

        .float-card-eyebrow {
          font-size: 8px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 4px;
        }
        .float-card-title {
          font-family: var(--serif); font-size: 13px;
          color: var(--dark); line-height: 1.4;
        }

        /* Corner accents */
        .corner { position: absolute; width: 40px; height: 40px; pointer-events: none; }
        .corner-br { bottom: 16px; right: 16px;
          border-bottom: 1.5px solid rgba(201,162,74,0.6);
          border-right: 1.5px solid rgba(201,162,74,0.6); }
        .corner-tl { top: 16px; left: 16px;
          border-top: 1.5px solid rgba(201,162,74,0.6);
          border-left: 1.5px solid rgba(201,162,74,0.6); }

        /* Counter pill */
        .img-counter {
          position: absolute; bottom: 24px; right: 16px;
          background: rgba(43,26,18,0.7); backdrop-filter: blur(6px);
          padding: 3px 10px; font-size: 9px;
          letter-spacing: 0.12em; color: rgba(239,232,221,0.8);
          pointer-events: none;
        }

        /* ── MARQUEE ── */
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-outer {
          background: var(--gold); overflow: hidden;
          padding: 9px 0;
          border-top: 1px solid rgba(201,162,74,0.3);
        }
        .marquee-track {
          display: flex; width: max-content;
          animation: marquee 20s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-item {
          display: flex; align-items: center; gap: 7px;
          padding: 0 24px; white-space: nowrap;
          font-size: 9px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--dark);
          font-weight: 700;
        }

        /* ── CATEGORIES ── */
        .cat-section {
          background: var(--dark);
          padding: clamp(24px,4vw,44px) clamp(16px,4vw,44px);
        }

        .cat-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--gold-light);
        }

        @media (max-width: 600px) {
          .cat-grid { grid-template-columns: 1fr; gap: 2px; }
          .cat-card { border-right: none !important; border-bottom: 1px solid rgba(201,162,74,0.15); }
          .cat-card:last-child { border-bottom: none; }
        }

        .cat-card {
          position: relative; overflow: hidden;
          padding: 28px 24px; cursor: pointer;
          display: flex; flex-direction: column; gap: 14px;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1),
                      background 0.3s, box-shadow 0.3s;
          -webkit-tap-highlight-color: transparent;
        }
        .cat-card:hover, .cat-card:focus-visible {
          background: rgba(201,162,74,0.1);
          box-shadow: 0 16px 40px rgba(43,26,18,0.2);
        }
        .cat-card:active { transform: scale(0.98); }

        @media (hover: hover) {
          .cat-card:hover { transform: translateY(-4px); }
        }

        .cat-num {
          position: absolute; top: 14px; left: 14px;
          font-family: var(--serif); font-size: 10px;
          color: rgba(201,162,74,0.3); letter-spacing: 0.1em;
        }

        .cat-icon-box {
          width: 48px; height: 48px;
          border: 1px solid rgba(201,162,74,0.3);
          display: flex; align-items: center; justify-content: center;
          margin-top: 6px; color: var(--gold);
          transition: background 0.3s, border-color 0.3s;
        }
        .cat-card:hover .cat-icon-box {
          background: rgba(201,162,74,0.12);
          border-color: rgba(201,162,74,0.6);
        }

        .cat-name {
          font-size: 12px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--cream-2);
          font-weight: 600;
        }
        .cat-count { font-size: 10px; color: var(--gold); letter-spacing: 0.08em; margin-top: 3px; }

        .cat-cta {
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(201,162,74,0.5);
          transition: color 0.2s, gap 0.2s;
        }
        .cat-card:hover .cat-cta { color: var(--gold); gap: 8px; }

        /* ── TOUCH FEEDBACK ── */
        @media (hover: none) {
          .cat-card:active { background: rgba(201,162,74,0.1); }
          .btn-primary:active::after { transform: translateX(0); }
          .btn-secondary:active { background: var(--gold); color: #fff; }
        }

        /* ── FOCUS VISIBLE ── */
        .btn-primary:focus-visible,
        .btn-secondary:focus-visible,
        .cat-card:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
        }
      `}</style>

      <div className="hr">
        <Header />

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="hero-section">
          <div className="dot-bg" />
          <div className="hero-glow" />

          {/* Left */}
          <div className="hero-left">
            <div style={up(0)} className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">
                Est. 2005 · Premium Furniture
              </span>
              <div className="eyebrow-line" />
            </div>

            <h1 style={up(120)} className="hero-h1 font-black">
مصممة تعيش سنين
            </h1>

            <p style={up(220)} className="hero-tagline">
              فخامة تعيش معاك سنين
            </p>

            <p style={up(300)} className="hero-body">
              كل قطعة في مجموعتنا شهادة على براعة الحرفيين وإتقانهم — خشب مختار،
              جلد أصيل، وتصميم يتحدى الزمن.
            </p>

            <div style={up(400)} className="cta-row">
              <button
                onClick={() => navigate("/products")}
                className="btn-primary"
                aria-label="اكتشف المجموعة"
              >
                <span>اكتشف المجموعة</span>
                <ArrowLeft size={13} />
              </button>
              <button
                onClick={() => navigate("/products")}
                className="btn-secondary"
                aria-label="تصفح المنتجات"
              >
                تصفح المنتجات
                <ArrowRight size={13} />
              </button>
            </div>

            <div ref={statsRef} style={up(520)} className="stats-row">
              {STATS.map((s, i) => (
                <StatItem key={i} {...s} active={statsOn} />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hero-right">
            <div className="hero-right-slider">
              <Slider />
            </div>
            <div className="hero-right-overlay" />


            <div className="float-card">
              <p className="float-card-eyebrow">أحدث قطع 2026</p>
              <p className="float-card-title">الأفضل في القطع لمنزلك</p>
            </div>

            <div className="corner corner-br" />
            <div className="corner corner-tl" />

            <div className="img-counter">01 / 04</div>
          </div>
        </section>

        {/* ══ MARQUEE ═══════════════════════════════════════════ */}
        <div className="marquee-outer" role="marquee" aria-label="مميزاتنا">
          <div className="marquee-track">
            {[...Array(2)].map((_, rep) =>
              MARQUEE_ITEMS.map(({ Icon, text }, i) => (
                <span key={`${rep}-${i}`} className="marquee-item">
                  <Icon size={11} aria-hidden="true" />
                  {text}
                </span>
              )),
            )}
          </div>
        </div>

        {/* ══ CATEGORIES ════════════════════════════════════════ */}
        <section className="cat-section">
          <div className="cat-grid">
            {CATEGORIES.map(({ Icon, name, count, href }, i) => (
              <div
                key={name}
                className="cat-card"
                onClick={() => navigate(href)}
                role="button"
                tabIndex={0}
                aria-label={`تصفح ${name}`}
                onKeyDown={(e) => e.key === "Enter" && navigate(href)}
                style={{
                  borderRight:
                    i < CATEGORIES.length - 1
                      ? "1px solid rgba(201,162,74,0.15)"
                      : "none",
                }}
              >
                <span className="cat-num">0{i + 1}</span>

                <div className="cat-icon-box">
                  <Icon size={20} aria-hidden="true" />
                </div>

                <div>
                  <p className="cat-name">{name}</p>
                  <p className="cat-count">{count}</p>
                </div>

                <div className="cat-cta">
                  تصفح
                  <ChevronRight size={11} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}