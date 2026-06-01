"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Phone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const CATEGORIAS = ["Todos", "Sala", "Quarto", "Jantar", "Home Office", "Kids", "Sob Medida"];

const PRODUTOS = [
  { id: 1, name: "Sofá Retrátil Milão", categoria: "Sala", linha: "Contemporânea", ref: "FAB-0101", desc: "Sofá retrátil e reclinável em tecido suede, disponível em 8 cores.", cor: "#2563EB" },
  { id: 2, name: "Rack Berlim", categoria: "Sala", linha: "Industrial", ref: "FAB-0201", desc: "Rack industrial com pés de ferro e tampo em MDF rústico. Capacidade para TV até 65\".", cor: "#4B5563" },
  { id: 3, name: "Mesa de Jantar Toscana", categoria: "Jantar", linha: "Clássica", ref: "FAB-0301", desc: "Mesa de jantar em madeira maciça com tampo laqueado. 6 lugares.", cor: "#8B6914" },
  { id: 4, name: "Guarda-Roupa Roma 6 Portas", categoria: "Quarto", linha: "Essencial", ref: "FAB-0401", desc: "Guarda-roupa com espelho e 6 portas, 2 gavetas. Melhor custo-benefício.", cor: "#16A34A" },
  { id: 5, name: "Home Office Executive", categoria: "Home Office", linha: "Contemporânea", ref: "FAB-0501", desc: "Mesa com gavetas e prateleiras integradas. Tampo em glass black.", cor: "#2563EB" },
  { id: 6, name: "Cama Infantil Luna", categoria: "Kids", linha: "Kids", ref: "FAB-0601", desc: "Cama com grades de proteção, em MDF rosa ou azul. Com gaveta embutida.", cor: "#DB2777" },
  { id: 7, name: "Estante Modular Nova", categoria: "Sala", linha: "Essencial", ref: "FAB-0701", desc: "Estante modular com nichos abertos e fechados. Montagem fácil.", cor: "#16A34A" },
  { id: 8, name: "Poltrona Vintage Couro", categoria: "Sala", linha: "Clássica", ref: "FAB-0801", desc: "Poltrona em couro legítimo com pés de madeira maciça torneada.", cor: "#8B6914" },
  { id: 9, name: "Mesa de Escritório L", categoria: "Home Office", linha: "Industrial", ref: "FAB-0901", desc: "Mesa em L com estrutura metálica preta e tampo em MDF amadeirado.", cor: "#4B5563" },
  { id: 10, name: "Berço Montessoriano", categoria: "Kids", linha: "Kids", ref: "FAB-1001", desc: "Berço baixo para método Montessori. Seguro, sem grades, madeira natural.", cor: "#DB2777" },
  { id: 11, name: "Criado-Mudo Flutuante", categoria: "Quarto", linha: "Contemporânea", ref: "FAB-1101", desc: "Par de criados-mudos suspensos com gaveta e LED embutido.", cor: "#2563EB" },
  { id: 12, name: "Projeto Sob Medida", categoria: "Sob Medida", linha: "Sob Medida", ref: "FAB-SOB", desc: "Produção personalizada. Consulte nossa equipe para orçamento.", cor: "#E67A22" },
];

export default function Catalogo() {
  const [cat, setCat] = useState("Todos");

  const filtered = cat === "Todos" ? PRODUTOS : PRODUTOS.filter(p => p.categoria === cat);

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
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-widest text-[#E67A22]"
            >
              Portfólio completo
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-none mt-3"
            >
              Catálogo<br />
              <span className="text-[#E67A22]">Fabriko</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#E67A22] hover:bg-[#c9601a] text-white font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-colors"
            >
              <Download className="h-4 w-4" />
              Baixar PDF
            </a>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="sticky top-[60px] z-30 bg-white border-b border-[#e5e5e5] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wide transition-all ${
                cat === c
                  ? "bg-[#E67A22] text-white"
                  : "bg-[#f7f6f4] text-[#6b6b6b] hover:bg-[#e5e5e5]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de produtos */}
      <section className="py-16 bg-[#f7f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="bg-white rounded-lg border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Imagem placeholder */}
                <div
                  className="h-48 flex items-center justify-center text-6xl"
                  style={{ background: `linear-gradient(135deg, ${p.cor}10, ${p.cor}25)` }}
                >
                  <div
                    className="h-20 w-20 rounded-sm opacity-30"
                    style={{ backgroundColor: p.cor }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: p.cor }}
                    >
                      {p.linha}
                    </span>
                    <span className="text-xs text-[#6b6b6b] font-mono">{p.ref}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-barlow)] font-bold text-base text-[#1B1A18] uppercase mt-2 mb-1.5">
                    {p.name}
                  </h3>
                  <p className="text-[#6b6b6b] text-xs leading-relaxed mb-4">{p.desc}</p>
                  <Link
                    href="/seja-parceiro"
                    className="block text-center bg-[#1B1A18] hover:bg-[#E67A22] text-white text-xs font-bold py-2 rounded-sm uppercase tracking-wider transition-colors"
                  >
                    Solicitar preço
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#6b6b6b]">Nenhum produto nesta categoria.</div>
          )}
        </div>
      </section>

      {/* CTA download */}
      <section className="py-16 bg-[#1B1A18]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase mb-3">
            Quer ver o catálogo completo com preços?
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Cadastre-se como parceiro e tenha acesso à tabela completa com referências e valores exclusivos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/seja-parceiro"
              className="bg-[#E67A22] text-white font-bold px-7 py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-[#c9601a] transition-colors"
            >
              Acessar tabela de preços
            </Link>
            <a
              href="tel:+5500000000000"
              className="flex items-center gap-2 border border-white/20 text-white font-semibold px-7 py-3 rounded-sm uppercase tracking-wider text-sm hover:border-white/50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Ligar agora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
