import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { SidebarNav } from "./sidebar-nav";
import { TopNav } from "./top-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GROAP, Inc. — Participant Management System",
  description:
    "Government Records Officers' Association of the Philippines, Inc. (GROAP) — Executive Council Member of the National Committee on Archives under National Commission for the Culture and the Arts (NCCA).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex h-full flex-col overflow-hidden bg-background text-ink">
        <TopNav />

        {/* App shell: the top bar never moves; the sidebar and main content
            each scroll independently below it. */}
        <div className="flex flex-1 overflow-hidden">
          <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-line/40 bg-surface/70 px-4 py-6 backdrop-blur-sm">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[9999px] border border-line/50 bg-white shadow-sm">
                <Image
                  src="/GROAP_Logo.png"
                  alt="GROAP logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-sm font-bold leading-tight text-ink">
                GROAP
              </span>
            </Link>

            <SidebarNav />

            <Link
              href="/events/new"
              className="mt-auto rounded-[6.2rem] bg-accent px-4 py-2 text-center text-sm font-medium text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              New Event
            </Link>
          </aside>

          <main className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,210,210,0.08),rgba(255,255,255,0))]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
