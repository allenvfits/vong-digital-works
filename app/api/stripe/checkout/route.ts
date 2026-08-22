import { authenticatedUser, customerForUser, stripeRequest, tableGet, tableUpdate, teamProfileForUser } from "@/lib/backend";

export async function POST(request: Request) {
  const user = await authenticatedUser(request);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { invoiceId } = await request.json();
  if (typeof invoiceId !== "string" || !invoiceId) return Response.json({ error: "Invoice is required" }, { status: 400 });

  const invoices = await tableGet("invoices", `id=eq.${encodeURIComponent(invoiceId)}&select=id,invoice_number,client_id,status,total_cents,currency`);
  const invoice = invoices[0] as { id: string; invoice_number: string; client_id: string; status: string; total_cents: number; currency: string } | undefined;
  if (!invoice) return Response.json({ error: "Invoice not found" }, { status: 404 });

  const [profile, customer] = await Promise.all([teamProfileForUser(user.id), customerForUser(user.id)]);
  const isTeam = Boolean(profile && ["owner", "staff"].includes(profile.role));
  if (!isTeam && customer?.id !== invoice.client_id) return Response.json({ error: "This invoice is not assigned to your account" }, { status: 403 });
  if (["paid", "void"].includes(invoice.status)) return Response.json({ error: "This invoice cannot be paid" }, { status: 400 });
  if (!Number.isInteger(invoice.total_cents) || invoice.total_cents <= 0) return Response.json({ error: "This invoice has no payable balance" }, { status: 400 });

  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto") || "https";
  const origin = configuredOrigin || (forwardedHost ? `${forwardedProtocol}://${forwardedHost}` : new URL(request.url).origin);
  const params = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/pay/success?invoice=${encodeURIComponent(invoice.invoice_number)}`,
    cancel_url: `${origin}/pay/cancelled?invoice=${encodeURIComponent(invoice.invoice_number)}`,
    "line_items[0][price_data][currency]": invoice.currency.toLowerCase(),
    "line_items[0][price_data][unit_amount]": String(invoice.total_cents),
    "line_items[0][price_data][product_data][name]": `Vong Digital Works invoice ${invoice.invoice_number}`,
    "line_items[0][quantity]": "1",
    "metadata[invoice_id]": invoice.id,
    "payment_intent_data[metadata][invoice_id]": invoice.id,
    client_reference_id: invoice.id,
  });
  if (customer?.email) params.set("customer_email", customer.email);
  try {
    const session = await stripeRequest("checkout/sessions", params) as { id: string; url: string };
    await tableUpdate("invoices", invoice.id, { stripe_checkout_session_id: session.id });
    return Response.json({ id: session.id, url: session.url });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Checkout failed" }, { status: 500 });
  }
}
