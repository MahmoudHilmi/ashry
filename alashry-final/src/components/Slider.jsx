import { useEffect, useRef, useState } from "react";

export default function Slider() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ["/pics/0-pres/0.1.jpeg","/pics/0-pres/0.2.jpeg","/pics/0-pres/0.3.jpeg","/pics/0-pres/0.4.jpeg",];

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

      {/* <div className="flex items-center mt-5 space-x-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSlide === i ? "bg-black" : "bg-black/20"
            }`}
          ></span>
        ))}
      </div> */}
    </div>
  );
}
