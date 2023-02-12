import React, { useEffect, useRef, useState } from "react";
import ServicesCard from "./ServicesCard";

//https://saiful-car-servicing-server.vercel.app/services

const Services = () => {
  const [services, setServices] = useState([]);
  const searchRef = useRef("");
  const [isAsc, setIsAsc] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(
      `http://localhost:5000/services?search=${search}&order=${
        isAsc ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [isAsc, search]);

  const handleSearch = () => {
    const searchText = searchRef.current;
    setSearch(searchText.value);
    searchText.value = "";
  };
  return (
    <div>
      <div className="text-center my-12">
        <h1 className="text-xl text-orange-500 font-semibold">Services</h1>
        <h1 className="text-3xl ">Our Service Area</h1>
        <p>
          the majority have suffered alteration in some form, by injected
          humour,
          <br />
          or randomised words which don't look even slightly believable.
        </p>
        <div className="text-end">
          <span className="text-xl">Sort by:</span>
          <button className="btn btn-warning " onClick={() => setIsAsc(!isAsc)}>
            {isAsc ? "High Price to Low Price" : "Low Price to High Price"}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search "
          ref={searchRef}
          className="input input-bordered input-md w-full max-w-xs"
        />
        <button onClick={handleSearch} className="btn btn-md">
          search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {services.map((service) => (
          <ServicesCard key={service._id} service={service}></ServicesCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
