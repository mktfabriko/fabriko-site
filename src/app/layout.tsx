import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";

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

const SITE_URL = "https://www.fabrikoindustria.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fabriko — Indústria de Móveis Planejados",
    template: "%s | Fabriko",
  },
  description:
    "Fabriko — fábrica de móveis planejados em Americana-SP. Parceira ideal das lojas de móveis planejados. 100% MDF, bordas PUR, 3 linhas, via Promob.",
  keywords:
    "fabriko, fabriko móveis, fabriko indústria de móveis, fábrica móveis planejados, móveis planejados atacado, promob, lojistas móveis, indústria moveleira americana SP",
  applicationName: "Fabriko",
  authors: [{ name: "Fabriko Indústria de Móveis" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fabriko — Indústria de Móveis Planejados",
    description: "Mais do que produção. Compromisso com o seu negócio.",
    url: SITE_URL,
    siteName: "Fabriko",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Fabriko — Indústria de Móveis Planejados" }],
  },
  robots: { index: true, follow: true },
};

// Dados estruturados (schema.org) — ajudam o Google a entender a marca "Fabriko"
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fabriko Indústria de Móveis",
  alternateName: "Fabriko",
  url: SITE_URL,
  logo: `${SITE_URL}/email/logo-fabriko.png`,
  description:
    "Fábrica de móveis planejados em Americana-SP, parceira ideal das lojas de móveis planejados.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Americana",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-19-99625-2987",
    contactType: "sales",
    email: "projetos@fabriko.ind.br",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
  sameAs: [
    "https://www.instagram.com/fabriko.ind",
    "https://www.facebook.com/profile.php?id=61571271814728",
    "https://www.youtube.com/@FabrikoInd",
    "https://www.linkedin.com/company/fabriko-ind%C3%BAstria-de-m%C3%B3veis/",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
