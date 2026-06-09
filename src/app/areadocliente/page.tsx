"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock, Mail, Phone, AlertTriangle, Check, ChevronDown, ChevronRight,
  ExternalLink, Info, AlertCircle, FileText, X, Play,
  GraduationCap, Lock, MessageCircle,
} from "lucide-react";

// ─── navegação ────────────────────────────────────────────────────────────────

const SECOES = [
  { id: "promob",      n: "01", label: "Promob Studio"       },
  { id: "pedidos",     n: "02", label: "Envio de Pedidos"    },
  { id: "curinga",     n: "03", label: "Acab. Curinga"       },
  { id: "especial",    n: "04", label: "Produto Especial"    },
  { id: "paineis",     n: "05", label: "Painéis Person."     },
  { id: "assistencia", n: "06", label: "Assistência Técnica" },
  { id: "financeiro",  n: "07", label: "Financeiro"          },
  { id: "armazenagem", n: "08", label: "Armazenagem"         },
  { id: "contatos",    n: "09", label: "Contatos"            },
];

const QUICK = [
  { label: "Prazo padrão",       valor: "20 dias úteis",              sub: "a partir da liberação financeira" },
  { label: "Curinga e Especial", valor: "25 dias úteis",              sub: "a partir da liberação financeira" },
  { label: "Armazenagem grátis", valor: "15 dias corridos",           sub: "após término da produção"         },
  { label: "Validação AT",       valor: "24 horas",                   sub: "após envio da solicitação"        },
  { label: "E-mail pedidos",     valor: "pedido@fabriko.ind.br",      sub: "envio de projetos", link: "mailto:pedido@fabriko.ind.br"      },
  { label: "E-mail assistência", valor: "assistencia@fabriko.ind.br", sub: "somente AT",        link: "mailto:assistencia@fabriko.ind.br" },
];

const JORNADA = [
  { n: "01", titulo: "Acesso ao Promob",  desc: "Ative a biblioteca Fabriko",   prazo: null,           ancora: "promob"      },
  { n: "02", titulo: "Criação do Projeto", desc: "Projete pelo Promob Studio",  prazo: null,           ancora: "pedidos"     },
  { n: "03", titulo: "Envio do Pedido",   desc: "E-mail para produção",         prazo: null,           ancora: "pedidos"     },
  { n: "04", titulo: "Produção",          desc: "Fábrica em operação",          prazo: "20 dias úteis", ancora: "assistencia" },
  { n: "05", titulo: "Retirada",          desc: "Produto pronto para entrega",  prazo: null,           ancora: "armazenagem" },
];

const ACADEMY = [
  {
    titulo: "Conheça a Fabriko",
    desc: "Estrutura industrial, linhas e diferenciais da fábrica.",
    duracao: "3 min",
    thumb: "https://img.youtube.com/vi/p1NaTAbQBNw/maxresdefault.jpg",
    youtubeId: "p1NaTAbQBNw",
    disponivel: true,
  },
  {
    titulo: "Promob Studio Fabriko",
    desc: "Como ativar, configurar e usar a biblioteca exclusiva.",
    duracao: "8 min",
    thumb: "/fotos/50.webp",
    disponivel: false,
  },
  {
    titulo: "Portfólio de Acabamentos",
    desc: "Tour completo pelas linhas Madeirado, Unicolor, Conceito e Blend.",
    duracao: "5 min",
    thumb: "/fotos/28.webp",
    disponivel: false,
  },
  {
    titulo: "Do Projeto ao Pedido",
    desc: "Passo a passo: como formatar e enviar um pedido corretamente.",
    duracao: "6 min",
    thumb: "/fotos/41.webp",
    disponivel: false,
  },
  {
    titulo: "Condições Financeiras",
    desc: "Formas de pagamento, convênios Santander e PagSeguro.",
    duracao: "4 min",
    thumb: "/fotos/33.webp",
    disponivel: false,
  },
];

// ─── helpers ─────────────────────────────────────────────────────────────────

function Acc({ titulo, badge, defaultOpen = false, children }: {
  titulo: string; badge?: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#E8E6E3] overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-white hover:bg-[#FAFAF8] text-left transition-colors">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#1A1917] font-semibold text-sm">{titulo}</span>
          {badge}
        </div>
        <ChevronDown className={`h-4 w-4 text-[#1A1917]/25 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-2 bg-white border-t border-[#F0EDE8] space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Alerta({ tipo = "aviso", children }: { tipo?: "aviso" | "info" | "critico"; children: React.ReactNode }) {
  const s = {
    aviso:   { cls: "bg-[#FFF3E8] border-[#E67A22]/30",  icon: <AlertTriangle className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />   },
    info:    { cls: "bg-blue-50 border-blue-200",         icon: <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />             },
    critico: { cls: "bg-red-50 border-red-200",           icon: <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />       },
  }[tipo];
  return (
    <div className={`flex gap-3 border p-4 ${s.cls}`}>
      {s.icon}<p className="text-sm leading-relaxed text-[#1A1917]">{children}</p>
    </div>
  );
}

function Pill({ cor, children }: { cor: "verde" | "laranja" | "cinza"; children: React.ReactNode }) {
  const cls = {
    verde:   "bg-green-100 text-green-700 border-green-200",
    laranja: "bg-[#E67A22]/10 text-[#E67A22] border-[#E67A22]/25",
    cinza:   "bg-[#F0EDE8] text-[#1A1917]/50 border-[#E8E6E3]",
  }[cor];
  return <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 ${cls}`}>{children}</span>;
}

function EmailMock({ assunto, para, cc, corpo, anexos }: {
  assunto: string; para: string; cc?: string; corpo: string[]; anexos?: string[];
}) {
  return (
    <div className="border border-[#E8E6E3] bg-white text-xs font-mono overflow-hidden">
      <div className="bg-[#F5F3F0] border-b border-[#E8E6E3] px-3 py-2 flex gap-1.5">
        {["bg-red-300","bg-yellow-300","bg-green-300"].map((c) => <span key={c} className={`h-2.5 w-2.5 rounded-full ${c} opacity-60`} />)}
      </div>
      <div className="divide-y divide-[#F5F3F0]">
        <div className="px-4 py-2 flex gap-3"><span className="text-[#1A1917]/30 w-10 shrink-0">Para</span><span className="text-[#E67A22]">{para}</span></div>
        {cc && <div className="px-4 py-2 flex gap-3"><span className="text-[#1A1917]/30 w-10 shrink-0">Cc</span><span className="text-[#1A1917]/50">{cc}</span></div>}
        <div className="px-4 py-2 flex gap-3 items-center"><span className="text-[#1A1917]/30 w-10 shrink-0">Assunto</span><span className="font-bold text-[#1A1917] bg-[#FFF3E8] px-1.5 py-0.5">{assunto}</span></div>
        {anexos && (
          <div className="px-4 py-2 flex gap-3 flex-wrap">
            <span className="text-[#1A1917]/30 w-10 shrink-0">Anexos</span>
            <div className="flex gap-2 flex-wrap">
              {anexos.map((a) => <span key={a} className="flex items-center gap-1 bg-[#F5F3F0] border border-[#E8E6E3] px-2 py-0.5 text-[#1A1917]/60"><FileText className="h-2.5 w-2.5" />{a}</span>)}
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-3 text-[#6B6966] leading-relaxed space-y-1 border-t border-[#F0EDE8]">
        {corpo.map((l, i) => <p key={i}>{l}</p>)}
      </div>
    </div>
  );
}

function Step({ n, titulo, children }: { n: number; titulo: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="h-6 w-6 bg-[#E67A22] text-white text-[11px] font-bold flex items-center justify-center shrink-0">{n}</span>
        <div className="w-px flex-1 bg-[#E8E6E3] mt-1" />
      </div>
      <div className="pb-5 flex-1">
        <p className="text-[#1A1917] font-semibold text-sm">{titulo}</p>
        {children && <div className="text-[#6B6966] text-xs mt-1 leading-relaxed">{children}</div>}
      </div>
    </div>
  );
}

function SecTitle({ n, titulo, resumo, desc }: { n: string; titulo: string; resumo?: string; desc?: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-start gap-4 mb-3">
        <span className="text-[#E67A22]/15 font-[family-name:var(--font-playfair)] font-black text-4xl leading-none shrink-0 select-none w-10">{n}</span>
        <div>
          <h2 className="text-lg font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">{titulo}</h2>
          {desc && <p className="text-[#6B6966] text-xs mt-1 leading-relaxed max-w-xl">{desc}</p>}
        </div>
      </div>
      {resumo && (
        <div className="ml-14 border-l-2 border-[#E67A22] pl-4 py-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#E67A22] mb-0.5">Resumo</p>
          <p className="text-sm text-[#1A1917] font-medium leading-relaxed">{resumo}</p>
        </div>
      )}
    </div>
  );
}

// placeholder de vídeo/imagem por seção
function MediaPlaceholder({ label = "Vídeo explicativo em breve" }: { label?: string }) {
  return (
    <div className="aspect-video bg-[#F0EDE8] border border-[#E8E6E3] flex flex-col items-center justify-center gap-2 mb-4">
      <div className="h-10 w-10 rounded-full border border-[#1A1917]/10 flex items-center justify-center">
        <Play className="h-4 w-4 text-[#1A1917]/20 ml-0.5" />
      </div>
      <p className="text-[#1A1917]/25 text-xs font-medium tracking-widest uppercase">{label}</p>
    </div>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AreaDoCliente() {
  const [active, setActive] = useState("promob");
  const [videoOpen, setVideoOpen] = useState(false);
  const [academyVideo, setAcademyVideo] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(pct);

      const offset = 110;
      for (let i = SECOES.length - 1; i >= 0; i--) {
        const sec = document.getElementById(SECOES[i].id);
        if (sec && sec.getBoundingClientRect().top <= offset) {
          setActive(SECOES[i].id); return;
        }
      }
      setActive(SECOES[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Barra de progresso ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/10">
        <motion.div className="h-full bg-[#E67A22]" style={{ width: `${scrollPct}%` }} />
      </div>

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section className="bg-[#1A1917] pt-32 pb-0 md:pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E67A22]/8 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#E67A22] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Fabriko · Guia do Parceiro
            </p>
            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] font-black text-white leading-tight mb-4">
              Bem-vindo à<br />
              <span className="text-[#E67A22]">Fabriko.</span>
            </h1>
            <p className="text-white/45 text-base md:text-lg max-w-xl leading-relaxed mb-10">
              Tudo que você precisa saber para começar sua parceria — do primeiro pedido à retirada. Preparamos este guia para que nada fique sem resposta.
            </p>
          </motion.div>

          {/* Vídeo */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative aspect-video bg-[#0D0D0B] overflow-hidden cursor-pointer group border border-white/10"
            onClick={() => setVideoOpen(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://img.youtube.com/vi/p1NaTAbQBNw/maxresdefault.jpg" alt="Fabriko"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#E67A22] group-hover:bg-[#E67A22]/20 transition-all duration-300 mb-4">
                <Play className="h-6 w-6 md:h-7 md:w-7 text-white ml-1" />
              </div>
              <p className="text-white/70 text-xs font-medium tracking-widest uppercase group-hover:text-white transition-colors">
                Conheça a Fabriko
              </p>
            </div>
            <div className="absolute bottom-4 left-5">
              <p className="text-white/20 text-[10px] tracking-widest uppercase">Americana-SP · 3 min</p>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="relative mt-10 border-t border-white/10 bg-[#0D0D0B]/60">
          <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-white/10">
            {[
              { v: "100+", l: "lojistas parceiros" },
              { v: "20 dias", l: "prazo garantido" },
              { v: "100%", l: "produção em MDF" },
            ].map(({ v, l }) => (
              <div key={v} className="px-4 first:pl-0 text-center">
                <p className="text-[#E67A22] font-[family-name:var(--font-playfair)] font-black text-2xl md:text-3xl">{v}</p>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ JORNADA DO PARCEIRO ════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E8E6E3] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#E67A22] mb-1">Como funciona</p>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">
                Jornada do Parceiro
              </h2>
            </div>
            <p className="text-[#1A1917]/30 text-xs">Clique em uma etapa para ir direto à seção</p>
          </div>

          <div className="flex flex-col md:flex-row gap-0">
            {JORNADA.map(({ n, titulo, desc, prazo, ancora }, i) => (
              <a key={n} href={`#${ancora}`}
                className="group flex-1 relative flex flex-col border border-[#E8E6E3] hover:border-[#E67A22]/50 hover:bg-[#FFF3E8]/40 p-5 transition-all cursor-pointer md:border-r-0 last:border-r border-b md:border-b">
                {/* Número */}
                <span className="text-[#E67A22]/20 font-[family-name:var(--font-playfair)] font-black text-3xl leading-none mb-3 group-hover:text-[#E67A22]/40 transition-colors">
                  {n}
                </span>
                <p className="text-[#1A1917] font-semibold text-sm mb-1 group-hover:text-[#E67A22] transition-colors">{titulo}</p>
                <p className="text-[#6B6966] text-xs leading-relaxed">{desc}</p>
                {prazo && (
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#E67A22] uppercase tracking-widest">
                    <Clock className="h-3 w-3" />{prazo}
                  </span>
                )}
                {/* Seta desktop */}
                {i < JORNADA.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 bg-white border border-[#E8E6E3] items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-[#E67A22]" />
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GUIA OPERACIONAL ══════════════════════════════════════════ */}
      <div>
        {/* Pill nav sticky */}
        <div className="sticky top-0 z-30 bg-white border-b border-[#E8E6E3] shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-3 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {SECOES.map(({ id, n, label }) => (
              <a key={id} href={`#${id}`} onClick={() => setActive(id)}
                className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-widest px-4 py-2 transition-all ${
                  active === id
                    ? "bg-[#E67A22] text-white"
                    : "text-[#1A1917]/40 hover:text-[#1A1917] border border-[#E8E6E3] hover:border-[#1A1917]/20"
                }`}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Header do guia */}
        <div className="bg-white border-b border-[#E8E6E3] px-6 py-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#E67A22] mb-1">Manual Operacional</p>
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">Guia Completo de Procedimentos</h2>
            <p className="text-[#6B6966] text-xs mt-1">Rev. 3 · 17/03/2026 · Leitura recomendada antes do primeiro pedido</p>
          </div>
        </div>

          {/* Consulta rápida */}
          <div className="px-6 py-7 border-b border-[#E8E6E3] bg-[#FAFAF8]">
            <div className="max-w-5xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mb-4">Consulta rápida</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {QUICK.map(({ label, valor, sub, link }) => (
                link
                  ? <a key={label} href={link}
                      className="border border-[#E8E6E3] bg-white hover:border-[#E67A22]/40 hover:bg-[#FFF3E8]/40 p-4 transition-all group">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mb-1">{label}</p>
                      <p className="text-[#E67A22] font-semibold text-xs group-hover:underline break-all">{valor}</p>
                      <p className="text-[#1A1917]/30 text-[10px] mt-0.5">{sub}</p>
                    </a>
                  : <div key={label} className="border border-[#E8E6E3] bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mb-1">{label}</p>
                      <p className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-bold text-base">{valor}</p>
                      <p className="text-[#1A1917]/30 text-[10px] mt-0.5">{sub}</p>
                    </div>
              ))}
            </div>
            </div>
          </div>

          {/* ── Seções ── */}
          <div className="px-6 divide-y divide-[#E8E6E3]">
            <div className="max-w-5xl mx-auto divide-y divide-[#E8E6E3]">

            {/* 01 */}
            <section id="promob" className="py-10 scroll-mt-20">
              <SecTitle n="01" titulo="Solicitação do Promob Studio Fabriko"
                resumo="Acesse o portal Promob, pesquise FABRIKO, solicite a autorização e avise seu consultor. Os 30 dias são gratuitos — mas o cancelamento é sua responsabilidade."
                desc="Ative a biblioteca exclusiva Fabriko no Promob Studio." />
              <MediaPlaceholder label="Tutorial: como instalar o Promob Fabriko" />
              <div className="space-y-2">
                <Acc titulo="Ativação da licença" defaultOpen>
                  <div className="pt-2">
                    <Step n={1} titulo="Acesse o portal Promob">
                      <a href="https://portal.promob.com/loja" target="_blank" rel="noopener noreferrer"
                        className="text-[#E67A22] hover:underline inline-flex items-center gap-1">
                        portal.promob.com/loja <ExternalLink className="h-3 w-3" />
                      </a>{" "}e faça login.
                    </Step>
                    <Step n={2} titulo='Pesquise "FABRIKO" e clique em Solicitar Autorização' />
                    <Step n={3} titulo="Avise seu Consultor Fabriko para liberar a licença" />
                    <Step n={4} titulo="Store → Intenções de Compra → Comprar Agora">
                      Selecione <strong>Assinatura Mensal (1 Mês GRÁTIS)</strong>. Será solicitado cartão de crédito para cobrança após o teste.
                    </Step>
                  </div>
                </Acc>
                <Acc titulo="Download do software">
                  <Step n={5} titulo="Baixe o Promob Studio">
                    <a href="https://portal.promob.com/Home" target="_blank" rel="noopener noreferrer"
                      className="text-[#E67A22] hover:underline inline-flex items-center gap-1">
                      portal.promob.com/Home <ExternalLink className="h-3 w-3" />
                    </a>{" "}— link de download no rodapé.
                  </Step>
                </Acc>
                <Acc titulo="Cancelamento e suporte">
                  <Alerta tipo="critico">
                    <strong>Cancelamento é sua responsabilidade.</strong> Cancele no portal Promob antes dos 30 dias. A Fabriko não tem acesso nem relação com os pagamentos da Promob.
                  </Alerta>
                  <div className="flex items-center gap-2 text-sm text-[#1A1917] mt-2">
                    <Phone className="h-3.5 w-3.5 text-[#E67A22] shrink-0" />
                    Suporte Promob: <strong>(54) 3209-9200</strong> · Seg–Sex 8h–18h30
                  </div>
                </Acc>
              </div>
            </section>

            {/* 02 */}
            <section id="pedidos" className="py-10 scroll-mt-20">
              <SecTitle n="02" titulo="Envio de Pedido Fabriko"
                resumo="Um arquivo .promob por ambiente, nomeado com o nome do ambiente. Assunto do e-mail: nome da loja + cliente, máx. 20 caracteres cada."
                desc="Como formatar e enviar projetos corretamente para produção." />
              <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3 mb-4">
                <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
                <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>20 dias úteis</strong> a partir da liberação financeira</p>
              </div>
              <MediaPlaceholder label="Tutorial: como enviar um pedido corretamente" />
              <div className="space-y-2">
                <Acc titulo="Regras do e-mail e dos arquivos" defaultOpen>
                  <ul className="space-y-3 pt-1">
                    {[
                      { t: "Assunto do e-mail",   d: "Nome da loja + nome do cliente final, máx. 20 caracteres cada." },
                      { t: "Arquivos Promob",     d: "Um arquivo .promob por ambiente, nomeado com o nome do ambiente." },
                      { t: "Aba interna",         d: "Nomear a aba interna com o nome do ambiente (ex: Cozinha)." },
                      { t: "Dados do cliente",    d: 'Inserir o nome do cliente no campo "Dados do Cliente" no Promob.' },
                      { t: "CC obrigatório",      d: "Copie sempre o e-mail do seu Consultor Fabriko." },
                    ].map(({ t, d }) => (
                      <li key={t} className="flex gap-2">
                        <Check className="h-3.5 w-3.5 text-[#E67A22] shrink-0 mt-0.5" />
                        <div><p className="text-xs font-semibold text-[#1A1917]">{t}</p><p className="text-xs text-[#6B6966] mt-0.5">{d}</p></div>
                      </li>
                    ))}
                  </ul>
                </Acc>
                <Acc titulo="Exemplo de e-mail">
                  <EmailMock para="pedido@fabriko.ind.br" cc="consultor@fabriko.ind.br" assunto="JOÃO JOSÉ–PLANEJADOS"
                    anexos={["COZINHA.promob"]}
                    corpo={["Boa tarde,","Segue arquivo Promob referente ao projeto do cliente final João José, contendo um ambiente para produção.","Ambiente para produção:","1 - COZINHA - Sem informações especiais.","Projeto revisado, pode ser liberado para produção.","Att. PLANEJADOS & CIA."]} />
                </Acc>
              </div>
            </section>

            {/* 03 */}
            <section id="curinga" className="py-10 scroll-mt-20">
              <SecTitle n="03" titulo="Pedido com Acabamento Curinga"
                resumo="Arquivo separado do projeto principal, um por tipo de Curinga, nomeado como COZINHA–CURINGA COR 1. Prazo: 25 dias."
                desc="Para acabamentos fora do portfólio Fabriko, disponíveis na biblioteca Promob." />
              <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3 mb-4">
                <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
                <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>25 dias úteis</strong> a partir da liberação financeira</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { tipo: "Curinga Cor",   qtd: "10 opções", desc: "Unicolor especiais" },
                  { tipo: "Curinga Mad",   qtd: "4 opções",  desc: "Madeiras, pedras, tecidos, metais" },
                  { tipo: "Curinga Brilho",qtd: "1 opção",   desc: "Acabamento com brilho" },
                ].map(({ tipo, qtd, desc }) => (
                  <div key={tipo} className="border border-[#E8E6E3] bg-white p-4 text-center">
                    <p className="text-[#E67A22] text-[10px] font-bold uppercase tracking-widest">{qtd}</p>
                    <p className="text-[#1A1917] font-semibold text-sm mt-1">{tipo}</p>
                    <p className="text-[#6B6966] text-[11px] mt-1">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Acc titulo="Procedimentos de envio">
                  <Alerta tipo="aviso"><strong>Curinga Mad</strong> inclui todos os acabamentos com veio: madeiras, pedras, tecidos, metais.</Alerta>
                  <ul className="space-y-1.5 mt-2">
                    {["Arquivo Promob separado do projeto principal","Um arquivo por tipo de Curinga","Nomear: AMBIENTE–CURINGA COR 1","Alertar no corpo do e-mail a existência do arquivo"].map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]"><ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}</li>
                    ))}
                  </ul>
                </Acc>
                <Acc titulo="Exemplo de e-mail com Curinga">
                  <EmailMock para="pedido@fabriko.ind.br" cc="consultor@fabriko.ind.br" assunto="JOÃO JOSÉ–PLANEJADOS"
                    anexos={["COZINHA.promob","COZINHA-CURINGA COR 1.promob"]}
                    corpo={["Boa tarde,","Seguem arquivos Promob do cliente João José:","1 - COZINHA - Sem informações especiais.","2 - COZINHA-CURINGA COR 1 - Verde Oliva Duratex.","Projetos revisados, podem ser liberados para produção.","Att. PLANEJADOS & CIA."]} />
                </Acc>
              </div>
            </section>

            {/* 04 */}
            <section id="especial" className="py-10 scroll-mt-20">
              <SecTitle n="04" titulo="Produto Especial"
                resumo="Aprovação prévia da engenharia obrigatória. Arquivo separado nomeado COZINHA–ESPECIAIS. Descontos zerados, manter IPI 3,5%. Prazo: 25 dias."
                desc="Itens fora do portfólio Fabriko, não disponíveis no Promob." />
              <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3 mb-4">
                <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
                <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>25 dias úteis</strong> a partir da liberação financeira</p>
              </div>
              <div className="space-y-2">
                <Acc titulo="Passo a passo" defaultOpen>
                  <div className="pt-1">
                    <Step n={1} titulo="Aprovação prévia da engenharia">Acione seu Consultor. <strong>Pedidos sem aprovação serão recusados.</strong></Step>
                    <Step n={2} titulo="Arquivo Promob separado">Nome: <code className="bg-[#F0EDE8] text-[#1A1917] px-1 font-mono">COZINHA–ESPECIAIS</code></Step>
                    <Step n={3} titulo="Zerar descontos no Promob">Manter apenas IPI de 3,5%.</Step>
                    <Step n={4} titulo="Alertar no e-mail">Mencionar a existência do arquivo especial no corpo do e-mail.</Step>
                  </div>
                </Acc>
                <Acc titulo="Exemplo de e-mail com Especial">
                  <EmailMock para="pedido@fabriko.ind.br" cc="consultor@fabriko.ind.br" assunto="JOÃO JOSÉ–PLANEJADOS"
                    anexos={["COZINHA.promob","COZINHA-ESPECIAIS.promob"]}
                    corpo={["Boa tarde,","Seguem arquivos Promob do cliente João José:","1 - COZINHA - Sem informações especiais.","2 - COZINHA-ESPECIAIS - Painéis Branco TX com fita de borda Tauari.","Projetos revisados, podem ser liberados para produção.","Att. PLANEJADOS & CIA."]} />
                </Acc>
              </div>
            </section>

            {/* 05 */}
            <section id="paineis" className="py-10 scroll-mt-20">
              <SecTitle n="05" titulo="Painéis Personalizados"
                resumo="Disponível em 15, 18, 30 e 36mm. Sem furos internos. Extremidades ≥ 20mm. Área principal ≥ 200×200mm. Remover vértices sobrepostos."
                desc="Painéis e tampos em formas livres projetados diretamente no Promob." />
              <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
                {[
                  { l: "Localização no Promob", v: "Componentes → Avulsos → Painéis Personalizados" },
                  { l: "Espessuras",            v: "15mm · 18mm · 30mm · 36mm"                      },
                  { l: "Acabamentos",           v: "Toda a linha + Curingas"                        },
                  { l: "Borda padrão",          v: "0,45mm em todos os acabamentos"                 },
                ].map(({ l, v }) => (
                  <div key={l} className="border border-[#E8E6E3] bg-white px-4 py-3 flex gap-3">
                    <span className="text-[#1A1917]/30 text-[10px] font-bold uppercase tracking-widest w-28 shrink-0 mt-0.5">{l}</span>
                    <span className="text-[#1A1917] text-sm">{v}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Acc titulo="6 restrições de formato" defaultOpen>
                  <div className="space-y-2 pt-1">
                    {[
                      { n:"1", r:"Sem furos ou rasgos internos",   d:"Nenhum tipo de furo pode estar no interior da peça."                         },
                      { n:"2", r:"Extremidades agudas ≥ 20mm",     d:"Podem ser retas ou arredondadas."                                            },
                      { n:"3", r:"Área principal ≥ 200×200mm",     d:"Área secundária com mínimo de 70mm."                                         },
                      { n:"4", r:"Vão com borda ≥ 100mm",          d:"Espaço mínimo entre usinagens com acabamento de borda."                       },
                      { n:"5", r:"Largura sem borda ≥ 12mm",       d:"Largura mínima de usinagem sem acabamento de borda."                          },
                      { n:"6", r:"Desenho 100% dentro do painel",  d:"O contorno deve estar totalmente dentro dos limites do painel."               },
                    ].map(({ n, r, d }) => (
                      <div key={n} className="flex gap-3 border border-[#F0EDE8] p-3">
                        <span className="h-5 w-5 bg-[#E67A22]/10 text-[#E67A22] text-[11px] font-bold flex items-center justify-center shrink-0">{n}</span>
                        <div><p className="text-xs font-semibold text-[#1A1917]">{r}</p><p className="text-xs text-[#6B6966] mt-0.5">{d}</p></div>
                      </div>
                    ))}
                  </div>
                </Acc>
                <Acc titulo="Vértices sobrepostos">
                  <Alerta tipo="aviso">Remova qualquer vértice sobreposto no desenho. A usinagem segue a sequência de vértices — sobreposição gera corte em linha reta no local errado.</Alerta>
                </Acc>
              </div>
            </section>

            {/* 06 */}
            <section id="assistencia" className="py-10 scroll-mt-20">
              <SecTitle n="06" titulo="Assistência Técnica"
                resumo="Canal exclusivo: assistencia@fabriko.ind.br. Erro de fábrica: 5–10 dias. Erro do cliente: 5–15 dias. Validação em até 24h."
                desc="Todo processo de AT deve ser feito exclusivamente por e-mail." />
              <Alerta tipo="critico">
                <strong>assistencia@fabriko.ind.br é o único canal aceito.</strong> Solicitações por outros canais não serão aceitas.
              </Alerta>
              <div className="space-y-2 mt-4">
                <Acc titulo="Erro da Fábrica" badge={<Pill cor="verde"><Check className="h-2.5 w-2.5" />5–10 dias úteis</Pill>} defaultOpen>
                  <ul className="space-y-2 pt-1">
                    {["Peças idênticas às do projeto Promob original","Arquivo .promob só com as peças a substituir","Nome: AT-PV-422-COZINHA","Foto da etiqueta da peça original","Foto e/ou vídeo do problema"].map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]"><Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />{r}</li>
                    ))}
                  </ul>
                </Acc>
                <Acc titulo="Erro do Cliente" badge={<Pill cor="laranja"><AlertTriangle className="h-2.5 w-2.5" />5–15 dias úteis</Pill>}>
                  <ul className="space-y-2 pt-1">
                    {["Peças do projeto original enviado à produção","Arquivo .promob só com as peças a substituir","Nome: AT-PV-422-COZINHA (máx. 20 caracteres)"].map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]"><ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}</li>
                    ))}
                  </ul>
                </Acc>
                <Acc titulo="AT Curinga — Erro do Cliente" badge={<Pill cor="cinza">Regras especiais</Pill>}>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="border border-[#F0EDE8] p-3"><p className="text-[10px] text-[#1A1917]/30 font-bold uppercase tracking-widest">Valor mínimo</p><p className="text-[#1A1917] font-semibold text-sm mt-0.5">R$ 1.000,00</p></div>
                    <div className="border border-[#F0EDE8] p-3"><p className="text-[10px] text-[#1A1917]/30 font-bold uppercase tracking-widest">Prazo</p><p className="text-[#1A1917] font-semibold text-sm mt-0.5">Até 15 dias úteis</p></div>
                  </div>
                </Acc>
                <Acc titulo="Validação em 24h">
                  <Alerta tipo="info">Em até <strong>24 horas</strong> você recebe retorno confirmando o aceite ou não da solicitação.</Alerta>
                </Acc>
              </div>
            </section>

            {/* 07 */}
            <section id="financeiro" className="py-10 scroll-mt-20">
              <SecTitle n="07" titulo="Condições Comerciais e Financeiras"
                resumo="PIX antecipado, cartão até 18×, ou parcelado 2× (50%+50%). Convênios com Santander e PagSeguro, divisão 60/40." />
              <Alerta tipo="critico">Produção liberada só após pagamento integral — ou 1ª parcela no caso do 2×. Retirada só após quitação total.</Alerta>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mt-6 mb-3">Pagamento à fábrica</p>
              <div className="space-y-2">
                <Acc titulo="PIX ou Transferência Bancária" badge={<Pill cor="verde"><Check className="h-2.5 w-2.5" />Liberação imediata</Pill>} defaultOpen>
                  <p className="text-xs text-[#6B6966]">Pagamento 100% antecipado. Liberação assim que o pagamento é compensado.</p>
                </Acc>
                <Acc titulo="Cartão de Crédito" badge={<Pill cor="laranja">Até 18×</Pill>}>
                  <ul className="space-y-1.5">
                    {["Até 3× sem juros","Até 18× com acréscimo de juros","Cartão da loja obrigatório — NF emitida para o CNPJ que paga"].map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]"><ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}</li>
                    ))}
                  </ul>
                </Acc>
                <Acc titulo="Parcelado em 2×" badge={<Pill cor="cinza">50% + 50%</Pill>}>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="border border-[#E8E6E3] p-3 text-center"><p className="text-[#E67A22] font-bold">50%</p><p className="text-[#6B6966] text-xs mt-1">Antecipado → libera produção</p></div>
                    <div className="border border-[#E8E6E3] p-3 text-center"><p className="text-[#1A1917] font-bold">50%</p><p className="text-[#6B6966] text-xs mt-1">Na retirada (máx. 15 dias após disponibilidade)</p></div>
                  </div>
                  <Alerta tipo="aviso">Atraso na 2ª parcela gera boleto automático e suspensão da condição de parcelamento.</Alerta>
                </Acc>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mt-8 mb-3">Convênios — venda ao cliente final</p>
              <div className="space-y-2">
                <Acc titulo="Santander Financeira" badge={<Pill cor="cinza">60% lojista · 40% Fabriko</Pill>}>
                  <ul className="space-y-2">
                    {["Contate o Consultor Santander da sua região para vincular sua loja.","Aprovação feita diretamente pelo banco.","Crédito D+1, deduzidas taxas. 60% ao lojista · 40% à Fabriko.","Crédito vinculado ao mesmo CPF/CNPJ financiado (norma Santander)."].map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]"><ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}</li>
                    ))}
                  </ul>
                </Acc>
                <Acc titulo="PagSeguro (maquininha)" badge={<Pill cor="cinza">60% lojista · 40% Fabriko</Pill>}>
                  <ul className="space-y-2">
                    {["Solicite ficha cadastral ao representante Fabriko e envie para financeiro@fabriko.ind.br.","Maquininha enviada pela PagSeguro em até 30 dias.","Crédito D+1, 60% lojista · 40% Fabriko (lançado como crédito para pedidos futuros)."].map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]"><ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}</li>
                    ))}
                  </ul>
                </Acc>
              </div>
            </section>

            {/* 08 */}
            <section id="armazenagem" className="py-10 scroll-mt-20">
              <SecTitle n="08" titulo="Armazenamento de Pedidos Produzidos"
                resumo="15 dias corridos grátis após a conclusão da produção. Após esse prazo: 1% do valor do pedido por mês." />
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="border border-green-200 bg-green-50/60 p-6">
                  <Pill cor="verde"><Check className="h-2.5 w-2.5" />Gratuito</Pill>
                  <p className="text-green-800 font-[family-name:var(--font-playfair)] font-bold text-3xl mt-3">15 dias</p>
                  <p className="text-green-700/60 text-sm mt-1">corridos a partir do término da produção</p>
                </div>
                <div className="border border-[#E8E6E3] bg-white p-6">
                  <Pill cor="laranja"><AlertTriangle className="h-2.5 w-2.5" />Após o prazo</Pill>
                  <p className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-bold text-3xl mt-3">1% / mês</p>
                  <p className="text-[#6B6966] text-sm mt-1">sobre o valor do pedido</p>
                </div>
              </div>
            </section>

            {/* 09 */}
            <section id="contatos" className="py-10 scroll-mt-20">
              <SecTitle n="09" titulo="Canais de Contato Fabriko"
                resumo="Use sempre o canal correto para cada assunto — garante agilidade e rastreabilidade." />
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { canal: "Pedidos",             contato: "pedido@fabriko.ind.br",      tipo: "email",    desc: "Envio de projetos para produção"               },
                  { canal: "Assistência Técnica", contato: "assistencia@fabriko.ind.br", tipo: "email",    desc: "Canal exclusivo — outros canais não aceitos"    },
                  { canal: "Suporte Técnico",     contato: "projetos@fabriko.ind.br",    tipo: "email",    desc: "Dúvidas técnicas e suporte Promob"              },
                  { canal: "Financeiro",          contato: "financeiro@fabriko.ind.br",  tipo: "email",    desc: "Pagamentos, convênios e ficha PagSeguro"        },
                  { canal: "WhatsApp",            contato: "(19) 99625-2987",            tipo: "whatsapp", desc: "Atendimento direto Fabriko"                     },
                ].map(({ canal, contato, tipo, desc }) => (
                  <a key={canal}
                    href={tipo === "email" ? `mailto:${contato}` : `https://wa.me/55${contato.replace(/\D/g, "")}`}
                    target={tipo === "whatsapp" ? "_blank" : undefined}
                    rel={tipo === "whatsapp" ? "noopener noreferrer" : undefined}
                    className="group border border-[#E8E6E3] bg-white hover:border-[#E67A22]/40 hover:bg-[#FFF3E8]/30 p-5 transition-all flex gap-3">
                    {tipo === "email" ? <Mail className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" /> : <Phone className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30">{canal}</p>
                      <p className="text-[#E67A22] text-sm font-semibold mt-0.5 group-hover:underline break-all">{contato}</p>
                      <p className="text-[#6B6966] text-xs mt-0.5">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            </div>{/* fim max-w inner */}
          </div>{/* fim seções */}
      </div>{/* fim guia */}

      {/* ══ FABRIKO ACADEMY ════════════════════════════════════════ */}
      <section className="bg-[#1A1917] py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-4 w-4 text-[#E67A22]" />
                <p className="text-[#E67A22] text-[10px] font-bold tracking-[0.2em] uppercase">Fabriko Academy</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-black text-white">
                Aprenda no seu ritmo.
              </h2>
              <p className="text-white/30 text-sm mt-2 max-w-md">
                Vídeos práticos para dominar cada etapa da parceria Fabriko — do Promob à entrega.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E67A22]" />
              <p className="text-white/30 text-xs">1 disponível · 4 em breve</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {ACADEMY.map((item, i) => (
              <div key={item.titulo}
                className={`group relative overflow-hidden border transition-all ${
                  item.disponivel
                    ? "border-[#E67A22]/30 hover:border-[#E67A22] cursor-pointer"
                    : "border-white/10 opacity-70"
                } ${i === 0 ? "md:col-span-2 md:row-span-1" : ""}`}
                onClick={() => item.disponivel && item.youtubeId && setAcademyVideo(item.youtubeId)}
              >
                <div className={`relative overflow-hidden bg-[#0D0D0B] ${i === 0 ? "aspect-video" : "aspect-video"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.thumb} alt={item.titulo}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      item.disponivel
                        ? "opacity-60 group-hover:opacity-80 group-hover:scale-105"
                        : "opacity-30 blur-[1px]"
                    }`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-[#0D0D0B]/20 to-transparent" />

                  {item.disponivel ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#E67A22] group-hover:bg-[#E67A22]/20 transition-all">
                        <Play className="h-5 w-5 text-white ml-0.5" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center">
                          <Lock className="h-4 w-4 text-white/30" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#E67A22] bg-[#E67A22]/10 border border-[#E67A22]/30 px-2 py-0.5">Em breve</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#1A1917]">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-semibold text-sm ${item.disponivel ? "text-white" : "text-white/40"}`}>{item.titulo}</p>
                    <span className="text-white/20 text-[10px] shrink-0 mt-0.5">{item.duracao}</span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${item.disponivel ? "text-white/50" : "text-white/20"}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER CTA ════════════════════════════════════════════ */}
      <section className="bg-[#0D0D0B] py-16 px-6 text-center border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <p className="text-[#E67A22] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Próximo passo</p>
          <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-black text-white mb-3">
            Pronto para começar?
          </h2>
          <p className="text-white/30 text-sm mb-8">
            Fale com o suporte técnico Fabriko e dê o primeiro passo da sua parceria.
          </p>
          <a href="https://wa.me/5519996252987?text=Ol%C3%A1%2C%20acessei%20o%20Guia%20do%20Parceiro%20Fabriko%20e%20gostaria%20de%20iniciar%20minha%20parceria."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#E67A22] hover:bg-[#C85E0F] text-white font-bold text-xs px-8 py-4 tracking-widest uppercase transition-all">
            <Phone className="h-4 w-4" />
            Falar com a Fabriko
          </a>
          <p className="text-white/15 text-[10px] mt-8 tracking-widest uppercase">
            Fabriko · Manual Rev. 3 · 17/03/2026
          </p>
        </div>
      </section>

      {/* ══ BOTÃO FLUTUANTE ════════════════════════════════════════ */}
      <a href="https://wa.me/5519996252987?text=Ol%C3%A1%2C%20preciso%20de%20suporte%20t%C3%A9cnico%20Fabriko."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#E67A22] hover:bg-[#C85E0F] text-white text-xs font-bold px-4 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <MessageCircle className="h-4 w-4 shrink-0" />
        Suporte técnico
      </a>

      {/* ══ VIDEO MODALS ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {(videoOpen || academyVideo) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:p-12"
            onClick={() => { setVideoOpen(false); setAcademyVideo(null); }}>
            <button onClick={() => { setVideoOpen(false); setAcademyVideo(null); }}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10">
              <X className="h-6 w-6" />
            </button>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.25 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}>
              <iframe
                src={`https://www.youtube.com/embed/${academyVideo ?? "p1NaTAbQBNw"}?autoplay=1`}
                className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
