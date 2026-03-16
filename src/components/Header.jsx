import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const WHATSAPP_NUMBER = "201092846526"
  

    const handleWA = (e) => {

    const msg = encodeURIComponent(
      `أود الاستفسار عن احدث المنتجات!!`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/92 backdrop-blur border-b border-[#EFE8DD]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
          <div 
          onClick={()=> navigate("/")}
          className="flex items-center justify-center gap-1">
            <img src="/logo.jpg" alt="" className="w-16 rounded-full" />

            <a href="#" className="flex flex-col leading-none">
              <span className="font-playfair text-[21px] font-bold tracking-widest text-[#5A341A]">
                AL ASHRY
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A24A] font-light">
                Furniture · العشري
              </span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { name: "رئيسية", path: "/" },
              { name: "غرف", path: "/products" },
              { name: "عنا", path: "/about" },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="underline-nav text-[12px] tracking-widest uppercase text-[#7A5A3A] hover:text-[#5A341A] transition-colors font-medium"
              >
                {l.name}
              </Link>
            ))}
          </nav>
          <button
          onClick={()=> handleWA()}
           className="hidden md:block sweep-btn bg-[#5A341A] text-white text-[12px] tracking-widest uppercase px-7 py-[10px] font-medium">
            <span>احجز الان</span>
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden border border-[#EFE8DD] p-2 text-[#5A341A]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-[#2B1A12] flex flex-col items-center justify-center gap-10 transition-all duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-[#C9A24A]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {[
          { name: "رئيسية", path: "/" },
          { name: "غرف", path: "/products" },
          { name: "عنا", path: "/about" },
        ].map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className="underline-nav text-[12px] tracking-widest uppercase text-[#7A5A3A] hover:text-[#5A341A] transition-colors font-medium"
          >
            {l.name}
          </Link>
        ))}
        <button
        onClick={()=>handleWA()}
         className="mt-4 bg-[#C9A24A] text-white px-10 py-3 text-sm tracking-widest uppercase cursor-ponter ">
          احجز الان
        </button>
      </div>
    </>
  );
};

export default Header;
