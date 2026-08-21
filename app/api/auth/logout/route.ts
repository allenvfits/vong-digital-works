export async function POST() { return new Response(null, { status: 204, headers: { "Set-Cookie": "vdw_access_token=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0" } }); }
