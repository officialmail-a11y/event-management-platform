"use client";

import { useState, useTransition } from "react";

export function ToggleSwitch({
  id,
  defaultChecked,
  action,
  label,
}: {
  id: string;
  defaultChecked: boolean;
  action: (id: string, value: boolean) => Promise<void>;
  label: string;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const [, startTransition] = useTransition();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => {
        const next = !checked;
        setChecked(next);
        startTransition(async () => {
          try {
            await action(id, next);
          } catch {
            setChecked(!next);
          }
        });
      }}
      className={`relative h-6 w-11 shrink-0 rounded-[9999px] border transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
        checked ? "border-accent bg-accent" : "border-line bg-background"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-[9999px] bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
