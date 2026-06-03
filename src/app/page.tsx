"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, X, Check, ChevronRight } from "lucide-react";
import { SejaParceiroForm } from "@/components/SejaParceiroForm";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } };

const LINHAS = [
  {
    nome: "Village",
    caixas: "15mm",
    portas: "15mm",
    desc: "A linha de entrada com excelente custo-benefício. Caixas e portas em MDF 15mm, perfeita para projetos de alto volume.",
    detalhe: "Ideal para dormitórios, cozinhas e ambientes que exigem bom acabamento com praticidade.",
    img: "/fotos/37.webp",
  },
  {
    nome: "Milano",
    caixas: "15mm",
    portas: "18mm",
    desc: "O equilíbrio perfeito entre qualidade e valor. Caixas 15mm com portas premium em MDF 18mm.",
    detalhe: "A linha mais vendida. Combina robustez nas portas com leveza na estrutura.",
    img: "/fotos/41.webp",
  },
  {
    nome: "Maxximum",
    caixas: "18mm",
    portas: "18mm",
    desc: "Alta performance em toda a estrutura. MDF 18mm em caixas e portas para projetos de alto padrão.",
    detalhe: "Para o lojista que atende o cliente mais exigente. Resistência e sofisticação completas.",
    img: "/fotos/50.webp",
  },
];

const ACABAMENTOS_PREVIEW = [
  { cat: "Madeirado", img: "/items/6.webp", itens: "Carvalho Natural, Freijó, Tauari, Pau Ferro, Louro Freijó..." },
  { cat: "Unicolor", img: "/items/23.webp", itens: "Branco Diamante, Beton, Cinza Sagrado, Grafito, Azul Sereno..." },
  { cat: "Conceito", img: "/items/11.webp", itens: "Atenna, Bronze, Cosmos, Lino Chess, Lana..." },
  { cat: "Blend", img: "/items/38.webp", itens: "Off White Suave, Gianduia, Ébano Chess, Lenho, Granile..." },
];

const DIFERENCIAIS = [
  { n: "01", titulo: "100% MDF", desc: "Toda a produção em MDF de alta qualidade, com bordas de 1mm e colagem PUR para máxima resistência e acabamento premium." },
  { n: "02", titulo: "Via Promob", desc: "Biblioteca exclusiva no Promob Studio. Projete milímetro a milímetro com todos nossos acabamentos, puxadores e especificações." },
  { n: "03", titulo: "Prazo de 20 dias", desc: "20 dias úteis após liberação financeira. Processos padronizados e maquinário CNC garantem consistência e pontualidade." },
  { n: "04", titulo: "Consultoria ativa", desc: "Suporte técnico online permanente. Seu consultor Fabriko acompanha cada pedido do projeto à entrega." },
  { n: "05", titulo: "Capacidade escalável", desc: "Estrutura industrial preparada para crescer junto com o volume de pedidos, sem comprometer prazos nem qualidade." },
  { n: "06", titulo: "Financeiro Santander", desc: "Convênio com Santander Financeira e maquininha PagBank para facilitar as vendas do lojista ao cliente final." },
];

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#1A1917]"
        style={{ backgroundImage: "url('/fotos/1.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E67A22]/8 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-[#0D0D0B]/40 to-[#0D0D0B]/10" />

        {/* Headline — alinhado com o logo do navbar */}
        <div className="relative max-w-7xl mx-auto w-full px-6 pt-40 pb-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-lg">
            <motion.p
              variants={fadeUp}
              className="text-[#E67A22] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5"
            >
              Indústria de Móveis Planejados · Americana-SP
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,4.8vw,4.8rem)] font-[family-name:var(--font-oswald)] font-semibold text-white leading-[1.05] mb-6 uppercase tracking-wide"
            >
              Sua fábrica de{" "}
              <span className="text-[#E67A22]">móveis planejados.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/50 text-sm leading-relaxed max-w-sm">
              Mais do que produção — somos o ponto de apoio para lojistas que querem crescer com
              organização, agilidade e segurança. Via Promob, do projeto à entrega.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative border-t border-white/10 bg-[#0D0D0B]/80 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { v: "3 Linhas", l: "Village · Milano · Maxximum" },
              { v: "100% MDF", l: "Bordas PUR 1mm" },
              { v: "20 dias", l: "Prazo de produção" },
              { v: "Americana-SP", l: "Polo industrial" },
            ].map(({ v, l }) => (
              <div key={v} className="px-6 first:pl-0 last:pr-0 py-1">
                <p className="text-white font-[family-name:var(--font-playfair)] font-bold text-xl">{v}</p>
                <p className="text-white/35 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ LINHAS ══════════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="label-tag mb-4">Portfólio</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]"
            >
              Três linhas.<br />
              <span className="text-[#1A1917]/30">Uma parceria.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {LINHAS.map(({ nome, caixas, portas, desc, detalhe, img }) => (
              <motion.div
                key={nome}
                variants={fadeUp}
                className="group border border-[#E8E6E3] hover:border-[#E67A22]/30 transition-colors overflow-hidden"
              >
                <div className="h-52 overflow-hidden bg-[#F5F3F0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Linha ${nome}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-[family-name:var(--font-playfair)] font-black text-2xl text-[#1A1917] mb-1">
                    Linha {nome}
                  </h3>
                  <div className="flex gap-4 mb-5 mt-3">
                    <div className="border border-[#E8E6E3] px-3 py-1.5">
                      <p className="text-[#1A1917]/40 text-[10px] uppercase tracking-wider mb-0.5">Caixas</p>
                      <p className="text-[#1A1917] text-sm font-bold">{caixas}</p>
                    </div>
                    <div className="border border-[#E8E6E3] px-3 py-1.5">
                      <p className="text-[#1A1917]/40 text-[10px] uppercase tracking-wider mb-0.5">Portas</p>
                      <p className="text-[#1A1917] text-sm font-bold">{portas}</p>
                    </div>
                  </div>
                  <p className="text-[#6B6966] text-sm leading-relaxed mb-3">{desc}</p>
                  <p className="text-[#1A1917]/35 text-xs leading-relaxed">{detalhe}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-right"
          >
            <Link
              href="/linhas"
              className="inline-flex items-center gap-2 text-[#1A1917]/40 hover:text-[#E67A22] text-xs font-medium tracking-widest uppercase transition-colors"
            >
              Detalhes de cada linha <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ ACABAMENTOS ═════════════════════════════════════════ */}
      <section className="py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6"
          >
            <div>
              <motion.p variants={fadeUp} className="label-tag mb-4">Acabamentos</motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]"
              >
                Alinhados às tendências.<br />
                <span className="text-[#1A1917]/30 font-medium italic">Em todos os ambientes.</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/acabamentos"
                className="inline-flex items-center gap-2 text-[#E67A22] text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all"
              >
                Ver todos os acabamentos <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {ACABAMENTOS_PREVIEW.map(({ cat, img, itens }) => (
              <motion.div key={cat} variants={fadeUp} className="group cursor-pointer">
                <Link href="/acabamentos">
                  <div className="h-52 mb-4 relative overflow-hidden bg-[#1A1917]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Acabamento ${cat}`}
                      className="w-full h-[115%] object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-[family-name:var(--font-playfair)] font-bold text-xl drop-shadow">
                        {cat}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#6B6966] text-xs leading-relaxed group-hover:text-[#1A1917] transition-colors">
                    {itens}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ DIFERENCIAIS ════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="label-tag mb-4">Por que Fabriko</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] max-w-xl"
            >
              Mais do que produção. Compromisso com o seu negócio.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E6E3]"
          >
            {DIFERENCIAIS.map(({ n, titulo, desc }) => (
              <motion.div
                key={n}
                variants={fadeUp}
                className="bg-white p-8 hover:bg-[#FAFAF8] transition-colors group"
              >
                <p className="text-[#E67A22]/20 font-[family-name:var(--font-playfair)] font-black text-4xl mb-5 group-hover:text-[#E67A22]/40 transition-colors">
                  {n}
                </p>
                <h3 className="text-[#1A1917] font-semibold text-base mb-3">{titulo}</h3>
                <p className="text-[#6B6966] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ESTRUTURA INDUSTRIAL + VÍDEO ════════════════════════ */}
      <section className="py-28 bg-[#FAFAF8] border-y border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="label-tag mb-5">Estrutura industrial</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] leading-tight mb-8"
            >
              Preparada para escalar com você.
            </motion.h2>
            <motion.ul variants={stagger} className="space-y-4">
              {[
                "Maquinário CNC e seccionadoras automatizadas para cortes precisos",
                "Processos padronizados e documentados em cada etapa",
                "Equipe técnica treinada e especializada em móveis planejados",
                "Capacidade produtiva escalável sem comprometer prazos",
                "Produto sob medida — totalmente editável, milímetro a milímetro",
              ].map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-[#6B6966] text-sm">
                  <Check className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-video bg-[#1A1917] overflow-hidden cursor-pointer group border border-[#E8E6E3]"
            onClick={() => setVideoOpen(true)}
          >
            <video
              src="/video-apresentacao.mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-[#1A1917]/40 group-hover:bg-[#1A1917]/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#E67A22] group-hover:bg-[#E67A22]/20 transition-all duration-300 mb-4">
                <Play className="h-6 w-6 text-white ml-1" />
              </div>
              <p className="text-white/70 text-xs font-medium tracking-widest uppercase group-hover:text-white transition-colors">
                Apresentação da Fábrica
              </p>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-white/30 text-xs tracking-widest uppercase">Fabriko · Americana-SP</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SEJA PARCEIRO — FORM ════════════════════════════════ */}
      <section className="py-28 bg-[#1A1917]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="label-tag mb-5">
                <span className="text-[#E67A22]">Para lojistas</span>
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-white leading-tight mb-6"
              >
                Receba a apresentação Fabriko.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/40 text-base leading-relaxed mb-8">
                Cadastre-se e receba no seu e-mail a apresentação completa da Fabriko — linhas, acabamentos,
                prazos e condições para lojistas parceiros. Nosso time também entrará em contato pelo WhatsApp.
              </motion.p>
              <motion.div variants={stagger} className="space-y-4">
                {[
                  "Acesso à biblioteca Promob Fabriko",
                  "Condições exclusivas para lojistas",
                  "Suporte técnico permanente",
                  "Prazo de 20 dias úteis garantido",
                ].map((item) => (
                  <motion.div key={item} variants={fadeUp} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#E67A22] shrink-0" />
                    <p className="text-white/50 text-sm">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#FAFAF8] p-8 lg:p-10"
            >
              <SejaParceiroForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ NOSSA HISTÓRIA ══════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="label-tag mb-5">Nossa história</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] leading-tight mb-6"
            >
              Fundada em Americana-SP para ser a parceira ideal.
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4 text-[#6B6966] text-base leading-relaxed">
              <p>
                A Fabriko nasceu do desejo de se tornar a empresa mais confiável na fabricação e
                fornecimento de móveis planejados essenciais e de alta qualidade.
              </p>
              <p>
                Investimos em tecnologia de ponta, maquinários CNC de última geração e uma equipe
                altamente qualificada — mas nosso diferencial sempre esteve além da técnica.
              </p>
              <p>
                Está no respeito ao prazo, no cuidado com cada peça e na busca incansável por
                facilitar o dia a dia de quem trabalha com móveis planejados.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/quem-somos"
                className="inline-flex items-center gap-2 text-[#E67A22] text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all"
              >
                Nossa história completa <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { v: "MDF 15mm\ne 18mm", l: "3 espessuras de caixa e porta" },
              { v: "Borda PUR\n1mm", l: "Maior resistência e acabamento premium" },
              { v: "30 dias\ngrátis", l: "Trial do Promob Studio Fabriko" },
              { v: "20 dias\núteis", l: "Prazo padrão de produção" },
            ].map(({ v, l }) => (
              <div key={l} className="bg-[#FAFAF8] border border-[#E8E6E3] p-6">
                <p className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-black text-xl whitespace-pre-line mb-2">
                  {v}
                </p>
                <p className="text-[#1A1917]/40 text-xs leading-relaxed">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA FINAL ════════════════════════════════════════════ */}
      <section className="py-28 bg-[#1A1917]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
            className="border border-[#E67A22]/20 p-12 lg:p-16 relative overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-1/2 h-full opacity-5"
              style={{ background: "radial-gradient(ellipse at right, #E67A22, transparent 70%)" }}
            />
            <motion.p variants={fadeUp} className="label-tag mb-6">Para lojistas</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-6xl font-[family-name:var(--font-playfair)] font-black text-white leading-tight mb-6 max-w-2xl"
            >
              Pronto para ter a Fabriko como sua parceira?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-lg mb-10 max-w-xl">
              Acesse nossa biblioteca no Promob, projete com nossos acabamentos e envie para produção.
              Simples assim.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/seja-parceiro"
                className="group flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-8 py-4 tracking-widest uppercase transition-all"
              >
                Quero ser parceiro
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5519996252987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-white/20 hover:border-white/50 text-white/60 hover:text-white text-xs font-medium px-8 py-4 tracking-widest uppercase transition-all"
              >
                WhatsApp (19) 99625-2987
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ VIDEO MODAL ══════════════════════════════════════════ */}
      {videoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:p-12"
          onClick={() => setVideoOpen(false)}
        >
          <button
            onClick={() => setVideoOpen(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/video-apresentacao.mp4"
              className="w-full h-full"
              controls
              autoPlay
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
