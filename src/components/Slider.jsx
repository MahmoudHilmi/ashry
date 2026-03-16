import { useEffect, useRef, useState } from "react";

export default function Slider() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://res.cloudinary.com/dchhjoguv/image/upload/v1773509488/20_vxpwnd.png",
    "https://res.cloudinary.com/dchhjoguv/image/upload/v1773509452/15_vqldf0.png",
    "https://res.cloudinary.com/dchhjoguv/image/upload/v1773509374/14_os7alf.png",
  ];

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
    <div className="flex flex-col items-center" style={{ width: "100%" }}>
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
              style={{
                height: "clamp(220px, 40vw, 600px)",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── counter pill ── */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(43,26,18,0.65)",
          backdropFilter: "blur(6px)",
          padding: "4px 12px",
          fontFamily: "'Tajawal', sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#C9A24A",
            lineHeight: 1,
          }}
        >
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontSize: 9,
            color: "rgba(239,232,221,0.4)",
            letterSpacing: "0.1em",
          }}
        >
          /
        </span>
        <span
          style={{
            fontSize: 11,
            color: "rgba(239,232,221,0.6)",
            lineHeight: 1,
          }}
        >
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
