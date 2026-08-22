import { tableGet, tableInsert, tableUpdate } from "@/lib/backend";

function secureEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function verify(payload: string, header: string, secret: string) {
  const parts = header.split(",");
  const timestamp = parts.find(part => part.startsWith("t="))?.slice(2);
  const signatures = parts.filter(part => part.startsWith("v1=")).map(part => part.slice(3));
  if (!timestamp || !signatures.length || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${payload}`));
  const expected = Array.from(new Uint8Array(signed), byte => byte.toString(16).padStart(2, "0")).join("");
  return signatures.some(signature => secureEqual(signature, expected));
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) return Response.json({ error: "Webhook is not configured" }, { status: 503 });
  const payload = await request.text();
  if (!await verify(payload, signature, secret)) return Response.json({ error: "Invalid signature" }, { status: 400 });

  const event = JSON.parse(payload) as { type: string; data: { object: { id: string; payment_intent?: string; payment_status?: string; amount_total?: number; currency?: string; metadata?: { invoice_id?: string } } } };
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const invoiceId = session.metadata?.invoice_id;
    if (invoiceId && session.payment_intent && session.payment_status === "paid") {
      const invoices = await tableGet("invoices", `id=eq.${encodeURIComponent(invoiceId)}&select=id,client_id,total_cents,currency,status`);
      const invoice = invoices[0] as { id: string; client_id: string; total_cents: number; currency: string; status: string } | undefined;
      if (invoice) {
        await tableUpdate("invoices", invoice.id, { status: "paid", stripe_payment_intent_id: session.payment_intent });
        const existing = await tableGet("transactions", `stripe_payment_intent_id=eq.${encodeURIComponent(session.payment_intent)}&select=id`);
        if (!existing.length) await tableInsert("transactions", { type: "payment", client_id: invoice.client_id, invoice_id: invoice.id, amount_cents: session.amount_total || invoice.total_cents, currency: session.currency || invoice.currency, method: "stripe", reference: session.id, stripe_payment_intent_id: session.payment_intent });
      }
    }
  }
  return Response.json({ received: true });
}
