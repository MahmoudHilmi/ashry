import { useState, useEffect } from "react";
import Header from "./Header";

const product = {
  id: "ALQ-2025-001",
  name: "Atlas Lounge Chair",
  nameAr: "كرسي أطلس الفاخر",
  tagline: "Handcrafted Walnut · Premium Leather",
  price: 4200,
  currency: "EGP",
  description:
    "The Atlas Lounge Chair is a masterpiece of artisanal woodworking fused with contemporary comfort. Designed for those who refuse to compromise between beauty and function, each chair is hand-finished by our master craftsmen using sustainably sourced walnut wood and full-grain leather.",
  materials: [
    { label: "Frame", value: "Solid American Walnut" },
    { label: "Upholstery", value: "Full-Grain Italian Leather" },
    { label: "Joinery", value: "Hand-Cut Dovetail" },
    { label: "Finish", value: "Natural Oil & Wax" },
    { label: "Cushion", value: "High-Density Foam + Feather" },
  ],
  details: [
    { label: "Dimensions", value: "W 80 × D 85 × H 95 cm" },
    { label: "Seat Height", value: "42 cm" },
    { label: "Weight", value: "18 kg" },
    { label: "Lead Time", value: "4–6 weeks" },
    { label: "Warranty", value: "10 Years Structural" },
    { label: "Origin", value: "Handmade in Saudi Arabia" },
  ],
  colors: [
    { name: "Cognac", hex: "#8B4513" },
    { name: "Midnight", hex: "#1a1a2e" },
    { name: "Ivory", hex: "#F5F0E8" },
    { name: "Olive", hex: "#6B7B4A" },
  ],
  images: [
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
  ],
};

const WHATSAPP_NUMBER = "2001026226361";

export default function ProductPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = "delay-0") =>
    `transition-all duration-700 ${delay} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;

  const handleBuy = () => {
    const color = product.colors[activeColor].name;
    const total = product.price * qty;
    const msg = encodeURIComponent(
      `مرحباً، أود طلب:\n\n` +
        `🪑 *${product.name}*\n` +
        `🆔 رقم المنتج: ${product.id}\n` +
        `🎨 اللون: ${color}\n` +
        `📦 الكمية: ${qty}\n` +
        `💰 السعر: ${total.toLocaleString()} ${product.currency}\n\n` +
        `المواصفات:\n` +
        product.materials.map((m) => `• ${m.label}: ${m.value}`).join("\n") +
        `\n\nيرجى تأكيد الطلب وتفاصيل التوصيل. شكراً!`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Tajawal:wght@300;400;500;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-tajawal  { font-family: 'Tajawal', sans-serif; }
        * { font-family: 'Tajawal', sans-serif; }
        .sweep-btn { position: relative; overflow: hidden; }
        .sweep-btn::after {
          content: ''; position: absolute; inset: 0;
          background: #C9A24A; transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1); z-index: 0;
        }
        .sweep-btn:hover::after { transform: translateX(0); }
        .sweep-btn > * { position: relative; z-index: 1; }
        .wa-btn { position: relative; overflow: hidden; }
        .wa-btn::after {
          content: ''; position: absolute; inset: 0;
          background: #128C7E; transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1); z-index: 0;
        }
        .wa-btn:hover::after { transform: translateX(0); }
        .wa-btn > * { position: relative; z-index: 1; }
        .thumb { transition: all 0.22s; }
        .thumb:hover { transform: scale(1.04); }
        .spin-slow { animation: spinAnim 22s linear infinite; }
        @keyframes spinAnim { to { transform: rotate(360deg); } }
        .dot-bg {
          background-image: radial-gradient(circle, #C9A24A18 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .tab-active {
          color: #5A341A !important;
          border-bottom: 2px solid #C9A24A;
        }
        .underline-nav {
          position: relative;
        }
        .underline-nav::after {
          content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
          height: 1px; background: #C9A24A;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s;
        }
        .underline-nav:hover::after { transform: scaleX(1); }
        .img-zoom {
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .img-zoom:hover { transform: scale(1.04); }
      `}</style>

      <div className="min-h-screen bg-white text-[#2B1A12]">
        {/* ── NAV ── */}
<Header />

        {/* Mobile Menu */}


        {/* ── BREADCRUMB ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center gap-2 text-[12px] tracking-widest uppercase text-[#7A5A3A]">
          <a href="#" className="hover:text-[#5A341A] transition-colors">
            Home
          </a>
          <span className="text-[#C9A24A]">/</span>
          <a href="#" className="hover:text-[#5A341A] transition-colors">
            Collections
          </a>
          <span className="text-[#C9A24A]">/</span>
          <span className="text-[#5A341A]">Atlas Lounge Chair</span>
        </div>

        {/* ── PRODUCT GRID ── */}
        <main className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* ── LEFT: Images ── */}
            <div className={`${fade("delay-0")}`}>
              {/* Main Image */}
              <div className="relative overflow-hidden bg-[#F5F1EA] dot-bg aspect-square">
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="img-zoom w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setZoomed(true)}
                />
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#C9A24A]/50 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#C9A24A]/50 pointer-events-none" />
                {/* Spinning badge */}
                <div className="spin-slow absolute top-5 right-5 w-[68px] h-[68px] border border-[#C9A24A]/50 rounded-full flex items-center justify-center pointer-events-none">
                  <span className="font-playfair italic text-[10px] text-[#C9A24A]">
                    Luxury
                  </span>
                </div>
                {/* Image index */}
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-[11px] tracking-widest uppercase text-[#5A341A]">
                  {activeImg + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`thumb overflow-hidden aspect-square bg-[#F5F1EA] ${activeImg === i ? "ring-2 ring-[#C9A24A]" : "ring-1 ring-[#EFE8DD] opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Details ── */}
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <div className={`flex items-center gap-3 ${fade("delay-100")}`}>
                <div className="w-8 h-px bg-[#C9A24A]" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A24A] font-medium">
                  {product.tagline}
                </span>
              </div>

              {/* Name */}
              <div className={fade("delay-200")}>
                <h1 className="font-playfair text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-[#2B1A12]">
                  {product.name}
                </h1>
                <p
                  className="text-[1.15rem] font-light text-[#7A5A3A] mt-1"
                  style={{ direction: "rtl" }}
                >
                  {product.nameAr}
                </p>
              </div>

              {/* Price */}
              <div className={`flex items-baseline gap-3 ${fade("delay-300")}`}>
                <span className="font-playfair text-[2.4rem] font-bold text-[#5A341A] leading-none">
                  {(product.price * qty).toLocaleString()}
                </span>
                <span className="text-[14px] tracking-widest uppercase text-[#7A5A3A]">
                  {product.currency}
                </span>
                {qty > 1 && (
                  <span className="text-[12px] text-[#C9A24A] tracking-wide">
                    ({product.price.toLocaleString()} × {qty})
                  </span>
                )}
              </div>

              <div
                className={`w-full h-px bg-[#EFE8DD] ${fade("delay-300")}`}
              />

              {/* Color */}
              <div className={fade("delay-400")}>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#7A5A3A] mb-3">
                  Leather Color —{" "}
                  <span className="text-[#5A341A] font-medium">
                    {product.colors[activeColor].name}
                  </span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveColor(i)}
                      title={c.name}
                      className={`w-9 h-9 rounded-full transition-all ${activeColor === i ? "ring-2 ring-offset-2 ring-[#C9A24A] scale-110" : "ring-1 ring-[#EFE8DD] hover:scale-105"}`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div className={`flex items-center gap-4 ${fade("delay-400")}`}>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#7A5A3A]">
                  Quantity
                </p>
                <div className="flex items-center border border-[#EFE8DD]">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#5A341A] hover:bg-[#F5F1EA] transition-colors text-lg font-light"
                  >
                    −
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-[14px] font-medium text-[#2B1A12] border-x border-[#EFE8DD]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#5A341A] hover:bg-[#F5F1EA] transition-colors text-lg font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={`flex gap-3 flex-wrap ${fade("delay-500")}`}>
                <button
                  onClick={handleBuy}
                  className="wa-btn flex-1 min-w-[200px] bg-[#25D366] text-white text-[13px] tracking-widest uppercase py-4 px-8 font-medium flex items-center justify-center gap-3"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Order via WhatsApp</span>
                </button>
                <button className="sweep-btn bg-[#5A341A] text-white text-[13px] tracking-widest uppercase py-4 px-8 font-medium">
                  <span>Add to Wishlist</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className={`grid grid-cols-3 gap-3 ${fade("delay-500")}`}>
                {[
                  {
                    icon: "🚚",
                    label: "Free Delivery",
                    sub: "Orders over 2,000 EGP",
                  },
                  { icon: "🔨", label: "Handcrafted", sub: "Master artisans" },
                  {
                    icon: "🛡️",
                    label: "10yr Warranty",
                    sub: "Structural guarantee",
                  },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="bg-[#F5F1EA] px-3 py-3 flex flex-col items-center text-center gap-1 border border-[#EFE8DD]"
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[11px] font-medium tracking-wide text-[#5A341A]">
                      {b.label}
                    </span>
                    <span className="text-[10px] text-[#7A5A3A]">{b.sub}</span>
                  </div>
                ))}
              </div>

              {/* Product ID */}
              <p
                className={`text-[11px] tracking-[0.15em] text-[#7A5A3A]/60 ${fade("delay-600")}`}
              >
                Product ID: <span className="text-[#C9A24A]">{product.id}</span>
              </p>
            </div>
          </div>

          {/* ── TABS: Description / Materials / Details ── */}
          <div className={`mt-20 ${fade("delay-300")}`}>
            {/* Tab headers */}
            <div className="flex border-b border-[#EFE8DD] gap-10 mb-10">
              {[
                { key: "description", label: "Description" },
                { key: "materials", label: "Materials" },
                { key: "details", label: "Details" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-4 text-[12px] tracking-widest uppercase font-medium transition-colors ${activeTab === tab.key ? "tab-active" : "text-[#7A5A3A] hover:text-[#5A341A]"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "description" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-[#C9A24A]" />
                    <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A24A]">
                      About This Piece
                    </span>
                  </div>
                  <p className="font-playfair text-[1.5rem] italic font-medium text-[#5A341A] leading-snug mb-6">
                    "Where craftsmanship meets comfort."
                  </p>
                  <p className="text-[15px] leading-[2] text-[#7A5A3A] max-w-lg">
                    {product.description}
                  </p>
                  <p className="text-[15px] leading-[2] text-[#7A5A3A] max-w-lg mt-4">
                    Available in four curated leather tones, each chair is a
                    one-of-a-kind piece — slight variations in grain and texture
                    are hallmarks of authentic handcraftsmanship, not
                    imperfections.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DD]">
                  <img
                    src={product.images[1]}
                    alt="Detail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1A12]/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/90 backdrop-blur-sm border-l-2 border-[#C9A24A] px-4 py-3">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A24A] mb-1">
                        Artisan Promise
                      </p>
                      <p className="font-playfair text-[13px] text-[#2B1A12]">
                        Every piece signed by our master craftsman
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "materials" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#EFE8DD]">
                {product.materials.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white px-8 py-8 hover:bg-[#F5F1EA] transition-colors group"
                  >
                    <div className="w-6 h-px bg-[#C9A24A] mb-4 group-hover:w-10 transition-all duration-300" />
                    <p className="text-[11px] tracking-[0.25em] uppercase text-[#C9A24A] mb-2">
                      {m.label}
                    </p>
                    <p className="font-playfair text-[1.2rem] font-medium text-[#2B1A12]">
                      {m.value}
                    </p>
                  </div>
                ))}
                <div className="bg-[#5A341A] px-8 py-8 flex flex-col justify-center">
                  <p className="font-playfair italic text-[1.1rem] text-[#C9A24A] leading-snug mb-3">
                    "Only the finest materials make it into an AlAshry piece."
                  </p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                    Our Commitment
                  </p>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#EFE8DD]">
                {product.details.map((d, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-8 py-5 hover:bg-[#F5F1EA] transition-colors ${i % 2 === 0 ? "border-r border-[#EFE8DD]" : ""} border-b border-[#EFE8DD]`}
                  >
                    <span className="text-[11px] tracking-[0.25em] uppercase text-[#C9A24A]">
                      {d.label}
                    </span>
                    <span className="font-playfair text-[1rem] font-medium text-[#2B1A12]">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── ORDER SUMMARY STICKY FOOTER (mobile) ── */}
          <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#EFE8DD] px-4 py-3 flex items-center gap-3 shadow-2xl">
            <div className="flex-1">
              <p className="text-[10px] tracking-widest uppercase text-[#7A5A3A]">
                Total
              </p>
              <p className="font-playfair text-[1.4rem] font-bold text-[#5A341A] leading-none">
                {(product.price * qty).toLocaleString()}{" "}
                <span className="text-sm font-normal">EGP</span>
              </p>
            </div>
            <button
              onClick={handleBuy}
              className="wa-btn bg-[#25D366] text-white text-[12px] tracking-widest uppercase py-3 px-6 font-medium flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Order Now</span>
            </button>
          </div>
        </main>

        {/* ── LIGHTBOX ── */}
        {zoomed && (
          <div
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
          >
            <img
              src={product.images[activeImg]}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
            <button className="absolute top-6 right-6 text-white/70 hover:text-white">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
