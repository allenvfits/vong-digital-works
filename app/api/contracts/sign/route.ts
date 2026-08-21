import { authenticatedUser, customerForUser, customerGet, customerInsert, tableUpdate } from "@/lib/backend";

export async function POST(request: Request) {
  const user = await authenticatedUser(request);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const customer = await customerForUser(user.id);
    if (!customer) return Response.json({ error: "Customer profile not found" }, { status: 403 });
    const { contractId, signerName, accepted } = await request.json();
    if (!contractId || !signerName?.trim() || accepted !== true) {
      return Response.json({ error: "Name and contract acceptance are required" }, { status: 400 });
    }
    const contracts = await customerGet(request, "contracts", `id=eq.${encodeURIComponent(contractId)}&select=id,status,body_sha256`);
    const contract = contracts[0];
    if (!contract || !["sent", "viewed"].includes(contract.status)) {
      return Response.json({ error: "This contract is not available for signing" }, { status: 409 });
    }
    await customerInsert(request, "contract_signatures", {
      contract_id: contract.id,
      signer_user_id: user.id,
      signer_name: signerName.trim(),
      signer_email: user.email || customer.email,
      consent_text: "I have read and agree to this contract and intend my typed name to be my electronic signature.",
      accepted: true,
      signature_method: "typed_name",
      ip_address: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
      user_agent: request.headers.get("user-agent") || null,
      signed_body_sha256: contract.body_sha256,
    });
    await tableUpdate("contracts", contract.id, { status: "signed", signed_at: new Date().toISOString() });
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sign contract";
    return Response.json({ error: message.includes("duplicate") ? "This contract has already been signed" : message }, { status: 500 });
  }
}
