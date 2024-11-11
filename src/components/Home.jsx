"use client"
import React, { useEffect, useRef } from 'react';
import SearchForm from "../app/SearchForm"
import { gsap } from 'gsap';
import FlightRoute from "./FlightRoute"

const Home = () => {
  const h1Ref = useRef(null);
  const searchFormRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Zoom-in effect for h1 text
    gsap.fromTo(
      h1Ref.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out'
      }
    );

    // Scroll-up effect for SearchForm
    gsap.fromTo(
      searchFormRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 1.5,
        ease: 'power3.out'
      }
    );

    // Background image fade effect
    gsap.to(containerRef.current, {
      backgroundImage: "url('ane.png')",
      duration: 2,
      delay: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div
    ref={searchFormRef}
      className="w-screen flex flex-col items-center justify-center gap-4 h-[80vh] bg-cover bg-center"
    >
      <div  className="flex flex-col items-start justify-start w-[90vw] gap-2">
        <h2 className="text-4xl lg:text-8xl font-black mb-4 opensans text-left z-10 text-white">
          Find Your Flight
        </h2>
        <div className="w-full flex items-start justify-start z-20">
          <SearchForm />
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-black/50 p-4 w-screen">
        <p className="opensans text-white text-2xl font-semibold z-10 text-center">Flight Routes</p>
        <FlightRoute />
      </div>
    </div>
  );
};

export default Home;
