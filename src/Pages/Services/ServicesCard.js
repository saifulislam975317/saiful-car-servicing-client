import React from "react";
import { Link } from "react-router-dom";

const ServicesCard = ({ service }) => {
  const { img, title, price, _id } = service;
  return (
    <div className="card card-compact w-96 bg-base-100  shadow-xl">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-2xl font-semibold text-orange-500">price:${price}</p>
        <div className="card-actions justify-end">
          <Link to={`/checkout/${_id}`}>
            <button className="btn btn-primary">Order Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
