import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 120, email: 254, inquiry: 120, message: 4000 };

export async function POST(request: Request) {
  const recipient = process.env.CONTACT_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const templateId = process.env.RESEND_CONTACT_TEMPLATE_ID;

  if (!recipient || !sender || !apiKey || !templateId) {
    console.error("Contact email is not configured.");
    return NextResponse.json(
      { message: "Contact email is not configured." },
      { status: 503 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const inquiry = typeof payload.inquiry === "string" ? payload.inquiry.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    !name ||
    !email ||
    !inquiry ||
    !message ||
    !EMAIL_PATTERN.test(email) ||
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    inquiry.length > MAX_LENGTHS.inquiry ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json(
      { message: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      template: {
        id: templateId,
        variables: {
          NAME: name,
          EMAIL: email,
          INQUIRY: inquiry,
          MESSAGE: message,
        },
      },
    }),
  });

  if (!emailResponse.ok) {
    const providerError = await emailResponse.text();
    console.error("Contact email provider rejected the request.", {
      status: emailResponse.status,
      response: providerError,
    });
    return NextResponse.json(
      { message: "The email provider rejected the sender or template configuration." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
