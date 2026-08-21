import { authorize, stripeRequest, tableInsert } from "@/lib/backend";

export async function POST(request: Request) {
  const user = await authorize(request, ["owner"]);
  if (!user) return Response.json({ error: "Only the owner can issue refunds" }, { status: 403 });
  const { paymentIntentId, amountCents, transactionId, reason } = await request.json();
  const params = new URLSearchParams({ payment_intent: paymentIntentId });
  if (amountCents) params.set("amount", String(amountCents));
  try { const refund = await stripeRequest("refunds", params) as { id: string; status: string }; await tableInsert("refunds", { transaction_id: transactionId, amount_cents: amountCents, reason, stripe_refund_id: refund.id, status: refund.status, created_by: user.id }); return Response.json(refund); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Refund failed" }, { status: 500 }); }
}
