"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Check, Phone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const PROCEDIMENTOS = [
  {
    num: "01",
    titulo: "Solicitar Acesso ao Promob",
    desc: "Portal de autorização, ativação da licença e 30 dias de trial gratuito da biblioteca exclusiva Fabriko. O acesso é liberado após cadastro como lojista parceiro.",
    detalhes: [
      "Acesse o portal Promob e solicite a biblioteca Fabriko",
      "Ative sua licença com os dados do cadastro",
      "30 dias de uso gratuito para testar todas as funcionalidades",
      "Após o trial, condições especiais para parceiros ativos",
    ],
  },
  {
    num: "02",
    titulo: "Envio de Pedido",
    desc: "Formato do arquivo, estrutura de envio por e-mail e nomenclatura de ambientes. O nome de cada ambiente deve ter no máximo 20 caracteres.",
    detalhes: [
      "Salve o arquivo no formato Promob (.promob)",
      "Nomeie cada ambiente com até 20 caracteres",
      "Envie para pedido@fabriko.ind.br com dados do cliente",
      "Aguarde confirmação de recebimento e aprovação financeira",
      "Prazo de 20 dias úteis após liberação",
    ],
  },
  {
    num: "03",
    titulo: "Acabamentos Especiais",
    desc: "MDF com acabamentos fora do portfólio padrão exigem prazo estendido. Acrescente +5 dias úteis ao prazo padrão para acabamentos sob encomenda.",
    detalhes: [
      "Consulte a disponibilidade com seu consultor antes de projetar",
      "Prazo padrão de 20 dias + 5 dias para acabamentos especiais",
      "Não estão disponíveis na biblioteca Promob padrão",
      "Solicitar por e-mail com referência técnica do material",
    ],
  },
  {
    num: "04",
    titulo: "Produtos Especiais",
    desc: "Itens fora do padrão de produção (tampos, recortes especiais, formatos únicos) exigem pré-aprovação de engenharia. Envio em arquivo separado.",
    detalhes: [
      "Enviar especificações técnicas separadas do pedido padrão",
      "Aguardar análise e aprovação da engenharia Fabriko",
      "Prazo e preço comunicados após análise",
      "Necessário aprovação antes de confirmar ao cliente final",
    ],
  },
  {
    num: "05",
    titulo: "Painéis Personalizados",
    desc: "Painéis e prateleiras com formas personalizadas e canaleta para LED. Disponíveis em 15mm, 18mm, 30mm e 36mm com especificações técnicas.",
    detalhes: [
      "Especifique forma, espessura e acabamento",
      "Disponível com canaleta para LED em qualquer espessura",
      "Editável diretamente no Promob Fabriko",
      "Consulte gabaritos técnicos no material de suporte",
    ],
  },
  {
    num: "06",
    titulo: "Suporte Técnico",
    desc: "Canais distintos para erro de fábrica e erro de projeto. Prazo de resolução de 5 dias para erros de fábrica e até 15 dias para análises complexas.",
    detalhes: [
      "Erro de fábrica: assistencia@fabriko.ind.br — prazo 5 dias úteis",
      "Dúvidas de projeto: suporte via WhatsApp com consultor",
      "Fotos e número do pedido obrigatórios no acionamento",
      "Análises complexas: até 15 dias após recebimento",
    ],
  },
  {
    num: "07",
    titulo: "Condições Financeiras",
    desc: "PIX, cartão de crédito e parcelamento via Santander Financeira e PagSeguro. Facilidades para o lojista viabilizar a venda ao cliente final.",
    detalhes: [
      "PIX com desconto especial para pedidos acima do mínimo",
      "Cartão via maquininha PagBank",
      "Parcelamento via Santander Financeira para o cliente final",
      "Consulte tabela de condições com seu consultor",
    ],
  },
  {
    num: "08",
    titulo: "Armazenamento",
    desc: "15 dias gratuitos de armazenagem após produção. Após esse prazo, taxa de 1% ao mês sobre o valor do pedido.",
    detalhes: [
      "15 dias corridos gratuitos contados da data de expedição",
      "Taxa de 1% ao mês sobre valor total a partir do 16º dia",
      "Notificação enviada antes do vencimento do prazo gratuito",
      "Retirada deve ser agendada com antecedência",
    ],
  },
  {
    num: "09",
    titulo: "Canais de Contato",
    desc: "Canais dedicados por departamento para agilidade no atendimento. Cada demanda tem o canal certo.",
    detalhes: [
      "Pedidos: pedido@fabriko.ind.br",
      "Assistência técnica: assistencia@fabriko.ind.br",
      "Consultor Fernando: fernando@fabriko.ind.br",
      "WhatsApp: (19) 9.9759-2974",
    ],
  },
];

function ProcedimentoCard({ item }: { item: typeof PROCEDIMENTOS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="border border-[#E8E6E3] bg-white hover:border-[#E67A22]/30 transition-colors"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-6 text-left"
      >
        <span className="text-[#E67A22]/30 font-[family-name:var(--font-playfair)] font-black text-3xl leading-none shrink-0 w-10">
          {item.num}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#1A1917] font-semibold text-sm">{item.titulo}</h3>
          <p className="text-[#6B6966] text-xs mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#1A1917]/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#F0EEE8] pt-4">
              <ul className="space-y-2.5">
                {item.detalhes.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[#6B6966] text-xs leading-relaxed">
                    <Check className="h-3.5 w-3.5 text-[#E67A22] shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Promob() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-36 pb-24 overflow-hidden border-b-4 border-[#E67A22]">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5"
          style={{ background: "radial-gradient(ellipse at right top, #E67A22 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Projete com Fabriko</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-oswald)] font-bold text-white leading-[0.92] mb-6 uppercase tracking-tight"
            >
              Promob<br />
              <span className="text-[#E67A22]">Fabriko</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-2xl">
              A biblioteca exclusiva Fabriko no Promob Studio. Do acesso ao envio do pedido — com suporte técnico dedicado em cada etapa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Suporte Técnico */}
      <section className="py-24 bg-white border-b border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Suporte exclusivo</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] max-w-2xl mb-12">
              Seu projeto tem suporte técnico dedicado.
            </motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-px bg-[#E8E6E3]">
              {[
                { t: "Dúvidas de Projeto", d: "Suporte via WhatsApp com consultor técnico para esclarecer qualquer dúvida no Promob Fabriko.", icon: "💬" },
                { t: "Implementação", d: "Apoio na configuração da biblioteca, instalação do Promob e primeiros pedidos do lojista parceiro.", icon: "⚙️" },
                { t: "Correções e Ajustes", d: "Erros de produção resolvidos em até 5 dias úteis. Análises complexas em até 15 dias.", icon: "🔧" },
              ].map(({ t, d, icon }) => (
                <motion.div key={t} variants={fadeUp} className="bg-white p-8 hover:bg-[#FAFAF8] transition-colors">
                  <p className="text-2xl mb-4">{icon}</p>
                  <h3 className="text-[#1A1917] font-semibold text-sm mb-3">{t}</h3>
                  <p className="text-[#6B6966] text-xs leading-relaxed">{d}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Procedimentos */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-14"
          >
            <motion.p variants={fadeUp} className="label-tag mb-4">Procedimentos</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] max-w-xl">
              9 procedimentos essenciais para parceiros Fabriko.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-3"
          >
            {PROCEDIMENTOS.map((item) => (
              <ProcedimentoCard key={item.num} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20 bg-[#FAFAF8] border-t border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-10"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <Phone className="h-4 w-4 text-[#E67A22]" />
              <p className="label-tag">Canais de Atendimento</p>
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
              Cada demanda tem o canal certo.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E6E3]"
          >
            {[
              { label: "Pedidos", valor: "pedido@fabriko.ind.br", tipo: "E-mail" },
              { label: "Assistência Técnica", valor: "assistencia@fabriko.ind.br", tipo: "E-mail" },
              { label: "Consultor Fernando", valor: "fernando@fabriko.ind.br", tipo: "E-mail" },
              { label: "WhatsApp", valor: "(19) 9.9759-2974", tipo: "Mensagem" },
            ].map(({ label, valor, tipo }) => (
              <motion.div key={label} variants={fadeUp}
                className="bg-white p-6 hover:bg-[#FAFAF8] transition-colors">
                <p className="text-[#E67A22] text-[10px] font-bold uppercase tracking-widest mb-2">{tipo}</p>
                <h3 className="text-[#1A1917] font-semibold text-sm mb-2">{label}</h3>
                <p className="text-[#6B6966] text-xs break-all">{valor}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1917]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-playfair)] font-black text-white mb-4">
              Pronto para projetar com Fabriko?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-8">
              Torne-se parceiro e acesse a biblioteca Promob com 30 dias gratuitos.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/seja-parceiro"
                className="group flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-7 py-4 tracking-widest uppercase transition-all">
                Quero ser parceiro
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
