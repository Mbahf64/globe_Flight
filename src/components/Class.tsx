import React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Define the props for the component
interface ClassProps {
  value?: string
  onChange?: (value: string) => void
}

const Class: React.FC<ClassProps> = ({ value, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-1 bg-white bg-opacity-50 p-3 z-10">
      <p className="opensans text-[12px] font-semibold">CLASS</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full pt-[2px]">
          <SelectValue placeholder="Select your class" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="first-class">First Class</SelectItem>
            <SelectItem value="business-class">Business </SelectItem>
            <SelectItem value="economy">Economy</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Class
