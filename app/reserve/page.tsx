"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, Utensils } from "lucide-react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { PartySizeCombobox } from "@/components/ui/party-size-combobox";
import { cn } from "@/lib/utils";

const RESERVE_BG_IMAGE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80";

const POLICY_CONTENT = [
  { label: "Hours", text: "Mon – Fri 8:00 – 22:00 · Sat – Sun 9:00 – 23:00" },
  { label: "Seating", text: "Tables for 2–8; larger groups please call ahead." },
  {
    label: "Policy",
    text: "Reservations held for 15 minutes. Please cancel or modify at least 2 hours in advance.",
  },
  {
    label: "Contact",
    email: "reservations@kashifcafe.com",
    phone: "+1 (555) 123-4567",
    phoneWhatsApp: "15551234567",
  },
] as const;

export default function ReservePage() {
  const [submitted, setSubmitted] = useState(false);
  const [reservationDateTime, setReservationDateTime] = useState<Date | undefined>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    partySize: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formFieldClass =
    "rounded-lg border-[var(--espresso)]/15 bg-white/95 px-4 py-3 text-[var(--espresso)] placeholder:text-[var(--espresso)]/45 focus-visible:border-[var(--amber)] focus-visible:ring-[var(--amber)]/30 focus-visible:ring-[3px] transition-colors";

  const cardClass =
    "overflow-hidden rounded-2xl border border-[var(--espresso)]/10 bg-white shadow-xl shadow-[var(--espresso)]/5";

  return (
    <div className="relative min-h-screen bg-[var(--cream-warm)]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          src={RESERVE_BG_IMAGE}
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          sizes="100vw"
          priority
        />
      </div>
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.header
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            <h1 className="font-editorial text-4xl font-semibold sm:text-5xl">
              Book a table
            </h1>
            <p className="mt-4 font-sans text-[var(--espresso)]/80">
              Secure your spot. We’ll confirm by email or phone.
            </p>
          </motion.header>

          <motion.section
            className="mt-5 md:mt-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div
                className={cn(
                  cardClass,
                  "mx-auto max-w-md p-8 text-center"
                )}
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--amber)]/15">
                  <svg
                    className="size-7 text-[var(--amber)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="mt-6 font-editorial text-2xl font-semibold text-[var(--espresso)]">
                  Request received
                </p>
                <p className="mt-2 font-sans text-sm text-[var(--espresso)]/80">
                  We’ll confirm your reservation shortly.
                </p>
                <Button
                  asChild
                  className="mt-8 rounded-full border-2 border-[var(--amber)] bg-[var(--amber)] px-8 py-2.5 font-medium uppercase tracking-widest text-[var(--espresso)] hover:bg-[var(--amber-glow)] hover:border-[var(--amber-glow)]"
                >
                  <Link href="/">Back to home</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                {/* Policy card — left on desktop, top on mobile */}
                <div className={cardClass}>
                  <div className="border-b border-[var(--espresso)]/10 bg-[var(--cream-warm)]/50 px-6 py-3 md:px-8 md:py-4">
                    <h2 className="flex items-center gap-2 font-editorial text-xl font-semibold text-[var(--espresso)]">
                      <Utensils className="size-5 shrink-0" />
                      Reservation details
                    </h2>
                  </div>
                  <ul className="space-y-4 p-6 md:p-8">
                    {POLICY_CONTENT.map((item) => (
                      <li key={item.label}>
                        <span className="font-sans text-sm font-medium text-[var(--amber)]">
                          {item.label}
                        </span>
                        {"text" in item ? (
                          <p className="mt-1 font-sans text-sm text-[var(--espresso)]/90">
                            {item.text}
                          </p>
                        ) : (
                          <p className="mt-1 font-sans text-sm text-[var(--espresso)]/90">
                            <a
                              href={`mailto:${item.email}`}
                              className="text-[var(--espresso)] underline underline-offset-2 hover:text-[var(--amber)]"
                            >
                              {item.email}
                            </a>
                            {" · "}
                            <a
                              href={`https://wa.me/${item.phoneWhatsApp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--espresso)] underline underline-offset-2 hover:text-[var(--amber)]"
                            >
                              {item.phone}
                            </a>
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Form card — right on desktop, bottom on mobile */}
                <div className={cardClass}>
                  <div className="border-b border-[var(--espresso)]/10 bg-[var(--cream-warm)]/50 px-6 py-3 md:px-8 md:py-4">
                    <h2 className="flex items-center gap-2 font-editorial text-xl font-semibold text-[var(--espresso)]">
                      <CalendarCheck className="size-5 shrink-0" />
                      Request a table
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 md:p-8">
                    <div className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[var(--espresso)] font-medium">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={cn("h-11", formFieldClass)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-[var(--espresso)] font-medium">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={cn("h-11", formFieldClass)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[var(--espresso)] font-medium">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className={cn("h-11", formFieldClass)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[var(--espresso)] font-medium">
                          Date & time
                        </Label>
                        <DateTimePicker
                          value={reservationDateTime}
                          onChange={setReservationDateTime}
                          placeholder="Pick date & time"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partySize" className="text-[var(--espresso)] font-medium">
                          Party size
                        </Label>
                        <PartySizeCombobox
                          id="partySize"
                          value={form.partySize}
                          onChange={(v) => setForm((p) => ({ ...p, partySize: v }))}
                          placeholder="Select guests"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-[var(--espresso)] font-medium">
                          Special requests
                          <span className="ml-1 font-normal text-[var(--espresso)]/60">
                            (optional)
                          </span>
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Dietary needs, occasion, accessibility…"
                          className={cn("resize-none", formFieldClass)}
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="submit"
                        className="order-2 rounded-full border-2 border-[var(--amber)] bg-[var(--amber)] px-8 py-2.5 font-medium uppercase tracking-widest text-[var(--espresso)] hover:bg-[var(--amber-glow)] hover:border-[var(--amber-glow)] sm:order-1"
                      >
                        Send request
                      </Button>
                      <Link
                        href="/"
                        className="order-1 text-center font-sans text-sm font-medium text-[var(--espresso)]/70 underline-offset-2 hover:text-[var(--espresso)] hover:underline sm:order-2"
                      >
                        Back to home
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
}
