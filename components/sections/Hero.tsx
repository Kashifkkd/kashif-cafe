"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/lib/lenis-provider";

const HEADLINE = "Where flavour meets moment.";
const SUBTITLE = "A space for coffee, conversation, and the in-between.";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setLoaded(true);
    v.addEventListener("canplay", onCanPlay);
    if (v.readyState >= 2) {
      queueMicrotask(() => setLoaded(true));
    }
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--espresso)] pb-20 pt-16 sm:pb-24 sm:pt-20 md:pb-32 md:pt-20"
    >
      {/* Video background — Ken Burns via scale + slow animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 scale-110"
          animate={{
            scale: [1, 1.08],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            preload="auto"
          >
            <source src="/cafe.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </motion.div>
        {/* Fade from black */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: loaded ? 0 : 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Foreground content — anchored to bottom on mobile, centered on md+ */}
      <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pb-2 text-center sm:px-6 sm:pb-0 md:px-12">
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-editorial text-3xl font-semibold leading-[1.15] tracking-tight text-[var(--cream)] sm:text-5xl md:text-7xl lg:text-8xl">
            {HEADLINE.split(" ").map((word, i) => (
              <span key={i} className="inline-block">
                {word.split("").map((char, j) => (
                  <motion.span
                    key={j}
                    className="inline-block"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{
                      delay: 0.8 + i * 0.08 + j * 0.02,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {i < HEADLINE.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>
        </motion.div>
        <motion.p
          className="mt-4 max-w-xl font-sans text-sm font-normal tracking-wide text-[var(--cream)] sm:mt-6 sm:text-base md:text-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {SUBTITLE}
        </motion.p>
        <motion.div
          className="mt-6 flex w-full flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <Button
            asChild
            size="lg"
            data-cursor-magnetic
            className="w-full rounded-full border-2 border-[var(--amber)] bg-[var(--amber)] px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-[var(--espresso)] hover:bg-[var(--amber-glow)] hover:border-[var(--amber-glow)] sm:w-auto sm:px-8 md:px-10"
          >
            <a href="#menu" onClick={(e) => { e.preventDefault(); lenis?.scrollTo("#menu", { offset: -0 }); }}>View menu</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            data-cursor-hover
            className="w-full rounded-full border-[var(--cream)]/50 bg-transparent px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-[var(--cream)] hover:bg-[var(--cream)]/10 sm:w-auto sm:px-8 md:px-10"
          >
            <a href="#gallery" onClick={(e) => { e.preventDefault(); lenis?.scrollTo("#gallery", { offset: 20 }); }}>Gallery</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator — below content on mobile */}
      <motion.div
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-8 sm:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--cream)]/60 sm:text-[10px] sm:tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          className="h-8 w-px rounded-full bg-[var(--cream)]/50 sm:h-10"
          animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
