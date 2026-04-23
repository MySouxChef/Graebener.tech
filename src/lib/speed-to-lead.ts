import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  client_id?: string;
}

export interface LeadResult {
  success: boolean;
  response_time_ms: number;
  ai_response: string;
  email_status: string;
  sms_status: string;
}

export async function generateResponse(lead: LeadInput): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");

  const anthropic = new Anthropic({ apiKey });

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 150,
    system: `Write a 3-sentence friendly business email reply. Acknowledge their need, show understanding, suggest a quick call. Conversational, no subject line, no markdown. Plain text only.`,
    messages: [
      {
        role: "user",
        content: `Lead: ${lead.name}, wants ${lead.service}. Said: "${lead.message || "no details"}". Reply:`,
      },
    ],
  });

  const block = msg.content[0];
  if (block.type === "text") return block.text;
  throw new Error("Unexpected response format from Claude");
}

export async function sendLeadEmail(
  lead: LeadInput,
  aiResponse: string
): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "failed";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Graebener.tech <onboarding@resend.dev>",
    to: lead.email,
    replyTo: "mysouxchef@gmail.com",
    subject: `Re: Your ${lead.service} inquiry`,
    text: `Hi ${lead.name},\n\n${aiResponse}\n\nBest,\nGraebener.tech`,
  });

  return error ? "failed" : "sent";
}

export async function sendLeadSMS(
  _lead: LeadInput,
  _aiResponse: string
): Promise<string> {
  // Twilio integration deferred — stub for now
  return "skipped";
}

export async function storeLead(
  lead: LeadInput,
  aiResponse: string,
  emailStatus: string,
  smsStatus: string,
  responseTimeMs: number
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("leads").insert({
    client_id: lead.client_id || "graebener",
    name: lead.name,
    email: lead.email,
    phone: lead.phone || null,
    service: lead.service,
    message: lead.message,
    ai_response: aiResponse,
    email_status: emailStatus,
    sms_status: smsStatus,
    response_time_ms: responseTimeMs,
  });

  if (error) {
    console.error("Failed to store lead:", error);
  }
}

export async function processLead(lead: LeadInput): Promise<LeadResult> {
  const start = Date.now();

  // Generate AI response
  const aiResponse = await generateResponse(lead);

  // Send email and SMS in parallel
  const [emailStatus, smsStatus] = await Promise.all([
    sendLeadEmail(lead, aiResponse),
    sendLeadSMS(lead, aiResponse),
  ]);

  const responseTimeMs = Date.now() - start;

  // Store in database (don't block the response)
  storeLead(lead, aiResponse, emailStatus, smsStatus, responseTimeMs);

  return {
    success: emailStatus === "sent",
    response_time_ms: responseTimeMs,
    ai_response: aiResponse,
    email_status: emailStatus,
    sms_status: smsStatus,
  };
}
