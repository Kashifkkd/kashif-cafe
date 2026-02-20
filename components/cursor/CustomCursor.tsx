"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LERP = 0.15;
const MAGNETIC_RADIUS = 80;

type CursorState = "default" | "hover" | "magnetic" | "gallery";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);

    const tick = () => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      pos.current.x += dx * LERP;
      pos.current.y += dy * LERP;
      vel.current.x = dx * LERP;
      vel.current.y = dy * LERP;
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const hoverables = document.querySelectorAll("a, button, [data-cursor-hover], [data-cursor-magnetic], [data-gallery-item]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (el.hasAttribute("data-cursor-magnetic")) setState("magnetic");
        else if (el.hasAttribute("data-gallery-item")) setState("gallery");
        else setState("hover");
      });
      el.addEventListener("mouseleave", () => setState("default"));
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [visible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ visibility: visible ? "visible" : "hidden" }}
      aria-hidden
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--cream)] bg-transparent mix-blend-difference"
        animate={{
          width: state === "gallery" ? 120 : state === "magnetic" ? 56 : state === "hover" ? 44 : 20,
          height: state === "gallery" ? 120 : state === "magnetic" ? 56 : state === "hover" ? 44 : 20,
          opacity: state === "default" ? 0.9 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      />
      {state === "gallery" && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium uppercase tracking-widest text-[var(--cream)]"
        >
          View
        </motion.span>
      )}
    </div>
  );
}
