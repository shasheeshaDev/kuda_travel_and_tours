"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Brand tokens ──────────────────────────────────────────────────────────────
const BRAND  = "#474546";
const LIGHT  = "#edf0f5";
const MUTED  = "#767374";
const BORDER = "#e8e6e4";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SendEnquiryEmailParams {
  subject:    string;
  data:       Record<string, string | boolean | string[] | File[] | undefined>;
  toEmail:    string;
  ccEmails?:  string[];
  bccEmails?: string[];
  fromName?:  string;
  replyTo?:   string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatValue(value: string | boolean | string[] | File[] | undefined): string {
  if (value === undefined || value === null || value === "") return "<span style='color:#767374'>—</span>";
  if (typeof value === "boolean")  return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "<span style='color:#767374'>—</span>";
  return String(value);
}

// ── Email HTML template ───────────────────────────────────────────────────────

function buildEnquiryHtml(
  subject:  string,
  data:     Record<string, string | boolean | string[] | File[] | undefined>,
  fromName: string,
  replyTo?: string,
): string {
  const rows = Object.entries(data)
    .map(([key, value]) => `
      <tr>
        <td style="padding:12px 16px;font-size:12px;font-weight:600;text-transform:uppercase;
                   letter-spacing:.08em;color:${MUTED};white-space:nowrap;
                   border-bottom:1px solid ${BORDER};width:38%;">
          ${formatKey(key)}
        </td>
        <td style="padding:12px 16px;font-size:15px;color:#1a1819;
                   border-bottom:1px solid ${BORDER};">
          ${formatValue(value)}
        </td>
      </tr>`)
    .join("");

  const replyNote = replyTo
    ? `<p style="margin:0;font-size:13px;color:${MUTED};">
         Reply directly to this email to contact the visitor at
         <strong style="color:#1a1819;">${replyTo}</strong>.
       </p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <div style="max-width:600px;margin:32px auto 48px;background:#ffffff;
              border-radius:12px;overflow:hidden;
              box-shadow:0 4px 24px rgba(0,0,0,.07);">

    <!-- Header -->
    <div style="background:${BRAND};padding:28px 32px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;
                letter-spacing:.14em;color:rgba(255,255,255,.55);">
        Kuda Travel &amp; Tours
      </p>
      <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;line-height:1.2;">
        ${subject}
      </h1>
    </div>

    <!-- Source badge -->
    <div style="background:${LIGHT};padding:14px 32px;border-bottom:1px solid ${BORDER};">
      <p style="margin:0;font-size:13px;color:${MUTED};">
        New enquiry received via <strong style="color:#1a1819;">${fromName}</strong>
      </p>
    </div>

    <!-- Fields table -->
    <table style="width:100%;border-collapse:collapse;">
      ${rows}
    </table>

    <!-- Footer -->
    <div style="padding:20px 32px;background:#fafaf8;border-top:1px solid ${BORDER};">
      ${replyNote}
    </div>

  </div>

  <!-- Email client footer -->
  <p style="text-align:center;font-size:12px;color:#a0a0a0;margin-bottom:32px;">
    © ${new Date().getFullYear()} Kuda Travel &amp; Tours &nbsp;·&nbsp; Colombo, Sri Lanka
  </p>

</body>
</html>`;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function sendEnquiryEmail({
  subject,
  data,
  toEmail,
  ccEmails,
  bccEmails,
  fromName,
  replyTo,
}: SendEnquiryEmailParams): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("[sendEnquiryEmail] Missing RESEND_API_KEY");
      return false;
    }

    const senderEmail = process.env.NEXT_RESEND_FROM_EMAIL;
    if (!senderEmail) {
      console.error("[sendEnquiryEmail] Missing NEXT_RESEND_FROM_EMAIL");
      return false;
    }

    const senderName = fromName || "Kuda Travel & Tours";

    await resend.emails.send({
      from:    `${senderName} <${senderEmail}>`,
      to:      toEmail,
      replyTo: replyTo,
      cc:      ccEmails,
      bcc:     bccEmails,
      subject,
      html:    buildEnquiryHtml(subject, data, senderName, replyTo),
    });

    return true;
  } catch (error) {
    console.error("[sendEnquiryEmail] Error:", error);
    return false;
  }
}
