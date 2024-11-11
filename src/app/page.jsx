import React from "react";
import Home from "../components/Home"
import Header from "@/components/Header";


const Page = () => {
  return (
    <div className="h-screen" >
      <section className="min-h-screen">
        <div className="absolute bg-cover bg-center  bg-[url('/fly.jpg')] min-h-screen flex flex-col gap-1 transform">
          <div className="absolute inset-0 bg-black/50  "></div>
          <Header />
          <Home />
        </div>
      </section>
    </div>
  );
};

export default Page;
