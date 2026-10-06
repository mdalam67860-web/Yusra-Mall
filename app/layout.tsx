import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yusra Mall | Where Shopping Meets Experience",
  description: "Discover fashion, dining, lifestyle and experiences at Yusra Mall.",
  verification: {
    google: "sRyJS68bBFaxqUICYkHtapgTZm15z-gyglivJR8DVBE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
