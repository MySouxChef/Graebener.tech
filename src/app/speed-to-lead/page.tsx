import type { Metadata } from "next";
import { LeadsDashboard } from "@/components/speed-to-lead/LeadsDashboard";

export const metadata: Metadata = {
  title: "Speed to Lead — Dashboard",
  description: "Monitor incoming leads and response performance.",
};

export default function SpeedToLeadPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#f0f0fa] md:text-4xl">
          Speed to Lead
        </h1>
        <p className="mb-10 text-[rgba(240,240,250,0.5)]">
          Incoming leads and response performance
        </p>
        <LeadsDashboard />
      </div>
    </div>
  );
}
