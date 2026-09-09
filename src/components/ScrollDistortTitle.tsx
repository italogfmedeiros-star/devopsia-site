"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * Per-character scroll distortion, in the spirit of Skiper UI's
 * "Text Scroll Animation" (skiper31): each character tilts and lifts in 3D,
 * more so the farther it sits from the center of the word, and settles flat
 * as the element scrolls up through the viewport. Scoped to the element
 * itself (not the whole page), so it re-triggers per instance — one case,
 * one reveal.
 */
function DistortChar({
  char,
  distance,
  progress,
}: {
  char: string;
  distance: number;
  progress: MotionValue<number>;
}) {
  const rotateX = useTransform(progress, [0, 1], [distance * -46, 0]);
  const y = useTransform(progress, [0, 1], [distance * 10, 0]);
  const opacity = useTransform(progress, [0, 0.7], [0.2, 1]);

  return (
    <motion.span
      aria-hidden="true"
      style={{
        display: "inline-block",
        rotateX,
        y,
        opacity,
        transformOrigin: "50% 100%",
      }}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
}

export function ScrollDistortTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 45%"],
  });

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const chars = text.split("");
  const centerIndex = Math.floor(chars.length / 2);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: "inline-block", perspective: "400px" }}
    >
      {chars.map((char, i) => (
        <DistortChar
          key={i}
          char={char}
          distance={Math.abs(i - centerIndex)}
          progress={scrollYProgress}
        />
      ))}
    </span>
  );
}
