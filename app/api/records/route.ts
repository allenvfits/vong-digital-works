import { authorize, backendConfigured, tableGet, tableInsert } from "@/lib/backend";

const allowed = new Set(["clients", "invoices", "transactions", "expenses", "refunds", "projects"]);

export async function GET(request: Request) {
  const user = await authorize(request);
  if (!user) return Response.json({ error: "Unauthorized", configured: backendConfigured() }, { status: 401 });
  const table = new URL(request.url).searchParams.get("table") || "invoices";
  if (!allowed.has(table)) return Response.json({ error: "Invalid table" }, { status: 400 });
  try { return Response.json(await tableGet(table, "select=*&order=created_at.desc&limit=100")); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Request failed" }, { status: 500 }); }
}

export async function POST(request: Request) {
  const user = await authorize(request, ["owner", "staff", "bookkeeper"]);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { table, record } = await request.json();
  if (!allowed.has(table)) return Response.json({ error: "Invalid table" }, { status: 400 });
  try { return Response.json(await tableInsert(table, { ...record, created_by: user.id }), { status: 201 }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Request failed" }, { status: 500 }); }
}
