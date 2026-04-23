import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/approach/StepCard";

const steps = [
  {
    num: "01",
    title: "Audit",
    description:
      "I learn your workflows, stack, and where revenue is leaking. One call plus an async workflow audit.",
    footnote: "Typical: 2 calls + workflow doc",
  },
  {
    num: "02",
    title: "Design",
    description:
      "I scope the AI system, timeline, and ROI projection so you know exactly what you're getting before we build.",
    footnote: "Deliverable: spec + ROI model",
  },
  {
    num: "03",
    title: "Ship",
    description:
      "I build, integrate, and deploy alongside your team. Weekly demos, iterative delivery, no big-bang launches.",
    footnote: "Cadence: weekly demos",
  },
  {
    num: "04",
    title: "Iterate",
    description:
      "Ongoing tuning, monitoring, and scaling so the system keeps delivering as your business grows.",
    footnote: "SLA-backed response times",
  },
];

export function ApproachSection() {
  return (
    <section id="approach" className="py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="How I work">
          From idea to impact in 4 steps
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2 md:gap-x-8">
          {steps.map((s, i) => (
            <StepCard
              key={s.num}
              num={s.num}
              title={s.title}
              description={s.description}
              footnote={s.footnote}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
