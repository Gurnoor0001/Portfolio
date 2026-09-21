import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Gurnoor Singh | AI/ML Engineer",
  description: "Portfolio of Gurnoor Singh, AI/ML-focused software engineer building practical, deployed AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#05060F] text-slate-200 antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
