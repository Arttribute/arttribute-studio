import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import MagicProvider from "@/components/providers/MagicProvider";
import MinipayProvider from "@/components/providers/MinipayProvider";

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Arttribute Studio",
  description:
    "Create and share fine-tuned AI art models and produce unique art for Strorytelling, Games, Fashion, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={chakra_petch.className}>
        <MagicProvider>
          <MinipayProvider>{children}</MinipayProvider>
        </MagicProvider>
      </body>
    </html>
  );
}
