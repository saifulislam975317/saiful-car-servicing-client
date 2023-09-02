import React from "react";
import person from "../../assets/images/about_us/car-1.jpg";
import parts from "../../assets/images/about_us/car-2.jpg";

const About = () => {
  return (
    <div className="hero  bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 relative">
          <div className="w-3/4 h-full">
            <img alt="/" src={person} className=" rounded-lg shadow-2xl" />
          </div>
          <div className="absolute top-1/2  w-3/5 right-5">
            <img
              alt="/"
              src={parts}
              className=" rounded-lg border-8 shadow-2xl"
            />
          </div>
        </div>
        <div className="w-1/2">
          <h4 className="text-xl font-bold text-orange-500 mt-10">About Us</h4>
          <h1 className="text-5xl my-5">
            We are qualified <br />
            & of experience <br />
            in this field
          </h1>
          <p className="py-6">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </p>
          <p className="py-6">
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
