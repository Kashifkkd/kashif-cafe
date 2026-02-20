"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", alt: "Cafe interior" },
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", alt: "Coffee" },
  { src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80", alt: "Pastry" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", alt: "Dessert" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", alt: "Seating" },
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", alt: "Flat white" },
  { src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80", alt: "Cafe table" },
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80", alt: "Ambience" },
  { src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80", alt: "Drinks" },
];

// Mobile: 2-col masonry. Desktop: 4-col masonry (varied sizes, one tile 1x1 so rows fill with no gap)
const GRID_CLASSES = [
  "col-span-2 row-span-2",           // large
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1 md:col-span-1 md:row-span-1", // 2x1 on mobile; 1x1 on desktop to avoid gap
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",           // large
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative w-full max-w-full bg-[var(--espresso)] px-4 py-24 sm:px-6 md:px-6 lg:px-8"
    >
      <motion.h2
        className="font-editorial text-4xl font-semibold text-[var(--cream)] md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Moments at the café
      </motion.h2>
      <motion.p
        className="mt-2 font-sans text-sm uppercase tracking-widest text-[var(--cream)]/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        A glimpse of what awaits
      </motion.p>

      <div className="mt-12 w-full grid grid-cols-2 grid-flow-row-dense grid-rows-auto gap-3 md:grid-cols-4 md:gap-4">
        {IMAGES.map((img, i) => (
          <motion.button
            key={i}
            type="button"
            data-gallery-item
            className={cn(
              "relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--amber)]",
              GRID_CLASSES[i]
            )}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            onClick={() => setSelected(i)}
          >
            <div className="relative h-full min-h-[140px] w-full md:min-h-[200px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl"
              layoutId={`gallery-${selected}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[selected].src}
                alt={IMAGES[selected].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
            <button
              type="button"
              className="absolute right-6 top-6 text-2xl text-white/80 hover:text-white"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
