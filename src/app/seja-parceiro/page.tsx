"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Send, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const PASSOS = [
  { n: "01", t: "Solicite o Promob Fabriko", d: "Acesse portal.promob.com/loja, busque por FABRIKO e solicite autorização. 30 dias grátis para testar." },
  { n: "02", t: "Ative com seu Consultor", d: "Informe seu Consultor Fabriko. Ele libera a licença e apresenta toda a biblioteca de produtos, acabamentos e puxadores." },
  { n: "03", t: "Projete e Envie", d: "Projete milímetro a milímetro com nossos acabamentos. Envie por e-mail para pedido@fabriko.ind.br." },
  { n: "04", t: "Produção em 20 dias", d: "Após liberação financeira, seu pedido entra em produção. 20 dias úteis para peças padrão." },
];

const BENEFICIOS = [
  "Biblioteca completa no Promob Studio — 3 linhas, todos os acabamentos",
  "Produto 100% MDF com borda PUR 1mm premium",
  "Três linhas: Village (15/15mm), Milano (15/18mm), Maxximum (18/18mm)",
  "Painéis personalizados em 15, 18, 30 e 36mm com canaleta para LED",
  "Convênio com Santander Financeira para venda ao cliente final",
  "Maquininha PagBank para facilitar o fechamento de vendas",
  "Suporte técnico online permanente do seu Consultor Fabriko",
  "Assistência técnica ágil (5 a 10 dias úteis para erro de fábrica)",
];

const INPUT_CLASS = "w-full border border-[#E8E6E3] focus:border-[#E67A22]/50 outline-none text-[#1A1917] text-sm px-3 py-3 transition-colors bg-white placeholder:text-[#1A1917]/30";
const SELECT_CLASS = "w-full border border-[#E8E6E3] focus:border-[#E67A22]/50 outline-none text-[#1A1917] text-sm px-3 py-3 transition-colors bg-white";

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
      <section className="relative bg-[#1A1917] pt-36 pb-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-5"
          style={{ background: "radial-gradient(ellipse at left bottom, #E67A22, transparent 70%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-tag mb-5">Para lojistas e marcenarias</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,7vw,6rem)] font-[family-name:var(--font-playfair)] font-black text-white leading-[0.92] mb-6"
            >
              Seja a nossa<br />
              <span className="text-[#E67A22]">parceria.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-xl">
              Fabriko é mais do que fornecedora. É o ponto de apoio para lojistas e marcenarias
              que querem crescer com organização, agilidade e segurança.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-24 bg-white border-b border-[#E8E6E3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="label-tag mb-4">Como funciona</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
              Do Promob à entrega.<br />
              <span className="text-[#1A1917]/25 font-medium italic">4 passos.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E6E3]"
          >
            {PASSOS.map(({ n, t, d }) => (
              <motion.div key={n} variants={fadeUp} className="bg-white p-8 hover:bg-[#FAFAF8] transition-colors">
                <p className="text-[#E67A22]/20 font-[family-name:var(--font-playfair)] font-black text-5xl mb-4">{n}</p>
                <h3 className="text-[#1A1917] font-semibold text-sm mb-3">{t}</h3>
                <p className="text-[#6B6966] text-xs leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 border border-[#E67A22]/20 bg-[#FAFAF8] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <p className="text-[#1A1917] text-sm font-semibold">Promob Studio Fabriko — 30 dias grátis</p>
              <p className="text-[#6B6966] text-xs mt-1">
                Acesse portal.promob.com/loja → busque FABRIKO → Solicitar Autorização.
                Informe seu Consultor para liberar a licença.
              </p>
            </div>
            <a href="https://portal.promob.com/loja" target="_blank" rel="noopener noreferrer"
              className="shrink-0 group flex items-center gap-2 border border-[#E67A22]/40 hover:border-[#E67A22] hover:bg-[#E67A22] hover:text-white text-[#E67A22] text-xs font-bold uppercase tracking-widest px-5 py-3 transition-all">
              Acessar Promob
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefícios + Form */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Benefícios */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="label-tag mb-5">O que você acessa</motion.p>
            <motion.h2 variants={fadeUp}
              className="text-3xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917] mb-8">
              Tudo que o lojista precisa para crescer.
            </motion.h2>
            <motion.ul variants={stagger} className="space-y-4">
              {BENEFICIOS.map((b) => (
                <motion.li key={b} variants={fadeUp} className="flex items-start gap-3 text-[#6B6966] text-sm">
                  <Check className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10 p-6 border border-[#E8E6E3] bg-white">
              <p className="text-[#1A1917]/30 text-xs uppercase tracking-widest mb-3">Contatos diretos</p>
              <div className="space-y-2">
                {[
                  { label: "Projetos & Parcerias", val: "projetos@fabriko.ind.br" },
                  { label: "Pedidos", val: "pedido@fabriko.ind.br" },
                  { label: "WhatsApp", val: "(19) 99625-2987" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-[#1A1917]/35">{label}</span>
                    <span className="text-[#1A1917] font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Formulário */}
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
                  Recebemos seu cadastro.
                </h3>
                <p className="text-[#6B6966] text-sm">
                  Nossa equipe entra em contato em até 24 horas úteis.
                </p>
              </div>
            ) : (
              <div className="border border-[#E8E6E3] bg-white p-8">
                <p className="label-tag mb-5">Cadastro de parceiro</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { n: "nome", p: "Seu nome", label: "Nome *", type: "text" },
                      { n: "empresa", p: "Nome da empresa", label: "Empresa *", type: "text" },
                    ].map(({ n, p, label, type }) => (
                      <div key={n}>
                        <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">{label}</label>
                        <input required name={n} type={type} value={form[n as keyof typeof form]}
                          onChange={handleChange} placeholder={p} className={INPUT_CLASS} />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">Cidade *</label>
                      <input required name="cidade" value={form.cidade} onChange={handleChange}
                        placeholder="Sua cidade" className={INPUT_CLASS} />
                    </div>
                    <div>
                      <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">UF *</label>
                      <select required name="estado" value={form.estado} onChange={handleChange} className={SELECT_CLASS}>
                        <option value="">UF</option>
                        {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { n: "telefone", p: "(19) 99999-9999", label: "Telefone *" },
                      { n: "email", p: "seu@email.com", label: "E-mail *" },
                    ].map(({ n, p, label }) => (
                      <div key={n}>
                        <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">{label}</label>
                        <input required name={n} type={n === "email" ? "email" : "text"} value={form[n as keyof typeof form]}
                          onChange={handleChange} placeholder={p} className={INPUT_CLASS} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">Segmento *</label>
                    <select required name="segmento" value={form.segmento} onChange={handleChange} className={SELECT_CLASS}>
                      <option value="">Selecione seu segmento</option>
                      <option value="loja-planejados">Loja de Móveis Planejados</option>
                      <option value="marcenaria">Marcenaria</option>
                      <option value="distribuidor">Distribuidor</option>
                      <option value="construtora">Construtora / Incorporadora</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1A1917]/40 text-[10px] uppercase tracking-widest mb-2">Mensagem</label>
                    <textarea name="mensagem" value={form.mensagem} onChange={handleChange} rows={3}
                      placeholder="Conte sobre seu negócio (opcional)"
                      className="w-full border border-[#E8E6E3] focus:border-[#E67A22]/50 outline-none text-[#1A1917] text-sm px-3 py-3 transition-colors resize-none bg-white placeholder:text-[#1A1917]/30" />
                  </div>

                  <button type="submit"
                    className="group w-full flex items-center justify-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold py-4 tracking-widest uppercase transition-all">
                    <Send className="h-3.5 w-3.5" />
                    Enviar cadastro
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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
