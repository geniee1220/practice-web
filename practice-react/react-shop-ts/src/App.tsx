import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { themeState } from "./recoil/atoms/globalState";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Accessory from "./pages/Accessory";
import Digital from "./pages/Digital";
import Layout from "./pages/Layout";

function App() {
  // 테마
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      setTheme(localStorage.getItem("theme") as string);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={theme == "dark" ? "dark" : "light"}>
      <Nav />
      {/* <Routes> */}
      {/* <Route path="/" element={<Home />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/accessory" element={<Accessory />} />
        <Route path="/digital" element={<Digital />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} /> */}
      {/* </Routes> */}

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/:category" element={<Category />} /> */}
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
