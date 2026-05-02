import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  subject: z.enum(["Booking", "Collaboration", "Media", "Education Enquiry", "Other"]),
  message: z.string().trim().min(10).max(2000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!LOVABLE_API_KEY) {
          return Response.json({ error: "LOVABLE_API_KEY is not configured" }, { status: 500 });
        }
        if (!RESEND_API_KEY) {
          return Response.json({ error: "RESEND_API_KEY is not configured" }, { status: 500 });
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.issues },
            { status: 400 },
          );
        }
        const { name, email, subject, message } = parsed.data;

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

        const html = `
          <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;">
            <h2 style="margin:0 0 16px;">New message from your website</h2>
            <p style="margin:0 0 8px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin:0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin:0 0 16px;"><strong>Subject:</strong> ${safeSubject}</p>
            <div style="border-top:1px solid #e5e5e5;padding-top:16px;line-height:1.6;">
              ${safeMessage}
            </div>
          </div>
        `;

        const text =
          `New message from your website\n\n` +
          `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;

        const resendRes = await fetch(`${GATEWAY_URL}/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: "Darley Website <onboarding@resend.dev>",
            to: ["darleynarh@gmail.com"],
            reply_to: email,
            subject: `[${subject}] ${name}`,
            html,
            text,
          }),
        });

        const data = await resendRes.json().catch(() => ({}));
        if (!resendRes.ok) {
          console.error("Resend error", resendRes.status, data);
          return Response.json(
            { error: "Failed to send email", status: resendRes.status, details: data },
            { status: 502 },
          );
        }

        return Response.json({ success: true });
      },
    },
  },
});
