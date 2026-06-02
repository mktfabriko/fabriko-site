import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fabriko — Indústria de Móveis Planejados",
  description:
    "Fábrica de móveis planejados em Americana-SP. Parceira ideal das lojas de móveis planejados. 100% MDF, bordas PUR, 3 linhas, via Promob.",
  keywords: "fábrica móveis planejados, móveis planejados atacado, promob, lojistas móveis, indústria moveleira americana SP",
  openGraph: {
    title: "Fabriko — Indústria de Móveis Planejados",
    description: "Mais do que produção. Compromisso com o seu negócio.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
