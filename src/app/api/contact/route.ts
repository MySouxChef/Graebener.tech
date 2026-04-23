import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO_EMAIL = "mysouxchef@gmail.com";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const subjectLine = `[Graebener.tech] ${subject || "General Inquiry"} from ${name}`;

    const { error } = await resend.emails.send({
      from: "Graebener.tech <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: subjectLine,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
