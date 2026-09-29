"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  fadeSlideDown,
  fadeSlideUp,
  liftOnHover,
  staggerContainer,
} from "@/app/lib/motion";

// Wraps a group of MotionSection children and staggers their entrance.
export function MotionStaggerGroup({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// A single panel: fades/slides up into place, optionally with a gentle 3D
// lift-and-scale on hover.
export function MotionSection({
  className,
  hover = false,
  ...props
}: HTMLMotionProps<"div"> & { hover?: boolean }) {
  return (
    <motion.div
      variants={fadeSlideUp}
      whileHover={hover ? liftOnHover : undefined}
      className={className}
      {...props}
    />
  );
}

// The top nav enters by fading + sliding down from above.
export function MotionTopBar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeSlideDown}
      className={className}
    >
      {children}
    </motion.header>
  );
}
