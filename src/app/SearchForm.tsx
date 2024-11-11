import React, { useState, useEffect, useRef } from "react";
import flightsData from "./data/flightsData.json";
import { ArrowRight,  PlaneLanding, PlaneTakeoff } from "lucide-react";
import { DatePickerDemo } from "@/components/Datepicker";
import PassengerSelector from "../components/PassengerSelector";
import FlightCard from "@/components/FlightCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import gsap from "gsap";

// Get unique departure cities and arrival cities from the flights data
const departureCities = Array.from(
  new Set(flightsData.map((flight) => flight.departureCity))
);
const arrivalCities = Array.from(
  new Set(flightsData.map((flight) => flight.arrivalCity))
);

const FlightSearch = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState(""); // Departure Date
  const [passengerCount, setPassengerCount] = useState({
    adult: 1,
    children: 0,
    infant: 0,
  });
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const h2Ref = useRef(null); // Reference for the h2 element

 

// Define the types for the parameters
type SetterFunction = (value: string) => void;
type FieldType = "departure" | "arrival";

// Handle input changes for departure and arrival cities
const handleCityInput = (
  input: string,
  setter: SetterFunction,
  fieldType: FieldType
) => {
  setter(input);
  setFocusedInput(fieldType);

  // Depending on the field type, filter the correct city list
  const cities = fieldType === "departure" ? departureCities : arrivalCities;
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().startsWith(input.toLowerCase())
  );
  setCityOptions(filteredCities);
};



  // Function to get random flights (already present)
  const getRandomFlights = (flights, count) => {
    const shuffled = [...flights].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Handle search functionality
  const handleSearch = () => {
    // Clear previous results explicitly
    setFilteredFlights([]);

    // Run the search only if necessary fields are provided
    if (!departureCity || !arrivalCity) {
      setFilteredFlights([]); // No search if required fields are missing
      return;
    }

    const results = flightsData.filter(
      (flight) =>
        (!departureCity ||
          flight.departureCity.toLowerCase() === departureCity.toLowerCase()) &&
        (!arrivalCity ||
          flight.arrivalCity.toLowerCase() === arrivalCity.toLowerCase()) &&
        (!departureDate || flight.departureDate === departureDate) &&
        (!classType || flight.classType === classType)
    );

    // Select up to 5 random flights if more than 5 options are available
    const newFlightData = departureDate
      ? [getRandomFlightForDate(departureDate)]
      : results.length > 5
      ? getRandomFlights(results, 5)
      : results;

    setFilteredFlights(newFlightData);

    // Animate the h2 text on search
    gsap.to(h2Ref.current, {
      y: -50, // Move it up by 50px
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-container") &&
        focusedInput !== null
      ) {
        setCityOptions([]);
        setFocusedInput(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [focusedInput]);

  useEffect(() => {
    setFilteredFlights([]);
  }, [departureCity, arrivalCity, departureDate]);

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (scrollArea) {
      const handleWheel = (event) => {
        event.preventDefault();
        scrollArea.scrollTop += event.deltaY;
      };
      scrollArea.addEventListener("wheel", handleWheel);
      return () => scrollArea.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null); // Ref to scroll container

  return (
    <main className="min-h-full w-screen flex-col z-30 flex items-left justify-center">
      <div className="lg:w-[80vw] w-full flex flex-col items-left justify-center gap-8">
        <div className="flex w-full gap-2 lg:flex-row flex-col ">
          {/* Departure City Input */}
          <div
            className="w-full relative dropdown-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full bg-white bg-opacity-50 p-3 flex flex-col gap-2 z-10">
              <p className="opensans text-[12px] font-semibold">FROM</p>
              <div className="flex gap-2">
                <PlaneTakeoff
                  size={20}
                  strokeWidth={1}
                  className="text-black"
                />
                <input
                  type="text"
                  placeholder="Your Location"
                  value={departureCity}
                  onFocus={() =>
                    handleCityInput(
                      departureCity,
                      setDepartureCity,
                      "departure"
                    )
                  }
                  onChange={(e) =>
                    handleCityInput(
                      e.target.value,
                      setDepartureCity,
                      "departure"
                    )
                  }
                  className="w-full placeholder:text-sm placeholder:text-black bg-transparent outline-none"
                />
              </div>
            </div>
            {focusedInput === "departure" && cityOptions.length > 0 && (
              <ul
                className="rounded mt-2 max-h-40 overflow-y-auto absolute z-20 bg-white w-full"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {cityOptions.map((city) => (
                  <li
                    key={city}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setDepartureCity(city);
                      setCityOptions([]);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Arrival City Input */}
          <div
            className="w-full relative dropdown-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full bg-white bg-opacity-50 p-3 flex flex-col gap-2 z-10">
              <p className="opensans text-[12px] font-semibold">WHERE</p>
              <div className="flex gap-2">
                <PlaneLanding
                  size={20}
                  strokeWidth={1}
                  className="text-black"
                />
                <input
                  type="text"
                  placeholder="Your Destination"
                  value={arrivalCity}
                  onFocus={() =>
                    handleCityInput(arrivalCity, setArrivalCity, "arrival")
                  }
                  onChange={(e) =>
                    handleCityInput(e.target.value, setArrivalCity, "arrival")
                  }
                  className="w-full placeholder:text-sm placeholder:text-black bg-transparent outline-none"
                />
              </div>
            </div>
            {focusedInput === "arrival" && cityOptions.length > 0 && (
              <ul
                className="rounded mt-2 max-h-40 overflow-y-auto absolute z-20 bg-white w-full"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {cityOptions.map((city) => (
                  <li
                    key={city}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setArrivalCity(city);
                      setCityOptions([]);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <DatePickerDemo
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />

          <PassengerSelector
            value={passengerCount}
            min={1}
            onChange={(newCount) => setPassengerCount(newCount)}
          />

       

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <button
                onClick={handleSearch}
                className="py-3 lg:py-6 px-4 bg-blue-500 z-10 text-white hover:bg-blue-600 w-full"
              >
                <ArrowRight size={24} className="hidden lg:flex" />
                <p className="flex lg:hidden opensans text-center items-center justify-center">
                  Search Flight
                </p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex items-center justify-between mb-3">
                  <DialogTitle>Available Flights</DialogTitle>
                  <p
                    onClick={handleClose}
                    className="border rounded py-1 px-4 cursor-pointer hover:bg-white hover:text-black opensans text-white text-lg font-medium leading-none tracking-tight"
                  >
                    Back
                  </p>
                </div>
                <DialogDescription>
                  <ScrollArea className="max-h-[70vh] lg:max-h-full 2xl:max-h-full overflow-y-auto z-10  no-scrollbar">
                    <div className="flex flex-col gap-4">
                      {filteredFlights.map((flight) => (
                        <FlightCard key={flight.flight_number} {...flight} />
                      ))}
                    </div>
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
};

export default FlightSearch;
