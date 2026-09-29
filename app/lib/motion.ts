import type { Variants } from "framer-motion";

// Orchestrates a stagger-fade-in across direct motion children.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Slide-up + fade entrance for an individual panel.
export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Fade + slide-down entrance, used for the top nav (enters from above).
export const fadeSlideDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Gentle 3D lift used on hoverable panels/cards.
export const liftOnHover = {
  y: -6,
  scale: 1.015,
  transition: { type: "spring" as const, stiffness: 300, damping: 22 },
};
