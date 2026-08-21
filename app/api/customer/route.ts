import { authenticatedUser, customerForUser, customerGet } from "@/lib/backend";

export async function GET(request: Request) {
  const user = await authenticatedUser(request);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const customer = await customerForUser(user.id);
    if (!customer) return Response.json({ error: "Customer profile not found" }, { status: 403 });
    const [invoices, items, transactions, refunds, contracts, signatures] = await Promise.all([
      customerGet(request, "invoices", "select=*&order=created_at.desc"),
      customerGet(request, "invoice_items", "select=*&order=sort_order.asc"),
      customerGet(request, "transactions", "select=*&order=created_at.desc"),
      customerGet(request, "refunds", "select=*&order=created_at.desc"),
      customerGet(request, "contracts", "select=*&order=created_at.desc"),
      customerGet(request, "contract_signatures", "select=*&order=signed_at.desc"),
    ]);
    return Response.json({ customer, invoices, items, transactions, refunds, contracts, signatures });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load portal" }, { status: 500 });
  }
}
