"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock, Mail, Phone, AlertTriangle, Check, ChevronDown, ChevronRight,
  ExternalLink, CreditCard, Landmark, Smartphone, Package, Wrench,
  Download, Info, AlertCircle, FileText, Menu, X,
} from "lucide-react";

// ─── tipos e dados de navegação ───────────────────────────────────────────────

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
  { label: "Prazo padrão",           valor: "20 dias úteis",  sub: "a partir da liberação financeira" },
  { label: "Curinga e Especial",     valor: "25 dias úteis",  sub: "a partir da liberação financeira" },
  { label: "Armazenagem grátis",     valor: "15 dias corridos", sub: "após término da produção"      },
  { label: "Validação AT",           valor: "24 horas",       sub: "após envio da solicitação"       },
  { label: "E-mail pedidos",         valor: "pedido@fabriko.ind.br",       sub: "envio de projetos",  link: "mailto:pedido@fabriko.ind.br"       },
  { label: "E-mail assistência",     valor: "assistencia@fabriko.ind.br",  sub: "somente AT",         link: "mailto:assistencia@fabriko.ind.br"  },
];

// ─── componentes utilitários ──────────────────────────────────────────────────

function Acc({ titulo, badge, defaultOpen = false, children }: {
  titulo: string; badge?: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#E8E6E3] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-white hover:bg-[#FAFAF8] text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#1A1917] font-semibold text-sm">{titulo}</span>
          {badge}
        </div>
        <ChevronDown className={`h-4 w-4 text-[#1A1917]/25 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 bg-white border-t border-[#F0EDE8] space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Alerta({ tipo = "aviso", children }: { tipo?: "aviso" | "info" | "critico"; children: React.ReactNode }) {
  const s = {
    aviso:  { cls: "bg-[#FFF3E8] border-[#E67A22]/30",  icon: <AlertTriangle className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" /> },
    info:   { cls: "bg-blue-50 border-blue-200",         icon: <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" /> },
    critico:{ cls: "bg-red-50 border-red-200",           icon: <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> },
  }[tipo];
  return (
    <div className={`flex gap-3 border p-4 ${s.cls}`}>{s.icon}<p className="text-sm leading-relaxed text-[#1A1917]">{children}</p></div>
  );
}

function Pill({ cor, children }: { cor: "verde" | "laranja" | "cinza"; children: React.ReactNode }) {
  const cls = { verde: "bg-green-100 text-green-700 border-green-200", laranja: "bg-[#E67A22]/10 text-[#E67A22] border-[#E67A22]/25", cinza: "bg-[#F0EDE8] text-[#1A1917]/50 border-[#E8E6E3]" }[cor];
  return <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 ${cls}`}>{children}</span>;
}

function EmailMock({ assunto, para, cc, corpo, anexos }: { assunto: string; para: string; cc?: string; corpo: string[]; anexos?: string[] }) {
  return (
    <div className="border border-[#E8E6E3] bg-white text-xs font-mono overflow-hidden">
      <div className="bg-[#F5F3F0] border-b border-[#E8E6E3] px-3 py-2 flex gap-1.5">
        {["bg-red-300", "bg-yellow-300", "bg-green-300"].map((c) => <span key={c} className={`h-2.5 w-2.5 rounded-full ${c} opacity-60`} />)}
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

function SecTitle({ n, titulo, desc }: { n: string; titulo: string; desc?: string }) {
  return (
    <div className="flex items-start gap-4 mb-7">
      <span className="text-[#E67A22]/15 font-[family-name:var(--font-playfair)] font-black text-4xl leading-none shrink-0 select-none w-10">{n}</span>
      <div>
        <h2 className="text-lg font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">{titulo}</h2>
        {desc && <p className="text-[#6B6966] text-xs mt-1 leading-relaxed max-w-xl">{desc}</p>}
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ active, onSelect, mobile, onClose }: {
  active: string; onSelect: (id: string) => void; mobile?: boolean; onClose?: () => void;
}) {
  return (
    <div className={mobile
      ? "flex flex-col h-full w-72 bg-[#1A1917]"
      : "hidden lg:flex flex-col w-64 shrink-0 bg-[#1A1917] fixed top-[60px] left-0 bottom-0 overflow-y-auto z-20"
    }>
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <p className="text-[#E67A22] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Área do Cliente</p>
        <p className="text-white font-[family-name:var(--font-playfair)] font-bold text-base leading-tight">Manual do Parceiro</p>
        <p className="text-white/25 text-[10px] mt-1">Rev. 3 · 17/03/2026</p>
      </div>

      <nav className="flex-1 py-4 px-3">
        {SECOES.map(({ id, n, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => { onSelect(id); onClose?.(); }}
            className={`flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all group ${
              active === id
                ? "bg-[#E67A22]/15 border-l-2 border-[#E67A22] text-white"
                : "border-l-2 border-transparent text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className={`text-[10px] font-bold tabular-nums shrink-0 ${active === id ? "text-[#E67A22]" : "text-white/20 group-hover:text-white/40"}`}>{n}</span>
            <span className="text-xs font-medium">{label}</span>
          </a>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <p className="text-white/20 text-[10px]">FABRIKO · Americana-SP</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AreaDoCliente() {
  const [active, setActive] = useState("promob");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const offset = 100;
      for (let i = SECOES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECOES[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(SECOES[i].id);
          return;
        }
      }
      setActive(SECOES[0].id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.div initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed top-0 left-0 bottom-0 z-50 lg:hidden">
              <Sidebar active={active} onSelect={setActive} mobile onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <Sidebar active={active} onSelect={setActive} />

      {/* Main content */}
      <div className="lg:ml-64">

        {/* Top bar mobile */}
        <div className="lg:hidden sticky top-[60px] z-30 bg-[#1A1917] px-4 py-3 flex items-center gap-3 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="text-white/60 hover:text-white transition-colors">
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Manual do Parceiro</p>
            <p className="text-white/30 text-[10px] mt-0.5">
              {SECOES.find(s => s.id === active)?.n} · {SECOES.find(s => s.id === active)?.label}
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="bg-[#1A1917] pt-20 pb-10 px-8 lg:pt-16 lg:pb-10 border-b border-white/10">
          <p className="text-[#E67A22] text-[10px] font-bold tracking-[0.18em] uppercase mb-3 hidden lg:block">
            Fabriko · Área do Cliente
          </p>
          <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-black text-white mb-1">
            Manual de Procedimentos
          </h1>
          <p className="text-white/30 text-sm">e Política de Vendas · Revisão 3</p>
        </div>

        {/* Quick reference */}
        <div className="px-8 py-8 border-b border-[#E8E6E3] bg-white">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mb-4">Consulta rápida</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {QUICK.map(({ label, valor, sub, link }) => (
              link
                ? <a key={label} href={link}
                    className="border border-[#E8E6E3] hover:border-[#E67A22]/40 hover:bg-[#FFF3E8]/40 p-4 transition-all group">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mb-1">{label}</p>
                    <p className="text-[#E67A22] font-semibold text-xs group-hover:underline break-all">{valor}</p>
                    <p className="text-[#1A1917]/30 text-[10px] mt-0.5">{sub}</p>
                  </a>
                : <div key={label} className="border border-[#E8E6E3] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mb-1">{label}</p>
                    <p className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-bold text-base">{valor}</p>
                    <p className="text-[#1A1917]/30 text-[10px] mt-0.5">{sub}</p>
                  </div>
            ))}
          </div>
        </div>

        {/* ── Seções ── */}
        <div className="px-8 divide-y divide-[#E8E6E3]">

          {/* 01 · PROMOB */}
          <section id="promob" className="py-10 scroll-mt-20">
            <SecTitle n="01" titulo="Solicitação do Promob Studio Fabriko"
              desc="Ative a biblioteca Fabriko no Promob Studio seguindo os passos abaixo." />
            <div className="space-y-2">
              <Acc titulo="Ativação da licença" defaultOpen>
                <div className="pt-2">
                  <Step n={1} titulo="Acesse o portal Promob">
                    <a href="https://portal.promob.com/loja" target="_blank" rel="noopener noreferrer"
                      className="text-[#E67A22] hover:underline inline-flex items-center gap-1">
                      portal.promob.com/loja <ExternalLink className="h-3 w-3" />
                    </a>{" "}e faça login com usuário e senha.
                  </Step>
                  <Step n={2} titulo='Pesquise "FABRIKO" e clique em Solicitar Autorização' />
                  <Step n={3} titulo="Avise seu Consultor Fabriko para liberar a licença" />
                  <Step n={4} titulo="Store → Intenções de Compra → Comprar Agora">
                    Selecione <strong>Assinatura Mensal (1 Mês GRÁTIS)</strong> → Assinar Agora. Um cartão de crédito será solicitado para cobrança após o período de teste.
                  </Step>
                </div>
              </Acc>
              <Acc titulo="Download do software">
                <Step n={5} titulo="Baixe o Promob Studio">
                  <a href="https://portal.promob.com/Home" target="_blank" rel="noopener noreferrer"
                    className="text-[#E67A22] hover:underline inline-flex items-center gap-1">
                    portal.promob.com/Home <ExternalLink className="h-3 w-3" />
                  </a>{" "}— link de download no rodapé da página.
                </Step>
              </Acc>
              <Acc titulo="Cancelamento e suporte">
                <Alerta tipo="critico">
                  <strong>Cancelamento é sua responsabilidade.</strong> Se não quiser continuar após os 30 dias gratuitos, cancele a assinatura no portal Promob antes do término. A Fabriko não tem acesso nem relação com os pagamentos da Promob.
                </Alerta>
                <div className="flex items-center gap-2 text-sm text-[#1A1917] mt-2">
                  <Phone className="h-3.5 w-3.5 text-[#E67A22] shrink-0" />
                  Suporte Promob: <strong>(54) 3209-9200</strong> · Seg–Sex 8h às 18h30
                </div>
              </Acc>
            </div>
          </section>

          {/* 02 · PEDIDOS */}
          <section id="pedidos" className="py-10 scroll-mt-20">
            <SecTitle n="02" titulo="Envio de Pedido Fabriko"
              desc="Projetos revisados devem ser enviados por e-mail ao setor responsável da fábrica." />
            <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3 mb-4">
              <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
              <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>20 dias úteis</strong> a partir da liberação financeira</p>
            </div>
            <div className="space-y-2">
              <Acc titulo="Regras do e-mail e dos arquivos" defaultOpen>
                <ul className="space-y-3 pt-1">
                  {[
                    { t: "Assunto do e-mail", d: "Nome da loja + nome do cliente final, máx. 20 caracteres cada. Não incluir no nome do arquivo Promob." },
                    { t: "Arquivos Promob", d: "Um arquivo .promob por ambiente, nomeado com o nome do ambiente (ex: COZINHA.promob)." },
                    { t: "Aba interna", d: "Nomear a aba interna do projeto com o nome do ambiente." },
                    { t: "Dados do cliente", d: 'Inserir o nome do cliente final no campo "Dados do Cliente" dentro do Promob.' },
                    { t: "CC obrigatório", d: "Copie sempre o e-mail do seu Consultor Fabriko." },
                  ].map(({ t, d }) => (
                    <li key={t} className="flex gap-2">
                      <Check className="h-3.5 w-3.5 text-[#E67A22] shrink-0 mt-0.5" />
                      <div><p className="text-xs font-semibold text-[#1A1917]">{t}</p><p className="text-xs text-[#6B6966] mt-0.5">{d}</p></div>
                    </li>
                  ))}
                </ul>
              </Acc>
              <Acc titulo="Exemplo de e-mail">
                <EmailMock
                  para="pedido@fabriko.ind.br" cc="consultor@fabriko.ind.br"
                  assunto="JOÃO JOSÉ–PLANEJADOS"
                  anexos={["COZINHA.promob"]}
                  corpo={["Boa tarde,","Segue arquivo Promob referente ao projeto do cliente final João José, contendo um ambiente para produção.","Ambiente para produção:","1 - COZINHA - Sem informações especiais.","Projeto revisado, pode ser liberado para produção.","Att. PLANEJADOS & CIA."]}
                />
              </Acc>
            </div>
          </section>

          {/* 03 · CURINGA */}
          <section id="curinga" className="py-10 scroll-mt-20">
            <SecTitle n="03" titulo="Pedido com Acabamento Curinga"
              desc="Para acabamentos fora do portfólio Fabriko. Disponíveis na biblioteca Promob como Curinga Cor, Mad e Brilho." />
            <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3 mb-4">
              <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
              <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>25 dias úteis</strong> a partir da liberação financeira</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { tipo: "Curinga Cor", qtd: "10 opções", desc: "Unicolor especiais" },
                { tipo: "Curinga Mad", qtd: "4 opções",  desc: "Madeiras, pedras, tecidos, metais" },
                { tipo: "Curinga Brilho", qtd: "1 opção", desc: "Acabamento com brilho" },
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
                <Alerta tipo="aviso">
                  <strong>Curinga Mad</strong> inclui <em>todos</em> os acabamentos com veio: madeiras, pedras, tecidos, metais, etc.
                </Alerta>
                <ul className="space-y-2 mt-2">
                  {[
                    "Enviar em arquivo Promob separado do projeto principal",
                    "Um arquivo por tipo de Curinga",
                    `Nomear como: COZINHA–CURINGA COR 1`,
                    "Enviar junto com os demais ambientes no mesmo e-mail",
                    "Alertar no corpo do e-mail a existência do arquivo Curinga",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]">
                      <ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </Acc>
              <Acc titulo="Exemplo de e-mail com Curinga">
                <EmailMock
                  para="pedido@fabriko.ind.br" cc="consultor@fabriko.ind.br"
                  assunto="JOÃO JOSÉ–PLANEJADOS"
                  anexos={["COZINHA.promob","COZINHA-CURINGA COR 1.promob"]}
                  corpo={["Boa tarde,","Seguem arquivos Promob referentes ao projeto do cliente final João José:","1 - COZINHA - Sem informações especiais.","2 - COZINHA-CURINGA COR 1 - Verde Oliva Duratex.","Projetos revisados, podem ser liberados para produção.","Att. PLANEJADOS & CIA."]}
                />
              </Acc>
            </div>
          </section>

          {/* 04 · ESPECIAL */}
          <section id="especial" className="py-10 scroll-mt-20">
            <SecTitle n="04" titulo="Produto Especial"
              desc="Itens fora do portfólio e não disponíveis no Promob Fabriko. Exigem aprovação prévia da engenharia." />
            <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3 mb-4">
              <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
              <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>25 dias úteis</strong> a partir da liberação financeira</p>
            </div>
            <div className="space-y-2">
              <Acc titulo="Passo a passo" defaultOpen>
                <div className="pt-1">
                  <Step n={1} titulo="Aprovação prévia obrigatória da engenharia">
                    Acione seu Consultor Fabriko. <strong>Pedidos sem aprovação serão recusados automaticamente.</strong>
                  </Step>
                  <Step n={2} titulo="Arquivo Promob separado">
                    Nomear como <code className="bg-[#F0EDE8] text-[#1A1917] px-1 font-mono">COZINHA–ESPECIAIS</code>, separado do projeto principal.
                  </Step>
                  <Step n={3} titulo="Descontos zerados no Promob">
                    Abrir a aba de Margens e zerar os descontos de compra. Manter apenas o IPI de 3,5%.
                  </Step>
                  <Step n={4} titulo="Alertar no e-mail">
                    Mencionar no corpo do e-mail a existência do arquivo de itens especiais.
                  </Step>
                </div>
              </Acc>
              <Acc titulo="Exemplo de e-mail com Especial">
                <EmailMock
                  para="pedido@fabriko.ind.br" cc="consultor@fabriko.ind.br"
                  assunto="JOÃO JOSÉ–PLANEJADOS"
                  anexos={["COZINHA.promob","COZINHA-ESPECIAIS.promob"]}
                  corpo={["Boa tarde,","Seguem arquivos Promob referentes ao projeto do cliente final João José:","1 - COZINHA - Sem informações especiais.","2 - COZINHA-ESPECIAIS - Painéis Branco TX com fita de borda Tauari Guararapes.","Projetos revisados, podem ser liberados para produção.","Att. PLANEJADOS & CIA."]}
                />
              </Acc>
            </div>
          </section>

          {/* 05 · PAINÉIS */}
          <section id="paineis" className="py-10 scroll-mt-20">
            <SecTitle n="05" titulo="Painéis Personalizados"
              desc="Painéis e tampos em formas livres projetados diretamente no Promob, sem necessidade de desenho adicional." />
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { l: "Localização no Promob", v: "Componentes → Avulsos → Painéis Personalizados" },
                { l: "Espessuras", v: "15mm · 18mm · 30mm · 36mm" },
                { l: "Acabamentos", v: "Toda a linha + Curingas" },
                { l: "Borda padrão", v: "0,45mm em todos os acabamentos" },
              ].map(({ l, v }) => (
                <div key={l} className="border border-[#E8E6E3] bg-white px-4 py-3 flex gap-3">
                  <span className="text-[#1A1917]/30 text-[10px] font-bold uppercase tracking-widest w-28 shrink-0 mt-0.5">{l}</span>
                  <span className="text-[#1A1917] text-sm">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Acc titulo="6 restrições de formato e usinagem" defaultOpen>
                <div className="space-y-2 pt-1">
                  {[
                    { n: "1", r: "Sem furos ou rasgos internos",        d: "Nenhum tipo de furo ou rasgo pode estar no interior da peça." },
                    { n: "2", r: "Extremidades agudas ≥ 20mm",          d: "Podem ser retas ou arredondadas." },
                    { n: "3", r: "Área principal ≥ 200×200mm",          d: "Área secundária com mínimo de 70mm." },
                    { n: "4", r: "Vão com borda ≥ 100mm",               d: "Espaço mínimo entre usinagens com acabamento de borda." },
                    { n: "5", r: "Largura sem borda ≥ 12mm",            d: "Largura mínima de usinagem sem acabamento de borda." },
                    { n: "6", r: "Desenho 100% dentro do painel",       d: "O contorno da peça deve estar totalmente dentro dos limites do painel." },
                  ].map(({ n, r, d }) => (
                    <div key={n} className="flex gap-3 border border-[#F0EDE8] p-3">
                      <span className="h-5 w-5 bg-[#E67A22]/10 text-[#E67A22] text-[11px] font-bold flex items-center justify-center shrink-0">{n}</span>
                      <div><p className="text-xs font-semibold text-[#1A1917]">{r}</p><p className="text-xs text-[#6B6966] mt-0.5">{d}</p></div>
                    </div>
                  ))}
                </div>
              </Acc>
              <Acc titulo="Vértices sobrepostos — atenção">
                <Alerta tipo="aviso">
                  Ao editar o Painel Personalizado, remova qualquer vértice sobreposto no desenho. A usinagem segue a sequência de vértices — um vértice sobreposto faz a máquina interpretar o trecho como linha reta, alterando o formato desejado.
                </Alerta>
              </Acc>
            </div>
          </section>

          {/* 06 · ASSISTÊNCIA */}
          <section id="assistencia" className="py-10 scroll-mt-20">
            <SecTitle n="06" titulo="Assistência Técnica"
              desc="Canal exclusivo: assistencia@fabriko.ind.br — solicitações por outros canais não serão aceitas." />
            <Alerta tipo="critico">
              <strong>assistencia@fabriko.ind.br é o único canal aceito.</strong> Toda assistência técnica deve ser solicitada exclusivamente por este e-mail para garantir os prazos e a fabricação correta.
            </Alerta>
            <div className="space-y-2 mt-4">
              <Acc titulo="Erro da Fábrica" badge={<Pill cor="verde"><Check className="h-2.5 w-2.5" />5–10 dias úteis</Pill>} defaultOpen>
                <ul className="space-y-2 pt-1">
                  {[
                    "Peças idênticas às do projeto Promob original",
                    "Arquivo .promob somente com as peças a substituir",
                    "Nome do arquivo: AT-PV-422-COZINHA",
                    "Foto da etiqueta da peça original",
                    "Foto e/ou vídeo do problema constatado",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]">
                      <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </Acc>
              <Acc titulo="Erro do Cliente" badge={<Pill cor="laranja"><AlertTriangle className="h-2.5 w-2.5" />5–15 dias úteis</Pill>}>
                <ul className="space-y-2 pt-1">
                  {[
                    "Peças devem constar no projeto original enviado à produção",
                    "Arquivo .promob somente com as peças a substituir",
                    "Nome: AT-PV-422-COZINHA (máx. 20 caracteres)",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]">
                      <ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </Acc>
              <Acc titulo="Curinga — Erro do Cliente" badge={<Pill cor="cinza">Regras especiais</Pill>}>
                <div className="space-y-2 pt-1">
                  <div className="flex gap-3 border border-[#F0EDE8] p-3">
                    <span className="text-[#1A1917]/30 text-[10px] font-bold uppercase tracking-widest w-28 shrink-0">Valor mínimo</span>
                    <span className="text-[#1A1917] font-semibold text-sm">R$ 1.000,00</span>
                  </div>
                  <div className="flex gap-3 border border-[#F0EDE8] p-3">
                    <span className="text-[#1A1917]/30 text-[10px] font-bold uppercase tracking-widest w-28 shrink-0">Prazo</span>
                    <span className="text-[#1A1917] font-semibold text-sm">Até 15 dias úteis após liberação financeira</span>
                  </div>
                </div>
              </Acc>
              <Acc titulo="Validação da solicitação">
                <Alerta tipo="info">
                  Em até <strong>24 horas</strong> após o envio, você receberá um comunicado informando se a solicitação foi aceita ou não, independentemente do motivo.
                </Alerta>
              </Acc>
            </div>
          </section>

          {/* 07 · FINANCEIRO */}
          <section id="financeiro" className="py-10 scroll-mt-20">
            <SecTitle n="07" titulo="Condições Comerciais e Financeiras" />
            <Alerta tipo="critico">
              A produção só é liberada após o pagamento integral do pedido — ou, no parcelado 2×, após o pagamento da primeira parcela. O pedido só pode ser retirado após quitação total.
            </Alerta>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mt-6 mb-3">Pagamento à fábrica</p>
            <div className="space-y-2">
              <Acc titulo="PIX ou Transferência Bancária" badge={<Pill cor="verde"><Check className="h-2.5 w-2.5" />Liberação imediata</Pill>} defaultOpen>
                <p className="text-xs text-[#6B6966]">Pagamento 100% antecipado. O pedido é liberado para produção assim que o pagamento é compensado na conta da Fabriko.</p>
              </Acc>
              <Acc titulo="Cartão de Crédito" badge={<Pill cor="laranja">Até 18×</Pill>}>
                <ul className="space-y-1.5">
                  {[
                    "Até 3× sem juros",
                    "Até 18× com acréscimo de juros e taxas",
                    "Cartão obrigatoriamente da loja — NF emitida para o CNPJ do pagamento",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]">
                      <ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </Acc>
              <Acc titulo="Parcelado em 2×" badge={<Pill cor="cinza">50% + 50%</Pill>}>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-[#E8E6E3] p-3 text-center">
                      <p className="text-[#E67A22] font-bold text-sm">50%</p>
                      <p className="text-[#6B6966] text-xs mt-0.5">Antecipado → libera produção</p>
                    </div>
                    <div className="border border-[#E8E6E3] p-3 text-center">
                      <p className="text-[#1A1917] font-bold text-sm">50%</p>
                      <p className="text-[#6B6966] text-xs mt-0.5">Na retirada (máx. 15 dias após disponibilidade)</p>
                    </div>
                  </div>
                  <Alerta tipo="aviso">
                    Atraso na 2ª parcela gera boleto automático sem aviso prévio e suspensão da condição de parcelamento a partir do pedido seguinte.
                  </Alerta>
                </div>
              </Acc>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30 mt-8 mb-3">Convênios — venda ao cliente final</p>
            <div className="space-y-2">
              <Acc titulo="Santander Financeira" badge={<Pill cor="cinza">60% lojista · 40% Fabriko</Pill>}>
                <ul className="space-y-2">
                  {[
                    "Entre em contato com o Consultor Santander da sua região para vincular sua loja à Fabriko.",
                    "Aprovação do cadastro feita diretamente pelo banco — a Fabriko não interfere.",
                    "Uma vez aprovado: Santander emite boletos ao cliente final e paga D+1 (deduzidas taxas).",
                    "60% ao lojista · 40% à Fabriko (destinado ao pedido do cliente financiado).",
                    "Norma: crédito vinculado ao mesmo CPF/CNPJ financiado.",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]">
                      <ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </Acc>
              <Acc titulo="PagSeguro (maquininha)" badge={<Pill cor="cinza">60% lojista · 40% Fabriko</Pill>}>
                <ul className="space-y-2">
                  {[
                    "Solicite a ficha cadastral ao representante Fabriko e devolva preenchida para financeiro@fabriko.ind.br.",
                    "Após aprovação, a maquininha é enviada pela PagSeguro em até 30 dias.",
                    "Vendas aprovadas: crédito D+1 (deduzidas taxas). 60% ao lojista · 40% à Fabriko.",
                    "O crédito da Fabriko é lançado como crédito ao lojista para pedidos futuros.",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]">
                      <ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </Acc>
            </div>
          </section>

          {/* 08 · ARMAZENAGEM */}
          <section id="armazenagem" className="py-10 scroll-mt-20">
            <SecTitle n="08" titulo="Armazenamento de Pedidos Produzidos" />
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="border border-green-200 bg-green-50/60 p-5">
                <Pill cor="verde"><Check className="h-2.5 w-2.5" />Gratuito</Pill>
                <p className="text-green-800 font-[family-name:var(--font-playfair)] font-bold text-2xl mt-3">15 dias corridos</p>
                <p className="text-green-700/60 text-sm mt-1">a partir do término da produção</p>
              </div>
              <div className="border border-[#E8E6E3] bg-white p-5">
                <Pill cor="laranja"><AlertTriangle className="h-2.5 w-2.5" />Após o prazo</Pill>
                <p className="text-[#1A1917] font-[family-name:var(--font-playfair)] font-bold text-2xl mt-3">1% ao mês</p>
                <p className="text-[#6B6966] text-sm mt-1">sobre o valor do pedido</p>
              </div>
            </div>
          </section>

          {/* 09 · CONTATOS */}
          <section id="contatos" className="py-10 scroll-mt-20">
            <SecTitle n="09" titulo="Canais de Contato Fabriko" />
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { canal: "Pedidos",               contato: "pedido@fabriko.ind.br",       tipo: "email", desc: "Envio de projetos para produção"              },
                { canal: "Assistência Técnica",   contato: "assistencia@fabriko.ind.br",  tipo: "email", desc: "Canal exclusivo AT — outros canais não aceitos" },
                { canal: "Suporte Técnico",       contato: "projetos@fabriko.ind.br",     tipo: "email", desc: "Dúvidas técnicas e suporte Promob"              },
                { canal: "Financeiro",            contato: "financeiro@fabriko.ind.br",   tipo: "email", desc: "Pagamentos, convênios e ficha PagSeguro"        },
                { canal: "WhatsApp",              contato: "(19) 99625-2987",             tipo: "whatsapp", desc: "Atendimento direto Fabriko"                  },
              ].map(({ canal, contato, tipo, desc }) => (
                <a
                  key={canal}
                  href={tipo === "email" ? `mailto:${contato}` : `https://wa.me/55${contato.replace(/\D/g, "")}`}
                  target={tipo === "whatsapp" ? "_blank" : undefined}
                  rel={tipo === "whatsapp" ? "noopener noreferrer" : undefined}
                  className="group border border-[#E8E6E3] bg-white hover:border-[#E67A22]/40 hover:bg-[#FFF3E8]/30 p-5 transition-all flex gap-3"
                >
                  {tipo === "email"
                    ? <Mail className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
                    : <Phone className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]/30">{canal}</p>
                    <p className="text-[#E67A22] text-sm font-semibold mt-0.5 group-hover:underline break-all">{contato}</p>
                    <p className="text-[#6B6966] text-xs mt-0.5">{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-[#1A1917] border-t border-white/10 px-8 py-8 text-center">
          <p className="text-white font-[family-name:var(--font-playfair)] font-bold text-base">FABRIKO, essencial para seu negócio.</p>
          <p className="text-white/20 text-[10px] tracking-widest uppercase mt-2">Manual Rev. 3 · 17/03/2026 · Americana-SP</p>
        </div>
      </div>
    </div>
  );
}
