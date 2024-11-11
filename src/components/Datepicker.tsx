import * as React from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="w-full z-10">
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-full flex flex-col gap-2 bg-white bg-opacity-50 p-[13.5px]">
            <p className="opensans text-[12px] font-semibold">DATE</p>
            <Button className="w-full justify-start text-left font-normal flex gap-2 ">
              <CalendarIcon size={20} strokeWidth={1} className="text-black" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
