"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, ChevronRight, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

type Lancamento = {
  id: string;
  tag: string;
  titulo: string;
  subtitulo: string;
  desc: string;
  detalhes: string[];
  cor: string;
  img?: string;
  novo: boolean;
};

const LANCAMENTOS: Lancamento[] = [
  {
    id: "supermatte",
    tag: "Novo acabamento",
    titulo: "Linha Supermatte",
    subtitulo: "O fosco que não mostra nada.",
    desc: "Superfície com altíssima resistência a impressões digitais e riscos. Acabamento fosco profundo — para projetos onde perfeição é o único padrão.",
    detalhes: [
      "Resistência superior a riscos e impressões digitais",
      "Acabamento fosco de profundidade óptica exclusiva",
      "Disponível em Asfalto, Cinza e Branco Gelo",
      "Compatível com todas as linhas Fabriko",
      "Já disponível no Promob Studio Fabriko",
    ],
    cor: "#2A2A28",
    img: "/fotos/29.webp",
    novo: true,
  },
  {
    id: "velluto",
    tag: "Novidade",
    titulo: "Acabamento Velluto",
    subtitulo: "Textura de veludo. Tato premium.",
    desc: "Superfície com micro-textura que simula tecido de veludo. Suave ao toque, sofisticado ao olhar. Uma experiência sensorial em cada projeto.",
    detalhes: [
      "Micro-textura que simula veludo natural",
      "Superfície quente e sofisticada ao toque",
      "Disponível em Ocre Solar, Sage e Terracota",
      "Ideal para projetos de alto padrão e design autoral",
      "Resistente a marcas e manchas superficiais",
    ],
    cor: "#C8963C",
    img: "/fotos/44.webp",
    novo: true,
  },
  {
    id: "porta-provence",
    tag: "Modelo especial",
    titulo: "Porta Provence",
    subtitulo: "Estilo clássico. Acabamento que destaca.",
    desc: "Porta 15mm com borda perimetral de 6mm que totaliza 21mm de espessura visual. O detalhe que eleva qualquer projeto a outro patamar.",
    detalhes: [
      "MDF 15mm + borda perimetral 6mm = 21mm de espessura total",
      "Disponível em todos os acabamentos do portfólio Fabriko",
      "Design clássico que combina com estilos contemporâneos e tradicionais",
      "Disponível via Promob Studio na biblioteca Fabriko",
      "Entrega no prazo padrão de 20 dias úteis",
    ],
    cor: "#8B6914",
    img: "/items/66.webp",
    novo: false,
  },
  {
    id: "metala-vetro",
    tag: "Premium",
    titulo: "Porta Metala Vetro",
    subtitulo: "Alumínio e vidro. Sofisticação máxima.",
    desc: "Estrutura em alumínio com vidro. Acompanha puxador modelo Novo em ampla gama de cores. Para o projeto que não admite meio-termo.",
    detalhes: [
      "Estrutura em alumínio de alta qualidade",
      "Vidro temperado incluso",
      "Puxador modelo Novo incluso — várias cores disponíveis",
      "Ideal para cozinhas gourmet e closets de alto padrão",
      "Consulte disponibilidade e prazo com seu consultor",
    ],
    cor: "#3A3A3A",
    img: "/items/67.webp",
    novo: false,
  },
  {
    id: "paineis-led",
    tag: "Estrutura",
    titulo: "Painéis com Canaleta LED",
    subtitulo: "Iluminação integrada, formas livres.",
    desc: "Painéis e prateleiras com canaleta para LED em 4 espessuras. Formas 100% personalizáveis e todos os acabamentos do portfólio.",
    detalhes: [
      "Espessuras disponíveis: 15mm, 18mm, 30mm e 36mm",
      "Canaleta para fita LED integrada na estrutura",
      "Formas personalizadas via Promob Studio Fabriko",
      "Todos os acabamentos do portfólio disponíveis",
      "Soluções para nichos, estantes e painéis de TV",
    ],
    cor: "#E67A22",
    img: "/items/71.webp",
    novo: false,
  },
  {
    id: "puxador-rometal",
    tag: "Acessórios",
    titulo: "Coleção Rometal 2026",
    subtitulo: "Design contemporâneo. 6 acabamentos.",
    desc: "Três novos modelos de abas Rometal — Aria, Cielo e Luna — com design europeu e 6 acabamentos exclusivos para projetos de alto padrão.",
    detalhes: [
      "3 modelos: Aria (angular), Cielo (slim plano), Luna (curvo)",
      "6 acabamentos: Anodizado, Inox, Branco Fosco, Champagne, Preto Fosco, Champagne 1001",
      "Tamanhos de 96mm a 192mm dependendo do modelo",
      "Design europeu com ergonomia validada",
      "Disponível no catálogo Fabriko 2026",
    ],
    cor: "#A0A0A0",
    img: "/items/50.webp",
    novo: true,
  },
];

function LancamentoModal({ item, onClose }: { item: Lancamento; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 lg:p-12"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl bg-white overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image or color bar */}
        <div className="relative h-48 overflow-hidden"
          style={{ backgroundColor: item.cor }}>
          {item.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.img}
              alt={item.titulo}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-5 left-6">
            <span className="text-[#E67A22] text-[10px] font-bold uppercase tracking-widest">{item.tag}</span>
            {item.novo && (
              <span className="ml-2 bg-[#E67A22] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">Novo</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] mb-1">
            {item.titulo}
          </h2>
          <p className="text-[#E67A22] text-sm font-medium mb-4">{item.subtitulo}</p>
          <p className="text-[#6B6966] text-sm leading-relaxed mb-6">{item.desc}</p>

          <div className="border-t border-[#E8E6E3] pt-5">
            <p className="text-[#1A1917]/35 text-xs font-bold uppercase tracking-widest mb-4">Detalhes</p>
            <ul className="space-y-2.5">
              {item.detalhes.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[#6B6966] text-sm">
                  <ChevronRight className="h-3.5 w-3.5 text-[#E67A22] shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 mt-8">
            <Link href="/seja-parceiro" onClick={onClose}
              className="flex-1 group flex items-center justify-center gap-2 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold py-3.5 tracking-widest uppercase transition-all">
              Quero ser parceiro
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={onClose}
              className="border border-[#E8E6E3] text-[#1A1917]/40 hover:border-[#1A1917]/20 hover:text-[#1A1917] text-xs font-medium px-5 tracking-widest uppercase transition-all">
              Fechar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Lancamentos() {
  const [selected, setSelected] = useState<Lancamento | null>(null);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-[#1A1917] pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 50%, #E67A22/10 0%, transparent 60%)" }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5"
          style={{ background: "radial-gradient(ellipse at right top, #E67A22 0%, transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <Sparkles className="h-4 w-4 text-[#E67A22]" />
              <p className="label-tag">Novidades Fabriko</p>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(3.5rem,8vw,7rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.9] mb-6 uppercase tracking-tight"
            >
              Lança-<br />
              <span className="text-[#E67A22]">mentos</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-2xl">
              Novos acabamentos, modelos e acessórios para elevar seus projetos.
              Clique em qualquer card para ver todos os detalhes.
            </motion.p>
          </motion.div>
        </div>

        {/* Banner strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative mt-16 border-t border-white/10 bg-[#E67A22]/10"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8 overflow-x-auto">
            {LANCAMENTOS.filter(l => l.novo).map(l => (
              <div key={l.id} className="flex items-center gap-2 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E67A22]" />
                <span className="text-white/70 text-xs font-medium tracking-widest uppercase">{l.titulo}</span>
              </div>
            ))}
            <span className="text-white/20 text-xs ml-auto shrink-0 uppercase tracking-widest">2026</span>
          </div>
        </motion.div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {LANCAMENTOS.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                onClick={() => setSelected(item)}
                className="group cursor-pointer border border-[#E8E6E3] hover:border-[#E67A22]/40 transition-all overflow-hidden hover:shadow-sm"
              >
                {/* Image/color area */}
                <div className="relative h-44 overflow-hidden"
                  style={{ backgroundColor: item.cor }}>
                  {item.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.img}
                      alt={item.titulo}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-4 flex items-center gap-2">
                    <span className="text-[#E67A22] text-[9px] font-bold uppercase tracking-widest bg-black/30 px-2 py-1">
                      {item.tag}
                    </span>
                    {item.novo && (
                      <span className="bg-[#E67A22] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest">
                        Novo
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <h3 className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-bold text-lg mb-1">
                    {item.titulo}
                  </h3>
                  <p className="text-[#E67A22] text-xs font-medium mb-3">{item.subtitulo}</p>
                  <p className="text-[#6B6966] text-xs leading-relaxed line-clamp-2 mb-4">{item.desc}</p>
                  <div className="flex items-center gap-1 text-[#E67A22] text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                    Ver detalhes
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1917]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-playfair)] font-black text-white mb-4">
              Fique sempre atualizado com o que há de novo.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-8">
              Parceiros Fabriko recebem todas as novidades em primeira mão.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/seja-parceiro"
                className="group flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-7 py-4 tracking-widest uppercase transition-all">
                Ser parceiro Fabriko
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/acabamentos"
                className="border border-white/20 text-white/50 hover:text-white hover:border-white/40 text-xs font-medium px-7 py-4 tracking-widest uppercase transition-all">
                Ver portfólio completo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <LancamentoModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
