import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, deadline, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from:    `"ScholarSync Nepal" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      replyTo: email,
      subject: `[ScholarSync Contact] ${subject || "New Inquiry"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 12px;">
          <div style="background: #1e40af; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">📩 New Contact Form Submission</h2>
            <p style="color: #bfdbfe; margin: 4px 0 0; font-size: 13px;">ScholarSync Nepal — scholarsyncnepal@gmail.com</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; width: 130px; font-weight: 600;">Name</td>
                <td style="padding: 10px 0; color: #111827;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #1d4ed8;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Service</td>
                <td style="padding: 10px 0; color: #111827;">${service || "Not specified"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Deadline</td>
                <td style="padding: 10px 0; color: #111827;">${deadline || "Not specified"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Subject</td>
                <td style="padding: 10px 0; color: #111827;">${subject || "—"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="font-weight: 600; color: #6b7280; font-size: 13px; margin-bottom: 8px;">MESSAGE</p>
              <div style="background: #f9fafb; border-left: 3px solid #1d4ed8; padding: 14px 16px; border-radius: 4px; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <a href="mailto:${email}" style="display: inline-block; background: #1e40af; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
                Reply to ${name} →
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 11px; margin-top: 16px;">ScholarSync Nepal · Kathmandu, Nepal · scholarsyncnepal@gmail.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
