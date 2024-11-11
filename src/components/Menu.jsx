
"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const MenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        onClick={toggleMenu}
        className={`flex items-center justify-center w-24 h-12 cursor-pointer bg-blue-500 text-white transition-colors duration-300 ease-in-out ${
          isOpen ? 'bg-blue-500 scale-105' : 'bg-blue-500'
        }`}
      >
        <span className="font-medium bebas text-2xl transition-transform duration-300">
          {isOpen ? 'Close' : 'Menu'}
        </span>
        {!isOpen && (
          <div className="flex flex-col items-center justify-center space-y-1 ml-2">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
          </div>
        )}
      </div>
      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
         <motion.div
         initial={{ opacity: 0, height: 0 }}
         animate={{ opacity: 1, height: 'auto' }}
         exit={{ opacity: 0, height: 0 }}
         transition={{ duration: 0.3 }}
         className="absolute top-[60px] right-0 bg-blue-500 text-white shadow-lg overflow-hidden z-30"
       >
         <ul className="p-4 w-[90vw] lg:w-[30vw] bebas flex flex-col gap-5">
           {['Home', 'BOOKING', 'PROFILE/SETTINGS', 'SUPPORT', 'SIGN UP', 'SIGN IN'].map((item, index) => (
             <li 
               key={index} 
               className="py-2 text-4xl hover:bg-[#dbeafe] cursor-pointer hover:text-black hover:scale-105 transition-transform duration-200 px-2 flex items-center"
             >
          
               {item}
             </li>
           ))}
         </ul>
       </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuToggle;

