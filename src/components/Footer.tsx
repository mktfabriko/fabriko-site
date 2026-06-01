import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Share2, Globe, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1B1A18] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Image src="/logo.png" alt="Fabriko" width={120} height={40} className="h-9 w-auto mb-4" />
          <p className="text-white/50 text-sm leading-relaxed mt-3">
            Indústria de móveis com qualidade, prazo e condições exclusivas para lojistas de todo o Brasil.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="#" className="text-white/40 hover:text-[#E67A22] transition-colors" aria-label="Instagram">
              <Share2 className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-[#E67A22] transition-colors" aria-label="Facebook">
              <Globe className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-[#E67A22] transition-colors" aria-label="LinkedIn">
              <Users className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#E67A22] mb-4">Navegação</h3>
          <ul className="space-y-2.5">
            {[
              { href: "/quem-somos", label: "Quem Somos" },
              { href: "/linhas", label: "Linhas de Produto" },
              { href: "/catalogo", label: "Catálogo" },
              { href: "/lancamentos", label: "Lançamentos" },
              { href: "/projetos", label: "Projetos" },
              { href: "/seja-parceiro", label: "Seja Parceiro" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#E67A22] mb-4">Contato</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-white/50">
              <Phone className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
              <span>(XX) XXXXX-XXXX</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/50">
              <Mail className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
              <span>contato@fabriko.com.br</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/50">
              <MapPin className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
              <span>Cidade / Estado — Brasil</span>
            </li>
          </ul>
        </div>

        {/* Parceiro CTA */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#E67A22] mb-4">Seja Parceiro</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Revenda móveis com margem, prazo e exclusividade. Saiba como se tornar um revendedor Fabriko.
          </p>
          <Link
            href="/seja-parceiro"
            className="inline-block bg-[#E67A22] hover:bg-[#c9601a] text-white text-xs font-bold px-5 py-2.5 rounded-sm uppercase tracking-wider transition-colors"
          >
            Quero ser parceiro
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Fabriko Indústria de Móveis. Todos os direitos reservados.</p>
          <p className="text-white/20 text-xs">CNPJ: XX.XXX.XXX/0001-XX</p>
        </div>
      </div>
    </footer>
  );
}
