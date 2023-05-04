import React from "react";
import "./BannerItems.css";

const BannerItems = ({ slide }) => {
  const { image, id, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-img">
        <img src={image} alt="" className="w-full rounded-lg" />
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5  top-1/4">
        <h1 className="lg:text-6xl text-3xl  text-white">
          Affordable
          <br />
          Price For Car
          <br />
          Servicing
        </h1>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 w-2/5 top-2/4">
        <p className="text-xl text-white lg:block md:block hidden">
          There are many variations of passages of available, but the majority
          have suffered alteration in some form
        </p>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 left-5 w-2/5 top-3/4">
        <button className="btn btn-warning mr-5">Discover More</button>
        <button className="btn btn-outline btn-warning">Latest Project</button>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 lg:bottom-10 bottom-20">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5 ">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerItems;
