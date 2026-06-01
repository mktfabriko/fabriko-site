"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Phone, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function SejaParceiro() {
  const [form, setForm] = useState({
    nome: "", empresa: "", cidade: "", estado: "", telefone: "", email: "", segmento: "", mensagem: "",
  });
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
              Revenda Fabriko
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-[family-name:var(--font-barlow)] font-extrabold text-white uppercase leading-none mt-3 mb-4"
            >
              Seja um<br />
              <span className="text-[#E67A22]">Parceiro</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-xl">
              Acesso exclusivo a tabela de preços, condições especiais e suporte comercial dedicado.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-[#f7f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { title: "Tabela Exclusiva", desc: "Preços de fábrica não disponíveis ao público geral." },
              { title: "Prazo Diferenciado", desc: "Condições de pagamento especiais para parceiros." },
              { title: "Suporte Comercial", desc: "Time dedicado para ajudar nas suas vendas." },
              { title: "Exclusividade Territorial", desc: "Proteção de território para parceiros estratégicos." },
            ].map(({ title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white rounded-lg p-6 border border-[#e5e5e5] hover:border-[#E67A22]/30 hover:shadow-md transition-all"
              >
                <CheckCircle2 className="h-6 w-6 text-[#E67A22] mb-3" />
                <h3 className="font-[family-name:var(--font-barlow)] font-bold text-base text-[#1B1A18] uppercase mb-2">
                  {title}
                </h3>
                <p className="text-[#6b6b6b] text-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Formulário */}
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
              Cadastro
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-barlow)] font-extrabold text-[#1B1A18] uppercase mt-3 mb-6"
            >
              Preencha e nossa equipe entra em contato
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6b6b6b] leading-relaxed mb-8">
              Após o preenchimento, nossa equipe comercial analisa seu perfil e entra em contato em até
              <strong className="text-[#1B1A18]"> 24 horas úteis</strong> com proposta personalizada.
            </motion.p>

            <motion.div variants={stagger} className="space-y-4">
              <motion.a
                variants={fadeUp}
                href="tel:+5500000000000"
                className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#E67A22] transition-colors"
              >
                <Phone className="h-5 w-5 text-[#E67A22]" />
                <span className="text-sm">(XX) XXXXX-XXXX</span>
              </motion.a>
              <motion.a
                variants={fadeUp}
                href="mailto:parceiros@fabriko.com.br"
                className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#E67A22] transition-colors"
              >
                <Mail className="h-5 w-5 text-[#E67A22]" />
                <span className="text-sm">parceiros@fabriko.com.br</span>
              </motion.a>
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
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-[family-name:var(--font-barlow)] font-bold text-2xl text-[#1B1A18] uppercase mb-2">
                  Cadastro recebido!
                </h3>
                <p className="text-[#6b6b6b] text-sm">
                  Nossa equipe entrará em contato em até 24 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                      Nome *
                    </label>
                    <input
                      required
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                      Empresa *
                    </label>
                    <input
                      required
                      name="empresa"
                      value={form.empresa}
                      onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                      Cidade *
                    </label>
                    <input
                      required
                      name="cidade"
                      value={form.cidade}
                      onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                      placeholder="Sua cidade"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                      Estado *
                    </label>
                    <select
                      required
                      name="estado"
                      value={form.estado}
                      onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors bg-white"
                    >
                      <option value="">Selecione</option>
                      {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                      Telefone *
                    </label>
                    <input
                      required
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                      placeholder="(XX) XXXXX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                      E-mail *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                    Segmento *
                  </label>
                  <select
                    required
                    name="segmento"
                    value={form.segmento}
                    onChange={handleChange}
                    className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors bg-white"
                  >
                    <option value="">Selecione seu segmento</option>
                    <option value="loja-moveis">Loja de Móveis</option>
                    <option value="distribuidor">Distribuidor</option>
                    <option value="arquiteto">Arquiteto / Designer de Interiores</option>
                    <option value="construtora">Construtora / Incorporadora</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1A18] uppercase tracking-wide mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    value={form.mensagem}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#E67A22] transition-colors resize-none"
                    placeholder="Conte um pouco sobre seu negócio (opcional)"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#E67A22] hover:bg-[#c9601a] text-white font-bold py-3.5 rounded-sm uppercase tracking-wider text-sm transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Enviar Cadastro
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
