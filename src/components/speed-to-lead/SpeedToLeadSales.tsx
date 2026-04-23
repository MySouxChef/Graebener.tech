"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Zap, Mail, BarChart3, Clock } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

const TIERS = [
  {
    name: "Starter",
    price: 97,
    leads: "100 leads/mo",
    features: [
      "AI-generated email responses",
      "Sub-5-second response time",
      "Lead dashboard",
      "Email notifications",
    ],
  },
  {
    name: "Growth",
    price: 297,
    leads: "500 leads/mo",
    popular: true,
    features: [
      "Everything in Starter",
      "SMS responses (Twilio)",
      "Advanced AI personalization",
      "Priority support",
      "Webhook integrations",
    ],
  },
  {
    name: "Scale",
    price: 597,
    leads: "Unlimited leads",
    features: [
      "Everything in Growth",
      "Custom AI prompts",
      "CRM integrations",
      "Multi-location support",
      "Dedicated onboarding",
      "White-label option",
    ],
  },
];

const STEPS = [
  {
    icon: Zap,
    title: "Lead submits a form",
    desc: "Your website form, landing page, or ad — any source.",
  },
  {
    icon: Mail,
    title: "AI responds instantly",
    desc: "Personalized email sent in under 5 seconds. Not a template — a real, contextual reply.",
  },
  {
    icon: BarChart3,
    title: "You close the deal",
    desc: "Lead is warm, engaged, and waiting for your call. Every response tracked in your dashboard.",
  },
];

export function SpeedToLeadSales() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-4 inline-block">Speed to Lead</p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#f0f0fa] sm:text-5xl md:text-6xl">
            Your leads go cold in 5 minutes.{" "}
            <span className="text-[rgba(240,240,250,0.4)]">
              We respond in 5 seconds.
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[rgba(240,240,250,0.5)]">
            AI-powered responses that feel human, sent the instant a prospect
            fills out your form. Email today, SMS coming soon.
          </p>
        </motion.div>
      </section>

      {/* Live Demo */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-[#f0f0fa]">
          Try it live
        </h2>
        <DemoForm />
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-[#f0f0fa]">
          How it works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
                <step.icon className="h-5 w-5 text-[rgba(240,240,250,0.6)]" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-[#f0f0fa]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[rgba(240,240,250,0.45)]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-[#f0f0fa]">
          Pricing
        </h2>
        <p className="mb-12 text-center text-[rgba(240,240,250,0.45)]">
          Stop losing deals to slow follow-up.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.popular
                  ? "border-[rgba(240,240,250,0.2)] bg-[rgba(255,255,255,0.04)]"
                  : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[rgba(240,240,250,0.2)] bg-[rgba(255,255,255,0.06)] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[rgba(240,240,250,0.7)]">
                  Most Popular
                </span>
              )}
              <h3 className="mb-1 text-lg font-semibold text-[#f0f0fa]">
                {tier.name}
              </h3>
              <p className="mb-4 text-xs text-[rgba(240,240,250,0.4)]">
                {tier.leads}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#f0f0fa]">
                  ${tier.price}
                </span>
                <span className="text-sm text-[rgba(240,240,250,0.4)]">
                  /mo
                </span>
              </div>
              <ul className="mb-8 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-[rgba(240,240,250,0.55)]"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <GlowButton
                href="/contact"
                variant={tier.popular ? "primary" : "outline"}
              >
                Get Started
              </GlowButton>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#f0f0fa]">
          Ready to stop losing leads?
        </h2>
        <p className="mb-8 text-[rgba(240,240,250,0.45)]">
          Every minute you wait, your competitors respond first.
        </p>
        <GlowButton href="/contact">Talk to Me</GlowButton>
      </section>
    </div>
  );
}

function DemoForm() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    response_time_ms: number;
    ai_response: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/speed-to-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Failed to send. Try again.");
    } finally {
      setSending(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-transparent px-4 py-3 text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-[rgba(240,240,250,0.35)] focus:outline-none normal-case";

  if (result) {
    return (
      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8">
        <div className="mb-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-green-500" />
          <span className="font-mono text-lg font-bold text-green-400">
            {result.response_time_ms < 1000
              ? `${result.response_time_ms}ms`
              : `${(result.response_time_ms / 1000).toFixed(1)}s`}
          </span>
          <span className="text-sm text-[rgba(240,240,250,0.4)]">
            response time
          </span>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-[rgba(240,240,250,0.6)]">
          {result.ai_response}
        </p>
        <p className="mb-6 text-xs text-[rgba(240,240,250,0.3)]">
          This response was just emailed to the address you provided.
        </p>
        <button
          onClick={() => setResult(null)}
          className="text-sm text-[rgba(240,240,250,0.5)] underline underline-offset-2 hover:text-[#f0f0fa] cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          className={inputClass}
          placeholder="Your name"
        />
        <input
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>
      <select name="service" className={inputClass}>
        <option value="Website">Website</option>
        <option value="Automation">Automation</option>
        <option value="AI Integration">AI Integration</option>
        <option value="Consulting">Consulting</option>
      </select>
      <textarea
        name="message"
        rows={3}
        className={`${inputClass} resize-none`}
        placeholder="Tell us about your project (optional)"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <GlowButton type="submit">
        {sending ? "Sending..." : "Send Test Lead"}
      </GlowButton>
    </form>
  );
}
