import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaalAI - 24/7 Web3 Customer Support Agent",
  description: "An AI-powered customer support agent for Web3 platforms that provides 24/7 assistance for blockchain, cryptocurrency, and DeFi questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cyberpunk">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
