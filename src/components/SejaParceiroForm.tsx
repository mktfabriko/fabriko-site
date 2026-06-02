"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";

export function SejaParceiroForm() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/parceiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Erro ao enviar. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <CheckCircle2 className="h-12 w-12 text-[#E67A22] mx-auto mb-4" />
        <h3 className="font-[family-name:var(--font-playfair)] font-black text-2xl text-[#1A1917] mb-2">
          Recebemos seu cadastro!
        </h3>
        <p className="text-[#6B6966] text-sm leading-relaxed">
          Você receberá a apresentação Fabriko no e-mail informado.<br />
          Nosso time também entrará em contato pelo WhatsApp em breve.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { name: "nome", label: "Seu nome", placeholder: "Nome completo", type: "text" },
        { name: "email", label: "E-mail", placeholder: "seu@email.com", type: "email" },
        { name: "whatsapp", label: "WhatsApp", placeholder: "(19) 99999-9999", type: "tel" },
      ].map(({ name, label, placeholder, type }) => (
        <div key={name}>
          <label className="block text-[#1A1917]/50 text-[10px] font-bold uppercase tracking-widest mb-2">
            {label} *
          </label>
          <input
            required
            name={name}
            type={type}
            value={form[name as keyof typeof form]}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full border border-[#E8E6E3] focus:border-[#E67A22]/50 outline-none text-[#1A1917] text-sm px-4 py-3 transition-colors bg-white placeholder:text-[#1A1917]/30"
          />
        </div>
      ))}
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="group w-full flex items-center justify-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] disabled:opacity-60 text-white text-[11px] font-bold py-4 tracking-widest uppercase transition-all"
      >
        {loading ? (
          "Enviando..."
        ) : (
          <>
            <Send className="h-3.5 w-3.5" />
            Receber apresentação Fabriko
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
