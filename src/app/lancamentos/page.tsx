"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const LANCAMENTOS = [
  {
    id: 1,
    name: "Sofá Modular Connect",
    tag: "NOVO",
    mes: "Jun 2026",
    linha: "Contemporânea",
    cor: "#2563EB",
    desc: "Sistema modular de sofá que permite infinitas configurações. Perfeito para salas de todos os tamanhos. Disponível em 12 tecidos.",
    destaque: true,
  },
  {
    id: 2,
    name: "Mesa Tokio 4 Lugares",
    tag: "NOVO",
    mes: "Jun 2026",
    linha: "Contemporânea",
    cor: "#2563EB",
    desc: "Mesa com base de metal preto fosco e tampo em MDF laqueado. Extensível até 6 lugares.",
    destaque: false,
  },
  {
    id: 3,
    name: "Roupeiro Slide 4 Portas",
    tag: "NOVO",
    mes: "Mai 2026",
    linha: "Essencial",
    cor: "#16A34A",
    desc: "Guarda-roupa com portas de correr e espelho. Ótimo custo-benefício. Disponível em 4 cores.",
    destaque: false,
  },
  {
    id: 4,
    name: "Cadeira Ferro Studio",
    tag: "CHEGOU",
    mes: "Mai 2026",
    linha: "Industrial",
    cor: "#4B5563",
    desc: "Cadeira com estrutura de ferro e assento almofadado. Empilhável. Ideal para bares, restaurantes e home.",
    destaque: false,
  },
  {
    id: 5,
    name: "Cama Castelo Júnior",
    tag: "NOVO",
    mes: "Abr 2026",
    linha: "Kids",
    cor: "#DB2777",
    desc: "Cama com design de castelo, em MDF azul ou rosa. Com espaço de brincar embaixo e escada lateral.",
    destaque: false,
  },
  {
    id: 6,
    name: "Poltrona Vintage III",
    tag: "RELANÇAMENTO",
    mes: "Abr 2026",
    linha: "Clássica",
    cor: "#8B6914",
    desc: "Versão atualizada da bestseller poltrona vintage. Novo couro, mesma elegância clássica.",
    destaque: false,
  },
];

export default function Lancamentos() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1B1A18] pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #E67A22 0, #E67A22 1px, transparent 0, transparent 50%)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-[#E67A22]">
              Novidades
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-none mt-3"
            >
              Lança-<br />
              <span className="text-[#E67A22]">mentos</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mt-4 max-w-xl">
              Os produtos mais recentes saídos da nossa linha de produção.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Destaque */}
      {LANCAMENTOS.filter(l => l.destaque).map((l) => (
        <section key={l.id} className="py-16 bg-[#f7f6f4]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl border-2 border-[#E67A22]/30 overflow-hidden shadow-xl"
            >
              <div className="grid lg:grid-cols-2">
                <div
                  className="h-64 lg:h-auto min-h-64 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${l.cor}15, ${l.cor}35)` }}
                >
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 mx-auto mb-3" style={{ color: l.cor }} />
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: l.cor }}>
                      {l.mes}
                    </p>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#E67A22] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      ⚡ Destaque do mês
                    </span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: l.cor }}
                    >
                      {l.linha}
                    </span>
                  </div>
                  <h2 className="text-3xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mb-4">
                    {l.name}
                  </h2>
                  <p className="text-[#6b6b6b] leading-relaxed mb-6">{l.desc}</p>
                  <Link
                    href="/seja-parceiro"
                    className="inline-block bg-[#E67A22] hover:bg-[#c9601a] text-white font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-colors"
                  >
                    Solicitar informações
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Grid de lançamentos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {LANCAMENTOS.filter(l => !l.destaque).map((l) => (
              <motion.div
                key={l.id}
                variants={fadeUp}
                className="rounded-lg border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-all group"
              >
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${l.cor}10, ${l.cor}25)` }}
                >
                  <div className="text-center">
                    <div
                      className="h-16 w-16 mx-auto rounded-sm opacity-40"
                      style={{ backgroundColor: l.cor }}
                    />
                    <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: l.cor }}>
                      {l.mes}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: l.cor }}
                    >
                      {l.tag}
                    </span>
                    <span className="text-xs text-[#6b6b6b]">{l.linha}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-barlow)] font-bold text-lg text-[#1B1A18] uppercase mb-2">
                    {l.name}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">{l.desc}</p>
                  <Link
                    href="/seja-parceiro"
                    className="block text-center border border-[#1B1A18] hover:bg-[#1B1A18] hover:text-white text-[#1B1A18] text-xs font-bold py-2 rounded-sm uppercase tracking-wider transition-colors"
                  >
                    Quero saber mais
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
