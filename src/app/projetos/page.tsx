"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const AMBIENTES = [
  {
    nome: "Cozinha Planejada",
    desc: "Cozinhas modernas com ilhas, bancadas e soluções sob medida para todos os estilos.",
    fotos: [
      "/fotos/22.webp",
      "/fotos/23.webp",
      "/fotos/26.webp",
      "/fotos/27.webp",
      "/fotos/28.webp",
      "/fotos/29.webp",
      "/fotos/33.webp",
      "/fotos/37.webp",
      "/fotos/41.webp",
      "/fotos/46.webp",
    ],
  },
  {
    nome: "Sala & Painel TV",
    desc: "Salas de estar, painéis de TV, nichos com LED e estantes integradas de alto padrão.",
    fotos: [
      "/fotos/25.webp",
      "/fotos/30.webp",
      "/fotos/32.webp",
      "/fotos/35.webp",
      "/fotos/38.webp",
      "/fotos/44.webp",
      "/fotos/40.webp",
      "/fotos/43.webp",
    ],
  },
  {
    nome: "Jantar & Home Bar",
    desc: "Ambientes de jantar, home bars e salas integradas com acabamentos exclusivos.",
    fotos: [
      "/fotos/24.webp",
      "/fotos/31.webp",
      "/fotos/34.webp",
      "/fotos/45.webp",
      "/fotos/47.webp",
      "/fotos/50.webp",
    ],
  },
  {
    nome: "Escritório & Multifunção",
    desc: "Home offices, escritórios corporativos e ambientes de trabalho planejados.",
    fotos: [
      "/fotos/36.webp",
      "/fotos/39.webp",
      "/fotos/42.webp",
      "/fotos/49.webp",
      "/fotos/48.webp",
    ],
  },
  {
    nome: "Banheiro & Lavabo",
    desc: "Móveis para banheiros e lavabos com acabamentos resistentes à umidade e design sofisticado.",
    fotos: [
      "/fotos/32.webp",
      "/fotos/35.webp",
      "/fotos/38.webp",
      "/fotos/40.webp",
      "/fotos/43.webp",
      "/fotos/26.webp",
    ],
  },
  {
    nome: "Área Gourmet",
    desc: "Cozinhas abertas, adegas e ambientes integrados para receber com estilo.",
    fotos: [
      "/fotos/25.webp",
      "/fotos/31.webp",
      "/fotos/34.webp",
      "/fotos/45.webp",
      "/fotos/46.webp",
      "/fotos/50.webp",
    ],
  },
  {
    nome: "Hall de Entrada",
    desc: "Aparadores, painéis e estantes que valorizam o primeiro ambiente de qualquer projeto.",
    fotos: [
      "/fotos/30.webp",
      "/fotos/33.webp",
      "/fotos/44.webp",
      "/fotos/27.webp",
      "/fotos/29.webp",
    ],
  },
  {
    nome: "Área de Jogos",
    desc: "Ambientes multifunção e de entretenimento com móveis planejados e soluções de armazenamento.",
    fotos: [
      "/fotos/43.webp",
      "/fotos/40.webp",
      "/fotos/38.webp",
      "/fotos/35.webp",
      "/fotos/48.webp",
    ],
  },
  {
    nome: "Cinema Residencial",
    desc: "Painéis integrados, nichos e prateleiras para home theaters de alto padrão.",
    fotos: [
      "/fotos/25.webp",
      "/fotos/30.webp",
      "/fotos/32.webp",
      "/fotos/44.webp",
      "/fotos/43.webp",
    ],
  },
];

function AmbienteCarousel({ ambiente }: { ambiente: typeof AMBIENTES[0] }) {
  const [idx, setIdx] = useState(0);
  const total = ambiente.fotos.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="border border-[#E8E6E3] overflow-hidden hover:border-[#E67A22]/30 transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F3F0]">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={ambiente.fotos[idx]}
            alt={`${ambiente.nome} ${idx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          aria-label="anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          aria-label="próximo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1">
          {idx + 1}/{total}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 bg-white">
        <h3 className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-bold text-lg mb-1">
          {ambiente.nome}
        </h3>
        <p className="text-[#6B6966] text-xs leading-relaxed">{ambiente.desc}</p>

        {/* Dots */}
        <div className="flex gap-1.5 mt-3">
          {ambiente.fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1 transition-all ${
                i === idx ? "w-5 bg-[#E67A22]" : "w-1 bg-[#E8E6E3] hover:bg-[#1A1917]/20"
              }`}
              aria-label={`foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projetos() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-36 pb-20">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Ambientes & Aplicações</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.92] mb-6 uppercase tracking-tight"
            >
              Projetos em<br />
              <span className="text-[#E67A22]">destaque</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-xl">
              Referências de ambientes criados com móveis planejados de alto padrão.
              Da cozinha ao escritório corporativo — inspiração para cada projeto.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Grid de ambientes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AMBIENTES.map((ambiente) => (
              <AmbienteCarousel key={ambiente.nome} ambiente={ambiente} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1917]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-white mb-4">
              Crie projetos assim com os acabamentos Fabriko.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-8">
              Acesse a biblioteca no Promob e projete com qualidade industrial.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/seja-parceiro"
                className="group flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-7 py-4 tracking-widest uppercase transition-all">
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
