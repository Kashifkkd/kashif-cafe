"use client";

import { useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";

const REVIEWS = [
  {
    quote:
      "The flat white here ruined every other coffee for me. Cozy corner, warm light — I could sit for hours.",
    name: "Priya M.",
    tag: "Regular",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
  },
  {
    quote:
      "Came for the coffee, stayed for the vibe. Wood-fired pizza was a surprise hit. Will definitely be back.",
    name: "Alex K.",
    tag: "First visit",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
  },
  {
    quote:
      "Finally a place that gets it. Great food, great music, and the staff actually remember your order.",
    name: "Jordan L.",
    tag: "Regular",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
  },
  {
    quote:
      "Perfect spot for a slow morning. The pastries are fresh, and the ambience feels like a second home.",
    name: "Samira R.",
    tag: "First visit",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
  },
  {
    quote:
      "Best café in town. The mojitos and the evening light through the windows — chef’s kiss.",
    name: "Rohan S.",
    tag: "Regular",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
  },
];

const CARD_WIDTH = 380;
const GAP = 24;
const DURATION = 45;

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ReviewCard({
  quote,
  name,
  tag,
  rating,
  image,
}: (typeof REVIEWS)[0]) {
  return (
    <article
      className="group relative flex shrink-0 flex-col rounded-3xl border border-[var(--espresso)]/10 bg-white/98 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[var(--amber)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:scale-[1.02] dark:border-white/15 dark:bg-[var(--espresso-soft)]/95"
      style={{ width: CARD_WIDTH }}
    >
      <div className="absolute -right-0 -top-6 text-[120px] leading-none text-[var(--amber)]/30 select-none">
        “
      </div>
      <div className="relative flex gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--amber)]/30 ring-offset-2 ring-offset-white dark:ring-offset-[var(--espresso)]">
          <Image
            src={image}
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="font-sans text-[15px] leading-relaxed text-[var(--espresso)] line-clamp-3 dark:text-[var(--cream)]/95">
            {quote}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-sans text-sm font-semibold text-[var(--espresso)] dark:text-[var(--cream)]">
              {name}
            </span>
            <span className="rounded-full bg-[var(--amber)]/15 px-2 py-0.5 font-sans text-[11px] font-medium uppercase tracking-wider text-[var(--amber)]">
              {tag}
            </span>
          </div>
          <div
            className="mt-2 flex gap-0.5"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: rating }).map((_, j) => (
              <StarIcon key={j} className="size-4 text-[var(--amber)]" />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Reviews() {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const duplicated = [...REVIEWS, ...REVIEWS];
  const totalWidth = duplicated.length * CARD_WIDTH + (duplicated.length - 1) * GAP;
  const offset = totalWidth / 2;

  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    const velocity = totalWidth / (DURATION * 1000);
    x.set(x.get() - velocity * delta);
    if (x.get() <= -offset) x.set(x.get() + offset);
  });

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--cream-warm)] via-[var(--cream)] to-[var(--cream-warm)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-sans text-lg font-bold uppercase tracking-[0.3em] text-[var(--amber)]">
            Testimonials
          </span>
          <h2 className="mt-3 font-editorial text-4xl font-semibold tracking-tight text-[var(--espresso)] sm:text-5xl md:text-6xl">
            Loved by guests
          </h2>
          <p className="mt-4 max-w-xl mx-auto font-sans text-base text-[var(--espresso)]/85">
            Real stories from our regulars and first-timers.
          </p>
        </motion.header>
      </div>

      <div
        className="relative mt-0 h-[40vh] w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="absolute left-0 top-1/2 flex -translate-y-1/2 gap-6 will-change-transform md:gap-8"
          style={{ x }}
        >
          {duplicated.map((review, i) => (
            <ReviewCard key={`${i}-${review.name}`} {...review} />
          ))}
        </motion.div>
      </div>


    </section>
  );
}
