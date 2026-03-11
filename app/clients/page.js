"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNeu, NeumorphicCard, STATUS_CFG } from "@/components/neumorphic";
import {
  UserCheck,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  Users,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react";

// ─── Static Data ──────────────────────────────────────────────────────────────
const clientsData = [
  {
    id: 1,
    name: "Ahmed Raza",
    phone: "+92 300 1234567",
    email: "ahmed.raza@gmail.com",
    event: "Wedding Reception",
    eventDate: "Dec 28, 2024",
    guests: 350,
    totalAmount: 485000,
    amountPaid: 250000,
    status: "Partial",
    payments: [
      { date: "Nov 15, 2024", amount: 150000, note: "Advance payment" },
      { date: "Dec 01, 2024", amount: 100000, note: "2nd installment" },
    ],
  },
  {
    id: 2,
    name: "Sara Malik",
    phone: "+92 321 9876543",
    email: "sara.malik@yahoo.com",
    event: "Birthday Gala",
    eventDate: "Jan 2, 2025",
    guests: 120,
    totalAmount: 185000,
    amountPaid: 185000,
    status: "Paid",
    payments: [
      { date: "Dec 10, 2024", amount: 100000, note: "Full advance" },
      { date: "Dec 28, 2024", amount: 85000, note: "Final payment" },
    ],
  },
  {
    id: 3,
    name: "TechPak Pvt Ltd",
    phone: "+92 51 2345678",
    email: "events@techpak.com",
    event: "Corporate Summit",
    eventDate: "Jan 15, 2025",
    guests: 500,
    totalAmount: 920000,
    amountPaid: 0,
    status: "Pending",
    payments: [],
  },
  {
    id: 4,
    name: "Usman & Fatima",
    phone: "+92 333 5551234",
    email: "usman.f@outlook.com",
    event: "Walima Ceremony",
    eventDate: "Dec 30, 2024",
    guests: 200,
    totalAmount: 310000,
    amountPaid: 200000,
    status: "Partial",
    payments: [
      { date: "Nov 20, 2024", amount: 100000, note: "Booking token" },
      { date: "Dec 15, 2024", amount: 100000, note: "Mid payment" },
    ],
  },
  {
    id: 5,
    name: "Hina Baig",
    phone: "+92 312 7778899",
    email: "hina.baig@gmail.com",
    event: "Mehndi Night",
    eventDate: "Dec 26, 2024",
    guests: 80,
    totalAmount: 95000,
    amountPaid: 95000,
    status: "Paid",
    payments: [{ date: "Dec 20, 2024", amount: 95000, note: "Full payment" }],
  },
];

// ─── Filter Button ────────────────────────────────────────────────────────────
function NeuFilterBtn({ label, active, onClick, dark, bg, accent, textMuted }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-2xl text-xs font-bold transition-all"
      style={{
        color: active ? accent : textMuted,
        background: bg,
        boxShadow: active
          ? dark
            ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.16)"
            : "inset 5px 5px 10px rgba(163,177,198,0.45), inset -5px -5px 10px rgba(255,255,255,0.92)"
          : dark
            ? "6px 6px 12px rgba(10,12,16,0.5), -6px -6px 12px rgba(66,74,90,0.2)"
            : "6px 6px 12px rgba(163,177,198,0.45), -6px -6px 12px rgba(255,255,255,0.9)",
        border: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

// ─── Status Pill ──────────────────────────────────────────────────────────────
function StatusPill({ status, dark }) {
  const cfg = STATUS_CFG[status];
  return (
    <span
      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
      style={{ background: cfg.bgStr(dark), color: cfg.color(dark) }}
    >
      {status}
    </span>
  );
}

// ─── Summary Stat Card ────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  iconColor,
  valueColor,
  dark,
  bg,
}) {
  const iconInset = dark
    ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.16)"
    : "inset 5px 5px 10px rgba(163,177,198,0.38), inset -5px -5px 10px rgba(255,255,255,0.95)";

  return (
    <NeumorphicCard dark={dark} className="p-4 lg:p-5">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: bg, boxShadow: iconInset }}
        >
          <Icon className="h-5 w-5" style={{ color: iconColor }} />
        </div>
        <div>
          <div
            className="text-[10px] font-extrabold uppercase tracking-wider mb-0.5"
            style={{ color: dark ? "#94a3b8" : "#64748b" }}
          >
            {label}
          </div>
          <div
            className="text-lg font-extrabold"
            style={{ color: valueColor || (dark ? "#eef4ff" : "#1f2937") }}
          >
            {value}
          </div>
        </div>
      </div>
    </NeumorphicCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Clients() {
  const neu = useNeu();
  const {
    dark,
    bg,
    cardBg,
    textPrimary,
    textMuted,
    divider,
    accent,
    success,
    danger,
    warning,
  } = neu;

  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = clientsData.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.event.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPending = clientsData.reduce(
    (s, c) => s + (c.totalAmount - c.amountPaid),
    0,
  );
  const totalReceived = clientsData.reduce((s, c) => s + c.amountPaid, 0);

  const tableHeaderStyle = {
    background: dark ? "#23272f" : "#dde4ef",
    borderBottom: `1px solid ${divider}`,
    borderRadius: "20px 20px 0 0",
    padding: "12px 16px",
  };

  const rowDivider = { borderBottom: `1px solid ${divider}` };

  return (
    <DashboardLayout title="Clients" subtitle="GN to Client payment tracking">
      {/* Header tag */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-xl"
          style={{
            background: dark ? "rgba(59,130,246,0.2)" : "#dbeafe",
            color: dark ? "#93c5fd" : "#1d4ed8",
          }}
        >
          B2C
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 mb-6">
        <StatCard
          dark={dark}
          bg={bg}
          icon={UserCheck}
          label="Total Clients"
          value={clientsData.length}
          iconColor={dark ? "#7dd3fc" : "#2563eb"}
        />
        <StatCard
          dark={dark}
          bg={bg}
          icon={CreditCard}
          label="Total Received"
          value={`${totalReceived.toLocaleString()} PKR`}
          iconColor={dark ? "#4ade80" : "#16a34a"}
          valueColor={dark ? "#4ade80" : "#15803d"}
        />
        <StatCard
          dark={dark}
          bg={bg}
          icon={AlertCircle}
          label="Pending Balance"
          value={`${totalPending.toLocaleString()} PKR`}
          iconColor={dark ? "#f87171" : "#dc2626"}
          valueColor={dark ? "#f87171" : "#dc2626"}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: textMuted }}
          />
          <input
            type="text"
            placeholder="Search client or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="neu-input"
            style={{ paddingLeft: "40px" }}
          />
        </div>

        {/* Status filters */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Partial", "Paid"].map((s) => (
            <NeuFilterBtn
              key={s}
              label={s}
              active={filterStatus === s}
              onClick={() => setFilterStatus(s)}
              dark={dark}
              bg={bg}
              accent={accent}
              textMuted={textMuted}
            />
          ))}
        </div>
      </div>

      {/* Table */}
      <NeumorphicCard
        dark={dark}
        className="overflow-hidden"
        style={{ borderRadius: "24px" }}
      >
        {/* Table Header */}
        <div
          className="hidden md:grid grid-cols-12 gap-2 text-[10px] font-extrabold uppercase tracking-wider"
          style={{ ...tableHeaderStyle, color: textMuted }}
        >
          <div className="col-span-3">Client</div>
          <div className="col-span-2">Event</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-2 text-right">Paid</div>
          <div className="col-span-2 text-right">Balance</div>
          <div className="col-span-1 text-center">Status</div>
        </div>

        {/* Rows */}
        {filtered.map((client) => {
          const balance = client.totalAmount - client.amountPaid;
          const pctPaid = Math.round(
            (client.amountPaid / client.totalAmount) * 100,
          );
          const isExpanded = expandedId === client.id;

          return (
            <div key={client.id}>
              {/* Main row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : client.id)}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 lg:py-4 cursor-pointer neu-row-hover transition-colors"
                style={rowDivider}
              >
                {/* Client name */}
                <div className="col-span-10 md:col-span-3 flex items-center gap-3 min-w-0">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{
                      background: dark
                        ? "#1e3a5f"
                        : "linear-gradient(135deg,#60a5fa,#2563eb)",
                      boxShadow: dark
                        ? "3px 3px 7px rgba(10,12,16,0.45), -3px -3px 7px rgba(66,74,90,0.18)"
                        : "3px 3px 7px rgba(163,177,198,0.4), -3px -3px 7px rgba(255,255,255,0.9)",
                    }}
                  >
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-sm font-bold truncate"
                      style={{ color: textPrimary }}
                    >
                      {client.name}
                    </div>
                    <div
                      className="text-xs flex items-center gap-1"
                      style={{ color: textMuted }}
                    >
                      <Calendar className="h-3 w-3" /> {client.eventDate}
                    </div>
                  </div>
                </div>

                {/* Event */}
                <div className="hidden md:block col-span-2 min-w-0">
                  <div
                    className="text-sm truncate"
                    style={{ color: textPrimary }}
                  >
                    {client.event}
                  </div>
                  <div
                    className="text-xs flex items-center gap-1"
                    style={{ color: textMuted }}
                  >
                    <Users className="h-3 w-3" /> {client.guests} guests
                  </div>
                </div>

                {/* Total */}
                <div className="hidden md:block col-span-2 text-right">
                  <div
                    className="text-sm font-bold"
                    style={{ color: textPrimary }}
                  >
                    {client.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-xs" style={{ color: textMuted }}>
                    PKR
                  </div>
                </div>

                {/* Paid */}
                <div className="hidden md:block col-span-2 text-right">
                  <div
                    className="text-sm font-bold"
                    style={{ color: dark ? "#4ade80" : "#15803d" }}
                  >
                    {client.amountPaid.toLocaleString()}
                  </div>
                  <div className="text-xs" style={{ color: textMuted }}>
                    PKR
                  </div>
                </div>

                {/* Balance */}
                <div className="hidden md:block col-span-2 text-right">
                  <div
                    className="text-sm font-bold"
                    style={{
                      color:
                        balance > 0
                          ? dark
                            ? "#f87171"
                            : "#dc2626"
                          : dark
                            ? "#4ade80"
                            : "#15803d",
                    }}
                  >
                    {balance > 0 ? balance.toLocaleString() : "—"}
                  </div>
                  {balance > 0 && (
                    <div className="text-xs" style={{ color: textMuted }}>
                      PKR
                    </div>
                  )}
                </div>

                {/* Status + chevron */}
                <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center items-center gap-1">
                  <span className="hidden md:block">
                    <StatusPill status={client.status} dark={dark} />
                  </span>
                  {isExpanded ? (
                    <ChevronUp
                      className="h-4 w-4"
                      style={{ color: textMuted }}
                    />
                  ) : (
                    <ChevronDown
                      className="h-4 w-4"
                      style={{ color: textMuted }}
                    />
                  )}
                </div>
              </div>

              {/* Expanded panel */}
              {isExpanded && (
                <div
                  className="px-4 py-4"
                  style={{
                    background: dark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.4)",
                    borderTop: `1px solid ${divider}`,
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Client details */}
                    <NeumorphicCard dark={dark} className="p-4">
                      <div
                        className="text-[10px] font-extrabold uppercase tracking-wider mb-3"
                        style={{ color: textMuted }}
                      >
                        Client Details
                      </div>
                      <div className="space-y-2">
                        {[
                          { icon: Phone, text: client.phone },
                          { icon: Mail, text: client.email },
                          {
                            icon: Calendar,
                            text: `${client.event} — ${client.eventDate}`,
                          },
                          { icon: Users, text: `${client.guests} guests` },
                        ].map(({ icon: Icon, text }) => (
                          <div
                            key={text}
                            className="flex items-center gap-2 text-sm"
                            style={{ color: textPrimary }}
                          >
                            <Icon
                              className="h-4 w-4 flex-shrink-0"
                              style={{ color: textMuted }}
                            />
                            {text}
                          </div>
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="mt-4">
                        <div
                          className="flex justify-between text-xs mb-1"
                          style={{ color: textMuted }}
                        >
                          <span>Payment Progress</span>
                          <span>{pctPaid}% paid</span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{
                            background: dark ? "#2d3440" : "#d1dae8",
                            boxShadow: dark
                              ? "inset 2px 2px 4px rgba(10,12,16,0.5), inset -2px -2px 4px rgba(66,74,90,0.12)"
                              : "inset 2px 2px 4px rgba(163,177,198,0.35), inset -2px -2px 4px rgba(255,255,255,0.9)",
                          }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${pctPaid}%`,
                              background: dark
                                ? "linear-gradient(90deg,#7dd3fc,#38bdf8)"
                                : "linear-gradient(90deg,#2563eb,#60a5fa)",
                            }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-bold">
                          <span style={{ color: dark ? "#4ade80" : "#15803d" }}>
                            Paid: {client.amountPaid.toLocaleString()} PKR
                          </span>
                          <span style={{ color: dark ? "#f87171" : "#dc2626" }}>
                            Left:{" "}
                            {(
                              client.totalAmount - client.amountPaid
                            ).toLocaleString()}{" "}
                            PKR
                          </span>
                        </div>
                      </div>
                    </NeumorphicCard>

                    {/* Payment history */}
                    <NeumorphicCard dark={dark} className="p-4">
                      <div
                        className="text-[10px] font-extrabold uppercase tracking-wider mb-3"
                        style={{ color: textMuted }}
                      >
                        Payment History
                      </div>

                      {client.payments.length === 0 ? (
                        <div
                          className="flex flex-col items-center justify-center h-24"
                          style={{ color: textMuted }}
                        >
                          <AlertCircle className="h-6 w-6 mb-1" />
                          <span className="text-sm">No payments recorded</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {client.payments.map((p, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between px-3 py-2 rounded-2xl"
                              style={{
                                background: dark
                                  ? "rgba(255,255,255,0.04)"
                                  : "rgba(255,255,255,0.6)",
                                boxShadow: dark
                                  ? "inset 3px 3px 6px rgba(10,12,16,0.4), inset -3px -3px 6px rgba(66,74,90,0.12)"
                                  : "inset 3px 3px 6px rgba(163,177,198,0.3), inset -3px -3px 6px rgba(255,255,255,0.85)",
                              }}
                            >
                              <div>
                                <div
                                  className="text-sm font-semibold"
                                  style={{ color: textPrimary }}
                                >
                                  {p.note}
                                </div>
                                <div
                                  className="text-xs"
                                  style={{ color: textMuted }}
                                >
                                  {p.date}
                                </div>
                              </div>
                              <div
                                className="text-sm font-bold"
                                style={{ color: dark ? "#4ade80" : "#15803d" }}
                              >
                                +{p.amount.toLocaleString()}
                              </div>
                            </div>
                          ))}

                          <div
                            className="flex justify-between pt-2 text-sm font-bold"
                            style={{
                              borderTop: `1px solid ${divider}`,
                              color: textPrimary,
                            }}
                          >
                            <span>Total Invoice</span>
                            <span>
                              {client.totalAmount.toLocaleString()} PKR
                            </span>
                          </div>
                        </div>
                      )}
                    </NeumorphicCard>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div
            className="py-16 text-center text-sm"
            style={{ color: textMuted }}
          >
            No clients match your search.
          </div>
        )}
      </NeumorphicCard>
    </DashboardLayout>
  );
}
