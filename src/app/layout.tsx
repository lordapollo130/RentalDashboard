import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import AppShell from "@/components/app-shell";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Lock App',
};

export const viewport: Viewport = { themeColor: "#ffffff" };
export const revalidate = 0;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/assets/loginlogo.jpg" type="image/jpeg" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#F6F7F9] text-gray-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
