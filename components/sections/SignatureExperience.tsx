"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80";

const TITLE = "Crafted for the moment";
const BODY =
  "Every dish is designed to slow time — from our house-blend coffee to our wood-fired pizzas. A place to stay, with comfortable seats and the kind of ambience that makes you forget to check the time.";

export function SignatureExperience() {
  return (
    <section
      id="signature"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--espresso)]"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[var(--espresso)]/50" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 md:px-8">
        <motion.h2
          className="font-editorial text-3xl font-semibold leading-tight text-[var(--cream)] sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {TITLE}
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[var(--cream)]/90 sm:mt-6 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {BODY}
        </motion.p>
      </div>
    </section>
  );
}
