"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface BookingFormConfig {
  toEmail?:    string | null;
  ccEmails?:   string[] | null;
  bccEmails?:  string[] | null;
  fromName?:   string | null;
  formSubject?: string | null;
}

export interface BookingInput {
  tourName: string;
  tourMeta: string;
  name:     string;
  email:    string;
  phone:    string;
  dateFrom: string;
  dateTo:   string;
  note:     string;
  config?:  BookingFormConfig | null;
}

export interface BookingResult {
  success: boolean;
  reference?: string;
  error?: string;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function generateRef(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4).padEnd(4, "X");
  return `KTT-${yy}${mm}${dd}-${rand}`;
}

function fmtDate(iso: string): string {
  if (!iso) return "–";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

// ── email templates ───────────────────────────────────────────────────────────

const BRAND = "#474546";
const LIGHT = "#edf0f5";
const MUTED  = "#767374";

function businessEmailHtml(data: BookingInput, ref: string): string {
  const dateRange = data.dateTo
    ? `${fmtDate(data.dateFrom)} → ${fmtDate(data.dateTo)}`
    : fmtDate(data.dateFrom);

  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 16px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:${MUTED};white-space:nowrap;border-bottom:1px solid #e8e6e4;">${label}</td>
      <td style="padding:10px 16px;font-size:15px;color:#1a1819;border-bottom:1px solid #e8e6e4;">${value || "–"}</td>
    </tr>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
  <div style="background:${BRAND};padding:28px 32px;">
    <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,.6);">Kuda Travel &amp; Tours</p>
    <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:white;">New Booking Request</h1>
  </div>

  <div style="padding:28px 32px;background:${LIGHT};border-bottom:1px solid #e8e6e4;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:${MUTED};">Booking Reference</p>
    <p style="margin:0;font-size:28px;font-weight:800;color:${BRAND};letter-spacing:.06em;">${ref}</p>
  </div>

  <table style="width:100%;border-collapse:collapse;">
    ${row("Tour", `${data.tourName}${data.tourMeta ? ` &nbsp;·&nbsp; ${data.tourMeta}` : ""}`)}
    ${row("Guest Name", data.name)}
    ${row("Email", `<a href="mailto:${data.email}" style="color:${BRAND}">${data.email}</a>`)}
    ${row("Phone", `<a href="tel:${data.phone}" style="color:${BRAND}">${data.phone}</a>`)}
    ${row("Travel Dates", dateRange)}
    ${data.note ? row("Note", data.note) : ""}
  </table>

  <div style="padding:24px 32px;background:#fafafa;border-top:1px solid #e8e6e4;">
    <p style="margin:0;font-size:13px;color:${MUTED};">Reply directly to this email to contact the guest at <strong>${data.email}</strong>.</p>
  </div>
</div>
</body></html>`;
}

function customerEmailHtml(data: BookingInput, ref: string): string {
  const dateRange = data.dateTo
    ? `${fmtDate(data.dateFrom)} → ${fmtDate(data.dateTo)}`
    : fmtDate(data.dateFrom);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
  <div style="background:${BRAND};padding:28px 32px;">
    <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,.6);">Kuda Travel &amp; Tours</p>
    <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:white;">Booking Confirmed</h1>
  </div>

  <div style="padding:32px;">
    <p style="margin:0 0 24px;font-size:16px;color:#1a1819;">Hi <strong>${data.name}</strong>, thank you for your booking request!</p>

    <div style="background:${LIGHT};border-radius:10px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:${MUTED};">Your Booking Reference</p>
      <p style="margin:0;font-size:30px;font-weight:800;color:${BRAND};letter-spacing:.06em;">${ref}</p>
      <p style="margin:8px 0 0;font-size:13px;color:${MUTED};">Save this reference for your records.</p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      <tr><td style="padding:10px 0;font-size:13px;font-weight:600;color:${MUTED};width:130px;">Tour</td><td style="padding:10px 0;font-size:15px;color:#1a1819;border-bottom:1px solid #e8e6e4;">${data.tourName}</td></tr>
      ${data.tourMeta ? `<tr><td style="padding:10px 0;font-size:13px;font-weight:600;color:${MUTED};">Duration</td><td style="padding:10px 0;font-size:15px;color:#1a1819;border-bottom:1px solid #e8e6e4;">${data.tourMeta}</td></tr>` : ""}
      <tr><td style="padding:10px 0;font-size:13px;font-weight:600;color:${MUTED};">Travel Dates</td><td style="padding:10px 0;font-size:15px;color:#1a1819;border-bottom:1px solid #e8e6e4;">${dateRange}</td></tr>
    </table>

    <p style="margin:0 0 8px;font-size:15px;color:#1a1819;">Our team will contact you within <strong>24 hours</strong> to confirm your booking and discuss the details.</p>
    <p style="margin:0;font-size:15px;color:${MUTED};">If you have any urgent questions, feel free to reply to this email.</p>
  </div>

  <div style="padding:20px 32px;background:#fafafa;border-top:1px solid #e8e6e4;text-align:center;">
    <p style="margin:0;font-size:13px;color:${MUTED};">© ${new Date().getFullYear()} Kuda Travel &amp; Tours &nbsp;·&nbsp; Colombo, Sri Lanka</p>
  </div>
</div>
</body></html>`;
}

// ── main action ───────────────────────────────────────────────────────────────

export async function submitTourBooking(data: BookingInput): Promise<BookingResult> {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: "Email service is not configured." };
  }

  const fromEmail = process.env.NEXT_RESEND_FROM_EMAIL;
  if (!fromEmail) {
    return { success: false, error: "Sender email is not configured." };
  }

  const reference = generateRef();

  // Priority: formConfig.toEmail → RESEND_TO_EMAIL env → fromEmail (fallback)
  const cfg        = data.config;
  const toEmail    = cfg?.toEmail   || process.env.RESEND_TO_EMAIL || fromEmail;
  const senderName = cfg?.fromName  || "Kuda Travel & Tours";
  const subject    = cfg?.formSubject
    ? `${cfg.formSubject} — ${data.tourName} [${reference}]`
    : `New Booking — ${data.tourName} [${reference}]`;
  const cc  = (cfg?.ccEmails  ?? []).filter(Boolean) as string[];
  const bcc = (cfg?.bccEmails ?? []).filter(Boolean) as string[];

  try {
    // 1 — notify business
    await resend.emails.send({
      from: `${senderName} <${fromEmail}>`,
      to: toEmail,
      ...(cc.length  && { cc }),
      ...(bcc.length && { bcc }),
      replyTo: data.email,
      subject,
      html: businessEmailHtml(data, reference),
    });

    // 2 — send confirmation to guest
    await resend.emails.send({
      from: `Kuda Travel & Tours <${fromEmail}>`,
      to: data.email,
      subject: `Your booking is confirmed — ${reference}`,
      html: customerEmailHtml(data, reference),
    });

    return { success: true, reference };
  } catch (err: any) {
    console.error("Booking email error:", err);
    return { success: false, error: "Failed to send confirmation. Please try again." };
  }
}
