import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`

    


    @keyframes pageIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    @keyframes spinIt { to { transform:rotate(360deg); } }
    @keyframes floatUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes lineGrow { from { transform:scaleX(0); } to { transform:scaleX(1); } }
    @keyframes countUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeSlide { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }

    .page-in   { animation: pageIn 0.5s cubic-bezier(0.4,0,0.2,1) both; }
    .spin-slow { animation: spinIt 22s linear infinite; }
    .float-in  { animation: floatUp 0.7s ease 0.4s both; }
    .line-grow { animation: lineGrow 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s both; transform-origin: left; }
    .fade-slide { animation: fadeSlide 0.6s ease both; }

    .dot-bg {
      background-image: radial-gradient(circle, #C9A24A14 1px, transparent 1px);
      background-size: 20px 20px;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #F5F1EA; }
    ::-webkit-scrollbar-thumb { background: #C9A24A55; border-radius: 2px; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .underline-nav { position: relative; }
    .underline-nav::after {
      content:''; position:absolute; bottom:-3px; left:0; right:0;
      height:1px; background:#C9A24A;
      transform:scaleX(0); transform-origin:left; transition:transform 0.3s;
    }
    .underline-nav:hover::after { transform:scaleX(1); }

    .sweep-btn { position:relative; overflow:hidden; }
    .sweep-btn::after {
      content:''; position:absolute; inset:0; background:#C9A24A;
      transform:translateX(-101%); transition:transform 0.35s cubic-bezier(0.4,0,0.2,1); z-index:0;
    }
    .sweep-btn:hover::after { transform:translateX(0); }
    .sweep-btn > * { position:relative; z-index:1; }

    .card-hover { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(90,52,26,0.14); }

    @media (min-width: 768px) { .hidden-mobile { display:flex !important; } .show-mobile { display:none !important; } }
    @media (max-width: 767px) { .hidden-mobile { display:none !important; } .show-mobile { display:flex !important; } }
  `}</style>
);

// ─── ANIMATED NUMBER ──────────────────────────────────────────────────────────
function AnimatedNum({ target, delay }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = null;
      const dur = 1800;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        setVal(Math.floor(ease * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return <>{val}</>;
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ onNavigate }) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: "🪵",
      title: "الأصالة",
      desc: "كل خشبة مختارة بعين الخبير، كل خيطة مُحكمة بيد الحرفي. لا مجال للتهاون في جودة ما نُقدّمه.",
    },
    {
      icon: "⏳",
      title: "الديمومة",
      desc: "نصنع لأجيال، لا لموسم. كل قطعة مُصممة لتُورَّث، تحمل ذكريات بيتك لعقود قادمة.",
    },
    {
      icon: "✋",
      title: "الحرفية",
      desc: "ورشاتنا تجمع بين الحكمة التقليدية وأدوات العصر. الحرفي عندنا فنان، والأثاث لوحته.",
    },
    {
      icon: "🤝",
      title: "الشراكة",
      desc: "علاقتنا بعملائنا لا تنتهي عند التسليم. نرافقك في تصميم مساحتك، ونضمن رضاك لسنوات.",
    },
  ];

  const timeline = [
    {
      year: "2005",
      title: "البداية",
      desc: "أسّس المهندس أحمد الأشري الورشة الأولى في القاهرة بعشرين عاماً من الخبرة والحلم.",
    },
    {
      year: "2010",
      title: "التوسع",
      desc: "فتحنا أبوابنا لأول معرض متخصص. ألف عائلة مصرية اختارت الأشري لبيتها.",
    },
    {
      year: "2016",
      title: "الشهرة",
      desc: "حصلنا على جائزة أفضل صناعة أثاث مصرية. أصبحنا علامة مرجعية في السوق المحلي.",
    },
    {
      year: "2020",
      title: "الرقمنة",
      desc: "أطلقنا منصتنا الرقمية لتوصيل فخامة الأشري إلى كل بيت في مصر والوطن العربي.",
    },
    {
      year: "2025",
      title: "المستقبل",
      desc: "اليوم نخطو نحو أفق جديد: تصاميم حصرية، مواد مستدامة، وتجربة عملاء لا مثيل لها.",
    },
  ];

  const team = [
    {
      name: "أحمد العشري",
      role: "المؤسس والمدير الإبداعي",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      quote: "الأثاث ليس سلعة، هو جزء من هوية البيت.",
    },
    {
      name: "صديق العشري",
      role: "مديرة التصميم الداخلي",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      quote: "كل غرفة تحكي قصة صاحبها — مهمتنا أن نجعلها قصة جميلة.",
    },
    {
      name: "محمد المحمدي",
      role: "كبير الحرفيين",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      quote: "أربعون عاماً وما زلت أتعلم من كل قطعة خشب.",
    },
  ];

  return (
    <div className="page-in" style={{ width: "100%" }}>
      {/* ── HERO ── */}
      <div
        className="dot-bg"
        style={{
          background: "#EFE8DD",
          borderBottom: "1px solid rgba(201,162,74,0.2)",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="fp"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "clamp(6rem,20vw,18rem)",
            fontWeight: 700,
            color: "rgba(201,162,74,0.07)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          ASHRY
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "60px 16px 70px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A24A",
              }}
            >
              من نحن
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <h1
                className="fp"
                style={{
                  fontSize: "clamp(2rem,5.5vw,4rem)",
                  fontWeight: 700,
                  color: "#2B1A12",
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                نصنع الأثاث
                <br />
                <span style={{ color: "#C9A24A", fontStyle: "italic" }}>
                  كأنه الأخير
                </span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(14px,2vw,17px)",
                  color: "#7A5A3A",
                  lineHeight: 2,
                  direction: "rtl",
                  maxWidth: 520,
                }}
              >
                منذ عام 2005، نُقدّم للبيت المصري أثاثاً يجمع بين روح الشرق
                وحِرفية الغرب. كل قطعة نصنعها تحمل بصمة يد إنسانة وقلب يعشق
                الجمال.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 28,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => onNavigate("grid")}
                  className="sweep-btn"
                  style={{
                    background: "#5A341A",
                    color: "#fff",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "13px 28px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  <Link to="/products">تصفح مجموعاتنا</Link>
                </button>
                <button
                  style={{
                    background: "transparent",
                    color: "#5A341A",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "13px 28px",
                    border: "1px solid #C9A24A",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  احجز زيارة
                </button>
              </div>
            </div>

            {/* Hero image collage */}
            <div style={{ position: "relative", height: 400 }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "65%",
                  height: "75%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dchhjoguv/image/upload/v1773509309/2_bwcnzg.png"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "55%",
                  height: "60%",
                  overflow: "hidden",
                  border: "4px solid #F5F1EA",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dchhjoguv/image/upload/v1773509299/5_riufkz.png"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                className="spin-slow"
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "40%",
                  width: 80,
                  height: 80,
                  border: "1px solid rgba(201,162,74,0.6)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="fp"
                  style={{ fontStyle: "italic", fontSize: 9, color: "#C9A24A" }}
                >
                  2005
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  borderTop: "2px solid #C9A24A",
                  borderRight: "2px solid #C9A24A",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 32,
                  height: 32,
                  borderBottom: "2px solid #C9A24A",
                  borderLeft: "2px solid #C9A24A",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div ref={statsRef} style={{ background: "#5A341A", width: "100%" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "50px 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 32,
            }}
          >
            {[
              [20, "+", "عاماً من الخبرة", 0],
              [4000, "+", "عائلة سعيدة", 200],
              [500, "+", "قطعة مصنوعة", 400],
              [98, "%", "نسبة الرضا", 600],
            ].map(([v, s, l, d]) => (
              <div
                key={l}
                style={{
                  textAlign: "center",
                  borderRight: "1px solid rgba(201,162,74,0.2)",
                  padding: "0 16px",
                }}
              >
                <p
                  className="fp"
                  style={{
                    fontSize: "clamp(2rem,4vw,3rem)",
                    fontWeight: 700,
                    color: "#C9A24A",
                    lineHeight: 1,
                  }}
                >
                  {statsVisible ? <AnimatedNum target={v} delay={d} /> : 0}
                  {s}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(239,232,221,0.6)",
                    marginTop: 6,
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STORY ── */}
      <div style={{ width: "100%", background: "#fff" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "70px 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: 60,
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "120%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dchhjoguv/image/upload/v1773509162/7_rrcavp.png"
                  alt="Our workshop"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(43,26,18,0.4) 0%, transparent 60%)",
                  }}
                />
              </div>
              <div
                className="float-in"
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: -16,
                  background: "#5A341A",
                  padding: "20px 24px",
                  maxWidth: 220,
                  boxShadow: "0 20px 60px rgba(43,26,18,0.3)",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(201,162,74,0.8)",
                    marginBottom: 6,
                  }}
                >
                  معياريتنا
                </p>
                <p
                  className="fp"
                  style={{
                    fontStyle: "italic",
                    fontSize: 15,
                    color: "#EFE8DD",
                    lineHeight: 1.6,
                  }}
                >
                  «كل يوم نرفع السقف قليلاً»
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: -12,
                  width: 48,
                  height: 48,
                  borderTop: "2px solid #C9A24A",
                  borderLeft: "2px solid #C9A24A",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#C9A24A",
                  }}
                >
                  قصتنا
                </span>
              </div>
              <h2
                className="fp"
                style={{
                  fontSize: "clamp(1.7rem,4vw,2.8rem)",
                  fontWeight: 700,
                  color: "#2B1A12",
                  lineHeight: 1.2,
                  marginBottom: 24,
                }}
              >
                من ورشة صغيرة
                <br />
                إلى علامة تُعرف
              </h2>
              <div style={{ direction: "rtl" }}>
                <p
                  style={{
                    fontSize: 15,
                    color: "#7A5A3A",
                    lineHeight: 2,
                    marginBottom: 16,
                  }}
                >
                  بدأت حكاية الأشري بيدين تعشقان الخشب، وحلم بأن يكون البيت
                  المصري جديراً بالفخامة الحقيقية. المهندس أحمد الأشري، خرّيج
                  الفنون التطبيقية، أسّس ورشته الأولى في قلب القاهرة عام 2005
                  بعشرين عاماً من المعرفة ورأس مال صغير لا يتجاوز أحلامه.
                </p>
                <p
                  style={{
                    fontSize: 15,
                    color: "#7A5A3A",
                    lineHeight: 2,
                    marginBottom: 16,
                  }}
                >
                  اليوم، وبعد عشرين عاماً، أصبح العشري أكثر من مجرد مصنع أثاث.
                  نحن ورشة إبداع تُوظّف ثلاثين حرفياً يؤمنون أن كل قطعة تُصنع هي
                  وعد لعائلة ستعيش معها سنوات طويلة.
                </p>
                <p style={{ fontSize: 15, color: "#7A5A3A", lineHeight: 2 }}>
                  مزجنا بين الخشب الصلب والجلود الإيطالية والأقمشة البلجيكية —
                  لأن البيت المصري يستحق فقط الأفضل.
                </p>
              </div>
              <div
                style={{
                  marginTop: 32,
                  paddingTop: 28,
                  borderTop: "1px solid #EFE8DD",
                }}
              >
                <p
                  className="fp"
                  style={{
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    color: "#5A341A",
                    direction: "rtl",
                    borderRight: "3px solid #C9A24A",
                    paddingRight: 16,
                  }}
                >
                  «لسنا نبيع أثاثاً — نبيع بيتاً يستحق أن تعود إليه»
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#7A5A3A",
                    marginTop: 10,
                    direction: "rtl",
                  }}
                >
                  — أحمد العشري، المؤسس
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── VALUES ── */}
      <div style={{ background: "#F5F1EA", width: "100%" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "70px 16px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A24A",
                }}
              >
                ما نؤمن به
              </span>
              <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
            </div>
            <h2
              className="fp"
              style={{
                fontSize: "clamp(1.6rem,4vw,2.6rem)",
                fontWeight: 700,
                color: "#2B1A12",
              }}
            >
              قيمنا الثابتة
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: 2,
              background: "#EFE8DD",
            }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: "#fff",
                  padding: "36px 28px",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "#C9A24A",
                    marginBottom: 14,
                  }}
                />
                <h3
                  className="fp"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#2B1A12",
                    marginBottom: 12,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#7A5A3A",
                    lineHeight: 1.9,
                    direction: "rtl",
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div
        style={{
          background: "#2B1A12",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="fp"
          style={{
            position: "absolute",
            bottom: -40,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(5rem,18vw,14rem)",
            fontWeight: 700,
            color: "rgba(201,162,74,0.04)",
            whiteSpace: "nowrap",
            letterSpacing: "0.1em",
            userSelect: "none",
          }}
        >
          SINCE 2005
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "70px 16px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 1,
                  background: "rgba(201,162,74,0.5)",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A24A",
                }}
              >
                مسيرتنا
              </span>
              <div
                style={{
                  width: 28,
                  height: 1,
                  background: "rgba(201,162,74,0.5)",
                }}
              />
            </div>
            <h2
              className="fp"
              style={{
                fontSize: "clamp(1.6rem,4vw,2.6rem)",
                fontWeight: 700,
                color: "#EFE8DD",
              }}
            >
              رحلة عشرين عاماً
            </h2>
          </div>

          <div
            style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}
          >
            {/* Vertical line - desktop only */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                background: "rgba(201,162,74,0.2)",
                transform: "translateX(-50%)",
              }}
              className="hidden-mobile"
            />

            {/* Desktop timeline */}
            {timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 0,
                  alignItems: "flex-start",
                  marginBottom: 40,
                  direction: i % 2 === 0 ? "rtl" : "ltr",
                }}
                className="hidden-mobile"
              >
                <div
                  style={{
                    flex: 1,
                    padding: "0 32px",
                    textAlign: i % 2 === 0 ? "left" : "right",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(201,162,74,0.08)",
                      border: "1px solid rgba(201,162,74,0.15)",
                      padding: "20px 22px",
                    }}
                  >
                    <p
                      className="fp"
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#C9A24A",
                        letterSpacing: "0.12em",
                        marginBottom: 6,
                      }}
                    >
                      {item.year}
                    </p>
                    <h3
                      className="fp"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#EFE8DD",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(239,232,221,0.6)",
                        lineHeight: 1.8,
                        direction: "rtl",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    background: "#C9A24A",
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginTop: 22,
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -4,
                      border: "1px solid rgba(201,162,74,0.35)",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            ))}

            {/* Mobile timeline */}
            <div
              className="show-mobile"
              style={{ flexDirection: "column", gap: 0 }}
            >
              {timeline.map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 16, marginBottom: 28 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        background: "#C9A24A",
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    {i < timeline.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          flex: 1,
                          background: "rgba(201,162,74,0.2)",
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      background: "rgba(201,162,74,0.08)",
                      border: "1px solid rgba(201,162,74,0.15)",
                      padding: "16px 18px",
                      flex: 1,
                    }}
                  >
                    <p
                      className="fp"
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#C9A24A",
                        letterSpacing: "0.1em",
                        marginBottom: 4,
                      }}
                    >
                      {item.year}
                    </p>
                    <h3
                      className="fp"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#EFE8DD",
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: "rgba(239,232,221,0.6)",
                        lineHeight: 1.8,
                        direction: "rtl",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TEAM ── */}
      {/* <div style={{ background: "#fff", width: "100%" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "70px 16px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A24A",
                }}
              >
                فريقنا
              </span>
              <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
            </div>
            <h2
              className="fp"
              style={{
                fontSize: "clamp(1.6rem,4vw,2.6rem)",
                fontWeight: 700,
                color: "#2B1A12",
              }}
            >
              العقول والأيدي خلف الأشري
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 24,
            }}
          >
            {team.map((member, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: "#F5F1EA",
                  border: "1px solid #EFE8DD",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      transition: "transform 0.6s",
                      filter: "grayscale(20%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(43,26,18,0.5) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                      borderStyle: "solid",
                      borderWidth: "0 50px 50px 0",
                      borderColor:
                        "transparent #C9A24A transparent transparent",
                    }}
                  />
                </div>
                <div style={{ padding: "22px 20px" }}>
                  <h3
                    className="fp"
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#2B1A12",
                      marginBottom: 3,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C9A24A",
                      marginBottom: 14,
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#7A5A3A",
                      lineHeight: 1.8,
                      direction: "rtl",
                      borderRight: "2px solid #EFE8DD",
                      paddingRight: 12,
                      fontStyle: "italic",
                    }}
                  >
                    «{member.quote}»
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* ── WORKSHOP ── */}
      <div style={{ background: "#EFE8DD", width: "100%" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "70px 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div style={{ width: 28, height: 1, background: "#C9A24A" }} />
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#C9A24A",
                  }}
                >
                  ورشتنا
                </span>
              </div>
              <h2
                className="fp"
                style={{
                  fontSize: "clamp(1.5rem,4vw,2.5rem)",
                  fontWeight: 700,
                  color: "#2B1A12",
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                حيث تُولد القطع الفاخرة
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#7A5A3A",
                  lineHeight: 2,
                  direction: "rtl",
                  marginBottom: 20,
                }}
              >
                ورشتنا في قلب دمياط تضم ثلاثين حرفياً يعملون يومياً بين الأخشاب
                والأقمشة والمعادن. نؤمن بأن البيئة تُلهم الإبداع، لذلك صممنا
                ورشتنا كمساحة فنية حقيقية.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  direction: "rtl",
                }}
              >
                {[
                  ["30", "حرفي متخصص"],
                  ["6", "أسابيع متوسط التصنيع"],
                  ["100%", "مواد طبيعية"],
                  ["3", "سنوات ضمان"],
                ].map(([num, lab]) => (
                  <div
                    key={lab}
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(201,162,74,0.2)",
                      padding: "14px 16px",
                    }}
                  >
                    <p
                      className="fp"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#5A341A",
                      }}
                    >
                      {num}
                    </p>
                    <p style={{ fontSize: 11, color: "#7A5A3A", marginTop: 2 }}>
                      {lab}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {[
                "https://res.cloudinary.com/dchhjoguv/image/upload/v1773509331/9_tiv79s.png",
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80",
                "https://res.cloudinary.com/dchhjoguv/image/upload/v1773509270/6_xoevjf.png",
                "https://res.cloudinary.com/dchhjoguv/image/upload/v1773509296/10_s56txp.png",
              ].map((src, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    paddingBottom: "100%",
                    overflow: "hidden",
                    ...(i === 0
                      ? {
                          gridColumn: "1",
                          gridRow: "1 / span 2",
                          paddingBottom: "calc(200% + 8px)",
                        }
                      : {}),
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="dot-bg" style={{ background: "#5A341A", width: "100%" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "70px 16px",
            textAlign: "center",
          }}
        >
          <div
            className="spin-slow"
            style={{
              width: 80,
              height: 80,
              border: "1px solid rgba(201,162,74,0.4)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <span
              className="fp"
              style={{ fontStyle: "italic", fontSize: 11, color: "#C9A24A" }}
            >
              عشري
            </span>
          </div>
          <h2
            className="fp"
            style={{
              fontSize: "clamp(1.7rem,4vw,3rem)",
              fontWeight: 700,
              color: "#EFE8DD",
              marginBottom: 16,
            }}
          >
            جاهز تبدأ رحلتك مع العشري؟
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(239,232,221,0.65)",
              maxWidth: 480,
              margin: "0 auto 36px",
              lineHeight: 1.9,
              direction: "rtl",
            }}
          >
            زورنا في معرضنا أو تصفّح مجموعاتنا — فريقنا مستعد يساعدك تصمم
            المساحة اللي تستاهل.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => onNavigate("grid")}
              className="sweep-btn"
              style={{
                background: "#C9A24A",
                color: "#fff",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "14px 32px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              <span>تصفح المنتجات</span>
            </button>
            <button
              style={{
                background: "transparent",
                color: "#EFE8DD",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "14px 32px",
                border: "1px solid rgba(239,232,221,0.3)",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              تواصل معنا
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
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
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function About() {
  const [page, setPage] = useState("about");
  const navigate = useNavigate();

  const handleNavigate = (pg) => {
    setPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyles />
      <div
        style={{
          minHeight: "screen",
          background: "#F5F1EA",
          color: "#2B1A12",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <Header />
        {page === "about" && <AboutPage onNavigate={handleNavigate} />}
        {page === "grid" && (
          <div style={{ textAlign: "center", padding: "100px 16px" }}>
            <p
              className="fp"
              style={{ fontSize: 22, color: "#5A341A", marginBottom: 20 }}
            >
              صفحة المنتجات
            </p>
            <Link
            to="/"
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
              العودة لصفحة العشري
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
