"use client";

import { useRef, useCallback } from "react";

const LERP_FACTOR = 0.12;

export function useLerp(initial: number) {
  const current = useRef(initial);
  const target = useRef(initial);

  const setTarget = useCallback((value: number) => {
    target.current = value;
  }, []);

  const tick = useCallback(() => {
    current.current += (target.current - current.current) * LERP_FACTOR;
    return current.current;
  }, []);

  const getCurrent = useCallback(() => current.current, []);
  const getTarget = useCallback(() => target.current, []);

  return { setTarget, tick, getCurrent, getTarget };
}
