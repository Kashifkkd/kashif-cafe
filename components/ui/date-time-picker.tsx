"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick date & time",
  className,
  id,
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = date
        ? new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            date.getHours(),
            date.getMinutes()
          )
        : new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            12,
            0
          );
      setDate(newDate);
      onChange?.(newDate);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    val: number | string
  ) => {
    const base = date || new Date();
    const newDate = new Date(base);
    if (type === "hour") {
      const hour = typeof val === "number" ? val : parseInt(String(val), 10);
      const isPm = newDate.getHours() >= 12;
      newDate.setHours((hour % 12) + (isPm ? 12 : 0));
    } else if (type === "minute") {
      newDate.setMinutes(typeof val === "number" ? val : parseInt(String(val), 10));
    } else if (type === "ampm") {
      const h = newDate.getHours();
      newDate.setHours(val === "PM" ? (h % 12) + 12 : h % 12);
    }
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            "h-11 w-full justify-start rounded-lg border-[var(--espresso)]/15 bg-white/95 px-4 text-left font-normal text-[var(--espresso)] hover:bg-white focus-visible:border-[var(--amber)] focus-visible:ring-[var(--amber)]/30",
            !date && "text-[var(--espresso)]/45",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />
          {date ? (
            format(date, "MM/dd/yyyy hh:mm a")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col sm:flex-row">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
          />
          <div className="flex border-t sm:border-l sm:border-t-0 sm:h-[300px]">
            <ScrollArea className="h-[120px] w-full sm:h-full sm:w-16">
              <div className="flex flex-wrap justify-center gap-1 p-2 sm:flex-col sm:flex-nowrap">
                {HOURS.map((hour) => (
                  <Button
                    key={hour}
                    type="button"
                    size="icon"
                    variant={
                      date && date.getHours() % 12 === (hour % 12)
                        ? "default"
                        : "ghost"
                    }
                    className="size-8 shrink-0 sm:w-full sm:aspect-square"
                    onClick={() => handleTimeChange("hour", hour)}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="h-[120px] w-full sm:h-full sm:w-16">
              <div className="flex flex-wrap justify-center gap-1 p-2 sm:flex-col sm:flex-nowrap">
                {MINUTES.map((minute) => (
                  <Button
                    key={minute}
                    type="button"
                    size="icon"
                    variant={
                      date && date.getMinutes() === minute ? "default" : "ghost"
                    }
                    className="size-8 shrink-0 sm:w-full sm:aspect-square"
                    onClick={() => handleTimeChange("minute", minute)}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <div className="flex border-l p-2 sm:flex-col sm:w-14">
              {["AM", "PM"].map((ampm) => (
                <Button
                  key={ampm}
                  type="button"
                  size="icon"
                  variant={
                    date &&
                    ((ampm === "AM" && date.getHours() < 12) ||
                      (ampm === "PM" && date.getHours() >= 12))
                      ? "default"
                      : "ghost"
                  }
                  className="size-8 shrink-0 sm:w-full sm:aspect-square"
                  onClick={() => handleTimeChange("ampm", ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
