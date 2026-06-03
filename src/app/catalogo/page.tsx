"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const CORES_AVULSO = [
  { nome: "Metalic", hex: "#A0A0A0" },
  { nome: "Cobre Envelhecido", hex: "#8B5E3C" },
  { nome: "Níquel Envelhecido", hex: "#9A9090" },
  { nome: "Rosé", hex: "#C89090" },
  { nome: "Níquel Escovado", hex: "#B0B0B0" },
  { nome: "Dourado", hex: "#C8A83C" },
  { nome: "Cobre Escovado", hex: "#9A6845" },
  { nome: "Branco", hex: "#F0EEE8" },
  { nome: "Ouro Envelhecido", hex: "#B89040" },
  { nome: "Cromado", hex: "#D0D0D0" },
  { nome: "Cobre Preto Acetinado", hex: "#2A1E18" },
];

const CORES_ROMETAL = [
  { nome: "Anodizado", hex: "#A8A8A8" },
  { nome: "Inox Polido", hex: "#C8C8C8" },
  { nome: "Branco Fosco", hex: "#F0EEE8" },
  { nome: "Champagne Claro", hex: "#D4C090" },
  { nome: "Preto Fosco", hex: "#282828" },
  { nome: "Champagne 1001", hex: "#C8B870" },
];

const GRUPOS = [
  {
    grupo: "Alças — Coleção Avulso",
    desc: "Design clássico e contemporâneo. Disponíveis em 11 cores exclusivas.",
    items: [
      { nome: "Alça Clássica", desc: "Design atemporal que une elegância e versatilidade.", tam: "64mm · 128mm", img: "/items/41.webp" },
      { nome: "Alça Ponta", desc: "Linhas retas e levemente inclinadas. Modernidade e discrição.", tam: "64mm · 128mm · 288mm", img: "/items/42.webp" },
      { nome: "Alça Concha", desc: "Clássico e aconchegante. Pegada ergonômica e estética charmosa.", tam: "64mm", img: "/items/43.webp" },
      { nome: "Alça Slim", desc: "Minimalista, funcional e elegante. Para projetos que valorizam leveza visual.", tam: "64mm · 128mm · 256mm", img: "/items/45.webp" },
    ],
    cores: CORES_AVULSO,
  },
  {
    grupo: "Pontos e Abas — Coleção Avulso",
    desc: "Detalhes sofisticados e soluções modernas.",
    items: [
      { nome: "Ponto Clássico", desc: "Toque de sofisticação para detalhes. Discreto, porém marcante.", tam: "25mm · 32mm", img: "/items/44.webp" },
      { nome: "Aba Reta Smart", desc: "Solução moderna, de fácil aplicação e estética limpa.", tam: "150mm", img: "/items/46.webp" },
    ],
    cores: CORES_AVULSO,
  },
  {
    grupo: "Abas Rometal",
    desc: "Design contemporâneo e funcional. 6 acabamentos exclusivos.",
    items: [
      { nome: "Puxador Aria", desc: "Aba angular com design aerodinâmico. Leveza e modernidade.", tam: "96mm · 128mm · 160mm", img: "/items/49.webp" },
      { nome: "Puxador Cielo", desc: "Aba plana de perfil slim. Ergonomia e sofisticação em um único gesto.", tam: "96mm · 128mm", img: "/items/50.webp" },
      { nome: "Puxador Luna", desc: "Curvatura suave que entrega leveza e personalidade ao projeto.", tam: "96mm · 128mm · 192mm", img: "/items/51.webp" },
    ],
    cores: CORES_ROMETAL,
  },
  {
    grupo: "Perfil Integrado",
    desc: "Para fresagem em portas. Solução elegante e sem puxador exposto.",
    items: [
      { nome: "Gola RM-52", desc: "Perfil gola em alumínio para aplicação em friso superior ou inferior de portas.", tam: "Sob medida", img: "/items/56.webp" },
      { nome: "Gola RM-53", desc: "Versão com encaixe reforçado. Alta sofisticação para projetos premium.", tam: "Sob medida", img: "/items/55.webp" },
    ],
    cores: [
      { nome: "Anodizado", hex: "#A8A8A8" },
      { nome: "Preto Fosco", hex: "#282828" },
      { nome: "Champagne", hex: "#D4C090" },
    ],
  },
  {
    grupo: "Puxador Integrado",
    desc: "Solução all-in-one para portas com puxador embutido no próprio MDF.",
    items: [
      { nome: "Integrated Slim", desc: "Recorte em MDF com borda laminada. Design limpo, sem peças metálicas.", tam: "Qualquer medida" },
      { nome: "Integrated Plus", desc: "Recorte com perfil de alumínio interno. Maior resistência e acabamento premium.", tam: "Qualquer medida" },
    ],
    cores: [{ nome: "Todos os acabamentos Fabriko", hex: "linear-gradient(135deg, #E67A22, #C85E0F)" }],
  },
];

const MODELOS_PORTA = [
  {
    nome: "Porta Provence",
    desc: "Estilo clássico e sofisticado. Porta de 15mm com borda perimetral de 6mm, totalizando 21mm de espessura total. O detalhe que eleva o projeto.",
    spec: "Espessura total: 21mm · Borda perimetral de 6mm inclusa",
    tag: "Clássico",
    img: "/items/66.webp",
  },
  {
    nome: "Porta Metala Vetro",
    desc: "Estrutura em alumínio com vidro. Leveza, modernidade e sofisticação máxima. Acompanha puxador modelo Novo em ampla gama de cores.",
    spec: "Estrutura alumínio + vidro · Puxador exclusivo Novo incluso",
    tag: "Premium",
    img: "/items/67.webp",
  },
];

export default function Catalogo() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-36 pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Acessórios e acabamentos</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.92] mb-6 uppercase tracking-tight"
            >
              Catá-<br />
              <span className="text-[#E67A22]">logo</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-xl">
              Puxadores, abas, perfis e modelos de porta. Tudo o que você precisa para
              completar o projeto com sofisticação e qualidade Fabriko.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Puxadores por grupo */}
      <section className="bg-white">
        {GRUPOS.map(({ grupo, desc, items, cores }, gi) => (
          <motion.div
            key={grupo}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className={`border-b border-[#E8E6E3] py-20 ${gi % 2 !== 0 ? "bg-[#FAFAF8]" : "bg-white"}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-10">
                <p className="label-tag mb-3">{grupo}</p>
                <p className="text-[#6B6966] text-sm max-w-lg">{desc}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {items.map(({ nome, desc: itemDesc, tam, img }: { nome: string; desc: string; tam: string; img?: string }) => (
                  <div key={nome} className="border border-[#E8E6E3] bg-white p-5 hover:border-[#E67A22]/30 transition-colors group">
                    <div className="h-40 bg-white mb-4 overflow-hidden relative border border-[#F0EEE8]">
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={nome}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#F5F3F0] to-[#EAE7E3] flex items-center justify-center">
                          <span className="text-[#E67A22]/15 font-[family-name:var(--font-playfair)] font-black text-5xl select-none group-hover:text-[#E67A22]/25 transition-colors">
                            {nome.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-[#1A1917] font-semibold text-sm mb-1">{nome}</h3>
                    <p className="text-[#6B6966] text-xs leading-relaxed mb-2">{itemDesc}</p>
                    <p className="text-[#E67A22] text-[10px] font-bold uppercase tracking-wider">{tam}</p>
                  </div>
                ))}
              </div>

              {/* Cores disponíveis */}
              <div>
                <p className="text-[#1A1917]/35 text-xs font-bold uppercase tracking-widest mb-4">
                  Cores disponíveis
                </p>
                <div className="flex flex-wrap gap-2">
                  {cores.map(({ nome: corNome, hex }) => (
                    <div
                      key={corNome}
                      className="group relative"
                      title={corNome}
                    >
                      <div
                        className="h-9 w-9 border border-[#E8E6E3] hover:border-[#E67A22]/50 transition-colors cursor-default shadow-sm"
                        style={{ background: Array.isArray(hex) ? `linear-gradient(135deg, ${hex[0]}, ${hex[1]})` : hex }}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-[#1A1917] text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        {corNome}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[#1A1917]/25 text-[10px] mt-3">Passe o cursor para ver o nome da cor</p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Modelos de porta */}
      <section className="py-20 bg-white border-b border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p variants={fadeUp} className="label-tag mb-4">Modelos especiais</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
              Modelos de porta exclusivos.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {MODELOS_PORTA.map(({ nome, desc, spec, tag, img }) => (
              <motion.div key={nome} variants={fadeUp}
                className="border border-[#E8E6E3] hover:border-[#E67A22]/30 transition-colors overflow-hidden group">
                <div className="h-52 overflow-hidden bg-white border-b border-[#F0EEE8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={nome}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-bold text-xl">{nome}</h3>
                    <span className="text-[#E67A22] text-[10px] font-bold uppercase tracking-widest border border-[#E67A22]/30 px-2 py-0.5">
                      {tag}
                    </span>
                  </div>
                  <p className="text-[#6B6966] text-sm leading-relaxed mb-4">{desc}</p>
                  <p className="text-[#E67A22] text-xs font-medium">{spec}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Painéis LED */}
      <section className="py-20 bg-[#FAFAF8] border-b border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <p className="label-tag mb-4">Painéis personalizados</p>
              <h3 className="text-3xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] mb-4">
                Painéis e prateleiras com canaleta para LED.
              </h3>
              <p className="text-[#6B6966] text-sm leading-relaxed mb-6">
                Disponíveis em 15mm, 18mm, 30mm e 36mm. Totalmente editáveis no Promob Fabriko
                com formas personalizadas, todos os acabamentos de linha.
              </p>
              <div className="grid grid-cols-4 gap-3">
                {["15mm", "18mm", "30mm", "36mm"].map((e) => (
                  <div key={e} className="border border-[#E8E6E3] bg-white p-4 text-center">
                    <p className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-black text-xl">{e}</p>
                    <p className="text-[#1A1917]/35 text-[10px] mt-0.5">espessura</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden border border-[#E8E6E3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/items/71.webp"
                alt="Painéis e prateleiras com LED"
                className="w-full h-72 object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1917]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-white mb-4">
              Acesse o catálogo completo via Promob.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-8">
              Todos os puxadores, abas e modelos de porta estão disponíveis diretamente no Promob Studio Fabriko.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/seja-parceiro"
                className="group flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-7 py-4 tracking-widest uppercase transition-all">
                Ser parceiro e acessar
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
