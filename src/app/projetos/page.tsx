"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const TIPOS = ["Todos", "Residencial", "Comercial", "Hotel", "Corporativo"];

const PROJETOS = [
  { id: 1, nome: "Residência Alto Padrão — São Paulo", tipo: "Residencial", linha: "Clássica", cor: "#8B6914", descricao: "Projeto completo de sala de estar e jantar com linha clássica. Móveis sob medida integrados ao projeto arquitetônico.", area: "320m²" },
  { id: 2, nome: "Pousada Serra Gaúcha", tipo: "Hotel", linha: "Industrial", cor: "#4B5563", descricao: "Fornecimento de 24 quartos completos com móveis da linha industrial. Conceito rústico-contemporâneo.", area: "18 unidades" },
  { id: 3, nome: "Escritório Corporativo — BH", tipo: "Corporativo", linha: "Contemporânea", cor: "#2563EB", descricao: "Projeto de home office e sala de reunião para empresa de tecnologia. Foco em ergonomia e design moderno.", area: "180m²" },
  { id: 4, nome: "Loja de Roupas — Curitiba", tipo: "Comercial", linha: "Industrial", cor: "#4B5563", descricao: "Expositores e balcões sob medida para loja de moda. Estrutura metálica com madeira.", area: "95m²" },
  { id: 5, nome: "Apartamento Decorado — Rio", tipo: "Residencial", linha: "Contemporânea", cor: "#2563EB", descricao: "Apartamento decorado para construtora. Sala, quarto e home office com linha contemporânea.", area: "75m²" },
  { id: 6, nome: "Creche Escola — Campinas", tipo: "Comercial", linha: "Kids", cor: "#DB2777", descricao: "Mobiliário completo para creche. Mesas, cadeiras e armários infantis. Seguro e colorido.", area: "Salas múltiplas" },
  { id: 7, nome: "Cobertura Duplex — Florianópolis", tipo: "Residencial", linha: "Clássica", cor: "#8B6914", descricao: "Cobertura de alto padrão mobiliada com peças exclusivas da linha clássica e sob medida.", area: "280m²" },
  { id: 8, nome: "Hotel Boutique — Gramado", tipo: "Hotel", linha: "Clássica", cor: "#8B6914", descricao: "Hotel com 32 suítes. Conceito europeu com móveis da linha clássica personalizados.", area: "32 suítes" },
  { id: 9, nome: "Startup Hub — São Paulo", tipo: "Corporativo", linha: "Industrial", cor: "#4B5563", descricao: "Espaço de coworking com mesas industriais, lounges e salas de reunião.", area: "420m²" },
];

export default function Projetos() {
  const [tipo, setTipo] = useState("Todos");

  const filtered = tipo === "Todos" ? PROJETOS : PROJETOS.filter(p => p.tipo === tipo);

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
              Portfólio
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-none mt-3"
            >
              Projetos<br />
              <span className="text-[#E67A22]">realizados</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mt-4 max-w-xl">
              Da fábrica até o ambiente final. Veja como nossos móveis transformam espaços.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {TIPOS.map((t) => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className={`whitespace-nowrap px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wide transition-all ${
                tipo === t
                  ? "bg-[#E67A22] text-white"
                  : "bg-[#f7f6f4] text-[#6b6b6b] hover:bg-[#e5e5e5]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-[#f7f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-lg overflow-hidden border border-[#e5e5e5] hover:shadow-xl transition-all group"
              >
                <div
                  className="h-52 flex items-end p-5"
                  style={{ background: `linear-gradient(160deg, ${p.cor}20, ${p.cor}40)` }}
                >
                  <div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: p.cor }}
                    >
                      {p.tipo}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#6b6b6b]">{p.linha}</span>
                    <span className="text-xs font-semibold text-[#6b6b6b]">{p.area}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-barlow)] font-bold text-base text-[#1B1A18] uppercase mb-2 leading-tight">
                    {p.nome}
                  </h3>
                  <p className="text-[#6b6b6b] text-xs leading-relaxed">{p.descricao}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B1A18]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase mb-4"
            >
              Tem um projeto em mente?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-sm mb-6">
              Desenvolvemos soluções sob medida para construtoras, hotéis, corporativo e residencial.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/contato"
                className="inline-block bg-[#E67A22] text-white font-bold px-7 py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-[#c9601a] transition-colors"
              >
                Fale com nossa equipe
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
