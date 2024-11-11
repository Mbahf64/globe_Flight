import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FlightCard from "./FlightCard";
import flights from "../app/data/flightsData.json";
import { FaPlane } from 'react-icons/fa6';
import Marquee from './ui/marquee';

const flightRoutes = [
    { departureCity: "Amsterdam Schiphol Airport - AMS", arrivalCity: "New York John F. Kennedy - JFK", from: "Amsterdam", to: "New York" },
    { departureCity: "Dubai International - DXB", arrivalCity: "Los Angeles International - LAX", from: "Dubai", to: "Los Angeles" },
    { departureCity: "Atlanta Hartsfield Airport - ATL", arrivalCity: "Chicago O'Hare - ORD", from: "Atlanta", to: "Chicago" },
    { departureCity: "Doha Hamad Airport - DOH", arrivalCity: "New York John F. Kennedy - JFK", from: "Doha", to: "New York" },
    { departureCity: "London Heathrow Airport - LHR", arrivalCity: "San Francisco International - SFO", from: "London", to: "San Francisco" },
    { departureCity: "Frankfurt Airport - FRA", arrivalCity: "Los Angeles International - LAX", from: "Frankfurt", to: "Los Angeles" },
    { departureCity: "Paris Charles de Gaulle - CDG", arrivalCity: "Toronto Pearson International - YYZ", from: "Paris", to: "Toronto" },
    { departureCity: "Hong Kong International - HKG", arrivalCity: "San Francisco International - SFO", from: "Hong Kong", to: "San Francisco" },
    { departureCity: "Tokyo Narita Airport - NRT", arrivalCity: "New York John F. Kennedy - JFK", from: "Tokyo", to: "New York" },
    { departureCity: "Singapore Changi Airport - SIN", arrivalCity: "New York John F. Kennedy - JFK", from: "Singapore", to: "New York" },
    { departureCity: "Sydney Kingsford Smith - SYD", arrivalCity: "Los Angeles International - LAX", from: "Sydney", to: "Los Angeles" },
    { departureCity: "Chicago O'Hare - ORD", arrivalCity: "London Heathrow - LHR", from: "Chicago", to: "London" },
    { departureCity: "Paris Charles de Gaulle - CDG", arrivalCity: "Los Angeles International - LAX", from: "Paris", to: "Los Angeles" }
];

function TravelApp() {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const constraintsRef = useRef(null);  // Ref for drag constraints

    const openFlightDialog = (route) => {
        setSelectedRoute(route);
        setIsDialogOpen(true);
    };

    const filteredFlights = flights.filter(
        (flight) =>
            flight.departureCity === selectedRoute?.departureCity &&
            flight.arrivalCity === selectedRoute?.arrivalCity
    );

    return (
        <div>
            {/* Scrollable Card Group with Drag */}
            <Marquee reverse pauseOnHover className="[--duration:100s]">
                <motion.div
                    className="flex space-x-4"
                    drag="x"
                    dragConstraints={constraintsRef} // Restricts drag within parent container
                >
                    {flightRoutes.map((route, index) => (
                        <motion.div
                            key={index}
                            className="card cursor-pointer bg-white rounded w-[220px] h-full flex flex-col gap-3 p-4"
                            onClick={() => openFlightDialog(route)}
                            whileHover={{ scale: 0.95 }}
                        >
                            {/* <motion.img
                                src={route.image}
                                alt="image"
                                className="w-full rounded"
                                whileHover={{ scale: 1.2 }} // Zoom out effect
                            /> */}

                            <div className="opensans text-sm font-semibold flex w-full items-center justify-between">
                                <p>{route.from}</p>
                                <FaPlane />
                                <p>{route.to}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Marquee>

            {/* Flight Details Dialog */}
            {isDialogOpen && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <div className="flex items-center justify-between mb-3">
                                <DialogTitle>Available Flights</DialogTitle>
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="border rounded py-1 px-4 cursor-pointer text-white opensans hover:bg-white hover:text-black"
                                >
                                    Back
                                </button>
                            </div>
                            <DialogDescription>
                                <div className="max-h-[70vh] lg:max-h-full overflow-y-auto z-10 no-scrollbar">
                                    <div className="flex flex-col gap-4">
                                        {filteredFlights.length > 0 ? (
                                            filteredFlights.map((flight) => (
                                                <FlightCard key={flight.flight_number} {...flight} />
                                            ))
                                        ) : (
                                            <p>No flights available for this route.</p>
                                        )}
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

export default TravelApp;
