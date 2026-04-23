import { NextResponse } from "next/server";
import { processLead } from "@/lib/speed-to-lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, client_id } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Name, email, and service are required." },
        { status: 400 }
      );
    }

    const result = await processLead({
      name,
      email,
      phone,
      service,
      message: message || "",
      client_id,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Speed to Lead error:", err);
    return NextResponse.json(
      { error: "Failed to process lead." },
      { status: 500 }
    );
  }
}
