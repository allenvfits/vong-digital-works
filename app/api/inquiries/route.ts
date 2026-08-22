const allowedServices = new Set([
  "Custom business website",
  "Full-stack web application",
  "Website redesign",
  "Not sure yet",
]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function sendInquiryAlert(details: {
  name: string;
  email: string;
  service: string;
  project: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Inquiry saved, but email notifications are not configured.");
    return;
  }
  const recipient =
    process.env.INQUIRY_NOTIFICATION_EMAIL || "contact@vongdigitalworks.com";
  const from =
    process.env.INQUIRY_FROM_EMAIL ||
    "Vong Digital Works <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: details.email,
      subject: `New website inquiry: ${details.service}`,
      text: `A new inquiry was submitted on vongdigitalworks.com.\n\nName: ${details.name}\nEmail: ${details.email}\nService: ${details.service}\n\nProject details:\n${details.project}\n\nReply to this email to contact ${details.name}.`,
    }),
  });
  if (!response.ok)
    console.error(
      "Inquiry email notification failed",
      response.status,
      await response.text(),
    );
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey)
    return Response.json(
      { error: "Inquiry service is not configured." },
      { status: 503 },
    );
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (clean(input.website, 200)) return Response.json({ ok: true });
  const name = clean(input.name, 120);
  const email = clean(input.email, 254).toLowerCase();
  const service = clean(input.service, 80);
  const project = clean(input.project, 5000);
  if (
    !name ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    !allowedServices.has(service) ||
    project.length < 10
  )
    return Response.json(
      { error: "Please complete every field with valid information." },
      { status: 400 },
    );
  const response = await fetch(`${url}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name, email, service, project, source: "website" }),
  });
  if (!response.ok) {
    console.error(
      "Inquiry insert failed",
      response.status,
      await response.text(),
    );
    return Response.json(
      { error: "We couldn’t save your inquiry. Please try again shortly." },
      { status: 502 },
    );
  }
  await sendInquiryAlert({ name, email, service, project });
  return Response.json({ ok: true }, { status: 201 });
}
