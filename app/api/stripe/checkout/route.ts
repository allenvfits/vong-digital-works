import { authorize, stripeRequest, tableUpdate } from "@/lib/backend";

export async function POST(request: Request) {
  const user = await authorize(request, ["owner", "staff"]);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { invoiceId, amountCents, clientEmail, description } = await request.json();
  const origin = new URL(request.url).origin;
  const params = new URLSearchParams({ mode: "payment", success_url: `${origin}/pay/success?invoice=${invoiceId}`, cancel_url: `${origin}/pay/cancelled?invoice=${invoiceId}`, "line_items[0][price_data][currency]": "usd", "line_items[0][price_data][unit_amount]": String(amountCents), "line_items[0][price_data][product_data][name]": description || `Invoice ${invoiceId}`, "line_items[0][quantity]": "1", "metadata[invoice_id]": invoiceId });
  if (clientEmail) params.set("customer_email", clientEmail);
  try { const session = await stripeRequest("checkout/sessions", params) as { id: string; url: string }; await tableUpdate("invoices", invoiceId, { stripe_checkout_session_id: session.id }); return Response.json(session); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Checkout failed" }, { status: 500 }); }
}
