import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Wristwatch",
  description: "authorization",
};

const font = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "700"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${font.variable} font-playfair antialiased min-h-screen w-full flex items-center justify-center bg-[#f4f4f5]`}
    >
      {children}
    </div>
  );
}
