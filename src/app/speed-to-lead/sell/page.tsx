import type { Metadata } from "next";
import { SpeedToLeadSales } from "@/components/speed-to-lead/SpeedToLeadSales";

export const metadata: Metadata = {
  title: "Speed to Lead — Never Lose a Lead Again",
  description:
    "AI-powered lead response in under 5 seconds. Email and SMS responses that feel human, sent the instant a prospect fills out your form.",
};

export default function SpeedToLeadSellPage() {
  return <SpeedToLeadSales />;
}
