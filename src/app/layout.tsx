import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/utils/auth";
import { AppLoader } from "@/hoc/app-loader";

const geistSans = Amiri({
  variable: "--font",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Wristwatch",
  description: "Buy a wristwatch",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-amiri antialiased`}>
        <SessionProvider session={session}>
          <AppLoader>{children}</AppLoader>
        </SessionProvider>
      </body>
    </html>
  );
}
