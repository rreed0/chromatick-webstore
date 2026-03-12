import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AccentColorProvider } from "@/components/AccentColorProvider";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chromatick",
  description: "Custom hand-modified Casio watches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased site-shell`}
      >
        <AccentColorProvider>
          <CartProvider>
            <main className="site-shell-main">
              <div className="mx-auto max-w-6xl px-5 pb-10 md:px-6 md:pb-14">
                {children}
              </div>
            </main>
            <footer className="site-shell-footer border-t border-[var(--color-border-subtle)]/80 bg-[rgba(5,5,6,0.96)] backdrop-blur">
              <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4 text-[11px] text-[var(--color-muted)] md:flex-row md:items-center md:justify-between md:px-6">
                <div className="flex items-center gap-2">
                  <span className="tracking-[0.24em] uppercase">
                    Chromatick
                  </span>
                  <span className="hidden text-[10px] md:inline">
                    Custom digital Casio mods, built one at a time.
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    Made to order
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    Designed for daily wear
                  </span>
                </div>
              </div>
            </footer>
          </CartProvider>
        </AccentColorProvider>
      </body>
    </html>
  );
}
