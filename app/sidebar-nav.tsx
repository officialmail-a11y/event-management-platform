"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/events", label: "Events" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-[6.2rem] px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-accent text-black"
                : "text-muted hover:bg-background hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
