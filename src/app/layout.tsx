import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fabriko — Indústria de Móveis",
  description:
    "Fábrica de móveis com qualidade, prazo e condições exclusivas para lojistas. Conheça nossas linhas e torne-se um parceiro Fabriko.",
  keywords: "fábrica de móveis, móveis atacado, lojista, indústria moveleira, móveis para revenda",
  openGraph: {
    title: "Fabriko — Indústria de Móveis",
    description: "Qualidade de fábrica para o seu negócio.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlow.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
