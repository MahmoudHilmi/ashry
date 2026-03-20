import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../supabaseClient.js";
import {
  RefreshCw,
  DollarSign,
  ClipboardList,
  Package,
  Calculator,
  Truck,
  XCircle,
  Trophy,
  TrendingUp,
  Clock,
  Gem,
  BarChart2,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  ShoppingBag,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Palette & helpers
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  brown: "#5A341A",
  darkBrown: "#2B1A12",
  gold: "#C9A24A",
  goldLight: "#F0DFA0",
  cream: "#F7F3EE",
  border: "#E8E0D5",
  muted: "#9A8A7A",
  green: "#27AE60",
  blue: "#2980B9",
  red: "#C0392B",
  orange: "#E67E22",
  bg: "#FDFAF6",
};

const fmt = (n) => Number(n || 0).toLocaleString("ar-EG");
const fmtK = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(Math.round(n));
const pct = (a, b) => (b === 0 ? 0 : Math.round((a / b) * 100));
const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));

// Format date to Arabic month/day label
const monthLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ar-EG", { month: "short", day: "numeric" });
};
const monthOnlyLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ar-EG", { month: "short" });
};

// ─────────────────────────────────────────────────────────────────────────────
// Animated counter
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "", duration = 900 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = null;
    const from = 0;
    const to = Number(value) || 0;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);
  return (
    <>
      {prefix}
      {display.toLocaleString("ar-EG")}
      {suffix}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KPI Card
// ─────────────────────────────────────────────────────────────────────────────
function KpiCard({
  icon,
  label,
  value,
  sub,
  color,
  trend,
  trendLabel,
  delay = 0,
  prefix = "",
  suffix = "",
}) {
  const isUp = trend > 0;
  const trendColor = trend === 0 ? C.muted : isUp ? C.green : C.red;
  return (
    <div
      className="ana-card fade-in"
      style={{
        animationDelay: `${delay}ms`,
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 3,
          height: "100%",
          background: color,
          borderRadius: "0 14px 14px 0",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 14,
          direction: "rtl",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: color + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
          }}
        >
          {icon}
        </div>
        {trend !== undefined && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: trendColor + "15",
              borderRadius: 20,
              padding: "3px 10px",
            }}
          >
            <span style={{ fontSize: 11, color: trendColor }}>
              {isUp ? "▲" : trend < 0 ? "▼" : "─"}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: trendColor }}>
              {trendLabel || `${Math.abs(trend)}%`}
            </span>
          </div>
        )}
      </div>
      <div style={{ direction: "rtl" }}>
        <p
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: C.darkBrown,
            fontFamily: "'Playfair Display',serif",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </p>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: C.brown,
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        {sub && <p style={{ fontSize: 11, color: C.muted }}>{sub}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG Line / Area Chart
// ─────────────────────────────────────────────────────────────────────────────
function LineChart({
  data = [],
  color = C.gold,
  height = 180,
  title,
  subtitle,
  valueFormatter = (v) => v,
}) {
  const W = 100; // percent-based viewBox
  const H = height;
  const PAD = { top: 16, right: 8, bottom: 36, left: 48 };
  const innerW = W;
  const innerH = H - PAD.top - PAD.bottom;

  const values = data.map((d) => d.value);
  const maxV = Math.max(...values, 1);
  const minV = Math.min(...values, 0);
  const range = maxV - minV || 1;

  const pts = data.map((d, i) => ({
    x:
      data.length <= 1
        ? 50
        : (PAD.left / W) * 100 +
          (i / (data.length - 1)) * (1 - (PAD.left + PAD.right) / W) * 100,
    y: PAD.top + innerH - ((d.value - minV) / range) * innerH,
    label: d.label,
    value: d.value,
  }));

  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const areaPath = pts.length
    ? `${linePath} L${pts[pts.length - 1].x},${H - PAD.bottom} L${pts[0].x},${H - PAD.bottom} Z`
    : "";

  const yTicks = 4;
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "20px 20px 14px",
        height: "100%",
      }}
    >
      {title && (
        <div style={{ marginBottom: 16, direction: "rtl" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.darkBrown }}>
            {title}
          </p>
          {subtitle && (
            <p style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {data.length < 2 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: height,
            color: C.muted,
            fontSize: 12,
          }}
        >
          لا توجد بيانات كافية
        </div>
      ) : (
        <svg
          viewBox={`0 0 100 ${H}`}
          style={{ width: "100%", height: H, overflow: "visible" }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={`grad-${color.slice(1)}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={color} stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {/* Y grid lines */}
          {Array.from({ length: yTicks + 1 }, (_, i) => {
            const y = PAD.top + (i / yTicks) * innerH;
            const val = maxV - (i / yTicks) * range;
            return (
              <g key={i}>
                <line
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke={C.border}
                  strokeWidth="0.4"
                />
                <text
                  x="0"
                  y={y + 1}
                  fontSize="3.2"
                  fill={C.muted}
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {fmtK(val)}
                </text>
              </g>
            );
          })}
          {/* Area fill */}
          <path d={areaPath} fill={`url(#grad-${color.slice(1)})`} />
          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Points + hover */}
          {pts.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="2.5"
                fill="#fff"
                stroke={color}
                strokeWidth="0.8"
              />
              {hovered === i && (
                <g>
                  <rect
                    x={p.x - 12}
                    y={p.y - 11}
                    width="24"
                    height="9"
                    rx="2"
                    fill={C.darkBrown}
                  />
                  <text
                    x={p.x}
                    y={p.y - 5.5}
                    fontSize="3"
                    fill="#fff"
                    textAnchor="middle"
                  >
                    {valueFormatter(p.value)}
                  </text>
                </g>
              )}
              {/* X label */}
              <text
                x={p.x}
                y={H - PAD.bottom + 8}
                fontSize="3"
                fill={C.muted}
                textAnchor="middle"
                style={{
                  display: data.length > 14 && i % 2 !== 0 ? "none" : "block",
                }}
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG Bar Chart
// ─────────────────────────────────────────────────────────────────────────────
function BarChart({
  data = [],
  color = C.gold,
  height = 200,
  title,
  subtitle,
  valueFormatter = (v) => v,
}) {
  const H = height;
  const PAD = { top: 16, right: 4, bottom: 40, left: 44 };
  const innerH = H - PAD.top - PAD.bottom;
  const maxV = Math.max(...data.map((d) => d.value), 1);
  const [hovered, setHovered] = useState(null);
  const barW = data.length ? (100 - PAD.left - PAD.right) / data.length : 10;
  const barGap = barW * 0.28;
  const actualBarW = barW - barGap;

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "20px 20px 14px",
        height: "100%",
      }}
    >
      {title && (
        <div style={{ marginBottom: 16, direction: "rtl" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.darkBrown }}>
            {title}
          </p>
          {subtitle && (
            <p style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {data.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height,
            color: C.muted,
            fontSize: 12,
          }}
        >
          لا توجد بيانات
        </div>
      ) : (
        <svg
          viewBox={`0 0 100 ${H}`}
          style={{ width: "100%", height: H, overflow: "visible" }}
          preserveAspectRatio="none"
        >
          {/* Y grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
            const y = PAD.top + (1 - frac) * innerH;
            return (
              <g key={i}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke={C.border}
                  strokeWidth="0.4"
                />
                <text
                  x={PAD.left - 2}
                  y={y + 1}
                  fontSize="3"
                  fill={C.muted}
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {fmtK(frac * maxV)}
                </text>
              </g>
            );
          })}
          {data.map((d, i) => {
            const barH = (d.value / maxV) * innerH;
            const x = PAD.left + i * barW + barGap / 2;
            const y = PAD.top + innerH - barH;
            const isHov = hovered === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={x}
                  y={y}
                  width={actualBarW}
                  height={barH}
                  rx="1.5"
                  fill={isHov ? C.brown : color}
                  style={{ transition: "fill .15s" }}
                />
                {isHov && (
                  <g>
                    <rect
                      x={x - 4}
                      y={y - 11}
                      width={actualBarW + 8}
                      height="9"
                      rx="2"
                      fill={C.darkBrown}
                    />
                    <text
                      x={x + actualBarW / 2}
                      y={y - 5.5}
                      fontSize="3"
                      fill="#fff"
                      textAnchor="middle"
                    >
                      {valueFormatter(d.value)}
                    </text>
                  </g>
                )}
                <text
                  x={x + actualBarW / 2}
                  y={H - PAD.bottom + 7}
                  fontSize="3"
                  fill={C.muted}
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG Donut Chart
// ─────────────────────────────────────────────────────────────────────────────
function DonutChart({
  segments = [],
  title,
  subtitle,
  centerLabel,
  centerValue,
}) {
  const R = 32,
    CX = 50,
    CY = 46,
    STROKE = 11;
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const [hovered, setHovered] = useState(null);

  let cumAngle = -Math.PI / 2;
  const arcs = segments.map((seg) => {
    const angle = (seg.value / total) * 2 * Math.PI;
    const x1 = CX + R * Math.cos(cumAngle);
    const y1 = CY + R * Math.sin(cumAngle);
    cumAngle += angle;
    const x2 = CX + R * Math.cos(cumAngle);
    const y2 = CY + R * Math.sin(cumAngle);
    const large = angle > Math.PI ? 1 : 0;
    return { ...seg, x1, y1, x2, y2, large, angle };
  });

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "20px",
        height: "100%",
      }}
    >
      {title && (
        <div style={{ marginBottom: 12, direction: "rtl" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.darkBrown }}>
            {title}
          </p>
          {subtitle && (
            <p style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {segments.length === 0 || total === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 160,
            color: C.muted,
            fontSize: 12,
          }}
        >
          لا توجد بيانات
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <svg
            viewBox="0 0 100 92"
            style={{ width: 140, minWidth: 120, flexShrink: 0 }}
          >
            {/* BG circle */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={C.border}
              strokeWidth={STROKE}
            />
            {arcs.map((arc, i) => (
              <path
                key={i}
                d={`M${arc.x1},${arc.y1} A${R},${R} 0 ${arc.large},1 ${arc.x2},${arc.y2}`}
                fill="none"
                stroke={hovered === i ? arc.color + "cc" : arc.color}
                strokeWidth={hovered === i ? STROKE + 2 : STROKE}
                strokeLinecap="butt"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer", transition: "stroke-width .15s" }}
              />
            ))}
            {/* Center text */}
            <text
              x={CX}
              y={CY - 5}
              fontSize="7"
              fontWeight="800"
              fill={C.darkBrown}
              textAnchor="middle"
              fontFamily="'Playfair Display',serif"
            >
              {hovered !== null ? arcs[hovered]?.value : centerValue}
            </text>
            <text
              x={CX}
              y={CY + 5}
              fontSize="3.5"
              fill={C.muted}
              textAnchor="middle"
            >
              {hovered !== null ? arcs[hovered]?.label : centerLabel}
            </text>
          </svg>
          {/* Legend */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {arcs.map((arc, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  direction: "rtl",
                  opacity: hovered === null || hovered === i ? 1 : 0.4,
                  transition: "opacity .15s",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: arc.color,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.darkBrown,
                    }}
                  >
                    {arc.label}
                  </p>
                  <p style={{ fontSize: 10, color: C.muted }}>
                    {pct(arc.value, total)}% · {arc.value} طلب
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mini sparkline
// ─────────────────────────────────────────────────────────────────────────────
function Sparkline({ values = [], color = C.gold, width = 80, height = 32 }) {
  if (values.length < 2) return null;
  const maxV = Math.max(...values, 1);
  const minV = Math.min(...values, 0);
  const range = maxV - minV || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - minV) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`sp-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp-${color.slice(1)})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress bar
// ─────────────────────────────────────────────────────────────────────────────
function ProgressBar({ value, max, color = C.gold, label, sub }) {
  const pctVal = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;
  return (
    <div style={{ direction: "rtl" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: C.darkBrown }}>
          {label}
        </span>
        <span style={{ fontSize: 11, color: C.muted }}>{sub}</span>
      </div>
      <div
        style={{
          height: 7,
          background: C.border,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pctVal}%`,
            background: color,
            borderRadius: 10,
            transition: "width 1s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Analytics Section — main export
// ─────────────────────────────────────────────────────────────────────────────
export default function AnalyticsSection({ showToast }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30"); // "7" | "30" | "90" | "all"

  // ── Fetch ──
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [ord, prod] = await Promise.all([
      supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: true }),
      supabase.from("products").select("id,name,nameAr,category,price,inStock"),
    ]);
    if (ord.error)
      showToast("فشل تحميل الطلبات: " + ord.error.message, "error");
    if (prod.error)
      showToast("فشل تحميل المنتجات: " + prod.error.message, "error");
    setOrders(ord.data || []);
    setProducts(prod.data || []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Filtered orders by date range ──
  const filteredOrders = useMemo(() => {
    if (range === "all") return orders;
    const days = Number(range);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return orders.filter((o) => new Date(o.created_at) >= cutoff);
  }, [orders, range]);

  const activeOrders = filteredOrders.filter((o) => o.status !== "cancelled");

  // ── KPI computations ──
  const kpi = useMemo(() => {
    const total = filteredOrders.length;
    const revenue = activeOrders.reduce((s, o) => s + Number(o.total_price), 0);
    const avgOrder = total > 0 ? revenue / activeOrders.length : 0;
    const totalUnits = activeOrders.reduce((s, o) => s + Number(o.quantity), 0);
    const pendingCnt = filteredOrders.filter(
      (o) => o.status === "pending",
    ).length;
    const confirmedCnt = filteredOrders.filter(
      (o) => o.status === "confirmed",
    ).length;
    const deliveredCnt = filteredOrders.filter(
      (o) => o.status === "delivered",
    ).length;
    const cancelledCnt = filteredOrders.filter(
      (o) => o.status === "cancelled",
    ).length;
    const convRate = total > 0 ? pct(deliveredCnt, total) : 0;
    const cancelRate = total > 0 ? pct(cancelledCnt, total) : 0;

    // Compare with previous period for trend
    const prevCutoff = new Date();
    const days = range === "all" ? 9999 : Number(range);
    prevCutoff.setDate(prevCutoff.getDate() - days * 2);
    const prevEnd = new Date();
    prevEnd.setDate(prevEnd.getDate() - days);
    const prevOrders = orders.filter((o) => {
      const d = new Date(o.created_at);
      return d >= prevCutoff && d < prevEnd && o.status !== "cancelled";
    });
    const prevRevenue = prevOrders.reduce(
      (s, o) => s + Number(o.total_price),
      0,
    );
    const revTrend =
      prevRevenue > 0
        ? Math.round(((revenue - prevRevenue) / prevRevenue) * 100)
        : 0;
    const cntTrend =
      prevOrders.length > 0
        ? Math.round(
            ((activeOrders.length - prevOrders.length) / prevOrders.length) *
              100,
          )
        : 0;

    return {
      total,
      revenue,
      avgOrder,
      totalUnits,
      pendingCnt,
      confirmedCnt,
      deliveredCnt,
      cancelledCnt,
      convRate,
      cancelRate,
      revTrend,
      cntTrend,
    };
  }, [filteredOrders, activeOrders, orders, range]);

  // ── Revenue over time (daily grouped) ──
  const revenueTimeline = useMemo(() => {
    const buckets = {};
    activeOrders.forEach((o) => {
      const key = o.created_at.slice(0, 10);
      buckets[key] = (buckets[key] || 0) + Number(o.total_price);
    });
    return Object.entries(buckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => ({ label: monthLabel(date), value }));
  }, [activeOrders]);

  // ── Orders count over time ──
  const ordersTimeline = useMemo(() => {
    const buckets = {};
    filteredOrders.forEach((o) => {
      const key = o.created_at.slice(0, 10);
      buckets[key] = (buckets[key] || 0) + 1;
    });
    return Object.entries(buckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => ({ label: monthLabel(date), value }));
  }, [filteredOrders]);

  // ── Revenue by month ──
  const revenueByMonth = useMemo(() => {
    const buckets = {};
    activeOrders.forEach((o) => {
      const key = o.created_at.slice(0, 7); // YYYY-MM
      buckets[key] = (buckets[key] || 0) + Number(o.total_price);
    });
    return Object.entries(buckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([date, value]) => ({ label: monthOnlyLabel(date + "-01"), value }));
  }, [activeOrders]);

  // ── Top products by order count ──
  const topProducts = useMemo(() => {
    const counts = {};
    const revenue = {};
    activeOrders.forEach((o) => {
      const key = o.product_name_ar || o.product_name || "غير محدد";
      counts[key] = (counts[key] || 0) + Number(o.quantity);
      revenue[key] = (revenue[key] || 0) + Number(o.total_price);
    });
    return Object.entries(counts)
      .map(([name, qty]) => ({ name, qty, revenue: revenue[name] || 0 }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 6);
  }, [activeOrders]);

  const maxTopQty = Math.max(...topProducts.map((p) => p.qty), 1);

  // ── Top categories ──
  const topCategories = useMemo(() => {
    const counts = {};
    activeOrders.forEach((o) => {
      const key = o.category || "أخرى";
      counts[key] = (counts[key] || 0) + Number(o.total_price);
    });
    return Object.entries(counts)
      .map(([cat, rev]) => ({ cat, rev }))
      .sort((a, b) => b.rev - a.rev)
      .slice(0, 5);
  }, [activeOrders]);

  const maxCatRev = Math.max(...topCategories.map((c) => c.rev), 1);

  // ── Status donut segments ──
  const statusSegments = [
    { label: "قيد الانتظار", value: kpi.pendingCnt, color: C.gold },
    { label: "مؤكد", value: kpi.confirmedCnt, color: C.blue },
    { label: "تم التوصيل", value: kpi.deliveredCnt, color: C.green },
    { label: "ملغي", value: kpi.cancelledCnt, color: C.red },
  ].filter((s) => s.value > 0);

  // ── Sparkline data (last 14 days) ──
  const sparkRevenue = useMemo(() => {
    const last14 = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const val = activeOrders
        .filter((o) => o.created_at.slice(0, 10) === key)
        .reduce((s, o) => s + Number(o.total_price), 0);
      last14.push(val);
    }
    return last14;
  }, [activeOrders]);

  // ── Avg order value by weekday ──
  const byWeekday = useMemo(() => {
    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const buckets = Array.from({ length: 7 }, () => ({ sum: 0, cnt: 0 }));
    activeOrders.forEach((o) => {
      const dow = new Date(o.created_at).getDay();
      buckets[dow].sum += Number(o.total_price);
      buckets[dow].cnt += 1;
    });
    return buckets.map((b, i) => ({
      label: days[i].slice(0, 3),
      value: b.cnt > 0 ? Math.round(b.sum / b.cnt) : 0,
    }));
  }, [activeOrders]);

  // ── Product availability ──
  const availabilityStats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.inStock).length;
    const outOfStock = total - inStock;
    return { total, inStock, outOfStock };
  }, [products]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 14,
          }}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 22,
                  height: 120,
                }}
              >
                <div
                  className="shimmer"
                  style={{ height: 14, width: "45%", marginBottom: 12 }}
                />
                <div
                  className="shimmer"
                  style={{ height: 28, width: "60%", marginBottom: 8 }}
                />
                <div className="shimmer" style={{ height: 11, width: "35%" }} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── HEADER ROW ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          direction: "rtl",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: C.darkBrown,
              fontFamily: "'Playfair Display',serif",
            }}
          >
            لوحة التحليلات
          </h2>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
            إحصاءات الطلبات والإيرادات في الوقت الفعلي
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            ["7", "٧ أيام"],
            ["30", "٣٠ يوم"],
            ["90", "٩٠ يوم"],
            ["all", "الكل"],
          ].map(([val, lbl]) => (
            <button
              key={val}
              type="button"
              onClick={() => setRange(val)}
              style={{
                padding: "7px 14px",
                borderRadius: 20,
                border: `1.5px solid ${range === val ? C.gold : C.border}`,
                background: range === val ? "#FFF8E8" : "#fff",
                color: range === val ? C.gold : C.muted,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .2s",
                fontFamily: "'Tajawal',sans-serif",
              }}
            >
              {lbl}
            </button>
          ))}
          <button
            type="button"
            onClick={fetchAll}
            title="تحديث"
            style={{
              padding: "7px 12px",
              borderRadius: 20,
              border: `1.5px solid ${C.border}`,
              background: "#fff",
              color: C.muted,
              fontSize: 11,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'Tajawal',sans-serif",
            }}
          >
            <RefreshCw size={12} strokeWidth={2.5} />
            تحديث
          </button>
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
          gap: 14,
        }}
      >
        <KpiCard
          icon={<DollarSign size={22} />}
          label="إجمالي الإيرادات"
          value={kpi.revenue}
          suffix=" EGP"
          color={C.gold}
          trend={kpi.revTrend}
          sub={`${filteredOrders.length} طلب في المدة المحددة`}
          delay={0}
        />
        <KpiCard
          icon={<ClipboardList size={22} />}
          label="إجمالي الطلبات"
          value={kpi.total}
          color={C.brown}
          trend={kpi.cntTrend}
          sub={`${kpi.pendingCnt} قيد الانتظار`}
          delay={60}
        />
        <KpiCard
          icon={<Package size={22} />}
          label="إجمالي الوحدات"
          value={kpi.totalUnits}
          color={C.blue}
          sub="وحدة بيعت (غير ملغية)"
          delay={120}
        />
        <KpiCard
          icon={<Calculator size={22} />}
          label="متوسط قيمة الطلب"
          value={Math.round(kpi.avgOrder)}
          suffix=" EGP"
          color={C.green}
          sub="لكل طلب غير ملغي"
          delay={180}
        />
        <KpiCard
          icon={<Truck size={22} />}
          label="معدل التوصيل"
          value={kpi.convRate}
          suffix="%"
          color={C.green}
          sub={`${kpi.deliveredCnt} طلب تم توصيله`}
          delay={240}
        />
        <KpiCard
          icon={<XCircle size={22} />}
          label="معدل الإلغاء"
          value={kpi.cancelRate}
          suffix="%"
          color={C.red}
          sub={`${kpi.cancelledCnt} طلب ملغي`}
          delay={300}
        />
      </div>

      {/* ── REVENUE LINE CHART + STATUS DONUT ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
          gap: 16,
        }}
      >
        <div style={{ gridColumn: "span 2", minWidth: 0 }}>
          <LineChart
            data={revenueTimeline}
            color={C.gold}
            height={200}
            title="الإيرادات اليومية"
            subtitle="إجمالي الإيرادات لكل يوم (الطلبات غير الملغية)"
            valueFormatter={(v) => `${fmtK(v)} EGP`}
          />
        </div>
        <DonutChart
          segments={statusSegments}
          title="توزيع حالات الطلبات"
          subtitle="نسبة كل حالة من إجمالي الطلبات"
          centerValue={kpi.total}
          centerLabel="طلب"
        />
      </div>

      {/* ── ORDERS COUNT LINE + BAR MONTHLY ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
          gap: 16,
        }}
      >
        <LineChart
          data={ordersTimeline}
          color={C.blue}
          height={180}
          title="عدد الطلبات يومياً"
          subtitle="الطلبات الواردة خلال الفترة المحددة"
        />
        <BarChart
          data={revenueByMonth}
          color={C.gold}
          height={180}
          title="الإيرادات الشهرية"
          subtitle="آخر 6 أشهر"
          valueFormatter={(v) => `${fmtK(v)}`}
        />
        <BarChart
          data={byWeekday}
          color={C.brown}
          height={180}
          title="متوسط الطلب حسب اليوم"
          subtitle="متوسط قيمة الطلب لكل يوم من الأسبوع"
          valueFormatter={(v) => `${fmtK(v)}`}
        />
      </div>

      {/* ── TOP PRODUCTS + CATEGORIES ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
          gap: 16,
        }}
      >
        {/* Top products */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div style={{ marginBottom: 18, direction: "rtl" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.darkBrown }}>
              أكثر المنتجات طلباً
            </p>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              مرتبة حسب عدد الوحدات المباعة
            </p>
          </div>
          {topProducts.length === 0 ? (
            <p
              style={{
                fontSize: 12,
                color: C.muted,
                textAlign: "center",
                padding: "24px 0",
              }}
            >
              لا توجد بيانات
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {topProducts.map((p, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                      direction: "rtl",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: i === 0 ? C.gold : C.border,
                          color: i === 0 ? "#fff" : C.muted,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.darkBrown,
                          maxWidth: 160,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.name}
                      </span>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.brown,
                          fontFamily: "'Playfair Display',serif",
                        }}
                      >
                        {p.qty} وحدة
                      </p>
                      <p style={{ fontSize: 10, color: C.muted }}>
                        {fmt(p.revenue)} EGP
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: C.border,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(p.qty / maxTopQty) * 100}%`,
                        background: i === 0 ? C.gold : C.brown + "88",
                        borderRadius: 10,
                        transition: "width 1s cubic-bezier(.4,0,.2,1)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top categories */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div style={{ marginBottom: 18, direction: "rtl" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.darkBrown }}>
              الإيرادات حسب الفئة
            </p>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              أعلى 5 فئات إيراداً
            </p>
          </div>
          {topCategories.length === 0 ? (
            <p
              style={{
                fontSize: 12,
                color: C.muted,
                textAlign: "center",
                padding: "24px 0",
              }}
            >
              لا توجد بيانات
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {topCategories.map((c, i) => (
                <ProgressBar
                  key={i}
                  value={c.rev}
                  max={maxCatRev}
                  color={
                    [C.gold, C.brown, C.blue, C.green, C.orange][i] || C.muted
                  }
                  label={c.cat}
                  sub={`${fmt(c.rev)} EGP · ${pct(
                    c.rev,
                    activeOrders.reduce((s, o) => s + Number(o.total_price), 0),
                  )}%`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Inventory health */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div style={{ marginBottom: 18, direction: "rtl" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.darkBrown }}>
              صحة المخزون
            </p>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              حالة توفر المنتجات
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            {[
              {
                label: "إجمالي",
                value: availabilityStats.total,
                color: C.brown,
                icon: <ShoppingBag size={20} />,
              },
              {
                label: "متوفر",
                value: availabilityStats.inStock,
                color: C.green,
                icon: <CheckCircle size={20} />,
              },
              {
                label: "نفذ",
                value: availabilityStats.outOfStock,
                color: C.red,
                icon: <AlertTriangle size={20} />,
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: C.cream,
                  borderRadius: 10,
                  padding: "12px 10px",
                  textAlign: "center",
                  direction: "rtl",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 4,
                    color: s.color,
                  }}
                >
                  {s.icon}
                </div>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: s.color,
                    fontFamily: "'Playfair Display',serif",
                  }}
                >
                  {s.value}
                </p>
                <p style={{ fontSize: 10, color: C.muted }}>{s.label}</p>
              </div>
            ))}
          </div>
          <ProgressBar
            value={availabilityStats.inStock}
            max={availabilityStats.total}
            color={C.green}
            label="نسبة التوفر"
            sub={`${pct(availabilityStats.inStock, availabilityStats.total)}%`}
          />

          {/* Revenue sparkline preview */}
          <div style={{ marginTop: 20, direction: "rtl" }}>
            <p style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>
              الإيرادات — آخر ١٤ يوم
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: C.darkBrown,
                    fontFamily: "'Playfair Display',serif",
                  }}
                >
                  {fmtK(sparkRevenue.reduce((s, v) => s + v, 0))} EGP
                </p>
                <p style={{ fontSize: 10, color: C.muted }}>آخر ١٤ يوم</p>
              </div>
              <Sparkline
                values={sparkRevenue}
                color={C.gold}
                width={90}
                height={36}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── INSIGHTS ROW ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
          gap: 14,
        }}
      >
        {[
          {
            icon: <Trophy size={18} />,
            color: C.gold,
            title: "أعلى إيراد",
            value: topProducts[0] ? `${fmt(topProducts[0].revenue)} EGP` : "—",
            sub: topProducts[0]?.name || "لا يوجد",
          },
          {
            icon: <TrendingUp size={18} />,
            color: C.green,
            title: "أفضل يوم في الأسبوع",
            value: byWeekday.reduce((a, b) => (a.value >= b.value ? a : b), {
              value: 0,
              label: "—",
            }).label,
            sub: `متوسط ${fmtK(Math.max(...byWeekday.map((d) => d.value), 0))} EGP`,
          },
          {
            icon: <Clock size={18} />,
            color: C.blue,
            title: "طلبات قيد الانتظار",
            value: kpi.pendingCnt,
            sub: "تحتاج تأكيد",
          },
          {
            icon: <Gem size={18} />,
            color: C.brown,
            title: "متوسط الكمية لكل طلب",
            value:
              activeOrders.length > 0
                ? (kpi.totalUnits / activeOrders.length).toFixed(1)
                : "0",
            sub: "وحدة / طلب",
          },
          {
            icon: <BarChart2 size={18} />,
            color: C.orange,
            title: "فئات نشطة",
            value: topCategories.length,
            sub: "فئة تحقق إيرادات",
          },
          {
            icon: <RotateCcw size={18} />,
            color: C.green,
            title: "معدل الإنجاز",
            value: `${pct(kpi.deliveredCnt + kpi.confirmedCnt, kpi.total)}%`,
            sub: `${kpi.deliveredCnt + kpi.confirmedCnt} طلب مؤكد أو موصّل`,
          },
        ].map((ins, i) => (
          <div
            key={i}
            className="fade-in"
            style={{
              background: "#fff",
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "16px 18px",
              direction: "rtl",
              animationDelay: `${i * 40}ms`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: ins.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: ins.color,
                }}
              >
                {ins.icon}
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, color: C.muted }}>
                {ins.title}
              </p>
            </div>
            <p
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: ins.color,
                fontFamily: "'Playfair Display',serif",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {ins.value}
            </p>
            <p style={{ fontSize: 11, color: C.muted }}>{ins.sub}</p>
          </div>
        ))}
      </div>

      {/* ── EMPTY STATE ── */}
      {filteredOrders.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#fff",
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            direction: "rtl",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.darkBrown,
              marginBottom: 6,
            }}
          >
            لا توجد بيانات في هذه الفترة
          </p>
          <p style={{ fontSize: 13, color: C.muted }}>
            غيّر الفترة الزمنية أو انتظر وصول طلبات جديدة
          </p>
        </div>
      )}
    </div>
  );
}
