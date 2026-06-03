"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const LINHAS = [
  {
    nome: "Village",
    caixas: "15mm",
    portas: "15mm",
    num: "01",
    pitch: "Eficiência e qualidade para projetos de alto volume.",
    desc: "A linha de entrada Fabriko. Caixas e portas em MDF 15mm com acabamento impecável e borda PUR 1mm. Ideal para quem atende projetos de bom padrão com agilidade e custo-benefício.",
    aplicacoes: [
      "Dormitórios e roupeiros",
      "Cozinhas e ambientes de serviço",
      "Escritórios e home office",
      "Projetos de médio padrão",
      "Alto volume de produção",
    ],
    destaque: "A escolha do lojista que quer volume sem abrir mão de qualidade.",
    fotos: [
      "/fotos/37.webp",
      "/fotos/23.webp",
      "/fotos/22.webp",
      "/fotos/26.webp",
      "/fotos/29.webp",
      "/fotos/36.webp",
    ],
  },
  {
    nome: "Milano",
    caixas: "15mm",
    portas: "18mm",
    num: "02",
    pitch: "O equilíbrio perfeito. A linha mais vendida da Fabriko.",
    desc: "Caixas 15mm com portas premium em MDF 18mm. A linha Milano combina leveza estrutural com robustez nas portas — resultado: um produto com aspecto premium a um preço competitivo.",
    aplicacoes: [
      "Cozinhas planejadas",
      "Banheiros e lavabos",
      "Closets e dormitórios",
      "Salas e home cinemas",
      "Projetos residenciais completos",
    ],
    destaque: "Líder em vendas. O ponto ideal entre performance e custo.",
    fotos: [
      "/fotos/41.webp",
      "/fotos/27.webp",
      "/fotos/28.webp",
      "/fotos/32.webp",
      "/fotos/35.webp",
      "/fotos/38.webp",
    ],
  },
  {
    nome: "Maxximum",
    caixas: "18mm",
    portas: "18mm",
    num: "03",
    pitch: "Alta performance em toda a estrutura. Para o cliente mais exigente.",
    desc: "MDF 18mm em toda a estrutura — caixas e portas. A linha Maxximum é projetada para projetos de alto padrão onde robustez, sofisticação e acabamento premium são inegociáveis.",
    aplicacoes: [
      "Projetos de alto padrão",
      "Cozinhas gourmet",
      "Closets de luxo",
      "Escritórios executivos",
      "Empreendimentos de alto valor",
    ],
    destaque: "Para o lojista que atende o topo do mercado com a estrutura que o produto merece.",
    fotos: [
      "/fotos/50.webp",
      "/fotos/25.webp",
      "/fotos/30.webp",
      "/fotos/34.webp",
      "/fotos/44.webp",
      "/fotos/47.webp",
    ],
  },
];

function LinhaCarousel({ fotos, nome }: { fotos: string[]; nome: string }) {
  const [idx, setIdx] = useState(0);
  const total = fotos.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative aspect-[4/3] bg-[#F0EEE8] overflow-hidden">
      <AnimatePresence mode="wait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          key={idx}
          src={fotos[idx]}
          alt={`Linha ${nome} — ${idx + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
        aria-label="anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
        aria-label="próximo"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 z-10">
        <p className="text-[#E67A22] text-[10px] font-black uppercase tracking-widest">
          Fabriko · Linha {nome}
        </p>
      </div>

      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 z-10">
        {idx + 1}/{total}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {fotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1 transition-all ${
              i === idx ? "w-5 bg-[#E67A22]" : "w-1 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Linhas() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-36 pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Portfólio</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.92] mb-6 uppercase tracking-tight"
            >
              Linhas de<br />
              <span className="text-[#E67A22]">Produto</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-xl">
              Três linhas desenvolvidas para atender desde o projeto de bom padrão
              até o mais sofisticado. Todas em MDF, bordas PUR 1mm e via Promob.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Linhas */}
      <section className="bg-white">
        {LINHAS.map(({ nome, caixas, portas, num, pitch, desc, aplicacoes, destaque, fotos }, i) => (
          <motion.div
            key={nome}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className={`border-b border-[#E8E6E3] ${i % 2 !== 0 ? "bg-[#FAFAF8]" : "bg-white"}`}
          >
            <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-start">
              {/* Carousel */}
              <div className={`overflow-hidden ${i % 2 !== 0 ? "lg:order-last" : ""}`}>
                <LinhaCarousel fotos={fotos} nome={nome} />
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[#E67A22]/15 font-[family-name:var(--font-playfair)] font-black text-7xl leading-none">
                    {num}
                  </span>
                  <div>
                    <h2 className="text-4xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
                      Linha {nome}
                    </h2>
                    <p className="text-[#6B6966] text-sm mt-1">{pitch}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-7">
                  {[
                    { label: "Caixas", val: `MDF ${caixas}` },
                    { label: "Portas", val: `MDF ${portas}` },
                    { label: "Borda", val: "PUR 1mm" },
                  ].map(({ label, val }) => (
                    <div key={label} className="border border-[#E8E6E3] px-4 py-3">
                      <p className="text-[#1A1917]/35 text-[10px] uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-[#1A1917] font-semibold text-sm">{val}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[#6B6966] text-base leading-relaxed mb-6">{desc}</p>

                <div className="border-l-2 border-[#E67A22]/40 pl-5 mb-8">
                  <p className="text-[#1A1917]/60 text-sm italic">{destaque}</p>
                </div>

                <p className="text-[#1A1917]/35 text-xs font-bold uppercase tracking-widest mb-4">
                  Aplicações ideais
                </p>
                <ul className="space-y-2.5 mb-8">
                  {aplicacoes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[#6B6966] text-sm">
                      <Check className="h-4 w-4 text-[#E67A22] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-[#FAFAF8] border border-[#E8E6E3] p-5">
                  <p className="text-[#1A1917]/30 text-xs uppercase tracking-widest mb-3">
                    Todas as linhas oferecem
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Todos os acabamentos do portfólio Fabriko",
                      "Projetado via Promob Studio Fabriko",
                      "Milímetro a milímetro, totalmente editável",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[#6B6966] text-xs">
                        <span className="text-[#E67A22] mt-0.5">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1917]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-white mb-4">
              Qual linha faz sentido para o seu negócio?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-8">
              Converse com nosso consultor e receba uma proposta personalizada.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/seja-parceiro"
                className="group flex items-center gap-2 bg-[#E67A22] text-white text-xs font-bold px-7 py-4 tracking-widest uppercase hover:bg-[#C85E0F] transition-colors">
                Quero ser parceiro
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/acabamentos"
                className="border border-white/20 text-white/50 hover:text-white hover:border-white/50 text-xs font-medium px-7 py-4 tracking-widest uppercase transition-all">
                Ver acabamentos
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
