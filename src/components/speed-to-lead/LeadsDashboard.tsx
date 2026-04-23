"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabase";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  ai_response: string;
  email_status: string;
  sms_status: string;
  response_time_ms: number;
  created_at: string;
}

export function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (data) setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 10000);
    return () => clearInterval(interval);
  }, [fetchLeads]);

  const totalLeads = leads.length;
  const avgResponseTime =
    totalLeads > 0
      ? Math.round(
          leads.reduce((sum, l) => sum + (l.response_time_ms || 0), 0) /
            totalLeads
        )
      : 0;
  const emailsSent = leads.filter((l) => l.email_status === "sent").length;

  if (loading) {
    return (
      <div className="text-center text-[rgba(240,240,250,0.4)]">
        Loading leads...
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 text-center">
          <div className="font-mono text-3xl font-bold text-[#f0f0fa]">
            {totalLeads}
          </div>
          <div className="mt-1 text-xs text-[rgba(240,240,250,0.4)]">
            Total Leads
          </div>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 text-center">
          <div className="font-mono text-3xl font-bold text-[#f0f0fa]">
            {avgResponseTime < 1000
              ? `${avgResponseTime}ms`
              : `${(avgResponseTime / 1000).toFixed(1)}s`}
          </div>
          <div className="mt-1 text-xs text-[rgba(240,240,250,0.4)]">
            Avg Response Time
          </div>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 text-center">
          <div className="font-mono text-3xl font-bold text-[#f0f0fa]">
            {emailsSent}
          </div>
          <div className="mt-1 text-xs text-[rgba(240,240,250,0.4)]">
            Emails Sent
          </div>
        </div>
      </div>

      {/* Leads table */}
      {leads.length === 0 ? (
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-12 text-center text-[rgba(240,240,250,0.4)]">
          No leads yet. Send a test from the demo form.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)] text-xs text-[rgba(240,240,250,0.4)]">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Response Time</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">SMS</th>
                <th className="px-4 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)]"
                >
                  <td className="px-4 py-3 text-[#f0f0fa]">{lead.name}</td>
                  <td className="px-4 py-3 text-[rgba(240,240,250,0.5)]">
                    {lead.email}
                  </td>
                  <td className="px-4 py-3 text-[rgba(240,240,250,0.5)]">
                    {lead.service}
                  </td>
                  <td className="px-4 py-3 font-mono text-[rgba(240,240,250,0.5)]">
                    {lead.response_time_ms < 1000
                      ? `${lead.response_time_ms}ms`
                      : `${(lead.response_time_ms / 1000).toFixed(1)}s`}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.email_status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.sms_status} />
                  </td>
                  <td className="px-4 py-3 text-[rgba(240,240,250,0.4)]">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    sent: "text-green-400 bg-green-400/10 border-green-400/20",
    failed: "text-red-400 bg-red-400/10 border-red-400/20",
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    skipped: "text-[rgba(240,240,250,0.3)] bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)]",
  };

  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-mono ${
        colors[status] || colors.skipped
      }`}
    >
      {status}
    </span>
  );
}
