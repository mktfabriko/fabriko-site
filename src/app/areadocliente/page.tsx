"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Mail, Phone, ExternalLink, AlertTriangle, Clock, Check, DollarSign } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function Secao({ id, numero, titulo, children }: { id: string; numero: string; titulo: string; children: React.ReactNode }) {
  const [aberta, setAberta] = useState(false);
  return (
    <div id={id} className="border border-[#E8E6E3] overflow-hidden">
      <button
        onClick={() => setAberta(!aberta)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-white hover:bg-[#FAFAF8] transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#E67A22]/30 font-[family-name:var(--font-playfair)] font-black text-3xl w-10 shrink-0">
            {numero}
          </span>
          <h2 className="text-[#1A1917] font-semibold text-base">{titulo}</h2>
        </div>
        <ChevronDown className={`h-4 w-4 text-[#1A1917]/30 shrink-0 transition-transform duration-300 ${aberta ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {aberta && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 bg-white border-t border-[#E8E6E3]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-[#F0EDE8] last:border-0">
      <span className="text-[#1A1917]/40 text-xs uppercase tracking-widest font-bold shrink-0 w-36">{label}</span>
      <span className="text-[#1A1917] text-sm">{value}</span>
    </div>
  );
}

function Alerta({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-[#FFF3E8] border border-[#E67A22]/25 p-4 my-4">
      <AlertTriangle className="h-4 w-4 text-[#E67A22] shrink-0 mt-0.5" />
      <p className="text-[#1A1917] text-sm leading-relaxed">{children}</p>
    </div>
  );
}

const STEPS: { n: string; texto: string; detalhe?: string }[] = [];

export default function AreaDoCliente() {
  const [tabFinanceiro, setTabFinanceiro] = useState<"pix" | "cartao" | "parcelado" | "financiamento">("pix");

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-[#1A1917] pt-24 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[#E67A22] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-3">
              Fabriko · Área do Cliente
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] font-black text-white mb-4"
            >
              Manual do Parceiro
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-sm max-w-xl">
              Todos os procedimentos, prazos e informações operacionais para lojistas parceiros Fabriko. Rev. 3
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Índice rápido */}
      <div className="bg-white border-b border-[#E8E6E3] px-6 py-4 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex gap-2 flex-nowrap">
          {[
            { id: "sec-01", label: "Promob" },
            { id: "sec-02", label: "Pedidos" },
            { id: "sec-03", label: "Curinga" },
            { id: "sec-04", label: "Especiais" },
            { id: "sec-05", label: "Painéis" },
            { id: "sec-06", label: "Assistência" },
            { id: "sec-07", label: "Financeiro" },
            { id: "sec-08", label: "Armazenagem" },
            { id: "sec-09", label: "Contatos" },
          ].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="whitespace-nowrap text-xs font-bold uppercase tracking-widest px-4 py-2 border border-[#E8E6E3] text-[#1A1917]/50 hover:text-[#E67A22] hover:border-[#E67A22]/30 transition-all"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-3">

        {/* SEÇÃO 01 — Promob */}
        <Secao id="sec-01" numero="01" titulo="Solicitação do Software Promob">
          <div className="space-y-4 mt-2">
            <p className="text-[#6B6966] text-sm leading-relaxed">
              Siga os 6 passos abaixo para ativar a biblioteca Fabriko no Promob Studio.
            </p>
            <ol className="space-y-3">
              {[
                { n: "1", t: "Acesse o portal Promob com suas credenciais", d: "https://portal.promob.com/loja" },
                { n: "2", t: 'Pesquise "FABRIKO" e solicite a autorização' },
                { n: "3", t: "Avise seu consultor Fabriko para ativar a licença" },
                { n: "4", t: "Acesse Loja → Intenções de Compra → Comprar Agora" },
                { n: "5", t: "Ative os 30 dias gratuitos (assinatura mensal)" },
                { n: "6", t: "Baixe o software em", d: "https://portal.promob.com/Home" },
              ].map(({ n, t, d }) => (
                <li key={n} className="flex gap-3 text-sm">
                  <span className="h-6 w-6 bg-[#E67A22] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {n}
                  </span>
                  <span className="text-[#1A1917]">
                    {t}{d && <> — <span className="text-[#E67A22]">{d}</span></>}
                  </span>
                </li>
              ))}
            </ol>
            <Alerta>
              O cancelamento da assinatura é responsabilidade do lojista. Cancele antes do fim do período gratuito — a Fabriko não tem acesso aos dados de pagamento.
            </Alerta>
            <div className="flex items-center gap-2 text-[#6B6966] text-xs">
              <Phone className="h-3.5 w-3.5 text-[#E67A22]" />
              Suporte Promob: (54) 3209-9200 — Seg–Sex 8h–18h30
            </div>
          </div>
        </Secao>

        {/* SEÇÃO 02 — Pedidos */}
        <Secao id="sec-02" numero="02" titulo="Envio de Pedidos">
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[#1A1917] bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3">
              <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
              Prazo de produção: <strong>20 dias úteis</strong> a partir da liberação financeira
            </div>
            <div className="space-y-1">
              <InfoRow label="Para" value="pedido@fabriko.ind.br" />
              <InfoRow label="Cc" value="E-mail do seu consultor Fabriko" />
              <InfoRow label="Assunto" value="[Nome da loja] + [Nome do cliente] — máximo 20 caracteres cada" />
              <InfoRow label="Estrutura" value="Um arquivo Promob por ambiente" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/40 mb-2">Requisitos obrigatórios</p>
              <ul className="space-y-1.5">
                {[
                  "Inserir o nome do cliente em Dados do Cliente no Promob",
                  "Máximo de 20 caracteres no assunto do e-mail",
                  "Arquivos separados por ambiente",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-[#6B6966]">
                    <Check className="h-3.5 w-3.5 text-[#E67A22] shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Secao>

        {/* SEÇÃO 03 — Curinga */}
        <Secao id="sec-03" numero="03" titulo="Acabamento Curinga">
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[#1A1917] bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3">
              <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
              Prazo: <strong>25 dias úteis</strong> (5 dias a mais que o padrão)
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { tipo: "Curinga Cor", qtd: "10 opções", obs: "Cores sólidas especiais" },
                { tipo: "Curinga Mad", qtd: "4 opções", obs: "Inclui veios de madeira, pedras, tecidos e metais" },
                { tipo: "Curinga Brilho", qtd: "1 opção", obs: "Acabamento brilhante especial" },
              ].map(({ tipo, qtd, obs }) => (
                <div key={tipo} className="border border-[#E8E6E3] p-4">
                  <p className="text-[#1A1917] font-semibold text-sm mb-1">{tipo}</p>
                  <p className="text-[#E67A22] text-xs font-bold mb-1">{qtd}</p>
                  <p className="text-[#6B6966] text-xs">{obs}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/40 mb-2">Nomenclatura obrigatória</p>
              <p className="text-sm text-[#6B6966]">
                Arquivo separado por tipo, nomeado como: <span className="font-mono bg-[#F0EDE8] px-1.5 py-0.5 text-[#1A1917]">AMBIENTE–CURINGA COR 1</span>
              </p>
            </div>
          </div>
        </Secao>

        {/* SEÇÃO 04 — Especiais */}
        <Secao id="sec-04" numero="04" titulo="Produtos Especiais">
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[#1A1917] bg-[#FFF3E8] border border-[#E67A22]/25 px-4 py-3">
              <Clock className="h-4 w-4 text-[#E67A22] shrink-0" />
              Prazo: <strong>25 dias úteis</strong> após liberação financeira
            </div>
            <ol className="space-y-3">
              {[
                "Aprovação prévia obrigatória pelo setor de engenharia — acione seu consultor",
                "Arquivo Promob separado, nomeado como: AMBIENTE – ESPECIAIS",
                "Manter descontos de compra; preservar IPI de 3,5%",
                "Incluir aviso no corpo do e-mail sobre a presença de itens especiais",
              ].map((s, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="h-6 w-6 bg-[#1A1917]/10 text-[#1A1917] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[#6B6966]">{s}</span>
                </li>
              ))}
            </ol>
            <Alerta>
              Pedidos sem aprovação prévia da engenharia serão recusados automaticamente.
            </Alerta>
          </div>
        </Secao>

        {/* SEÇÃO 05 — Painéis */}
        <Secao id="sec-05" numero="05" titulo="Painéis Personalizados">
          <div className="space-y-4 mt-2">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/40 mb-2">Especificações técnicas</p>
                <div className="space-y-1">
                  <InfoRow label="Espessuras" value="15mm · 18mm · 30mm · 36mm" />
                  <InfoRow label="Borda padrão" value="0,45mm" />
                  <InfoRow label="Localização no Promob" value="Componentes → Itens Avulsos → Painéis Personalizados" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/40 mb-2">Restrições</p>
                <ul className="space-y-1.5">
                  {[
                    "Sem furos ou rasgos internos",
                    "Pontas vivas mínimas: 20mm (reta ou arredondada)",
                    "Área primária mínima: 200×200mm · Secundária: 70mm",
                    "Distância mínima até a borda: 100mm",
                    "Largura mínima de usinagem sem borda: 12mm",
                    "Desenho 100% dentro dos limites do painel",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[#6B6966]">
                      <ChevronRight className="h-3 w-3 text-[#E67A22] shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Alerta>
              Remova vértices sobrepostos no Promob antes de enviar arquivos com painéis personalizados.
            </Alerta>
          </div>
        </Secao>

        {/* SEÇÃO 06 — Assistência Técnica */}
        <Secao id="sec-06" numero="06" titulo="Assistência Técnica">
          <div className="space-y-4 mt-2">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { tipo: "Erro da fábrica", prazo: "5–10 dias úteis", cor: "text-green-600" },
                { tipo: "Erro do cliente", prazo: "5–15 dias úteis", cor: "text-[#E67A22]" },
                { tipo: "Curinga (erro do cliente)", prazo: "Mínimo 15 dias úteis", cor: "text-red-500" },
              ].map(({ tipo, prazo, cor }) => (
                <div key={tipo} className="border border-[#E8E6E3] p-4">
                  <p className="text-[#1A1917] font-semibold text-sm mb-1">{tipo}</p>
                  <p className={`text-xs font-bold ${cor}`}>{prazo}</p>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <InfoRow label="E-mail exclusivo" value="assistencia@fabriko.ind.br" />
              <InfoRow label="Pedido mínimo" value="R$ 1.000 para acabamento curinga" />
              <InfoRow label="Validação" value="Até 24h após envio" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/40 mb-2">Documentação obrigatória</p>
              <ul className="space-y-1.5">
                {[
                  "Arquivo Promob com as peças a substituir",
                  "Foto da etiqueta de identificação",
                  "Foto ou vídeo do problema (em caso de erro da fábrica)",
                  "Nomenclatura do arquivo: AT-PV-[número]-[ambiente]",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-[#6B6966]">
                    <Check className="h-3.5 w-3.5 text-[#E67A22] shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Secao>

        {/* SEÇÃO 07 — Financeiro */}
        <Secao id="sec-07" numero="07" titulo="Condições Comerciais e Financeiras">
          <div className="space-y-4 mt-2">
            <div className="flex gap-2 flex-wrap">
              {(["pix", "cartao", "parcelado", "financiamento"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTabFinanceiro(t)}
                  className={`text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all ${
                    tabFinanceiro === t
                      ? "bg-[#E67A22] text-white"
                      : "border border-[#E8E6E3] text-[#1A1917]/40 hover:text-[#1A1917]"
                  }`}
                >
                  {t === "pix" ? "PIX / TED" : t === "cartao" ? "Cartão" : t === "parcelado" ? "2× Parcelado" : "Financiamento"}
                </button>
              ))}
            </div>

            {tabFinanceiro === "pix" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-4 py-3">
                  <Check className="h-4 w-4 shrink-0" />
                  100% antecipado — liberação imediata da produção
                </div>
                <InfoRow label="Forma" value="PIX ou transferência bancária" />
                <InfoRow label="Liberação" value="Imediata após confirmação" />
              </div>
            )}

            {tabFinanceiro === "cartao" && (
              <div className="space-y-2">
                <InfoRow label="Sem juros" value="Até 3× no cartão da loja" />
                <InfoRow label="Com juros" value="Até 18× no cartão da loja" />
                <InfoRow label="Observação" value="Apenas cartão da própria loja — não aceito pessoal" />
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A1917]/40 mb-2">Taxas por bandeira (referência)</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-[#6B6966]">
                    <span>1× — 0,79%</span><span>6× — 4,74%</span>
                    <span>2× — 1,58%</span><span>12× — 9,48%</span>
                    <span>3× — 2,37%</span><span>18× — 18,60%</span>
                  </div>
                </div>
              </div>
            )}

            {tabFinanceiro === "parcelado" && (
              <div className="space-y-2">
                <InfoRow label="Entrada" value="50% para iniciar a produção" />
                <InfoRow label="Saldo" value="50% na retirada (prazo máximo: 15 dias após disponibilidade)" />
              </div>
            )}

            {tabFinanceiro === "financiamento" && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="border border-[#E8E6E3] p-4">
                    <p className="text-[#1A1917] font-semibold text-sm mb-1">Santander Financeira</p>
                    <p className="text-[#6B6966] text-xs mb-2">Contate seu consultor regional para acesso.</p>
                    <p className="text-[#E67A22] text-xs font-bold">Divisão: 60% financeira / 40% Fabriko</p>
                  </div>
                  <div className="border border-[#E8E6E3] p-4">
                    <p className="text-[#1A1917] font-semibold text-sm mb-1">PagSeguro (maquininha)</p>
                    <p className="text-[#6B6966] text-xs mb-2">Envie formulário de cadastro para financeiro@fabriko.ind.br. Prazo de entrega: 30 dias.</p>
                    <p className="text-[#E67A22] text-xs font-bold">Divisão: 60% financeira / 40% Fabriko</p>
                  </div>
                </div>
              </div>
            )}

            <Alerta>
              A produção só é liberada após o pagamento integral. Não há exceções.
            </Alerta>
          </div>
        </Secao>

        {/* SEÇÃO 08 — Armazenagem */}
        <Secao id="sec-08" numero="08" titulo="Política de Armazenagem">
          <div className="space-y-2 mt-2">
            <InfoRow label="Gratuito" value="15 dias corridos após a conclusão da produção" />
            <InfoRow label="Taxa após prazo" value="1% do valor do pedido por mês" />
            <Alerta>
              Organize a retirada com antecedência para evitar cobranças adicionais de armazenagem.
            </Alerta>
          </div>
        </Secao>

        {/* SEÇÃO 09 — Contatos */}
        <Secao id="sec-09" numero="09" titulo="Canais de Contato">
          <div className="space-y-3 mt-2">
            {[
              { canal: "Pedidos", contato: "pedido@fabriko.ind.br", tipo: "email" },
              { canal: "Assistência Técnica", contato: "assistencia@fabriko.ind.br", tipo: "email" },
              { canal: "Financeiro", contato: "financeiro@fabriko.ind.br", tipo: "email" },
              { canal: "Consultor A.F.", contato: "fernando@fabriko.ind.br", tipo: "email" },
              { canal: "WhatsApp Consultor", contato: "(19) 9.9759-2974", tipo: "whatsapp" },
            ].map(({ canal, contato, tipo }) => (
              <div key={canal} className="flex items-center justify-between gap-4 py-3 border-b border-[#F0EDE8] last:border-0">
                <span className="text-[#1A1917]/50 text-xs uppercase tracking-widest font-bold">{canal}</span>
                <a
                  href={tipo === "email" ? `mailto:${contato}` : `https://wa.me/55${contato.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-[#E67A22] text-sm font-medium hover:underline"
                  target={tipo === "whatsapp" ? "_blank" : undefined}
                  rel={tipo === "whatsapp" ? "noopener noreferrer" : undefined}
                >
                  {tipo === "email" ? <Mail className="h-3.5 w-3.5" /> : <Phone className="h-3.5 w-3.5" />}
                  {contato}
                </a>
              </div>
            ))}
          </div>
        </Secao>

        {/* Academy / Treinamento */}
        <div className="border border-[#E8E6E3] bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E8E6E3]">
            <div className="flex items-center gap-4">
              <span className="text-[#E67A22]/30 font-[family-name:var(--font-playfair)] font-black text-3xl w-10">10</span>
              <h2 className="text-[#1A1917] font-semibold text-base">Treinamento Promob — Fabriko Academy</h2>
            </div>
          </div>
          <div className="px-6 py-5 space-y-4">
            <p className="text-[#6B6966] text-sm leading-relaxed">
              Complete as 5 aulas antes de solicitar o acesso ao software. O treinamento cobre do zero ao avançado no Promob Studio com a biblioteca Fabriko.
            </p>
            <div className="grid sm:grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="border border-[#E8E6E3] p-3 text-center">
                  <p className="text-[#E67A22] font-bold text-sm">Aula {n}</p>
                  <p className="text-[#1A1917]/30 text-[10px] uppercase tracking-widest mt-1">Módulo {n}</p>
                </div>
              ))}
            </div>
            <a
              href="https://afconsultorias.com/fabriko/academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E67A22] text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Acessar Academy <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Precificação */}
        <div className="border border-[#E8E6E3] bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E8E6E3]">
            <div className="flex items-center gap-4">
              <span className="text-[#E67A22]/30 font-[family-name:var(--font-playfair)] font-black text-3xl w-10">11</span>
              <h2 className="text-[#1A1917] font-semibold text-base">Precificação — Como Calcular seu Preço</h2>
            </div>
          </div>
          <div className="px-6 py-5 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#FAFAF8] border border-[#E8E6E3] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-4 w-4 text-[#E67A22]" />
                  <p className="text-[#1A1917] font-semibold text-sm">Markup</p>
                </div>
                <p className="font-mono text-xs bg-white border border-[#E8E6E3] px-3 py-2 text-[#1A1917] mb-3">
                  Preço de Venda = Custo Total × Markup
                </p>
                <p className="text-[#6B6966] text-xs">Exemplo: R$ 8.000 × 2,5 = <strong className="text-[#1A1917]">R$ 20.000</strong></p>
              </div>
              <div className="bg-[#FAFAF8] border border-[#E8E6E3] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-4 w-4 text-[#E67A22]" />
                  <p className="text-[#1A1917] font-semibold text-sm">Margem</p>
                </div>
                <p className="font-mono text-xs bg-white border border-[#E8E6E3] px-3 py-2 text-[#1A1917] mb-3">
                  Margem % = (Preço − Custo) ÷ Preço de Venda × 100
                </p>
                <p className="text-[#6B6966] text-xs">Exemplo: (20.000 − 8.000) ÷ 20.000 × 100 = <strong className="text-[#1A1917]">60%</strong></p>
              </div>
            </div>
            <Alerta>
              Atenção: markup de 50% e margem de 50% são coisas completamente diferentes. Confundir os dois é o erro mais comum em precificação.
            </Alerta>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-[#E8E6E3] bg-white px-6 py-6 text-center mt-4">
        <p className="text-[#1A1917]/25 text-xs tracking-widest uppercase">
          Fabriko · Área do Cliente · Rev. 3 · © 2025 Fabriko · A.F. Consultoria
        </p>
      </div>
    </div>
  );
}
