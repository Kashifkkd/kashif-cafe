"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AMBIENCE_URL = "/cafe-sound.mp3";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const showMessage = useCallback((text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const audio = audioRef.current;
      if (!audio) return;

      if (enabled) {
        audio.pause();
        audio.currentTime = 0;
        setEnabled(false);
        return;
      }

      // Set src and volume on first play (must be in user gesture for autoplay policy)
      if (!audio.src || !audio.src.includes("cafe-sound")) {
        audio.src = AMBIENCE_URL;
        audio.volume = 0.2;
      }

      const promise = audio.play();
      if (promise !== undefined && typeof promise.then === "function") {
        promise
          .then(() => setEnabled(true))
          .catch((err: unknown) => {
            const errName =
              err && typeof err === "object" && "name" in err
                ? (err as { name: string }).name
                : "";
            if (errName === "NotAllowedError") {
              showMessage("Sound was blocked. Click the button again to allow.");
            } else {
              showMessage("Couldn’t play sound. Try again.");
            }
          });
      } else {
        setEnabled(true);
      }
    },
    [enabled, showMessage]
  );

  return (
    <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-end gap-2">
      <audio
        ref={audioRef}
        loop
        preload="none"
        playsInline
        className="hidden"
        aria-hidden
      />
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="max-w-[240px] rounded-lg border border-[var(--cream)]/20 bg-[var(--espresso)]/95 px-3 py-2 text-center text-xs text-[var(--cream)] backdrop-blur-md"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={enabled ? "Mute ambience" : "Play ambience"}
        title={enabled ? "Mute" : "Play cafe sound"}
        className="flex size-14 items-center justify-center rounded-full border border-[var(--cream)]/30 bg-[var(--espresso)]/80 backdrop-blur-md transition-colors hover:border-[var(--amber)] hover:bg-[var(--espresso-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--amber)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        {enabled ? (
          <svg
            className="size-5 text-[var(--cream)]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        ) : (
          <svg
            className="size-5 text-[var(--cream)]/70"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
