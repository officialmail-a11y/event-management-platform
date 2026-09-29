// Shared "3D panel" look: soft border, layered ambient + contact shadow for
// noticeable depth, frosted surface. `panelHover` adds a larger shadow and an
// accent-tinted border on hover (paired with the lift/scale in app/lib/motion.ts).
export const panel =
  "rounded-[1.25rem] border border-line/50 bg-surface/90 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-8px_rgba(0,0,0,0.12)]";

export const panelHover =
  "transition-[box-shadow,border-color] duration-300 hover:border-accent/40 hover:shadow-[0_2px_6px_rgba(0,0,0,0.06),0_32px_56px_-12px_rgba(0,0,0,0.22)]";

// Slightly flatter variant for the data table, which favors legibility over
// translucency but still gets the elevated, floating card treatment.
export const solidPanel =
  "rounded-[1.25rem] border border-line/50 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-8px_rgba(0,0,0,0.12)]";
