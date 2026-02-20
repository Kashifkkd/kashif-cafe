"use client";

import { UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133376817!2d-73.987845923472!3d40.748440974226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus";

export function Footer() {
  return (
    <footer className="bg-[var(--espresso)] text-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {/* Details */}
          <div>
            <h2 className="flex items-center gap-2 font-editorial text-2xl font-semibold sm:text-3xl">
              <Image
                src="/cafe-logo.png"
                alt=""
                width={40}
                height={40}
                className="size-8 shrink-0 sm:size-10"
              />
              Kashif Café
            </h2>
            <p className="mt-4 font-sans text-sm text-[var(--cream)]/80">
              Where flavour meets moment.
            </p>
            <ul className="mt-8 space-y-3 font-sans text-sm">
              <li>
                <span className="font-medium text-[var(--amber)]">Address</span>
                <p className="mt-0.5 text-[var(--cream)]/90">
                  123 Coffee Street, Suite 1<br />
                  Your City, ST 10001
                </p>
              </li>
              <li>
                <span className="font-medium text-[var(--amber)]">Hours</span>
                <p className="mt-0.5 text-[var(--cream)]/90">
                  Mon – Fri 8:00 – 22:00<br />
                  Sat – Sun 9:00 – 23:00
                </p>
              </li>
              <li>
                <span className="font-medium text-[var(--amber)]">Contact</span>
                <p className="mt-0.5 text-[var(--cream)]/90">
                  <a
                    href="mailto:hello@kashifcafe.com"
                    className="hover:text-[var(--amber)] hover:underline"
                  >
                    hello@kashifcafe.com
                  </a>
                  <br />
                  <a
                    href="tel:+15551234567"
                    className="hover:text-[var(--amber)] hover:underline"
                  >
                    +1 (555) 123-4567
                  </a>
                </p>
              </li>
            </ul>
            <Link
              href="/reserve"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[var(--amber)] bg-[var(--amber)] px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-widest text-[var(--espresso)] transition-colors hover:bg-[var(--amber-glow)] hover:border-[var(--amber-glow)]"
            >
              <UtensilsCrossed className="size-4 shrink-0" />
              Reserve a table
            </Link>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-[var(--cream)]/10 bg-[var(--espresso-soft)]">
            <p className="sr-only">Map: Get directions to Kashif Café</p>
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="90%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kashif Café location"
              className="block min-h-[280px] w-full"
            />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kashif+Cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block px-4 pb-4 text-center font-sans text-xs text-[var(--cream)]/70 underline hover:text-[var(--amber)]"
            >
              Open in Google Maps for directions
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--cream)]/10 pt-8 text-center font-sans text-xs text-[var(--cream)]/60">
          © {new Date().getFullYear()} Kashif Café. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
