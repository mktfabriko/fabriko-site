"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Truck,
  ShieldCheck,
  Star,
  ChevronRight,
  Package,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-[#1B1A18] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #E67A22 0, #E67A22 1px, transparent 0, transparent 50%)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1A18] via-[#1B1A18]/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-block bg-[#E67A22]/15 text-[#E67A22] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6"
            >
              Indústria de Móveis — Direto da Fábrica
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white leading-none uppercase mb-6"
            >
              Móveis de{" "}
              <span className="text-[#E67A22]">qualidade</span>{" "}
              para o seu negócio
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Linha completa de móveis fabricados com excelência e entregues com prazo.
              Condições exclusivas para lojistas, distribuidores e arquitetos.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/seja-parceiro"
                className="group flex items-center gap-2 bg-[#E67A22] hover:bg-[#c9601a] text-white font-bold px-7 py-4 rounded-sm uppercase tracking-wider text-sm transition-all"
              >
                Seja Parceiro
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/catalogo"
                className="flex items-center gap-2 border border-white/20 hover:border-white/60 text-white font-semibold px-7 py-4 rounded-sm uppercase tracking-wider text-sm transition-all"
              >
                Ver Catálogo
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-6">
              {[
                "Entrega para todo o Brasil",
                "Garantia de fábrica",
                "Condições exclusivas p/ lojistas",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#E67A22]" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats block */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { icon: Factory, value: "10+", label: "Anos de mercado" },
              { icon: Package, value: "200+", label: "SKUs no catálogo" },
              { icon: Users, value: "500+", label: "Lojistas parceiros" },
              { icon: Truck, value: "48h", label: "Prazo de despacho" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/[0.08] transition-colors"
              >
                <Icon className="h-7 w-7 text-[#E67A22] mb-3" />
                <p className="text-3xl font-[family-name:var(--font-barlow)] font-extrabold text-white mb-1">
                  {value}
                </p>
                <p className="text-white/40 text-sm">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-widest">Rolar</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* POR QUE FABRIKO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest text-[#E67A22]"
            >
              Por que Fabriko
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mt-3"
            >
              Fábrica que vira parceiro
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#6b6b6b] text-lg mt-4 max-w-2xl mx-auto"
            >
              Não somos apenas fornecedores. Somos a fábrica que faz seu estoque girar, seu cliente voltar
              e seu caixa crescer.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Factory,
                title: "Direto da Fábrica",
                desc: "Sem intermediários. Você compra diretamente da produção, com preço de indústria e margem real para revender.",
              },
              {
                icon: ShieldCheck,
                title: "Qualidade Garantida",
                desc: "Matéria-prima selecionada, controle de qualidade rigoroso em cada peça antes de sair da fábrica.",
              },
              {
                icon: Truck,
                title: "Prazo e Pontualidade",
                desc: "Entregamos no prazo combinado. Frota própria e parcerias logísticas para cobrir todo o Brasil.",
              },
              {
                icon: TrendingUp,
                title: "Alta Rotatividade",
                desc: "Portfólio pensado para girar. Modelos com design atual, preço competitivo e boa aceitação de mercado.",
              },
              {
                icon: Award,
                title: "Exclusividade Territorial",
                desc: "Oferecemos exclusividade de território para parceiros estratégicos. Seu concorrente não precisa ter o que você tem.",
              },
              {
                icon: Star,
                title: "Suporte Comercial",
                desc: "Time dedicado para ajudar na exposição, precificação e estratégia de venda no seu ponto de venda.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group p-7 rounded-lg border border-[#e5e5e5] hover:border-[#E67A22]/30 hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-sm bg-[#E67A22]/10 flex items-center justify-center mb-5 group-hover:bg-[#E67A22]/20 transition-colors">
                  <Icon className="h-6 w-6 text-[#E67A22]" />
                </div>
                <h3 className="font-[family-name:var(--font-barlow)] font-bold text-xl text-[#1B1A18] uppercase mb-2">
                  {title}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LINHAS DE PRODUTO */}
      <section className="py-24 bg-[#f7f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4"
          >
            <div>
              <motion.span
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-widest text-[#E67A22]"
              >
                Portfólio
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mt-2"
              >
                Nossas Linhas
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/linhas"
                className="inline-flex items-center gap-2 text-[#E67A22] font-semibold text-sm hover:gap-3 transition-all"
              >
                Ver todas as linhas <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { name: "Linha Clássica", desc: "Estética atemporal, madeiras nobres e acabamento refinado para o cliente exigente.", color: "#8B6914" },
              { name: "Linha Contemporânea", desc: "Design atual, linhas retas e combinação de materiais modernos. Alta demanda.", color: "#2563EB" },
              { name: "Linha Industrial", desc: "Metal, madeira rústica e visual urbano. Tendência forte nos projetos atuais.", color: "#4B5563" },
              { name: "Linha Essencial", desc: "Preço acessível sem abrir mão da qualidade. Perfeito para volume e giro rápido.", color: "#16A34A" },
              { name: "Sob Medida", desc: "Produção personalizada para projetos especiais. Dimensões, cores e acabamentos sob encomenda.", color: "#E67A22" },
              { name: "Linha Kids", desc: "Móveis seguros, coloridos e funcionais para o mercado infantil em crescimento.", color: "#DB2777" },
            ].map(({ name, desc, color }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="group bg-white rounded-lg overflow-hidden border border-[#e5e5e5] hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className="h-44 flex items-end p-6"
                  style={{
                    background: `linear-gradient(135deg, ${color}15, ${color}30)`,
                    borderBottom: `3px solid ${color}`,
                  }}
                >
                  <div
                    className="h-12 w-12 rounded-sm flex items-center justify-center text-white font-[family-name:var(--font-barlow)] font-extrabold text-xl"
                    style={{ backgroundColor: color }}
                  >
                    {name.split(" ")[1]?.charAt(0) || name.charAt(0)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-barlow)] font-bold text-lg text-[#1B1A18] uppercase mb-2">
                    {name}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">{desc}</p>
                  <Link
                    href="/linhas"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E67A22] hover:gap-2 transition-all"
                  >
                    Ver linha <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 bg-[#1B1A18]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest text-[#E67A22]"
            >
              Depoimentos
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase mt-3"
            >
              Quem é parceiro, recomenda
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                quote: "Trabalhamos com várias fábricas ao longo dos anos. A Fabriko é a única que entrega no prazo E com qualidade consistente.",
                name: "Ricardo M.",
                role: "Loja de Móveis — São Paulo, SP",
              },
              {
                quote: "O suporte comercial deles é diferente. Me ajudaram a montar a exposição e em 3 meses dobrei as vendas nessa linha.",
                name: "Fernanda C.",
                role: "Móveis & Design — Belo Horizonte, MG",
              },
              {
                quote: "Preço de fábrica com atendimento de empresa grande. Margem boa, produto bonito e cliente satisfeito. O que mais preciso?",
                name: "Paulo S.",
                role: "Distribuidor — Curitiba, PR",
              },
            ].map(({ quote, name, role }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-lg p-7 hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#E67A22] fill-[#E67A22]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{quote}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest text-[#E67A22]"
            >
              Processo
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mt-3"
            >
              Como se tornar parceiro
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { step: "01", title: "Cadastro", desc: "Preencha o formulário de parceiro com os dados da sua empresa." },
              { step: "02", title: "Análise", desc: "Nossa equipe comercial analisa e entra em contato em até 24h." },
              { step: "03", title: "Condições", desc: "Apresentamos tabela exclusiva, prazo e condições de pagamento." },
              { step: "04", title: "Primeiro Pedido", desc: "Realize seu primeiro pedido e comece a vender com margem real." },
            ].map(({ step, title, desc }) => (
              <motion.div key={step} variants={fadeUp} className="text-center">
                <div className="mx-auto mb-5 h-16 w-16 rounded-full border-2 border-[#E67A22] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-barlow)] font-extrabold text-2xl text-[#E67A22]">
                    {step}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-barlow)] font-bold text-lg text-[#1B1A18] uppercase mb-2">
                  {title}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-[#E67A22]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-6xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-tight mb-6"
            >
              Pronto para aumentar suas vendas?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
            >
              Torne-se um revendedor Fabriko e tenha acesso a condições exclusivas, prazo diferenciado e suporte comercial completo.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/seja-parceiro"
                className="bg-white text-[#E67A22] hover:bg-white/90 font-bold px-8 py-4 rounded-sm uppercase tracking-wider text-sm transition-colors"
              >
                Quero ser parceiro
              </Link>
              <Link
                href="/contato"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-sm uppercase tracking-wider text-sm transition-colors"
              >
                Fale conosco
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
