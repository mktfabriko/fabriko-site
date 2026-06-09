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
  { cat: "Unicolor", img: "/items/22.webp", itens: "Branco Diamante, Beton, Cinza Sagrado, Grafito, Azul Sereno..." },
  { cat: "Conceito", img: "/items/11.webp", itens: "Atenna, Bronze, Cosmos, Lino Chess, Lana..." },
  { cat: "Blend", img: "/items/38.webp", itens: "Off White Suave, Gianduia, Ébano Chess, Lenho, Granile..." },
];

const DIFERENCIAIS = [
  { n: "01", titulo: "100% MDF", desc: "Toda a produção em MDF de alta qualidade, com bordas de 1mm e colagem PUR para máxima resistência e acabamento premium." },
  { n: "02", titulo: "Via Promob", desc: "Biblioteca exclusiva no Promob Studio. Projete milímetro a milímetro com todos nossos acabamentos, puxadores e especificações." },
  { n: "03", titulo: "Prazo de 20 dias", desc: "20 dias úteis após liberação financeira. Processos padronizados e maquinário CNC garantem consistência e pontualidade." },
  { n: "04", titulo: "Consultoria ativa", desc: "Suporte técnico online permanente. Seu consultor Fabriko acompanha cada pedido do início ao fim." },
  { n: "05", titulo: "Capacidade escalável", desc: "Estrutura industrial preparada para crescer junto com o volume de pedidos, sem comprometer prazos nem qualidade." },
  { n: "06", titulo: "Soluções Financeiras", desc: "Convênio com Santander Financeira e maquininha PagBank para facilitar as vendas do lojista ao cliente final." },
];

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#1A1917]"
        style={{ backgroundImage: "url('/fotos/hero.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E67A22]/8 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-[#0D0D0B]/40 to-[#0D0D0B]/10" />

        <div className="relative max-w-7xl mx-auto w-full px-6 pt-32 md:pt-40 pb-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-lg">
            <motion.p
              variants={fadeUp}
              className="text-[#E67A22] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5"
            >
              Indústria de Móveis Planejados · Americana-SP
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.6rem,5.5vw,5.5rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.95] mb-6 uppercase tracking-tight"
            >
              Sua fábrica de{" "}
              <span className="text-[#E67A22]">móveis planejados.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/50 text-sm leading-relaxed max-w-sm">
              Mais do que produção — somos o ponto de apoio para lojistas que querem crescer com
              organização, agilidade e segurança.
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
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-y-4 divide-x divide-white/10">
            {[
              { v: "Mais margem", l: "Preço de fábrica direto" },
              { v: "Mais agilidade", l: "Prazo garantido: 20 dias úteis" },
              { v: "Mais segurança", l: "Processo 100% documentado" },
              { v: "Mais projetos", l: "Suporte Promob exclusivo" },
            ].map(({ v, l }) => (
              <div key={v} className="px-4 sm:px-6 first:pl-0 py-1">
                <p className="text-white font-[family-name:var(--font-playfair)] font-bold text-base sm:text-xl">{v}</p>
                <p className="text-white/35 text-[10px] sm:text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ LINHAS ══════════════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-10 md:mb-16"
          >
            <motion.p variants={fadeUp} className="label-tag mb-4">Portfólio</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]"
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
                <div className="h-48 md:h-52 overflow-hidden bg-[#F5F3F0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Linha ${nome}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 md:p-8">
                  <h3 className="font-[family-name:var(--font-playfair)] font-black text-2xl text-[#1A1917] mb-1">
                    Linha {nome}
                  </h3>
                  <div className="flex gap-3 mb-4 mt-3">
                    <div className={`px-3 py-1.5 border ${caixas === "18mm" ? "bg-[#FFF3E8] border-[#E67A22]/40" : "border-[#E8E6E3]"}`}>
                      <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${caixas === "18mm" ? "text-[#E67A22]/70" : "text-[#1A1917]/40"}`}>Caixas</p>
                      <p className={`text-sm font-bold ${caixas === "18mm" ? "text-[#E67A22]" : "text-[#1A1917]"}`}>{caixas}</p>
                    </div>
                    <div className={`px-3 py-1.5 border ${portas === "18mm" ? "bg-[#FFF3E8] border-[#E67A22]/40" : "border-[#E8E6E3]"}`}>
                      <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${portas === "18mm" ? "text-[#E67A22]/70" : "text-[#1A1917]/40"}`}>Portas</p>
                      <p className={`text-sm font-bold ${portas === "18mm" ? "text-[#E67A22]" : "text-[#1A1917]"}`}>{portas}</p>
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
      <section className="py-14 md:py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-14 gap-4"
          >
            <div>
              <motion.p variants={fadeUp} className="label-tag mb-4">Acabamentos</motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]"
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
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {ACABAMENTOS_PREVIEW.map(({ cat, img, itens }) => (
              <motion.div key={cat} variants={fadeUp} className="group cursor-pointer">
                <Link href="/acabamentos">
                  <div className="h-40 sm:h-52 mb-3 md:mb-4 relative overflow-hidden bg-[#1A1917]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Acabamento ${cat}`}
                      className="w-full h-[115%] object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                      <p className="text-white font-[family-name:var(--font-playfair)] font-bold text-lg md:text-xl drop-shadow">
                        {cat}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#6B6966] text-xs leading-relaxed group-hover:text-[#1A1917] transition-colors hidden sm:block">
                    {itens}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ DIFERENCIAIS ════════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-10 md:mb-16"
          >
            <motion.p variants={fadeUp} className="label-tag mb-4">Por que Fabriko</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] max-w-xl"
            >
              Mais do que produção.<br />
              <span className="text-[#1A1917]/30 font-normal">Compromisso com o seu negócio.</span>
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
                className="bg-white p-6 md:p-8 hover:bg-[#FAFAF8] transition-colors group"
              >
                <p className="text-[#E67A22]/20 font-[family-name:var(--font-playfair)] font-black text-4xl mb-4 md:mb-5 group-hover:text-[#E67A22]/40 transition-colors">
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
      <section className="py-14 md:py-28 bg-[#FAFAF8] border-y border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="label-tag mb-5">A fábrica por trás do seu negócio</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] leading-tight mb-7"
            >
              Somos a fábrica que o lojista sempre quis.
            </motion.h2>
            <motion.ul variants={stagger} className="space-y-3 md:space-y-4">
              {[
                "Prazo de 20 dias úteis — documentado e cumprido em cada pedido",
                "Setor de suporte técnico Promob 100% dedicado ao lojista parceiro",
                "Produção em MDF com borda PUR 1mm — acabamento premium.",
                "Equipe que conhece o seu negócio e está sempre disponível",
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
            <img
              src="https://img.youtube.com/vi/p1NaTAbQBNw/maxresdefault.jpg"
              alt="Apresentação Fabriko"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-[#1A1917]/40 group-hover:bg-[#1A1917]/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#E67A22] group-hover:bg-[#E67A22]/20 transition-all duration-300 mb-3 md:mb-4">
                <Play className="h-5 w-5 md:h-6 md:w-6 text-white ml-1" />
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
      <section className="py-14 md:py-28 bg-[#1A1917]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="label-tag mb-5">
                <span className="text-[#E67A22]">Material gratuito</span>
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-black text-white leading-tight mb-6"
              >
                Baixe o catálogo e<br />comece a vender hoje.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/40 text-base leading-relaxed mb-7">
                Preencha o formulário e receba no seu e-mail o catálogo completo + apresentação da Fabriko com linhas,
                acabamentos, prazos e condições exclusivas. Nosso consultor também entrará em contato pelo WhatsApp.
              </motion.p>
              <motion.div variants={stagger} className="space-y-3 md:space-y-4">
                {[
                  "Catálogo completo com todos os acabamentos",
                  "Apresentação com condições para lojistas parceiros",
                  "Acesso à biblioteca Promob Fabriko (30 dias grátis)",
                  "Contato direto com um consultor Fabriko",
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
              className="bg-[#FAFAF8] p-6 md:p-8 lg:p-10"
            >
              <SejaParceiroForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ════════════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#F4F2EF]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
            className="border border-[#E67A22]/25 p-6 sm:p-10 lg:p-16 relative overflow-hidden bg-white"
          >
            <div
              className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]"
              style={{ background: "radial-gradient(ellipse at right, #E67A22, transparent 70%)" }}
            />
            <motion.p variants={fadeUp} className="label-tag mb-5 md:mb-6">Para lojistas</motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] leading-tight mb-5 md:mb-6 max-w-2xl"
            >
              Cansado de fábrica que atrasa, não atende e ainda culpa o projeto?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#1A1917]/50 text-sm md:text-base mb-5 md:mb-6 max-w-xl">
              Fábricas que entregam com atraso, não têm suporte técnico e deixam o lojista sozinho na hora do problema.
              Na Fabriko é diferente: prazo garantido, processo transparente e um setor de suporte Promob exclusivo — dedicado ao seu sucesso.
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 md:mb-10">
              {[
                { v: "Prazo cumprido", d: "20 dias úteis, sempre" },
                { v: "Suporte Promob", d: "Time técnico exclusivo" },
                { v: "Zero surpresas", d: "Processo 100% documentado" },
              ].map(({ v, d }) => (
                <motion.div key={v} variants={fadeUp} className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-[#E67A22]/15 border border-[#E67A22]/30 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-[#E67A22]" />
                  </div>
                  <div>
                    <p className="text-[#1A1917] text-sm font-semibold">{v}</p>
                    <p className="text-[#1A1917]/40 text-xs">{d}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="/seja-parceiro"
                className="group flex items-center justify-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-8 py-4 tracking-widest uppercase transition-all"
              >
                Quero ser parceiro
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5519996252987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-[#1A1917]/20 hover:border-[#1A1917]/50 text-[#1A1917]/50 hover:text-[#1A1917] text-xs font-medium px-8 py-4 tracking-widest uppercase transition-all"
              >
                WhatsApp (19) 99625-2987
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHATSAPP FLUTUANTE ══════════════════════════════════ */}
      <a
        href="https://wa.me/5519996252987?text=Ol%C3%A1%2C%20visitei%20o%20site%20da%20Fabriko%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="WhatsApp Fabriko"
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

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
            <iframe
              src="https://www.youtube.com/embed/p1NaTAbQBNw?autoplay=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
