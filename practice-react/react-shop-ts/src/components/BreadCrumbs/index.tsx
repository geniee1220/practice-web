import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
  paths: string[];
  categoryNameList: { label: string; value: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  paths,
  categoryNameList,
}) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        {paths.map((path, index) => {
          const url = `/${paths.slice(0, index + 1).join("/")}`;
          const categoryName = categoryNameList.find(
            (category) => category.value === path
          );
          const label = categoryName
            ? categoryName.label
            : path.charAt(0).toUpperCase() + path.slice(1);

          return <li key={url}>{label}</li>;
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
