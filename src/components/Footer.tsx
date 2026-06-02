import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1917] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <Image src="/logo.png" alt="Fabriko" width={150} height={50} className="h-11 w-auto mb-5 brightness-0 invert" />
          <p className="text-white/40 text-sm leading-relaxed">
            Fábrica de móveis planejados em Americana-SP. Parceira das lojas de móveis planejados de todo o Brasil.
          </p>
          <p className="text-white/20 text-xs mt-4 tracking-wider uppercase">Americana — São Paulo</p>
        </div>
        <div>
          <h3 className="text-[#E67A22] text-xs font-bold uppercase tracking-widest mb-5">Navegação</h3>
          <ul className="space-y-2.5">
            {[
              { href: "/quem-somos", label: "Quem Somos" },
              { href: "/linhas", label: "Linhas de Produto" },
              { href: "/acabamentos", label: "Acabamentos" },
              { href: "/catalogo", label: "Catálogo" },
              { href: "/projetos", label: "Projetos" },
              { href: "/seja-parceiro", label: "Seja Parceiro" },
              { href: "/contato", label: "Contato" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/35 hover:text-white text-sm transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[#E67A22] text-xs font-bold uppercase tracking-widest mb-5">Contato</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
              <div><p className="text-white/60 text-sm">(19) 99625-2987</p><p className="text-white/25 text-xs">WhatsApp</p></div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
              <div><p className="text-white/60 text-sm">projetos@fabriko.ind.br</p><p className="text-white/25 text-xs">Projetos e parcerias</p></div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
              <div><p className="text-white/60 text-sm">Americana — SP</p><p className="text-white/25 text-xs">Polo industrial</p></div>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#E67A22] text-xs font-bold uppercase tracking-widest mb-5">Para Lojistas</h3>
          <p className="text-white/35 text-sm leading-relaxed mb-5">
            Acesse nossa biblioteca no Promob e comece a projetar com os acabamentos Fabriko.
          </p>
          <Link href="/seja-parceiro"
            className="inline-block border border-[#E67A22] text-[#E67A22] hover:bg-[#E67A22] hover:text-white text-xs font-bold px-5 py-3 uppercase tracking-widest transition-all">
            Seja parceiro
          </Link>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs tracking-wide">© {new Date().getFullYear()} Fabriko Indústria de Móveis. Americana — SP.</p>
          <p className="text-white/15 text-xs">@fabriko.ind</p>
        </div>
      </div>
    </footer>
  );
}
