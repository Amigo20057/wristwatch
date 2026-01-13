import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "../globals.css";
import HeaderCheckouts from "@/components/header/header-checkout";

const geistSans = Amiri({
  variable: "--font",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Wristwatch",
  description: "Wristwatch checkout",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={`${geistSans.variable} font-amiri antialiased bg-[#f5f5f5]!`}
    >
      <HeaderCheckouts />
      {children}
    </section>
  );
}
