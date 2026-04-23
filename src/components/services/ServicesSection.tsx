import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";

const services = [
  {
    label: "Service 01",
    title: "Lead Response",
    description:
      "Inbound leads answered in seconds, qualified, and booked to your calendar. No forms rotting in a CRM.",
    mockup: <LeadResponseMockup />,
  },
  {
    label: "Service 02",
    title: "Database Reactivation",
    description:
      "Dormant contacts warmed back up with AI outreach that sounds like you wrote it. Revenue from your existing list.",
    mockup: <DbReactivationMockup />,
  },
  {
    label: "Service 03",
    title: "Kitchen Ops",
    description:
      "AI that runs the back of house: inventory, prep, orders, and the messaging layer that keeps the floor moving.",
    mockup: <KitchenOpsMockup />,
  },
  {
    label: "Service 04",
    title: "Agent Orchestration",
    description:
      "The systems that tie the above together. Agents that hand off, escalate, and keep state across tools.",
    mockup: <AgentOrchestrationMockup />,
  },
];

export function ServicesSection() {
  return (
    <section id="what-i-build" className="py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="What I build">
          AI systems that actually ship
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              label={svc.label}
              title={svc.title}
              description={svc.description}
              mockup={svc.mockup}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadResponseMockup() {
  return (
    <div className="w-full space-y-2 font-mono text-[11px]">
      <div className="flex items-start gap-2">
        <div className="h-5 w-5 shrink-0 rounded-full bg-[rgba(244,243,238,0.15)]" />
        <div className="flex-1 rounded-lg bg-[rgba(244,243,238,0.06)] px-3 py-2 text-[rgba(244,243,238,0.8)]">
          Hi — saw you requested a quote. Got 30s?
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-5 w-5 shrink-0 rounded-full bg-[rgba(204,120,92,0.35)]" />
        <div className="flex-1 rounded-lg bg-[rgba(204,120,92,0.1)] px-3 py-2 text-[#f4f3ee]">
          Yes — calendar sent · response in 8s
        </div>
      </div>
    </div>
  );
}

function DbReactivationMockup() {
  const bars = [12, 28, 41, 55, 68, 80, 92];
  return (
    <div className="w-full">
      <div className="mb-3 flex items-end justify-between gap-1 h-16">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i === bars.length - 1 ? "#cc785c" : "rgba(244,243,238,0.15)",
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] text-[rgba(244,243,238,0.55)]">
        <span>4,218 contacts</span>
        <span className="text-[#cc785c]">+27 booked this week</span>
      </div>
    </div>
  );
}

function KitchenOpsMockup() {
  const rows = [
    { label: "Prep queue", value: "14 tickets" },
    { label: "Low stock", value: "3 items", accent: true },
    { label: "Staff on", value: "6/8" },
  ];
  return (
    <div className="w-full space-y-2 font-mono text-[11px]">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between rounded-md border border-[rgba(244,243,238,0.06)] bg-[rgba(244,243,238,0.03)] px-3 py-2"
        >
          <span className="text-[rgba(244,243,238,0.55)]">{r.label}</span>
          <span className={r.accent ? "text-[#cc785c]" : "text-[#f4f3ee]"}>
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function AgentOrchestrationMockup() {
  return (
    <div className="w-full font-mono text-[10px] leading-relaxed">
      <div className="flex items-center gap-2 text-[rgba(244,243,238,0.4)]">
        <span className="text-[#cc785c]">$</span>
        <span>agents.orchestrate()</span>
      </div>
      <div className="mt-2 space-y-1 text-[rgba(244,243,238,0.7)]">
        <div>
          <span className="text-[#cc785c]">→</span> lead-agent · handed off to
          booking
        </div>
        <div>
          <span className="text-[#cc785c]">→</span> booking-agent · slot
          confirmed
        </div>
        <div>
          <span className="text-[#cc785c]">→</span> followup-agent · queued
          24h
        </div>
        <div className="text-[rgba(244,243,238,0.4)]">
          state synced across 3 agents
        </div>
      </div>
    </div>
  );
}
