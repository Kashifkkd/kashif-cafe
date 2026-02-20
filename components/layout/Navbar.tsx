"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLenis } from "@/lib/lenis-provider";

const LINKS = [
  { href: "#hero", label: "Welcome" },
  { href: "#menu", label: "Menu" },
  { href: "#signature", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
];

function scrollToAndClose(href: string, lenis: ReturnType<typeof useLenis>, onClose: () => void) {
  lenis?.scrollTo(href, { offset: -0 });
  onClose();
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setMobileOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-4 py-3 transition-all duration-500 sm:px-6 md:px-12 md:py-4",
          scrolled ? "bg-[var(--espresso)]/80 backdrop-blur-xl" : "bg-transparent"
        )}
        initial={false}
        animate={{
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.15)" : "0 0 0 transparent",
        }}
      >
        <Link
          href="#hero"
          className="font-editorial text-lg font-semibold tracking-tight text-[var(--cream)] sm:text-xl"
          onClick={(e) => {
            e.preventDefault();
            scrollToAndClose("#hero", lenis, () => setMobileOpen(false));
          }}
        >
          Kashif Café
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              data-cursor-hover
              className="relative py-2 text-sm font-medium uppercase tracking-widest text-[var(--cream)]/90 transition-colors hover:text-[var(--cream)]"
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo(href, { offset: -80 });
              }}
            >
              {label}
              <AnimatePresence>
                {activeId === href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--amber)]"
                    initial={false}
                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex size-10 items-center justify-center rounded-lg text-[var(--cream)] transition-colors hover:bg-white/10 active:bg-white/15 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.nav
              className="fixed right-0 top-0 z-[101] flex h-full w-[min(100%,320px)] flex-col gap-1 bg-[var(--espresso)]/95 px-6 py-24 backdrop-blur-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              aria-label="Mobile menu"
            >
              {LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative rounded-lg py-3 pl-4 pr-4 text-left font-medium uppercase tracking-widest text-[var(--cream)] transition-colors hover:bg-white/10 active:bg-white/15",
                    activeId === href.slice(1) && "bg-white/5 text-[var(--cream)]"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAndClose(href, lenis, () => setMobileOpen(false));
                  }}
                >
                  {activeId === href.slice(1) && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[var(--amber)]" />
                  )}
                  {label}
                </Link>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
