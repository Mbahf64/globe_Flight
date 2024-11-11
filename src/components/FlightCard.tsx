"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FaPlane } from "react-icons/fa6";

const FlightCard = ({
  flight_number,
  company,
  departureCity,
  arrivalCity,
  departureTime,
  arrivalTime,
  classType,
}) => {
  const cardRef = useRef([]);

  // Helper function to add each element to the ref array
  const addToRefs = (el) => {
    if (el && !cardRef.current.includes(el)) {
      cardRef.current.push(el);
    }
  };

  useEffect(() => {
    // Animate elements from bottom to top when component mounts
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 }, // Start from below and transparent
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
        stagger: 0.9, // Creates a cascading effect
      }
    );
  }, [flight_number, company]); // Animation re-triggers when data changes

  return (
    <div
      className="card flex flex-col gap-3 lg:flex-row w-[90vw] lg:w-[80vw] p-4 shadow-md bg-white rounded opensans items-start lg:items-center justify-between h-full no-scrollbar"
      ref={addToRefs}
    >
      <h3 className="text-xl font-semibold ">{company}</h3>
      <p className="">
      <span className="text-sm font-semibold">Ticket Number:</span> {flight_number}
        </p>

      <p className="">
        <span className="text-sm font-semibold">From:</span> {departureCity} 
      </p>
      <p className="">
      <span className="text-sm font-semibold">To:</span> {arrivalCity}
      </p>
      <p className="flex gap-5 ">
        {departureTime} <FaPlane/>
        {arrivalTime}
      </p>
      <p className="">
      <span className="text-sm font-semibold">Class:</span> {classType}
        </p>
    </div>
  );
};

export default FlightCard;
