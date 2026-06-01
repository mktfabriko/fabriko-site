"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Target, Eye, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function QuemSomos() {
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
              Nossa história
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-none mt-3"
            >
              Quem é a<br />
              <span className="text-[#E67A22]">Fabriko</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* História */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-[#E67A22]">
              A empresa
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-4xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mt-3 mb-6"
            >
              Mais de uma década transformando madeira em negócio
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4 text-[#6b6b6b] leading-relaxed">
              <p>
                A Fabriko nasceu da visão de criar uma indústria moveleira que colocasse o lojista no centro.
                Desde o início, entendemos que nosso sucesso depende diretamente do sucesso dos nossos parceiros
                de revenda.
              </p>
              <p>
                Ao longo dos anos, investimos em tecnologia de produção, controle de qualidade e logística para
                entregar um produto que vende e uma experiência que fideliza.
              </p>
              <p>
                Hoje, somos referência no setor moveleiro com distribuição para todo o Brasil, um portfólio
                diversificado e uma equipe comprometida com resultados reais para os nossos parceiros.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "10+", label: "Anos de experiência" },
              { value: "200+", label: "Produtos no catálogo" },
              { value: "500+", label: "Parceiros ativos" },
              { value: "5.000+", label: "Peças produzidas/mês" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-[#f7f6f4] rounded-lg p-6 border border-[#e5e5e5]">
                <p className="text-4xl font-[family-name:var(--font-barlow)] font-extrabold text-[#E67A22] mb-2">
                  {value}
                </p>
                <p className="text-[#6b6b6b] text-sm">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-24 bg-[#f7f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-[#E67A22]">
              Propósito
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mt-3"
            >
              Missão, Visão e Valores
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Target,
                title: "Missão",
                text: "Fabricar móveis de alta qualidade que impulsionem o crescimento dos nossos parceiros, entregando produto, prazo e rentabilidade.",
              },
              {
                icon: Eye,
                title: "Visão",
                text: "Ser reconhecida como a indústria moveleira mais confiável do Brasil pelos seus lojistas parceiros.",
              },
              {
                icon: Heart,
                title: "Valores",
                text: "Qualidade sem negociação. Parceria de verdade. Transparência no negócio. Inovação constante. Compromisso com prazo.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white rounded-lg p-7 border border-[#e5e5e5] hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-sm bg-[#E67A22]/10 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-[#E67A22]" />
                </div>
                <h3 className="font-[family-name:var(--font-barlow)] font-bold text-xl text-[#1B1A18] uppercase mb-3">
                  {title}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 bg-[#1B1A18]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-[#E67A22]">
              Diferenciais
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase mt-3 mb-8"
            >
              O que nos faz diferentes
            </motion.h2>
            <motion.ul variants={stagger} className="space-y-4">
              {[
                "Produção própria — total controle de qualidade",
                "Logística estruturada para todo o Brasil",
                "Portfólio atualizado com as tendências do mercado",
                "Atendimento comercial especializado por região",
                "Possibilidade de personalização e sob medida",
                "Transparência total em preços e condições",
              ].map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-[#E67A22] shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="bg-[#E67A22] rounded-lg p-10"
          >
            <h3 className="font-[family-name:var(--font-barlow)] font-extrabold text-3xl text-white uppercase mb-4">
              Pronto para fazer parte?
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Junte-se a centenas de lojistas que já escolheram a Fabriko como parceira de crescimento.
            </p>
            <Link
              href="/seja-parceiro"
              className="inline-block bg-white text-[#E67A22] font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
            >
              Seja parceiro
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
