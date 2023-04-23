import React from "react";
import Breadcrumbs from "../components/BreadCrumbs";
import { Outlet, useLocation } from "react-router-dom";

interface LayoutProps {
  pageType?: string;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageType, children }) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((p) => p !== "");
  console.log(paths);

  const categoryNameList = [
    { label: "패션", value: "fashion" },
    {
      label: "액세서리",
      value: "accessory",
    },
    {
      label: "디지털",
      value: "digital",
    },
  ];

  return (
    <>
      <section className="pt-16">
        <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
          {/* 위치 */}
          {pageType !== "홈" && (
            <Breadcrumbs paths={paths} categoryNameList={categoryNameList} />
          )}

          {/* 컨텐츠 */}
          {children}
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Layout;
