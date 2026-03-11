"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarDays,
  TrendingUp,
  CreditCard,
  Truck,
  Plus,
  Trash2,
  Clock,
  ChevronRight,
  Users,
  BookOpen,
  Zap,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  useNeu,
  NeumorphicCard,
  SoftIconButton,
} from "@/components/neumorphic";

export default function DashboardPage() {
  const router = useRouter();
  const neu = useNeu();
  const {
    dark,
    bg,
    textPrimary,
    textMuted,
    divider,
    accent,
    accentSoft,
    warning,
  } = neu;

  // ── Diary state ──────────────────────────────────────────────────────────
  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: 1,
      text: "Ahmed re: wedding — confirm 350 guests by Friday. Menu finalization pending.",
      time: "9:14 AM",
    },
    {
      id: 2,
      text: "Zia vendor Rs.45,000 still pending. Follow up end of week.",
      time: "Yesterday",
    },
    {
      id: 3,
      text: "TechPak corporate inquiry — 500 pax, Jan 15. Send quote asap.",
      time: "Mar 9",
    },
  ]);
  const [newNote, setNewNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const addNote = () => {
    if (!newNote.trim()) return;
    const now = new Date();
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    setDiaryEntries((prev) => [
      {
        id: Date.now(),
        text: newNote.trim(),
        time: `${h % 12 || 12}:${m} ${h >= 12 ? "PM" : "AM"}`,
      },
      ...prev,
    ]);
    setNewNote("");
    setShowNoteInput(false);
  };

  // ── Static data ──────────────────────────────────────────────────────────
  const upcomingEvents = useMemo(
    () => [
      {
        id: "EVT-2025-0041",
        name: "Ahmed & Sana Wedding",
        type: "Wedding",
        date: "Dec 12, 2025",
        guests: 350,
        status: "Paid",
        statusColor: dark ? "#4ade80" : "#15803d",
        typeBg: dark ? "#2f2430" : "#fce7f3",
        typeColor: dark ? "#f9a8d4" : "#be185d",
      },
      {
        id: "EVT-2025-0045",
        name: "Engro Corp AGM",
        type: "Corporate",
        date: "Dec 15, 2025",
        guests: 120,
        status: "PKR 45,000 Due",
        statusColor: dark ? "#f87171" : "#dc2626",
        typeBg: dark ? "#1d2f45" : "#dbeafe",
        typeColor: dark ? "#93c5fd" : "#1d4ed8",
      },
      {
        id: "EVT-2025-0048",
        name: "Birthday — Zaid",
        type: "General",
        date: "Dec 18, 2025",
        guests: 50,
        status: "Paid",
        statusColor: dark ? "#4ade80" : "#15803d",
        typeBg: dark ? "#3c321c" : "#fef3c7",
        typeColor: dark ? "#fcd34d" : "#92400e",
      },
    ],
    [dark],
  );

  const activity = [
    { text: "Invoice #412 created", time: "2 mins ago" },
    { text: "Payment received from Ahmed", time: "1 hour ago" },
    { text: "New quotation for HBL", time: "3 hours ago" },
    { text: "Event #041 updated", time: "5 hours ago" },
    { text: "Customer profile: Zaid", time: "1 day ago" },
  ];

  const statCards = [
    {
      icon: CalendarDays,
      label: "Today's Events",
      value: "4",
      sub: "2 active now",
      iconColor: dark ? "#7dd3fc" : "#2563eb",
      onClick: () => router.push("/events"),
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: "PKR 850k",
      sub: "+12% vs last",
      iconColor: dark ? "#4ade80" : "#16a34a",
    },
    {
      icon: CreditCard,
      label: "Client Dues",
      value: "PKR 125k",
      sub: "Pending from clients",
      iconColor: dark ? "#f87171" : "#dc2626",
      valueColor: dark ? "#fda4af" : "#b91c1c",
      tag: "B2C",
      onClick: () => router.push("/clients"),
    },
    {
      icon: Truck,
      label: "Vendor Dues",
      value: "PKR 65k",
      sub: "Owed to vendors",
      iconColor: dark ? "#c4b5fd" : "#7c3aed",
      valueColor: dark ? "#ddd6fe" : "#6d28d9",
      tag: "B2B",
      onClick: () => router.push("/vendors"),
    },
  ];

  const iconInset = dark
    ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.16)"
    : "inset 5px 5px 10px rgba(163,177,198,0.38), inset -5px -5px 10px rgba(255,255,255,0.95)";

  return (
    <DashboardLayout title="Dashboard" subtitle="Good morning, Marcus 👋">
      {/* ── Stat Cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6 lg:mb-8">
        {statCards.map((card) => (
          <NeumorphicCard
            key={card.label}
            dark={dark}
            onClick={card.onClick}
            className="p-4 lg:p-5"
          >
            <div
              className="h-10 w-10 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: bg, boxShadow: iconInset }}
            >
              <card.icon
                className="h-4 w-4"
                strokeWidth={2.5}
                style={{ color: card.iconColor }}
              />
            </div>

            <div
              className="text-[10px] font-extrabold uppercase tracking-wider mb-1"
              style={{ color: textMuted }}
            >
              {card.label}
            </div>

            <div
              className="text-lg lg:text-xl font-extrabold leading-tight"
              style={{ color: card.valueColor || textPrimary }}
            >
              {card.value}
            </div>

            <div
              className="text-[10px] font-semibold mt-0.5"
              style={{ color: textMuted }}
            >
              {card.sub}
            </div>

            {card.tag && (
              <div className="absolute bottom-4 right-4 flex items-center gap-1">
                <span
                  className="text-[10px] font-extrabold tracking-wide"
                  style={{ color: card.iconColor }}
                >
                  {card.tag}
                </span>
                <ChevronRight
                  className="h-3 w-3"
                  style={{ color: textMuted }}
                />
              </div>
            )}

            {card.onClick && !card.tag && (
              <ChevronRight
                className="absolute bottom-4 right-4 h-3.5 w-3.5"
                style={{ color: textMuted }}
              />
            )}
          </NeumorphicCard>
        ))}
      </div>

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left: Events + Activity */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Upcoming Events */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-base font-extrabold"
                style={{ color: textPrimary }}
              >
                Upcoming Events
              </span>
              <button
                className="text-sm font-bold"
                style={{ color: accent }}
                onClick={() => router.push("/events")}
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((ev) => (
                <NeumorphicCard
                  key={ev.id}
                  dark={dark}
                  onClick={() => {}}
                  className="p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-[10px] font-bold mb-1"
                        style={{ color: textMuted }}
                      >
                        {" "}
                        {ev.id}
                      </div>
                      <div
                        className="text-sm font-extrabold truncate mb-2"
                        style={{ color: textPrimary }}
                      >
                        {ev.name}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: ev.typeBg, color: ev.typeColor }}
                        >
                          {ev.type}
                        </span>
                        <span
                          className="text-[11px] font-semibold flex items-center gap-1"
                          style={{ color: textMuted }}
                        >
                          <CalendarDays className="h-3 w-3" /> {ev.date}
                        </span>
                        <span
                          className="text-[11px] font-semibold flex items-center gap-1"
                          style={{ color: textMuted }}
                        >
                          <Users className="h-3 w-3" /> {ev.guests}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-sm font-extrabold shrink-0"
                      style={{ color: ev.statusColor }}
                    >
                      {ev.status}
                    </span>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Zap
                className="h-4 w-4"
                style={{ color: dark ? "#c4b5fd" : "#7c3aed" }}
              />
              <span
                className="text-base font-extrabold"
                style={{ color: textPrimary }}
              >
                Recent Activity
              </span>
            </div>

            <NeumorphicCard dark={dark} className="p-1 overflow-hidden">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-[22px] transition-colors neu-row-hover"
                  style={{
                    borderBottom:
                      i < activity.length - 1 ? `1px solid ${divider}` : "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{
                      background:
                        i === 0 ? accent : dark ? "#4b5563" : "#94a3b8",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm font-semibold truncate"
                      style={{ color: textPrimary }}
                    >
                      {item.text}
                    </div>
                    <div
                      className="text-[11px] font-semibold"
                      style={{ color: textMuted }}
                    >
                      {item.time}
                    </div>
                  </div>
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: textMuted }}
                  />
                </div>
              ))}
            </NeumorphicCard>
          </section>
        </div>

        {/* Right: Diary */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" style={{ color: warning }} />
              <span
                className="text-base font-extrabold"
                style={{ color: textPrimary }}
              >
                Diary
              </span>
            </div>
            <SoftIconButton
              dark={dark}
              onClick={() => setShowNoteInput((v) => !v)}
              className="h-9 w-9 rounded-2xl"
              style={{ color: warning }}
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </SoftIconButton>
          </div>

          {showNoteInput && (
            <div className="mb-3 slide-up">
              <NeumorphicCard dark={dark} className="p-3">
                <textarea
                  autoFocus
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write a note..."
                  className="neu-textarea mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addNote}
                    disabled={!newNote.trim()}
                    className="flex-1 py-2.5 rounded-2xl text-sm font-bold transition-all disabled:opacity-40 active:scale-95"
                    style={{
                      color: accent,
                      background: bg,
                      boxShadow: dark
                        ? "6px 6px 12px rgba(10,12,16,0.52), -6px -6px 12px rgba(66,74,90,0.18)"
                        : "6px 6px 12px rgba(163,177,198,0.4), -6px -6px 12px rgba(255,255,255,0.95)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowNoteInput(false);
                      setNewNote("");
                    }}
                    className="px-4 py-2.5 rounded-2xl text-sm font-bold transition-all active:scale-95"
                    style={{
                      color: textMuted,
                      background: bg,
                      boxShadow: dark
                        ? "6px 6px 12px rgba(10,12,16,0.52), -6px -6px 12px rgba(66,74,90,0.18)"
                        : "6px 6px 12px rgba(163,177,198,0.4), -6px -6px 12px rgba(255,255,255,0.95)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </NeumorphicCard>
            </div>
          )}

          <div className="space-y-2.5">
            {diaryEntries.map((entry) => (
              <NeumorphicCard
                key={entry.id}
                dark={dark}
                className="p-3.5 group"
                style={{ background: dark ? "#252a33" : "#eef3f9" }}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium leading-relaxed"
                      style={{ color: textPrimary }}
                    >
                      {entry.text}
                    </p>
                    <div
                      className="flex items-center gap-1 mt-1.5 text-[11px] font-bold"
                      style={{ color: warning }}
                    >
                      <Clock className="h-3 w-3" /> {entry.time}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDiaryEntries((prev) =>
                        prev.filter((d) => d.id !== entry.id),
                      );
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
                    style={{
                      color: textMuted,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = dark
                        ? "#fca5a5"
                        : "#dc2626";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = textMuted;
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
