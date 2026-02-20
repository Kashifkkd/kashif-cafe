"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PARTY_OPTIONS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9+",
];

interface PartySizeComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function PartySizeCombobox({
  value,
  onChange,
  placeholder = "Select guests",
  className,
  id,
}: PartySizeComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const label = value
    ? `${value} ${value === "1" ? "guest" : "guests"}`
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            "h-11 w-full justify-between rounded-lg border-[var(--espresso)]/15 bg-white/95 px-4 font-normal text-[var(--espresso)] hover:bg-white focus-visible:border-[var(--amber)] focus-visible:ring-[var(--amber)]/30",
            !value && "text-[var(--espresso)]/45",
            className
          )}
        >
          <span>{label}</span>
          <ChevronDown className="size-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-1" align="start">
        {PARTY_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              onChange(opt);
              setOpen(false);
            }}
            className={cn(
              "flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-[var(--espresso)]/10 focus:bg-[var(--espresso)]/10",
              value === opt && "bg-[var(--amber)]/15 text-[var(--espresso)] font-medium"
            )}
          >
            {opt} {opt === "1" ? "guest" : "guests"}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
