"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/linhas", label: "Linhas" },
  { href: "/acabamentos", label: "Acabamentos" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/projetos", label: "Projetos" },
  { href: "/promob", label: "Promob" },
  { href: "/lancamentos", label: "Lançamentos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isTransparent
          ? "bg-transparent py-4"
          : "bg-white/97 backdrop-blur-md border-b border-[#E8E6E3] shadow-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo — maior */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={isTransparent ? "/logo-white-transparent.png" : "/logo-dark-transparent.png"}
            alt="Fabriko"
            width={240}
            height={80}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#E67A22]"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-[#1A1917]/60 hover:text-[#1A1917]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link
            href="/seja-parceiro"
            className={`text-[11px] font-bold tracking-widest uppercase px-6 py-3 transition-all duration-200 ${
              isTransparent
                ? "bg-[#E67A22] text-white hover:bg-[#C85E0F]"
                : "bg-[#E67A22] text-white hover:bg-[#C85E0F]"
            }`}
          >
            Seja Parceiro
          </Link>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-1 transition-colors ${isTransparent ? "text-white/80" : "text-[#1A1917]/70"}`}
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8E6E3]">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-[#1A1917]/60 hover:text-[#E67A22] py-3.5 text-[11px] font-semibold tracking-widest uppercase border-b border-[#E8E6E3] transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/seja-parceiro"
              className="mt-5 bg-[#E67A22] text-white text-[11px] font-bold py-4 tracking-widest uppercase text-center">
              Seja Parceiro
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
