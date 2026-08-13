/**
 * Contrato único para qualquer ponto de conversão do site.
 * Hero, LP de destino, formulário completo e WhatsApp só mudam presentation/source.
 */
export type PublicLead = {
  source: string;
  page: string;
  origin?: string;
  destination?: string;
  period?: string;
  direction?: "exportacao" | "importacao" | "planejamento";
  species?: string;
  size?: string;
  name?: string;
  phone?: string;
  consent: boolean;
};

export type LeadSubmission = { leadId?: string; whatsappUrl?: string };

export async function submitLead(lead: PublicLead, endpoint = "/api/public/leads"): Promise<LeadSubmission> {
  const response = await fetch(endpoint, { method:"POST", headers:{ "content-type":"application/json" }, body:JSON.stringify(lead) });
  if (!response.ok) throw new Error("Não foi possível registrar o interesse agora.");
  return response.json() as Promise<LeadSubmission>;
}

export function whatsappMessage(lead: PublicLead) {
  const route = [lead.origin, lead.destination].filter(Boolean).join(" → ") || "rota ainda não definida";
  return "Olá! Quero analisar a viagem do meu pet. Rota: " + route + ". Origem do contato: " + lead.source + ".";
}
