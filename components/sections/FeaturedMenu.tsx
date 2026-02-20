"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const CATEGORIES = [
  {
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    items: "Wood-fired · Classics",
  },
  {
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    items: "Gourmet · Hand-cut",
  },
  {
    name: "Fries",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=80",
    items: "Crispy · Seasoned",
  },
  {
    name: "Sandwiches",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    items: "Fresh · Toasted",
  },
  {
    name: "Coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    items: "Single-origin · Espresso",
  },
  {
    name: "Mojitos",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    items: "Fresh mint · House rum",
  },
];

const MOBILE_GAP = 12;
const CARD_GAP_PX = 24;

export function FeaturedMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const carouselX = useTransform(scrollYProgress, [0, 1], [0, maxTranslate]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => {
      const w = viewport.offsetWidth;
      const isMobile = w < 768;
      const gap = isMobile ? MOBILE_GAP : CARD_GAP_PX;
      const cardWidth = isMobile ? w : (w - gap) / 2;
      const totalWidth = 6 * cardWidth + 5 * gap;
      setMaxTranslate(-Math.max(0, totalWidth - w));
      viewport.style.setProperty("--carousel-card-width", `${cardWidth}px`);
      viewport.style.setProperty("--carousel-gap", `${gap}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="menu"
      ref={containerRef}
      className="relative min-h-[300vh] bg-[var(--cream-warm)]"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <div className="shrink-0 px-4 pt-20 pb-4 sm:px-6 md:px-10 md:pt-24 md:pb-6 lg:px-12">
          <motion.h2
            className="font-editorial text-3xl font-semibold text-[var(--espresso)] sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Featured menu
          </motion.h2>
          <motion.p
            className="mt-1.5 text-xs uppercase tracking-widest text-[var(--espresso)]/60 sm:mt-2 sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Scroll down — carousel advances
          </motion.p>
        </div>
        {/* Carousel viewport: vertical scroll drives horizontal position. 1 card on mobile, 2 on desktop. */}
        <div
          ref={viewportRef}
          className="min-h-0 flex-1 overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12 pb-6"
          style={
            {
              "--carousel-card-width": "100%",
              "--carousel-gap": `${MOBILE_GAP}px`,
            } as React.CSSProperties
          }
        >
          <motion.div
            className="flex h-full w-max"
            style={{
              x: carouselX,
              gap: "var(--carousel-gap)",
            }}
          >
            {CATEGORIES.map((cat) => (
              <MenuCard key={cat.name} category={cat} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MenuCard({ category }: { category: (typeof CATEGORIES)[0] }) {
  return (
    <div
      className="group relative h-full min-h-[160px] shrink-0 overflow-hidden rounded-xl bg-[var(--espresso-soft)] shadow-xl sm:min-h-[260px] sm:rounded-2xl md:min-h-[320px]"
      style={{ width: "var(--carousel-card-width)" }}
      data-cursor-hover
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 80px rgba(255,200,120,0.08)" }}
      />
      <div className="absolute inset-x-0 bottom-0 p-4 text-[var(--cream)] sm:p-5 md:p-6">
        <h3 className="font-editorial text-xl font-semibold sm:text-2xl">
          {category.name}
        </h3>
        <p className="mt-0.5 text-xs opacity-80 sm:mt-1 sm:text-sm">
          {category.items}
        </p>
      </div>
    </div>
  );
}
