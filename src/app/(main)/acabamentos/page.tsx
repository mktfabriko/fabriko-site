"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

type Acabamento = {
  nome: string;
  linha: string;
  hex: string | string[];
  swatchImg?: string;
  hoverImg?: string;    // imagem individual no hover — se omitido usa ambienteImg da categoria
  fabricante?: string;
  galeria?: string[];   // até 3 imagens para o modal — se omitido usa ambienteImg da categoria
  detalhes?: string;
};
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
      { nome: "Carvalho Natural", linha: "Naturale", hex: ["#8B6914", "#A07C2A"], swatchImg: "/items/2.webp",
        detalhes: "Veios finos que reproduzem o carvalho europeu. Tom dourado com variações naturais de textura. Versátil em cozinhas e dormitórios contemporâneos." },
      { nome: "Pau Ferro Natural", linha: "Essencial Wood", hex: ["#3D1F0A", "#5A3015"], swatchImg: "/items/6.webp",
        detalhes: "Acabamento escuro inspirado no Pau Ferro brasileiro. Grãos profundos com tonal sofisticado para projetos de alto impacto." },
      { nome: "Tauari", linha: "Madeiras do Brasil", hex: ["#9E6B3A", "#B8834A"], swatchImg: "/items/3.webp",
        detalhes: "Madeira clara com veios suaves. Traz calor ao ambiente sem pesar na composição visual. Ideal para salas e cozinhas amplas." },
      { nome: "Itapuã", linha: "Essencial Wood", hex: ["#5C2D0A", "#7A3D14"], swatchImg: "/items/4.webp",
        detalhes: "Tom avermelhado intenso. Grãos evidentes que criam movimento e personalidade nos projetos. Forte apelo rústico contemporâneo." },
      { nome: "Louro Freijó", linha: "Trend", hex: ["#7A5C28", "#96723A"], swatchImg: "/items/5.webp",
        detalhes: "Versão dourada do Freijó clássico. Veios bem marcados que remetem à madeira nativa brasileira com leveza visual." },
      { nome: "Freijó", linha: "Syncro", hex: ["#6B4E24", "#8A6530"], swatchImg: "/items/7.webp",
        detalhes: "Clássico intemporável. Tom médio com grãos naturais alinhados. Um dos acabamentos mais vendidos em projetos residenciais." },
      { nome: "Carvalho Hanover", linha: "Design", hex: ["#7A7060", "#948978"], swatchImg: "/items/8.webp",
        detalhes: "Carvalho acinzentado com toque industrial. Combina madeira e contemporaneidade em um acabamento de alto apelo estético." },
    ],
  },
  {
    cat: "Conceito",
    desc: "Acabamentos com texturas únicas — remetem a pedras, metais e tecidos. Para projetos com personalidade marcante.",
    ambienteImg: AMB_CONCEITO,
    items: [
      { nome: "Lino Chess", linha: "Chess", hex: ["#D8D4CC", "#C8C4BC"], swatchImg: "/items/10.webp",
        detalhes: "Textura que imita linho natural. Superfície discreta e sofisticada com padrão geométrico sutil. Perfeito para closets e lavabos." },
      { nome: "Atenna", linha: "Fancy", hex: ["#A89280", "#C4AE9A"], swatchImg: "/items/11.webp",
        detalhes: "Efeito metálico rosé com variações de luz. Exclusivo para projetos de alto impacto visual e design autoral." },
      { nome: "Bronze", linha: "Magma", hex: ["#8B5E3C", "#A67248"], swatchImg: "/items/12.webp",
        detalhes: "Efeito de fundição em bronze. Textura irregular que cria profundidade e caráter único em ambientes contemporâneos." },
      { nome: "Cosmos", linha: "Magma", hex: ["#2A2420", "#3E3530"], swatchImg: "/items/13.webp",
        detalhes: "Textura de pedra escura com microvariações. Alta sofisticação para projetos contemporâneos e dark de alto padrão." },
    ],
  },
  {
    cat: "Unicolor",
    desc: "Paleta sólida e atual. Do branco clássico ao grafite urbano, dos tons terrosos às cores tendência. Sempre com acabamento premium.",
    ambienteImg: AMB_UNICOLOR,
    items: [
      { nome: "Branco Diamante", linha: "Essencial", hex: "#F5F3EF", swatchImg: "/items/15.webp",
        detalhes: "O branco mais vendido da Fabriko. Tom quente com leve toque marfim para harmonizar em qualquer ambiente." },
      { nome: "Ocre Solar", linha: "Cores", hex: "#C8963C", swatchImg: "/items/16.webp",
        detalhes: "Amarelo-ocre vibrante da tendência terrosa. Pontua ambientes com energia sem agredir a composição geral." },
      { nome: "Branco TX", linha: "Chess", hex: "#EEECE8", swatchImg: "/items/17.webp",
        detalhes: "Branco com textura sutil. Acabamento leve e limpo que dá leveza a cozinhas e closets contemporâneos." },
      { nome: "Cinza Cristal", linha: "Chess", hex: "#C0BCBA", swatchImg: "/items/18.webp",
        detalhes: "Cinza claro com fundo levemente rosé. Neutro versátil que combina com quase qualquer cor base ou madeirado." },
      { nome: "Beton", linha: "Matt", hex: "#909090", swatchImg: "/items/19.webp",
        detalhes: "Cinza cimento matte. Estética industrial e contemporânea em acabamento fosco profundo. Muito utilizado em cozinhas modernas." },
      { nome: "Cinza Sagrado", linha: "Essencial", hex: "#A0A09A", swatchImg: "/items/20.webp",
        detalhes: "Cinza médio de forte apelo. Clássico que nunca sai de moda em cozinhas e dormitórios com estética moderna." },
      { nome: "Grafito", linha: "Chess", hex: "#4A4A48", swatchImg: "/items/21.webp",
        detalhes: "Cinza escuro quase preto. Impacto visual máximo com elegância sóbria. Ideal como destaque em projetos bicolores." },
      { nome: "Sal Rosa", linha: "Matt", hex: "#E8C4C0", swatchImg: "/items/22.webp",
        detalhes: "Rosa pó delicado com toque matte. Tendência forte em dormitórios e banheiros de alto padrão feminino." },
      { nome: "Beige", linha: "Matt", hex: "#D4C8B0", swatchImg: "/items/23.webp",
        detalhes: "Bege quente e acolhedor. Neutro terroso que aquece qualquer ambiente sem chamar atenção excessiva." },
      { nome: "Azul Sereno", linha: "Matt", hex: "#A8B8D0", swatchImg: "/items/24.webp",
        detalhes: "Azul acinzentado de toque sereno. Ideal para ambientes que buscam equilíbrio, sofisticação e tranquilidade." },
      { nome: "Azul Secreto", linha: "Essencial", hex: "#3A4F6A", swatchImg: "/items/25.webp",
        detalhes: "Azul petróleo profundo. Presença marcante para quem busca um diferencial sofisticado e exclusivo no projeto." },
      { nome: "Verde Jade", linha: "Matt", hex: "#5A8070", swatchImg: "/items/26.webp",
        detalhes: "Verde matizado com toque de pedra preciosa. Tendência de alto padrão em projetos de design de interiores premium." },
      { nome: "Frapê", linha: "Matt", hex: "#C8B89A", swatchImg: "/items/27.webp",
        detalhes: "Caramelo claro com toque matte. Neutro quente que combina naturalmente com madeirados e tons terra." },
      { nome: "Branco TX Premium", linha: "Resistente à Umidade", hex: "#F0EDE8", swatchImg: "/items/28.webp",
        detalhes: "Branco TX com resistência à umidade certificada. Indicado para cozinhas, banheiros e áreas de lavanderia." },
      { nome: "Cafelatte", linha: "Matt", hex: "#9A7A60", swatchImg: "/items/29.webp",
        detalhes: "Marrom suave e aveludado. Tom médio que dialoga harmoniosamente com madeirados e tons naturais em geral." },
      { nome: "Pérola Urbana", linha: "Essencial", hex: "#E8E0D4", swatchImg: "/items/30.webp",
        detalhes: "Branco gelo com toque perlado. Leveza máxima com diferenciação sutil do branco puro. Muito utilizado em projetos clean." },
    ],
  },
  {
    cat: "Blend",
    desc: "A fusão de texturas e tons. Acabamentos que combinam elementos madeirados, sólidos e efeitos especiais em uma estética única.",
    ambienteImg: AMB_BLEND,
    items: [
      { nome: "Asfalto", linha: "Supermatte", hex: ["#505050", "#686868"], swatchImg: "/items/32.webp",
        detalhes: "Cinza escuro supermatte com efeito cimento. Máxima resistência a impressões digitais e riscos superficiais." },
      { nome: "Off White Suave", linha: "Sense", hex: ["#D8D4C8", "#C8C4B8"], swatchImg: "/items/33.webp",
        detalhes: "Branco com micro-textura sense. Profundidade visual sutil que eleva o acabamento tradicional a outro patamar." },
      { nome: "Gianduia", linha: "Sense", hex: ["#B08060", "#C89A70"], swatchImg: "/items/34.webp",
        detalhes: "Caramelo dourado com textura sense. Aquece ambientes com sofisticação e modernidade em um tom único." },
      { nome: "Ébano Chess", linha: "Chess", hex: ["#2A2018", "#3A3020"], swatchImg: "/items/35.webp",
        detalhes: "Preto ébano com textura chess discreta. O acabamento de maior impacto visual do portfólio Fabriko." },
      { nome: "Amêndoa", linha: "Natura", hex: ["#C8A87A", "#D4BC8A"], swatchImg: "/items/36.webp",
        detalhes: "Bege dourado com veios naturais suaves. Versatilidade entre o madeirado e o sólido em um único acabamento." },
      { nome: "Lenho", linha: "Natura", hex: ["#8A6840", "#A07E50"], swatchImg: "/items/37.webp",
        detalhes: "Tom madeira clara naturalizado. Traz aconchego sem sobrepor outros elementos composicionais do projeto." },
      { nome: "Freijó Natural", linha: "Natura", hex: ["#7A5830", "#946840"], swatchImg: "/items/38.webp",
        detalhes: "Freijó com acabamento natura. Textura naturalizada que valoriza cada grão e detalhe da madeira." },
      { nome: "Granile", linha: "Colore", hex: ["#C0B4A8", "#A89E90"], swatchImg: "/items/39.webp",
        detalhes: "Efeito granilite em tom pérola. Para projetos que buscam a textura da pedra sem abrir mão da leveza visual." },
    ],
  },
];

const CATEGORIAS_LIST = ["Todos", ...CATEGORIAS.map((c) => c.cat)];

// ─── Modal ────────────────────────────────────────────────────────────────────

function AcabamentoModal({ item, fallbackImg, onClose }: { item: Acabamento; fallbackImg: string; onClose: () => void }) {
  const galeria = item.galeria && item.galeria.length > 0 ? item.galeria : [fallbackImg];
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i - 1 + galeria.length) % galeria.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i + 1) % galeria.length); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 lg:p-12"
      onClick={onClose}
    >
      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black flex items-center justify-center cursor-zoom-out"
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={galeria[idx]}
              alt={item.nome}
              onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
              className="max-h-full max-w-full object-contain"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
              className="absolute top-5 right-5 h-9 w-9 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl bg-white overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery */}
        <div className="relative h-56 md:h-72 bg-[#1A1917] overflow-hidden select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={galeria[idx]}
            alt={`${item.nome} — imagem ${idx + 1}`}
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Prev / Next */}
          {galeria.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-12 top-1/2 -translate-y-1/2 h-9 w-9 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                {galeria.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Expand */}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
            className="absolute top-3 right-3 h-8 w-8 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            title="Expandir imagem"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 left-3 h-8 w-8 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
              {item.nome}
            </h2>
            <span className="text-[10px] text-[#1A1917]/30 font-bold uppercase tracking-widest border border-[#E8E6E3] px-2 py-1 shrink-0 mt-1">
              {item.linha}
            </span>
          </div>

          {item.fabricante && (
            <p className="text-[#E67A22] text-xs font-medium mb-1 mt-1">
              Fabricante: {item.fabricante}
            </p>
          )}

          {item.detalhes && (
            <p className="text-[#6B6966] text-sm leading-relaxed mt-3 mb-6">{item.detalhes}</p>
          )}

          <div className="flex gap-3 mt-6">
            <Link
              href="/seja-parceiro"
              onClick={onClose}
              className="flex-1 group flex items-center justify-center gap-2 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold py-3.5 tracking-widest uppercase transition-all"
            >
              Quero ser parceiro
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={onClose}
              className="border border-[#E8E6E3] text-[#1A1917]/40 hover:border-[#1A1917]/20 hover:text-[#1A1917] text-xs font-medium px-5 tracking-widest uppercase transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function AcabamentoCard({ item, categoryAmbienteImg, onClick }: { item: Acabamento; categoryAmbienteImg: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const hoverImg = item.hoverImg ?? categoryAmbienteImg;
  const bg = Array.isArray(item.hex)
    ? `linear-gradient(135deg, ${item.hex[0]}, ${item.hex[1]})`
    : item.hex;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Swatch */}
      <div
        className="h-24 w-full mb-3 border border-[#E8E6E3] group-hover:border-[#E67A22]/30 transition-colors relative overflow-hidden"
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

      {/* Hover tooltip */}
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
                src={hoverImg}
                alt={`Ambiente ${item.nome}`}
                onError={(e) => { (e.target as HTMLImageElement).src = categoryAmbienteImg; }}
                className="w-full h-32 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-bold truncate">{item.nome}</p>
                <p className="text-white/50 text-[10px]">{item.linha}</p>
              </div>
            </div>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Acabamentos() {
  const [cat, setCat] = useState("Todos");
  const [selected, setSelected] = useState<{ item: Acabamento; categoryImg: string } | null>(null);

  const visivel = cat === "Todos" ? CATEGORIAS : CATEGORIAS.filter((c) => c.cat === cat);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-28 pb-12 md:pt-36 md:pb-20">
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
            className={`border-b border-[#E8E6E3] py-10 md:py-20 ${i % 2 !== 0 ? "bg-[#FAFAF8]" : "bg-white"}`}
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
                  <AcabamentoCard
                    key={item.nome}
                    item={item}
                    categoryAmbienteImg={ambienteImg}
                    onClick={() => setSelected({ item, categoryImg: ambienteImg })}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-10 md:py-20 bg-[#1A1917]">
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

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <AcabamentoModal
            item={selected.item}
            fallbackImg={selected.categoryImg}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
