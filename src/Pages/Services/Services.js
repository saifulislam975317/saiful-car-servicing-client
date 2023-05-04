import React, { useRef, useState } from "react";
import ServicesCard from "./ServicesCard";
import { useQuery } from "@tanstack/react-query";

//https://saiful-car-servicing-server.vercel.app/services

const Services = () => {
  const searchRef = useRef("");
  const [isAsc, setIsAsc] = useState(true);
  const [search, setSearch] = useState("");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services", search, isAsc],
    queryFn: async () => {
      const res = await fetch(
        `https://saiful-car-servicing-server.vercel.app/services?search=${search}&order=${
          isAsc ? "asc" : "desc"
        }`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleSearch = () => {
    const searchText = searchRef.current;
    setSearch(searchText.value);
    searchText.value = "";
  };
  if (isLoading) {
    return (
      <div className="text-orange-500 text-2xl p-5 text-center">Loading...</div>
    );
  }
  return (
    <div>
      <div className="text-center my-12">
        <h1 className="text-xl text-orange-500 font-semibold">Services</h1>
        <h1 className="text-3xl ">Our Service Area</h1>
        <p className="p-5">
          the majority have suffered alteration in some form, by injected
          humour,
          <br />
          or randomised words which don't look even slightly believable.
        </p>
        <div className="text-end mr-5 mb-3">
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
      <div className="grid grid-cols-1 px-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {services.map((service) => (
          <ServicesCard key={service._id} service={service}></ServicesCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
