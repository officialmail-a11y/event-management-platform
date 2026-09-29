import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Management Platform",
  description: "Create and browse events.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-ink">
        <header className="flex items-center gap-2 border-b border-line px-4 py-3">
          <div className="mx-auto flex w-full max-w-[991px] items-center gap-2">
            <Link
              href="/"
              className="text-base font-bold tracking-tight text-ink"
            >
              GROAP Events
            </Link>
            <Link
              href="/"
              className="ml-4 rounded-[6.2rem] px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Home
            </Link>
            <Link
              href="/events/new"
              className="ml-auto rounded-[6.2rem] bg-accent px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              New Event
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
