import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { themeState } from "./recoil/atoms/globalState";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import CategoryLayout from "./components/Category/CategoryLayout";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<CategoryLayout />} />
        <Route path="/product" element={<NotFound />} />
        <Route path="/product/:productId" element={<ProductDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
