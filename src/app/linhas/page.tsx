"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const LINHAS = [
  {
    name: "Linha Clássica",
    slug: "classica",
    color: "#8B6914",
    tag: "Atemporal",
    desc: "Móveis com estética refinada, madeiras nobres e acabamento premium. Para o cliente que valoriza tradição e elegância.",
    produtos: ["Sofás de alto padrão", "Estantes em madeira maciça", "Mesas de jantar clássicas", "Dormitórios completos", "Roupeiros com detalhes em entalhes"],
  },
  {
    name: "Linha Contemporânea",
    slug: "contemporanea",
    color: "#2563EB",
    tag: "Alta demanda",
    desc: "Design atual, linhas retas e combinação inteligente de materiais. O campeão de vendas do nosso portfólio.",
    produtos: ["Sofás retráteis e reclinável", "Estantes modulares", "Mesas com vidro e metal", "Racks para TV modernos", "Home office completo"],
  },
  {
    name: "Linha Industrial",
    slug: "industrial",
    color: "#4B5563",
    tag: "Tendência",
    desc: "Metal, madeira rústica e visual urbano. Altamente requisitado para projetos de decoração contemporânea.",
    produtos: ["Mesas com pés de ferro", "Estantes abertas industriais", "Cadeiras metálicas", "Armários com acabamento rústico", "Bancadas de trabalho"],
  },
  {
    name: "Linha Essencial",
    slug: "essencial",
    color: "#16A34A",
    tag: "Volume",
    desc: "O melhor custo-benefício do mercado. Qualidade Fabriko com preço acessível para quem precisa de giro.",
    produtos: ["Sofás de 2 e 3 lugares", "Estantes multiuso", "Mesas e cadeiras de jantar", "Guarda-roupas funcionais", "Cômodas e criados-mudos"],
  },
  {
    name: "Sob Medida",
    slug: "sob-medida",
    color: "#E67A22",
    tag: "Exclusivo",
    desc: "Produção 100% personalizada. Dimensões, materiais, cores e acabamentos definidos pelo cliente para projetos especiais.",
    produtos: ["Projetos para construtoras", "Móveis para hotéis e pousadas", "Ambientes corporativos", "Residências de alto padrão", "Consulte nossa equipe"],
  },
  {
    name: "Linha Kids",
    slug: "kids",
    color: "#DB2777",
    tag: "Crescimento",
    desc: "Móveis seguros, coloridos e funcionais para o quarto infantil. Mercado em expansão com alta margem.",
    produtos: ["Camas com grades de segurança", "Mini-sofás", "Mesas e cadeiras infantis", "Roupeiros temáticos", "Kits dormitório completo"],
  },
];

export default function Linhas() {
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
              Portfólio completo
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-none mt-3"
            >
              Nossas<br />
              <span className="text-[#E67A22]">Linhas</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Linhas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {LINHAS.map(({ name, color, tag, desc, produtos }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-lg border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-all"
            >
              <div
                className="h-2"
                style={{ backgroundColor: color }}
              />
              <div className="p-7 grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="font-[family-name:var(--font-barlow)] font-extrabold text-2xl text-[#1B1A18] uppercase">
                      {name}
                    </h2>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide text-white"
                      style={{ backgroundColor: color }}
                    >
                      {tag}
                    </span>
                  </div>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed mb-5">{desc}</p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:gap-2 transition-all"
                    style={{ color }}
                  >
                    Ver produtos no catálogo <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b] mb-3">Produtos</p>
                  <ul className="space-y-1.5">
                    {produtos.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-[#6b6b6b]">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f7f6f4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mb-4"
            >
              Interessado em alguma linha?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6b6b6b] mb-6">
              Baixe o catálogo completo ou entre em contato com nossa equipe comercial.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/catalogo"
                className="bg-[#E67A22] text-white font-bold px-7 py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-[#c9601a] transition-colors"
              >
                Ver Catálogo
              </Link>
              <Link
                href="/seja-parceiro"
                className="border-2 border-[#1B1A18] text-[#1B1A18] font-bold px-7 py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-[#1B1A18] hover:text-white transition-colors"
              >
                Seja Parceiro
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
