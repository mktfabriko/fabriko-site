"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

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
              Fale conosco
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-none mt-3"
            >
              <span className="text-[#E67A22]">Contato</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Info + Form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-[#E67A22]">
              Informações
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mt-3 mb-8"
            >
              Como podemos ajudar?
            </motion.h2>

            <motion.div variants={stagger} className="space-y-6 mb-10">
              {[
                { icon: Phone, label: "Telefone / WhatsApp", value: "(XX) XXXXX-XXXX" },
                { icon: Mail, label: "E-mail", value: "contato@fabriko.com.br" },
                { icon: MapPin, label: "Endereço", value: "Rua da Fábrica, 100 — Cidade/Estado" },
                { icon: Clock, label: "Horário", value: "Seg–Sex: 8h–18h | Sáb: 8h–12h" },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div key={label} variants={fadeUp} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-sm bg-[#E67A22]/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[#E67A22]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#6b6b6b]">{label}</p>
                    <p className="text-[#1B1A18] font-medium text-sm mt-0.5">{value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fb356] text-white font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.847L.057 23.882a.5.5 0 00.612.612l6.035-1.467A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.031-1.383l-.361-.214-3.738.909.927-3.638-.234-.374A9.818 9.818 0 0112 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.424-4.395 9.818-9.818 9.818z" />
                </svg>
                Chamar no WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-[family-name:var(--font-barlow)] font-bold text-2xl text-[#1B1A18] uppercase mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-[#6b6b6b] text-sm">
                  Retornaremos em até 1 dia útil.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">Nome *</label>
                    <input required name="nome" value={form.nome} onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                      placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">Telefone</label>
                    <input name="telefone" value={form.telefone} onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                      placeholder="(XX) XXXXX-XXXX" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">E-mail *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                    placeholder="seu@email.com" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">Assunto *</label>
                  <select required name="assunto" value={form.assunto} onChange={handleChange}
                    className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors bg-white">
                    <option value="">Selecione</option>
                    <option value="parceria">Quero ser parceiro</option>
                    <option value="orcamento">Solicitar orçamento</option>
                    <option value="catalogo">Catálogo e preços</option>
                    <option value="projeto">Projeto sob medida</option>
                    <option value="suporte">Suporte / Pós-venda</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">Mensagem *</label>
                  <textarea required name="mensagem" value={form.mensagem} onChange={handleChange} rows={5}
                    className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors resize-none"
                    placeholder="Como podemos ajudar?" />
                </div>

                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#E67A22] hover:bg-[#c9601a] text-white font-bold py-3.5 rounded-sm uppercase tracking-wider text-sm transition-colors">
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
