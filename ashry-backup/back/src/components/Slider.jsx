import { useEffect, useRef, useState } from "react";

export default function Slider() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ["/pics/0-pres/0.1.jpeg","/pics/0-pres/0.2.jpeg","/pics/0-pres/0.3.jpeg",];

  const totalSlides = images.length;

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl overflow-hidden relative">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full flex-shrink-0"
              alt={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── counter pill ── */}
      <div style={{
        position: "absolute", bottom: 24, right: 16,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(43,26,18,0.65)",
        backdropFilter: "blur(6px)",
        padding: "4px 12px",
        fontFamily: "'Tajawal', sans-serif",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#C9A24A", lineHeight: 1 }}>
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span style={{ fontSize: 9, color: "rgba(239,232,221,0.4)", letterSpacing: "0.1em" }}>/</span>
        <span style={{ fontSize: 11, color: "rgba(239,232,221,0.6)", lineHeight: 1 }}>
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
