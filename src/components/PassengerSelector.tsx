import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react';

// Define the props for the component
interface PassengerSelectorProps {
  value: { adult: number, children: number, infant: number };
  onChange: (value: { adult: number, children: number, infant: number }) => void;
  min?: number;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ value, onChange, min = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  const updateCount = (type: string, count: number) => {
    onChange({ ...value, [type]: count });
  };

  return (
    <div className="relative w-full flex items-center justify-center z-10">
      {/* Button to trigger the popover */}
      <div className="w-full flex flex-col gap-2 bg-white bg-opacity-50 p-3">
        <p className="opensans text-[12px] font-semibold">PASSENGER</p>
        <Button
          onClick={togglePopover}
          className="flex items-center justify-start gap-2 w-full text-sm text-black opensans font-normal transition-all duration-300"
        >
          <User className="text-black" size={20} strokeWidth={1} />
          {value.adult} adults . {value.children} children . {value.infant} infants
        </Button>
      </div>

      {/* Popover with the passenger selection */}
      <Popover open={isOpen} onOpenChange={setIsOpen} className="absolute">
        <PopoverTrigger>
          <span className="hidden"></span>
        </PopoverTrigger>
        <PopoverContent className="bg-white rounded shadow-md p-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Select Passengers</h2>
            <div className="flex flex-col gap-2">
              <div>
                <label>Adults:</label>
                <input
                  type="number"
                  value={value.adult}
                  onChange={(e) => updateCount("adult", Math.max(min, Number(e.target.value)))}
                  className="border border-gray-300 rounded p-1 w-full"
                  min={min}
                />
              </div>
              <div>
                <label>Children:</label>
                <input
                  type="number"
                  value={value.children}
                  onChange={(e) => updateCount("children", Math.max(min, Number(e.target.value)))}
                  className="border border-gray-300 rounded p-1 w-full"
                  min={min}
                />
              </div>
              <div>
                <label>Infants:</label>
                <input
                  type="number"
                  value={value.infant}
                  onChange={(e) => updateCount("infant", Math.max(min, Number(e.target.value)))}
                  className="border border-gray-300 rounded p-1 w-full"
                  min={min}
                />
              </div>
            </div>
            <Button
              onClick={handleSave}
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            >
              Save
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PassengerSelector;
