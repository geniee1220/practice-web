import React from "react";
import { Link } from "react-router-dom";
import { ProductListParams } from "../../../apis/products/model";

interface CardProps {
  product: ProductListParams;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <>
      <div className="flex h-80 bg-white justify-center items-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="transition-transform duration-300 max-w-[50%] max-h-[50%] hover:scale-[1.15]"
        />
      </div>

      <div className="card-body bg-gray-100 dark:bg-gray-700 ">
        <p className="card-title text-base">{product.title}</p>
        <p className="text-slate-400 text-base">{"$" + product.price}</p>
      </div>
    </>
  );
};

export default Card;
