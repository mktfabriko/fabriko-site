"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const FOTOS_FABRICA = [
  { src: "/fotos/2.webp", legenda: "Parque fabril — Americana-SP" },
  { src: "/fotos/4.webp", legenda: "Maquinário CNC de última geração" },
  { src: "/fotos/6.webp", legenda: "Equipe de produção" },
  { src: "/fotos/14.webp", legenda: "Processo de acabamento PUR" },
];

export default function QuemSomos() {
  const [slideIndex, setSlideIndex] = useState(0);

  function prevSlide() {
    setSlideIndex((i) => (i - 1 + FOTOS_FABRICA.length) % FOTOS_FABRICA.length);
  }
  function nextSlide() {
    setSlideIndex((i) => (i + 1) % FOTOS_FABRICA.length);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-36 pb-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5"
          style={{ background: "radial-gradient(ellipse at right top, #E67A22 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Nossa história</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.92] mb-6 uppercase tracking-tight"
            >
              Fundada para ser<br />
              <span className="text-[#E67A22]">a mais confiável.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-2xl">
              Em Americana-SP, em meio a um polo industrial em constante crescimento,
              nasceu o desejo de se tornar a empresa mais confiável na fabricação e
              fornecimento de móveis planejados essenciais e de alta qualidade.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Fotos da fábrica — carrossel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {FOTOS_FABRICA.map(({ src, legenda }, i) => (
                  <div
                    key={src}
                    className="min-w-full px-0 group"
                    style={{ flex: "0 0 100%" }}
                  >
                    <div className="aspect-[16/7] overflow-hidden bg-[#F0EEE8] mb-3 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={legenda}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 flex items-end p-6 pointer-events-none bg-gradient-to-t from-black/30 to-transparent">
                        <span className="text-white/30 font-[family-name:var(--font-playfair)] font-black text-6xl leading-none select-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <p className="text-[#1A1917]/50 text-xs font-medium">{legenda}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões prev/next */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-6 h-10 w-10 bg-white/90 border border-[#E8E6E3] hover:border-[#E67A22]/40 flex items-center justify-center shadow-sm transition-colors z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5 text-[#1A1917]/50" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-6 h-10 w-10 bg-white/90 border border-[#E8E6E3] hover:border-[#E67A22]/40 flex items-center justify-center shadow-sm transition-colors z-10"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5 text-[#1A1917]/50" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {FOTOS_FABRICA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`h-1.5 transition-all ${i === slideIndex ? "w-6 bg-[#E67A22]" : "w-1.5 bg-[#1A1917]/20 hover:bg-[#1A1917]/40"}`}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-24 bg-[#FAFAF8] border-y border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="label-tag mb-5">A empresa</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] leading-tight mb-7">
              Mais do que uma fábrica.<br />
              Um ponto de apoio.
            </motion.h2>
            <motion.div variants={stagger} className="space-y-5 text-[#6B6966] text-base leading-relaxed">
              <motion.p variants={fadeUp}>
                A Fabriko investiu desde o início em tecnologia de ponta, maquinários de última geração
                e uma equipe altamente qualificada para fabricar com excelência seus produtos.
              </motion.p>
              <motion.p variants={fadeUp}>
                Mas o diferencial sempre esteve além da técnica. Está no respeito ao prazo,
                no cuidado com cada peça e na busca incansável por facilitar o dia a dia de
                quem trabalha com móveis sob medida.
              </motion.p>
              <motion.p variants={fadeUp}>
                Hoje, a Fabriko é um ponto de apoio para lojistas que desejam crescer com
                organização, agilidade e segurança. É a escolha de quem entende que um bom
                projeto começa com uma parceria sólida.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-4"
          >
            {[
              { t: "Acabamentos premium", d: "Selecionados entre os principais fornecedores de matéria-prima. Alinhados com as tendências da decoração e design." },
              { t: "100% MDF", d: "Toda produção em MDF. Bordas com 1mm de espessura e colagem PUR — maior resistência e acabamento premium." },
              { t: "Totalmente editável", d: "Produto sob medida milímetro a milímetro. Projetado via Promob Studio com nossa biblioteca exclusiva." },
              { t: "Lado a lado com o lojista", d: "Consultoria permanente e suporte técnico online. Seu consultor Fabriko acompanha cada projeto." },
            ].map(({ t, d }, i) => (
              <motion.div key={t} variants={fadeUp}
                className="border border-[#E8E6E3] bg-white p-6 hover:border-[#E67A22]/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-[#E67A22]/40 font-[family-name:var(--font-playfair)] font-black text-2xl leading-none mt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-[#1A1917] font-semibold text-sm mb-2">{t}</h3>
                    <p className="text-[#6B6966] text-xs leading-relaxed">{d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="label-tag mb-4">Estrutura industrial</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] max-w-xl">
              Infraestrutura robusta e moderna.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E6E3]"
          >
            {[
              { t: "Parque Fabril Moderno", d: "Maquinário CNC e seccionadoras automatizadas para cortes precisos e consistentes." },
              { t: "Equipe Técnica", d: "Profissionais treinados e especializados em cada etapa da produção." },
              { t: "Processos Padronizados", d: "Fluxos documentados que garantem consistência e qualidade em cada peça." },
              { t: "Capacidade Escalável", d: "Estrutura preparada para absorver demandas crescentes sem comprometer prazos." },
            ].map(({ t, d }) => (
              <motion.div key={t} variants={fadeUp} className="bg-white p-8 hover:bg-[#FAFAF8] transition-colors">
                <h3 className="text-[#1A1917] font-semibold text-sm mb-3">{t}</h3>
                <p className="text-[#6B6966] text-xs leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Foto da equipe */}
      <section className="py-20 bg-[#FAFAF8] border-t border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-10"
          >
            <motion.p variants={fadeUp} className="label-tag mb-4">Nossa equipe</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
              As pessoas por trás de cada peça.
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="border border-[#E8E6E3]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/equipe2.png"
              alt="Equipe Fabriko"
              className="w-full object-contain bg-[#F0EEE8]"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1917]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-playfair)] font-black text-white mb-4">
              Fabriko — essencial para o seu negócio.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-8">
              Conheça nossas linhas ou inicie agora sua parceria.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/seja-parceiro"
                className="group flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-7 py-4 tracking-widest uppercase transition-all">
                Seja parceiro
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/linhas"
                className="border border-white/20 text-white/50 hover:text-white hover:border-white/40 text-xs font-medium px-7 py-4 tracking-widest uppercase transition-all">
                Ver linhas de produto
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
