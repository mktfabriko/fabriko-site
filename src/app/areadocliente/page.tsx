"use client";

import { motion } from "framer-motion";
import {
  Clock, Mail, Phone, AlertTriangle, Check, ChevronRight,
  ExternalLink, CreditCard, Landmark, Smartphone, Package,
  Wrench, FileText, Download, Info, AlertCircle,
} from "lucide-react";

// ─── helpers ──────────────────────────────────────────────────────────────────

function Badge({ children, cor = "laranja" }: { children: React.ReactNode; cor?: "laranja" | "cinza" | "vermelho" | "verde" }) {
  const map = {
    laranja: "bg-[#E67A22]/10 text-[#E67A22] border-[#E67A22]/25",
    cinza: "bg-[#1A1917]/5 text-[#1A1917]/60 border-[#E8E6E3]",
    vermelho: "bg-red-50 text-red-600 border-red-200",
    verde: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border px-2.5 py-1 ${map[cor]}`}>
      {children}
    </span>
  );
}

function Alerta({ tipo = "atencao", children }: { tipo?: "atencao" | "info" | "critico"; children: React.ReactNode }) {
  const map = {
    atencao: { bg: "bg-[#FFF3E8] border-[#E67A22]/30", icon: <AlertTriangle className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" /> },
    info: { bg: "bg-blue-50 border-blue-200", icon: <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" /> },
    critico: { bg: "bg-red-50 border-red-200", icon: <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> },
  };
  return (
    <div className={`flex gap-3 border p-4 rounded-sm ${map[tipo].bg}`}>
      {map[tipo].icon}
      <p className="text-sm leading-relaxed text-[#1A1917]">{children}</p>
    </div>
  );
}

function Passo({ n, titulo, children }: { n: number; titulo: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="h-7 w-7 bg-[#E67A22] text-white text-xs font-bold flex items-center justify-center shrink-0">
          {n}
        </span>
        <div className="w-px flex-1 bg-[#E8E6E3] mt-2" />
      </div>
      <div className="pb-6 flex-1">
        <p className="text-[#1A1917] font-semibold text-sm mb-1">{titulo}</p>
        {children && <div className="text-[#6B6966] text-sm leading-relaxed">{children}</div>}
      </div>
    </div>
  );
}

function EmailMock({ assunto, para, cc, corpo, anexos }: {
  assunto: string; para: string; cc?: string; corpo: string[]; anexos?: string[];
}) {
  return (
    <div className="border border-[#E8E6E3] bg-white text-sm font-mono mt-4 overflow-hidden">
      <div className="bg-[#F5F3F0] border-b border-[#E8E6E3] px-4 py-2.5 flex gap-2 text-[#1A1917]/30">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E3]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E3]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E3]" />
      </div>
      <div className="divide-y divide-[#F0EDE8]">
        <div className="px-4 py-2 flex gap-2 text-xs"><span className="text-[#1A1917]/30 w-10 shrink-0">Para</span><span className="text-[#E67A22]">{para}</span></div>
        {cc && <div className="px-4 py-2 flex gap-2 text-xs"><span className="text-[#1A1917]/30 w-10 shrink-0">Cc</span><span className="text-[#1A1917]/60">{cc}</span></div>}
        <div className="px-4 py-2 flex gap-2 text-xs items-center">
          <span className="text-[#1A1917]/30 w-10 shrink-0">Assunto</span>
          <span className="font-bold text-[#1A1917] bg-[#FFF3E8] px-1.5 py-0.5">{assunto}</span>
        </div>
        {anexos && (
          <div className="px-4 py-2 flex gap-2 flex-wrap text-xs">
            <span className="text-[#1A1917]/30 w-10 shrink-0">Anexos</span>
            <div className="flex gap-2 flex-wrap">
              {anexos.map((a) => (
                <span key={a} className="flex items-center gap-1 bg-[#F5F3F0] border border-[#E8E6E3] px-2 py-0.5 text-[#1A1917]/60">
                  <FileText className="h-3 w-3" />{a}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-4 text-xs text-[#6B6966] leading-relaxed space-y-1 border-t border-[#F0EDE8]">
        {corpo.map((linha, i) => <p key={i}>{linha}</p>)}
      </div>
    </div>
  );
}

function SecaoHeader({ n, titulo, desc, icon: Icon }: { n: string; titulo: string; desc?: string; icon?: React.ElementType }) {
  return (
    <div className="flex items-start gap-5 mb-8">
      <span className="text-[#E67A22]/20 font-[family-name:var(--font-playfair)] font-black text-5xl leading-none w-12 shrink-0 select-none">
        {n}
      </span>
      <div>
        <div className="flex items-center gap-3 mb-1">
          {Icon && <Icon className="h-4 w-4 text-[#E67A22]" />}
          <h2 className="text-xl font-[family-name:var(--font-playfair)] font-black text-[#1A1917]">{titulo}</h2>
        </div>
        {desc && <p className="text-[#6B6966] text-sm leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}

const NAV = [
  { id: "promob", label: "Promob" },
  { id: "pedidos", label: "Pedidos" },
  { id: "curinga", label: "Curinga" },
  { id: "especial", label: "Especial" },
  { id: "paineis", label: "Painéis" },
  { id: "assistencia", label: "Assistência" },
  { id: "financeiro", label: "Financeiro" },
  { id: "armazenagem", label: "Armazenagem" },
  { id: "contatos", label: "Contatos" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AreaDoCliente() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Hero ── */}
      <div className="bg-[#1A1917] pt-32 pb-12 md:pt-40 md:pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-[#E67A22] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-3">
              Fabriko · Área do Cliente · Rev. 3 — 17/03/2026
            </p>
            <h1 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] font-black text-white mb-3 leading-tight">
              Manual de Procedimentos<br />
              <span className="text-white/30 font-normal text-2xl md:text-3xl">e Política de Vendas</span>
            </h1>
            <p className="text-white/40 text-sm max-w-xl mt-4 leading-relaxed">
              Orientações completas sobre procedimentos, prazos e políticas da Fabriko. Leitura recomendada antes de iniciar os pedidos.
            </p>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {[
            { v: "20 dias úteis", l: "Prazo padrão de produção" },
            { v: "25 dias úteis", l: "Curinga e Especial" },
            { v: "15 dias corridos", l: "Armazenagem gratuita" },
            { v: "24 horas", l: "Validação de assistência" },
          ].map(({ v, l }) => (
            <div key={v} className="bg-[#1A1917]/60 px-5 py-4">
              <p className="text-[#E67A22] font-[family-name:var(--font-playfair)] font-bold text-lg">{v}</p>
              <p className="text-white/30 text-xs mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-[60px] z-30 bg-white border-b border-[#E8E6E3] shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-1.5 overflow-x-auto">
          {NAV.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="whitespace-nowrap text-[11px] font-bold uppercase tracking-widest px-4 py-2 text-[#1A1917]/40 hover:text-[#E67A22] hover:bg-[#FFF3E8] border border-transparent hover:border-[#E67A22]/20 transition-all"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Conteúdo ── */}
      <div className="max-w-5xl mx-auto px-6">

        {/* ══ 1. PROMOB ══════════════════════════════════════════════ */}
        <section id="promob" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="1" titulo="Solicitação do Promob Studio Fabriko" icon={Download}
            desc="Siga os passos abaixo para ativar e baixar a biblioteca Fabriko no Promob Studio." />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-5">Ativação da licença</p>
              <div>
                <Passo n={1} titulo="Acesse o portal Promob">
                  <a href="https://portal.promob.com/loja" target="_blank" rel="noopener noreferrer"
                    className="text-[#E67A22] hover:underline inline-flex items-center gap-1">
                    portal.promob.com/loja <ExternalLink className="h-3 w-3" />
                  </a>
                  {" "}e entre com seu usuário e senha.
                </Passo>
                <Passo n={2} titulo='Pesquise "FABRIKO" na loja'>
                  Clique em <strong>Solicitar Autorização</strong> no produto Promob Studio Fabriko.
                </Passo>
                <Passo n={3} titulo="Avise seu Consultor Fabriko">
                  Informe que a solicitação foi feita para que ele libere a licença na plataforma Promob.
                </Passo>
                <Passo n={4} titulo="Acesse: Store → Intenções de Compra → Comprar Agora">
                  Selecione <strong>Assinatura Mensal (1 Mês GRÁTIS)</strong> e clique em "Assinar Agora!". Será solicitado cartão de crédito vinculado à conta.
                </Passo>
                <Passo n={5} titulo="Baixe o Promob Studio">
                  <a href="https://portal.promob.com/Home" target="_blank" rel="noopener noreferrer"
                    className="text-[#E67A22] hover:underline inline-flex items-center gap-1">
                    portal.promob.com/Home <ExternalLink className="h-3 w-3" />
                  </a>
                  {" "}— link de download no rodapé da página.
                </Passo>
              </div>
            </div>

            <div className="space-y-4">
              <Alerta tipo="critico">
                <strong>Cancelamento é sua responsabilidade.</strong> Se não quiser continuar após o teste, cancele a assinatura antes do término dos 30 dias gratuitos. A Fabriko não tem acesso nem relação com os pagamentos realizados à Promob.
              </Alerta>
              <div className="border border-[#E8E6E3] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-3">Suporte Promob</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#1A1917]">
                    <Phone className="h-4 w-4 text-[#E67A22] shrink-0" />
                    (54) 3209-9200
                  </div>
                  <p className="text-[#6B6966] text-xs">Segunda a Sexta, 8h às 18h30</p>
                  <p className="text-[#6B6966] text-xs">Em caso de erros durante a instalação, acione o suporte Promob diretamente.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2. ENVIO DE PEDIDO ════════════════════════════════════ */}
        <section id="pedidos" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="2" titulo="Envio de Pedido Fabriko" icon={Package}
            desc="Pedidos revisados devem ser enviados por e-mail ao setor responsável." />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3">
                <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
                <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>20 dias úteis</strong> a partir da liberação financeira</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-3">Regras do e-mail</p>
                <ul className="space-y-3">
                  {[
                    { titulo: "Assunto do e-mail", desc: "Nome da loja + nome do cliente final, ambos com no máximo 20 caracteres. Essas informações irão para as etiquetas de produção." },
                    { titulo: "Arquivos Promob", desc: "Um arquivo .promob por ambiente, nomeado com o nome do ambiente. Não incluir nome da loja ou cliente no nome do arquivo." },
                    { titulo: "Aba interna do projeto", desc: 'Nomear a aba interna com o nome do ambiente (ex: "Cozinha").' },
                    { titulo: "Dados do cliente", desc: 'Inserir o nome do cliente final no campo "Dados do Cliente" dentro do Promob.' },
                  ].map(({ titulo, desc }) => (
                    <li key={titulo} className="flex gap-3">
                      <Check className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#1A1917]">{titulo}</p>
                        <p className="text-xs text-[#6B6966] mt-0.5">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-3">Exemplo de e-mail</p>
              <EmailMock
                para="pedido@fabriko.ind.br"
                cc="consultor@fabriko.ind.br"
                assunto="JOÃO JOSÉ–PLANEJADOS"
                anexos={["COZINHA.promob"]}
                corpo={[
                  "Boa tarde,",
                  "Segue arquivo Promob referente ao projeto do cliente final João José, contendo um ambiente para produção.",
                  "Ambiente para produção:",
                  "1 - COZINHA - Sem informações especiais.",
                  "Projeto revisado, pode ser liberado para produção.",
                  "Att.",
                  "PLANEJADOS & CIA.",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ══ 3. CURINGA ════════════════════════════════════════════ */}
        <section id="curinga" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="3" titulo="Pedido com Acabamento Curinga"
            desc="Para acabamentos que não fazem parte do portfólio Fabriko, disponibilizamos os acabamentos especiais Curinga na biblioteca Promob." />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3">
                <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
                <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>25 dias úteis</strong> a partir da liberação financeira</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { tipo: "Curinga Cor", qtd: "10 opções", desc: "Acabamentos unicolor especiais" },
                  { tipo: "Curinga Mad", qtd: "4 opções", desc: "Madeiras, pedras, tecidos, metais" },
                  { tipo: "Curinga Brilho", qtd: "1 opção", desc: "Acabamento com brilho especial" },
                ].map(({ tipo, qtd, desc }) => (
                  <div key={tipo} className="border border-[#E8E6E3] bg-white p-4 text-center">
                    <p className="text-[#E67A22] text-xs font-bold uppercase tracking-widest mb-1">{qtd}</p>
                    <p className="text-[#1A1917] font-semibold text-sm">{tipo}</p>
                    <p className="text-[#6B6966] text-[11px] mt-1 leading-tight">{desc}</p>
                  </div>
                ))}
              </div>

              <Alerta tipo="atencao">
                <strong>Curinga Mad</strong> inclui todos os acabamentos com algum tipo de veio: madeiras, pedras, tecidos, metais, etc. — não apenas madeirados.
              </Alerta>

              <div className="border border-[#E8E6E3] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-2">Nomenclatura obrigatória</p>
                <p className="text-sm text-[#6B6966]">
                  Arquivo separado por tipo de Curinga, nomeado como:{" "}
                  <code className="bg-[#F0EDE8] text-[#1A1917] px-1.5 py-0.5 text-xs font-mono">AMBIENTE–CURINGA COR 1</code>
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-3">Exemplo de e-mail com Curinga</p>
              <EmailMock
                para="pedido@fabriko.ind.br"
                cc="consultor@fabriko.ind.br"
                assunto="JOÃO JOSÉ–PLANEJADOS"
                anexos={["COZINHA.promob", "COZINHA-CURINGA COR 1.promob"]}
                corpo={[
                  "Boa tarde,",
                  "Seguem arquivos Promob referentes ao projeto do cliente final João José, contendo dois ambientes para produção:",
                  "1 - COZINHA - Sem informações especiais.",
                  "2 - COZINHA-CURINGA COR 1 - Verde Oliva Duratex.",
                  "Projetos revisados, podem ser liberados para produção.",
                  "Att.",
                  "PLANEJADOS & CIA.",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ══ 4. PRODUTO ESPECIAL ═══════════════════════════════════ */}
        <section id="especial" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="4" titulo="Produto Especial"
            desc="Itens que não estão no portfólio Fabriko e não estão disponíveis no Promob Fabriko. Exigem aprovação prévia da engenharia." />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3">
                <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
                <p className="text-sm font-semibold text-[#1A1917]">Prazo: <strong>25 dias úteis</strong> a partir da liberação financeira</p>
              </div>

              <div>
                <Passo n={1} titulo="Aprovação prévia obrigatória">
                  Acione seu Consultor Fabriko para que o setor de engenharia analise a viabilidade técnica. <strong>Pedidos sem aprovação prévia serão recusados.</strong>
                </Passo>
                <Passo n={2} titulo="Arquivo Promob separado">
                  Nomeado como <code className="bg-[#F0EDE8] text-[#1A1917] px-1 text-xs font-mono">COZINHA–ESPECIAIS</code>. Um arquivo separado do projeto principal.
                </Passo>
                <Passo n={3} titulo="Descontos zerados no Promob">
                  Abrir a aba de configuração de Margens e zerar os descontos da coluna de compra. Manter apenas o IPI de 3,5%.
                </Passo>
                <Passo n={4} titulo="E-mail com aviso">
                  Enviar junto com os demais arquivos para pedido@fabriko.ind.br, alertando no corpo do e-mail a existência do arquivo de itens especiais.
                </Passo>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-3">Exemplo de e-mail com Especial</p>
              <EmailMock
                para="pedido@fabriko.ind.br"
                cc="consultor@fabriko.ind.br"
                assunto="JOÃO JOSÉ–PLANEJADOS"
                anexos={["COZINHA.promob", "COZINHA-ESPECIAIS.promob"]}
                corpo={[
                  "Boa tarde,",
                  "Seguem arquivos Promob referentes ao projeto do cliente final João José:",
                  "1 - COZINHA - Sem informações especiais.",
                  "2 - COZINHA-ESPECIAIS - Painéis Branco TX com fita de borda Tauari Guararapes.",
                  "Projetos revisados, podem ser liberados para produção.",
                  "Att.",
                  "PLANEJADOS & CIA.",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ══ 5. PAINÉIS PERSONALIZADOS ════════════════════════════ */}
        <section id="paineis" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="5" titulo="Painéis Personalizados"
            desc="Permite criar painéis e tampos em formas livres diretamente no Promob, sem necessidade de desenho adicional." />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="border border-[#E8E6E3] bg-white p-5 mb-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-3">Especificações</p>
                <div className="space-y-2">
                  {[
                    { l: "Localização no Promob", v: "Componentes → Avulsos → Painéis Personalizados" },
                    { l: "Espessuras disponíveis", v: "15mm · 18mm · 30mm · 36mm" },
                    { l: "Acabamentos", v: "Toda a linha Fabriko + Curingas" },
                    { l: "Borda padrão", v: "0,45mm (todos os acabamentos)" },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex gap-3 py-2 border-b border-[#F0EDE8] last:border-0">
                      <span className="text-[#1A1917]/35 text-xs font-bold uppercase tracking-widest shrink-0 w-36">{l}</span>
                      <span className="text-[#1A1917] text-sm">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Alerta tipo="atencao">
                <strong>Vértices sobrepostos:</strong> ao editar o painel, remova qualquer vértice sobreposto. A usinagem interpreta a sequência de vértices — vértices sobrepostos geram cortes em linha reta no local errado.
              </Alerta>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-4">Restrições de formatos e usinagens</p>
              <div className="space-y-3">
                {[
                  { n: "1", regra: "Sem furos ou rasgos internos", desc: "Nenhum tipo de furo ou rasgo pode estar no interior da peça." },
                  { n: "2", regra: "Extremidades agudas ≥ 20mm", desc: "As pontas agudas devem ter no mínimo 20mm — podem ser retas ou arredondadas." },
                  { n: "3", regra: "Área principal ≥ 200×200mm", desc: "Área secundária da peça com mínimo de 70mm." },
                  { n: "4", regra: "Vão com borda ≥ 100mm", desc: "Espaço mínimo entre usinagens com acabamento de borda: 100mm." },
                  { n: "5", regra: "Largura sem borda ≥ 12mm", desc: "Largura mínima de usinagem sem acabamento de borda." },
                  { n: "6", regra: "Desenho 100% dentro do painel", desc: "O contorno da peça deve estar inteiramente dentro dos limites do painel escolhido." },
                ].map(({ n, regra, desc }) => (
                  <div key={n} className="flex gap-3 border border-[#E8E6E3] bg-white p-4">
                    <span className="h-6 w-6 bg-[#E67A22]/10 text-[#E67A22] text-xs font-bold flex items-center justify-center shrink-0">
                      {n}
                    </span>
                    <div>
                      <p className="text-[#1A1917] font-semibold text-sm">{regra}</p>
                      <p className="text-[#6B6966] text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 6. ASSISTÊNCIA TÉCNICA ════════════════════════════════ */}
        <section id="assistencia" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="6" titulo="Assistência Técnica" icon={Wrench}
            desc="Todo processo de assistência deve ser feito exclusivamente pelo e-mail assistencia@fabriko.ind.br. Solicitações por outros canais não serão aceitas." />

          <Alerta tipo="critico">
            <strong>Canal exclusivo: assistencia@fabriko.ind.br</strong> — Para que a assistência seja tratada com máxima urgência, é imprescindível que seja enviada para este e-mail. Nenhuma solicitação por outro canal será aceita.
          </Alerta>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            {/* Erro Fábrica */}
            <div className="border border-green-200 bg-green-50/50">
              <div className="bg-green-100/60 border-b border-green-200 px-5 py-4">
                <Badge cor="verde"><Check className="h-3 w-3" /> Erro da Fábrica</Badge>
                <p className="text-green-800 font-semibold text-sm mt-2">Peça errada ou com avaria de fábrica</p>
                <p className="text-green-700/60 text-xs mt-0.5">5 a 10 dias úteis a partir do aceite</p>
              </div>
              <div className="p-5 space-y-3">
                <ul className="space-y-2">
                  {[
                    "Peças idênticas às do projeto Promob original",
                    "Arquivo .promob com somente as peças a substituir",
                    "Foto da etiqueta da peça original",
                    "Foto e/ou vídeo do problema constatado",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-[#1A1917]">
                      <ChevronRight className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="border border-green-200 bg-white p-3">
                  <p className="text-xs text-[#6B6966]">Nome do arquivo: <code className="font-mono bg-[#F0EDE8] px-1">AT-PV-422-COZINHA</code></p>
                </div>
              </div>
            </div>

            {/* Erro Cliente */}
            <div className="border border-[#E8E6E3] bg-[#FAFAF8]">
              <div className="bg-[#F5F3F0] border-b border-[#E8E6E3] px-5 py-4">
                <Badge cor="laranja"><AlertTriangle className="h-3 w-3" /> Erro do Cliente</Badge>
                <p className="text-[#1A1917] font-semibold text-sm mt-2">Peça danificada ou com erro de medida/acabamento</p>
                <p className="text-[#1A1917]/40 text-xs mt-0.5">5 a 15 dias úteis a partir do aceite</p>
              </div>
              <div className="p-5 space-y-3">
                <ul className="space-y-2">
                  {[
                    "Peças devem constar no projeto original enviado à produção",
                    "Arquivo .promob com somente as peças a substituir",
                    "Nome do arquivo: AT-PV-422-COZINHA (máx. 20 caracteres)",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-[#1A1917]">
                      <ChevronRight className="h-3.5 w-3.5 text-[#E67A22] shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#E8E6E3] pt-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-2">Curinga — Erro do Cliente</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-[#6B6966]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E67A22]" />
                      Valor mínimo: <strong className="text-[#1A1917]">R$ 1.000,00</strong>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B6966]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E67A22]" />
                      Prazo: <strong className="text-[#1A1917]">até 15 dias úteis</strong> após liberação financeira
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Alerta tipo="info">
              <strong>Validação em até 24h:</strong> toda assistência passa por verificação interna. Em até 24 horas após o envio, você receberá retorno confirmando o aceite ou não da solicitação.
            </Alerta>
          </div>
        </section>

        {/* ══ 7. CONDIÇÕES FINANCEIRAS ══════════════════════════════ */}
        <section id="financeiro" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="7" titulo="Condições Comerciais e Financeiras" icon={CreditCard} />

          {/* Pagamento à fábrica */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-5">Formas de pagamento à fábrica</p>
          <div className="grid md:grid-cols-3 gap-4 mb-10">

            <div className="border border-[#E8E6E3] bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-4 w-4 text-[#E67A22]" />
                <p className="font-semibold text-sm text-[#1A1917]">PIX ou TED</p>
              </div>
              <Badge cor="verde"><Check className="h-3 w-3" /> Liberação imediata</Badge>
              <p className="text-[#6B6966] text-xs mt-3 leading-relaxed">
                Pagamento 100% antecipado. O pedido é liberado para produção assim que o pagamento é compensado.
              </p>
            </div>

            <div className="border border-[#E8E6E3] bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-4 w-4 text-[#E67A22]" />
                <p className="font-semibold text-sm text-[#1A1917]">Cartão de Crédito</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge cor="verde">Até 3× sem juros</Badge>
                <Badge cor="laranja">Até 18× com juros</Badge>
              </div>
              <p className="text-[#6B6966] text-xs mt-3 leading-relaxed">
                Cartão da loja obrigatório — a NF é emitida para o CNPJ do pedido que efetua o pagamento.
              </p>
            </div>

            <div className="border border-[#E8E6E3] bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-4 w-4 text-[#E67A22]" />
                <p className="font-semibold text-sm text-[#1A1917]">Parcelado em 2×</p>
              </div>
              <Badge cor="cinza">50% + 50%</Badge>
              <ul className="space-y-1.5 mt-3">
                {[
                  "50% antecipado → libera produção",
                  "50% na retirada (máx. 15 dias após disponibilidade)",
                  "Atraso na 2ª parcela = boleto automático + suspensão da condição",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-1.5 text-xs text-[#6B6966]">
                    <ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Alerta tipo="critico">
            A produção só é liberada após o pagamento integral — ou, no caso do parcelado em 2×, após o pagamento da primeira parcela. O pedido só poderá ser retirado após quitação total.
          </Alerta>

          {/* Convênios */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/30 mb-5 mt-10">Convênios financeiras — venda ao consumidor final</p>
          <div className="grid md:grid-cols-2 gap-4">

            <div className="border border-[#E8E6E3] bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="h-4 w-4 text-[#E67A22]" />
                <p className="font-semibold text-sm text-[#1A1917]">Santander Financeira</p>
              </div>
              <p className="text-[#6B6966] text-xs leading-relaxed mb-3">
                Entre em contato com o Consultor Santander da sua região para vincular sua loja à Fabriko. O cadastro é aprovado diretamente pelo banco.
              </p>
              <div className="space-y-2 border-t border-[#F0EDE8] pt-3">
                {[
                  { l: "Crédito ao lojista", v: "60% do valor líquido (D+1)" },
                  { l: "Crédito à Fabriko", v: "40% — destinado ao pedido do cliente financiado" },
                  { l: "Norma Santander", v: "Crédito vinculado ao mesmo CPF/CNPJ financiado" },
                ].map(({ l, v }) => (
                  <div key={l} className="flex gap-3 text-xs">
                    <span className="text-[#1A1917]/30 font-bold uppercase tracking-widest w-28 shrink-0">{l}</span>
                    <span className="text-[#1A1917]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#E8E6E3] bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-4 w-4 text-[#E67A22]" />
                <p className="font-semibold text-sm text-[#1A1917]">PagSeguro (maquininha)</p>
              </div>
              <p className="text-[#6B6966] text-xs leading-relaxed mb-3">
                Solicite a ficha cadastral com o representante Fabriko e devolva preenchida para{" "}
                <a href="mailto:financeiro@fabriko.ind.br" className="text-[#E67A22] hover:underline">financeiro@fabriko.ind.br</a>.
              </p>
              <div className="space-y-2 border-t border-[#F0EDE8] pt-3">
                {[
                  { l: "Entrega da maquininha", v: "Em até 30 dias após aprovação" },
                  { l: "Crédito ao lojista", v: "60% do valor líquido (D+1)" },
                  { l: "Crédito à Fabriko", v: "40% — lançado como crédito para futuros pedidos" },
                ].map(({ l, v }) => (
                  <div key={l} className="flex gap-3 text-xs">
                    <span className="text-[#1A1917]/30 font-bold uppercase tracking-widest w-28 shrink-0">{l}</span>
                    <span className="text-[#1A1917]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 8. ARMAZENAGEM ════════════════════════════════════════ */}
        <section id="armazenagem" className="py-12 md:py-16 border-b border-[#E8E6E3]">
          <SecaoHeader n="8" titulo="Armazenamento de Pedidos Produzidos" icon={Package} />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-green-200 bg-green-50/50 p-5">
              <Badge cor="verde"><Check className="h-3 w-3" /> Gratuito</Badge>
              <p className="text-green-800 font-semibold text-base mt-3">15 dias corridos</p>
              <p className="text-green-700/70 text-sm mt-1">a partir do término da produção</p>
            </div>
            <div className="border border-[#E8E6E3] bg-white p-5">
              <Badge cor="laranja"><AlertTriangle className="h-3 w-3" /> Após o prazo</Badge>
              <p className="text-[#1A1917] font-semibold text-base mt-3">1% ao mês</p>
              <p className="text-[#6B6966] text-sm mt-1">sobre o valor do pedido, a título de armazenamento</p>
            </div>
          </div>
        </section>

        {/* ══ 9. CONTATOS ═══════════════════════════════════════════ */}
        <section id="contatos" className="py-12 md:py-16">
          <SecaoHeader n="9" titulo="Canais de Contato Fabriko" icon={Mail} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { canal: "Pedidos", contato: "pedido@fabriko.ind.br", tipo: "email", desc: "Envio de projetos para produção" },
              { canal: "Assistência Técnica", contato: "assistencia@fabriko.ind.br", tipo: "email", desc: "Somente por este canal — exclusivo AT" },
              { canal: "Suporte Técnico / Promob", contato: "projetos@fabriko.ind.br", tipo: "email", desc: "Dúvidas técnicas e suporte Promob" },
              { canal: "Financeiro", contato: "financeiro@fabriko.ind.br", tipo: "email", desc: "Pagamentos, convênios e ficha PagSeguro" },
              { canal: "WhatsApp", contato: "(19) 99625-2987", tipo: "whatsapp", desc: "Atendimento direto Fabriko" },
            ].map(({ canal, contato, tipo, desc }) => (
              <a
                key={canal}
                href={tipo === "email" ? `mailto:${contato}` : `https://wa.me/55${contato.replace(/\D/g, "")}`}
                target={tipo === "whatsapp" ? "_blank" : undefined}
                rel={tipo === "whatsapp" ? "noopener noreferrer" : undefined}
                className="group border border-[#E8E6E3] bg-white hover:border-[#E67A22]/40 hover:bg-[#FFF3E8]/30 p-5 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  {tipo === "email"
                    ? <Mail className="h-4 w-4 text-[#E67A22] shrink-0" />
                    : <Phone className="h-4 w-4 text-[#E67A22] shrink-0" />}
                  <p className="text-[#1A1917]/40 text-[10px] font-bold uppercase tracking-widest">{canal}</p>
                </div>
                <p className="text-[#E67A22] text-sm font-semibold group-hover:underline">{contato}</p>
                <p className="text-[#6B6966] text-xs mt-1">{desc}</p>
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* ── Footer ── */}
      <div className="bg-[#1A1917] border-t border-white/10 px-6 py-8 text-center">
        <p className="text-white font-[family-name:var(--font-playfair)] font-bold text-lg mb-1">
          FABRIKO, essencial para seu negócio.
        </p>
        <p className="text-white/25 text-xs tracking-widest uppercase mt-2">
          Manual de Procedimentos e Política de Vendas · Rev. 3 · 17/03/2026
        </p>
        <p className="text-white/15 text-xs mt-1">Americana-SP · fabriko.ind.br</p>
      </div>

    </div>
  );
}
