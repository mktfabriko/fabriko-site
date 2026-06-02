"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const CONTATOS = [
  { label: "Projetos & Parcerias", val: "projetos@fabriko.ind.br", sub: "Dúvidas gerais e novas parcerias" },
  { label: "Pedidos", val: "pedido@fabriko.ind.br", sub: "Envio de projetos para produção" },
  { label: "Assistência Técnica", val: "assistencia@fabriko.ind.br", sub: "Solicitações pós-entrega" },
  { label: "Financeiro", val: "financeiro@fabriko.ind.br", sub: "Questões financeiras e fiscais" },
  { label: "WhatsApp", val: "(19) 99625-2987", sub: "Atendimento rápido" },
  { label: "Instagram", val: "@fabriko.ind", sub: "Acompanhe nosso portfólio" },
];

const INPUT_CLASS = "w-full border border-[#E8E6E3] focus:border-[#E67A22]/50 outline-none text-[#1A1917] text-sm px-3 py-3 transition-colors bg-white placeholder:text-[#1A1917]/30";

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1917] pt-36 pb-20">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Americana — SP</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-playfair)] font-black text-white leading-[0.92]"
            >
              <span className="text-[#E67A22]">Contato</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Canais + Form */}
      <section className="py-24 bg-[#FAFAF8] border-t border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Canais */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Canais de contato</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] mb-8">
              Use o canal certo para cada necessidade.
            </motion.h2>

            <motion.div variants={stagger} className="space-y-3">
              {CONTATOS.map(({ label, val, sub }) => (
                <motion.div key={label} variants={fadeUp}
                  className="border border-[#E8E6E3] bg-white p-5 hover:border-[#E67A22]/30 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[#1A1917]/35 text-[10px] uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-[#1A1917] font-medium text-sm">{val}</p>
                      <p className="text-[#6B6966] text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <a href="https://wa.me/5519996252987" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold uppercase tracking-widest px-6 py-4 transition-all">
                Chamar no WhatsApp
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 border border-[#E8E6E3] bg-white">
                <CheckCircle2 className="h-12 w-12 text-[#E67A22] mb-4" />
                <h3 className="font-[family-name:var(--font-playfair)] font-black text-2xl text-[#1A1917] mb-2">
                  Mensagem recebida.
                </h3>
                <p className="text-[#6B6966] text-sm">Retornaremos em até 1 dia útil.</p>
              </div>
            ) : (
              <div className="border border-[#E8E6E3] bg-white p-8">
                <p className="label-tag mb-5">Envie uma mensagem</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">Nome *</label>
                      <input required name="nome" value={form.nome} onChange={handleChange}
                        placeholder="Seu nome" className={INPUT_CLASS} />
                    </div>
                    <div>
                      <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">Telefone</label>
                      <input name="telefone" value={form.telefone} onChange={handleChange}
                        placeholder="(19) 99999-9999" className={INPUT_CLASS} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">E-mail *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="seu@email.com" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">Assunto *</label>
                    <select required name="assunto" value={form.assunto} onChange={handleChange}
                      className="w-full border border-[#E8E6E3] focus:border-[#E67A22]/50 outline-none text-[#1A1917] text-sm px-3 py-3 transition-colors bg-white">
                      <option value="">Selecione</option>
                      <option>Quero ser parceiro</option>
                      <option>Solicitar proposta comercial</option>
                      <option>Dúvida sobre o Promob Fabriko</option>
                      <option>Assistência técnica</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">Mensagem *</label>
                    <textarea required name="mensagem" value={form.mensagem} onChange={handleChange} rows={5}
                      placeholder="Como podemos ajudar?"
                      className="w-full border border-[#E8E6E3] focus:border-[#E67A22]/50 outline-none text-[#1A1917] text-sm px-3 py-3 transition-colors resize-none bg-white placeholder:text-[#1A1917]/30" />
                  </div>
                  <button type="submit"
                    className="group w-full flex items-center justify-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold py-4 tracking-widest uppercase transition-all">
                    <Send className="h-3.5 w-3.5" />
                    Enviar mensagem
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
