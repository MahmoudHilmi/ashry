import Hero from "./components/Hero";
import ProductPage from "./components/Order";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import About from "./components/About";
import ProductDetail from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/product"
          element={
            <div
              className="flex items-center justify-center w-screen h-screen flex-col gap-5"
              style={{ textAlign: "center", padding: "100px 16px" }}
            >
              <p
                className="fp"
                style={{ fontSize: 42, color: "#5A341A", marginBottom: 20 }}
              >
                الصفحة غير موجودة
              </p>
              <button className="hidden md:block sweep-btn bg-[#5A341A] text-white text-[12px] tracking-widest uppercase px-7 py-[10px] font-medium">
                <Link to="/products">الرجوع للرئيسية</Link>
              </button>
            </div>
          }
        />
        <Route path="/products" element={<Products />} />
        {/* <Route
            path="/"
            element={
              <GridPage
                products={products}
                loading={false}
                error={null}
              />
            }
          /> */}

        <Route path="/about" element={<About />} />
        <Route
          path="*"
          element={
            <div
              className="flex items-center justify-center w-screen h-screen flex-col gap-5"
              style={{ textAlign: "center", padding: "100px 16px" }}
            >
              <p
                className="fp"
                style={{ fontSize: 42, color: "#5A341A", marginBottom: 20 }}
              >
                الصفحة غير موجودة
              </p>
              <button className="hidden md:block sweep-btn bg-[#5A341A] text-white text-[12px] tracking-widest uppercase px-7 py-[10px] font-medium">
                <Link to="/products">الرجوع للرئيسية</Link>
              </button>
            </div>
          }
        />

        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
