import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import { useEffect, useState } from "react";
import instance, { getProducts } from "./axios";
import DetailProduct from "./pages/DetailProduct";
import DashBoard from "./pages/admin/DashBoard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";

function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
    // IIFE = Invoke Immediately Function Expression (là hàm được gọi ngay lập tức sau khi khai báo)
  }, []);

  const handleSubmit = (data) => {
    (async () => {
      try {
        const res = await instance.post("/products", data);
        setProducts([...products, res.data]);
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleProductEdit = (data) => {
    (async () => {
      try {
        await instance.patch(`/products/${data.id}`, data);
        const newData = await getProducts();
        setProducts(newData);
        if (confirm("sua thanh cong?")) {
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  };
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/product-detail/:id" element={<DetailProduct />} />
          <Route
            path="/admin"
            element={<DashBoard data={products} username="Nguyen Van Admin" />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/admin/product-add"
            element={<ProductAdd onAdd={handleSubmit} />}
          />
          <Route
            path="/admin/product-edit/:id"
            element={<ProductEdit onEdit={handleProductEdit} />}
          />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
