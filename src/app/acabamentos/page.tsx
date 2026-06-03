"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

type Acabamento = { nome: string; linha: string; hex: string | string[]; img?: string; swatchImg?: string };
type Categoria = { cat: string; desc: string; items: Acabamento[]; ambienteImg: string };

const AMB_MADEIRADO = "/fotos/28.webp";
const AMB_UNICOLOR  = "/fotos/33.webp";
const AMB_CONCEITO  = "/fotos/31.webp";
const AMB_BLEND     = "/fotos/44.webp";

const CATEGORIAS: Categoria[] = [
  {
    cat: "Madeirado",
    desc: "Acabamentos que reproduzem a textura e o visual da madeira natural. Tendência dominante na decoração contemporânea.",
    ambienteImg: AMB_MADEIRADO,
    items: [
      { nome: "Carvalho Natural", linha: "Naturale", hex: ["#8B6914", "#A07C2A"], swatchImg: "/items/2.webp" },
      { nome: "Pau Ferro Natural", linha: "Essencial Wood", hex: ["#3D1F0A", "#5A3015"], swatchImg: "/items/6.webp" },
      { nome: "Tauari", linha: "Madeiras do Brasil", hex: ["#9E6B3A", "#B8834A"], swatchImg: "/items/3.webp" },
      { nome: "Itapuã", linha: "Essencial Wood", hex: ["#5C2D0A", "#7A3D14"], swatchImg: "/items/4.webp" },
      { nome: "Louro Freijó", linha: "Trend", hex: ["#7A5C28", "#96723A"], swatchImg: "/items/5.webp" },
      { nome: "Freijó", linha: "Syncro", hex: ["#6B4E24", "#8A6530"], swatchImg: "/items/7.webp" },
      { nome: "Carvalho Hanover", linha: "Design", hex: ["#7A7060", "#948978"], swatchImg: "/items/8.webp" },
    ],
  },
  {
    cat: "Conceito",
    desc: "Acabamentos com texturas únicas — remetem a pedras, metais e tecidos. Para projetos com personalidade marcante.",
    ambienteImg: AMB_CONCEITO,
    items: [
      { nome: "Lino Chess", linha: "Chess", hex: ["#D8D4CC", "#C8C4BC"], swatchImg: "/items/10.webp" },
      { nome: "Atenna", linha: "Fancy", hex: ["#A89280", "#C4AE9A"], swatchImg: "/items/11.webp" },
      { nome: "Bronze", linha: "Magma", hex: ["#8B5E3C", "#A67248"], swatchImg: "/items/12.webp" },
      { nome: "Cosmos", linha: "Magma", hex: ["#2A2420", "#3E3530"], swatchImg: "/items/13.webp" },
    ],
  },
  {
    cat: "Unicolor",
    desc: "Paleta sólida e atual. Do branco clássico ao grafite urbano, dos tons terrosos às cores tendência. Sempre com acabamento premium.",
    ambienteImg: AMB_UNICOLOR,
    items: [
      { nome: "Branco Diamante", linha: "Essencial", hex: "#F5F3EF", swatchImg: "/items/15.webp" },
      { nome: "Ocre Solar", linha: "Cores", hex: "#C8963C", swatchImg: "/items/16.webp" },
      { nome: "Branco TX", linha: "Chess", hex: "#EEECE8", swatchImg: "/items/17.webp" },
      { nome: "Cinza Cristal", linha: "Chess", hex: "#C0BCBA", swatchImg: "/items/18.webp" },
      { nome: "Beton", linha: "Matt", hex: "#909090", swatchImg: "/items/19.webp" },
      { nome: "Cinza Sagrado", linha: "Essencial", hex: "#A0A09A", swatchImg: "/items/20.webp" },
      { nome: "Grafito", linha: "Chess", hex: "#4A4A48", swatchImg: "/items/21.webp" },
      { nome: "Sal Rosa", linha: "Matt", hex: "#E8C4C0", swatchImg: "/items/22.webp" },
      { nome: "Beige", linha: "Matt", hex: "#D4C8B0", swatchImg: "/items/23.webp" },
      { nome: "Azul Sereno", linha: "Matt", hex: "#A8B8D0", swatchImg: "/items/24.webp" },
      { nome: "Azul Secreto", linha: "Essencial", hex: "#3A4F6A", swatchImg: "/items/25.webp" },
      { nome: "Verde Jade", linha: "Matt", hex: "#5A8070", swatchImg: "/items/26.webp" },
      { nome: "Frapê", linha: "Matt", hex: "#C8B89A", swatchImg: "/items/27.webp" },
      { nome: "Branco TX Premium", linha: "Resistente à Umidade", hex: "#F0EDE8", swatchImg: "/items/28.webp" },
      { nome: "Cafelatte", linha: "Matt", hex: "#9A7A60", swatchImg: "/items/29.webp" },
      { nome: "Pérola Urbana", linha: "Essencial", hex: "#E8E0D4", swatchImg: "/items/30.webp" },
    ],
  },
  {
    cat: "Blend",
    desc: "A fusão de texturas e tons. Acabamentos que combinam elementos madeirados, sólidos e efeitos especiais em uma estética única.",
    ambienteImg: AMB_BLEND,
    items: [
      { nome: "Asfalto", linha: "Supermatte", hex: ["#505050", "#686868"], swatchImg: "/items/32.webp" },
      { nome: "Off White Suave", linha: "Sense", hex: ["#D8D4C8", "#C8C4B8"], swatchImg: "/items/33.webp" },
      { nome: "Gianduia", linha: "Sense", hex: ["#B08060", "#C89A70"], swatchImg: "/items/34.webp" },
      { nome: "Ébano Chess", linha: "Chess", hex: ["#2A2018", "#3A3020"], swatchImg: "/items/35.webp" },
      { nome: "Amêndoa", linha: "Natura", hex: ["#C8A87A", "#D4BC8A"], swatchImg: "/items/36.webp" },
      { nome: "Lenho", linha: "Natura", hex: ["#8A6840", "#A07E50"], swatchImg: "/items/37.webp" },
      { nome: "Freijó Natural", linha: "Natura", hex: ["#7A5830", "#946840"], swatchImg: "/items/38.webp" },
      { nome: "Granile", linha: "Colore", hex: ["#C0B4A8", "#A89E90"], swatchImg: "/items/39.webp" },
    ],
  },
];

const CATEGORIAS_LIST = ["Todos", ...CATEGORIAS.map((c) => c.cat)];

function AcabamentoCard({ item, ambienteImg }: { item: Acabamento; ambienteImg: string }) {
  const [hovered, setHovered] = useState(false);
  const bg = Array.isArray(item.hex)
    ? `linear-gradient(135deg, ${item.hex[0]}, ${item.hex[1]})`
    : item.hex;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color swatch — texture image or CSS fallback */}
      <div className="h-24 w-full mb-3 border border-[#E8E6E3] group-hover:border-[#E67A22]/30 transition-colors relative overflow-hidden"
        style={item.swatchImg ? undefined : { background: bg }}
      >
        {item.swatchImg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.swatchImg}
            alt={item.nome}
            className="w-full h-[130%] object-cover object-top"
          />
        )}
      </div>

      {/* Hover overlay — room photo */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 shadow-xl pointer-events-none"
          >
            <div className="relative overflow-hidden bg-[#1A1917]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ambienteImg}
                alt={`Ambiente ${item.nome}`}
                className="w-full h-32 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-bold truncate">{item.nome}</p>
                <p className="text-white/50 text-[10px]">{item.linha}</p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1A1917] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[#1A1917] text-sm font-medium group-hover:text-[#E67A22] transition-colors">
        {item.nome}
      </p>
      <p className="text-[#1A1917]/35 text-xs mt-0.5">{item.linha}</p>
    </motion.div>
  );
}

export default function Acabamentos() {
  const [cat, setCat] = useState("Todos");

  const visivel = cat === "Todos" ? CATEGORIAS : CATEGORIAS.filter((c) => c.cat === cat);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-36 pb-20">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Portfólio de materiais</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.92] mb-6 uppercase tracking-tight"
            >
              Acaba-<br />
              <span className="text-[#E67A22]">mentos</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-xl">
              Selecionados entre os principais fornecedores de matéria-prima. Alinhados com as
              tendências da decoração e do design atual.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-[#E8E6E3] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {CATEGORIAS_LIST.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap text-xs font-bold uppercase tracking-widest px-5 py-2.5 transition-all ${
                cat === c
                  ? "bg-[#E67A22] text-white"
                  : "text-[#1A1917]/40 hover:text-[#1A1917] border border-[#E8E6E3] hover:border-[#1A1917]/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Categorias */}
      <section className="bg-white pb-24">
        {visivel.map(({ cat: catName, desc, items, ambienteImg }, i) => (
          <div
            key={catName}
            className={`border-b border-[#E8E6E3] py-20 ${i % 2 !== 0 ? "bg-[#FAFAF8]" : "bg-white"}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
                <div>
                  <p className="label-tag mb-3">{catName}</p>
                  <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
                    Acabamento {catName}
                  </h2>
                  <p className="text-[#6B6966] text-sm mt-2 max-w-xl">{desc}</p>
                </div>
                <p className="text-[#1A1917]/25 text-xs uppercase tracking-widest shrink-0">
                  {items.length} opções
                </p>
              </div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                variants={stagger}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
              >
                {items.map((item) => (
                  <AcabamentoCard key={item.nome} item={item} ambienteImg={ambienteImg} />
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1917]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-white mb-4">
              Pronto para projetar com os acabamentos Fabriko?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-8">
              Acesse a biblioteca no Promob e comece a criar projetos de alto padrão.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/seja-parceiro"
                className="group flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-7 py-4 tracking-widest uppercase transition-all">
                Ser parceiro Fabriko
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/linhas"
                className="border border-white/20 text-white/50 hover:text-white hover:border-white/50 text-xs font-medium px-7 py-4 tracking-widest uppercase transition-all">
                Ver linhas
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
