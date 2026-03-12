"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNeu, NeumorphicCard, STATUS_CFG } from "@/components/neumorphic";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Search,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Users,
  Briefcase,
  Cake,
} from "lucide-react";

// Event type → CSS class (static, no dark conditional)
const TYPE_CLASS = {
  Wedding: "badge-wedding",
  Corporate: "badge-corporate",
  General: "badge-general",
};

const TYPE_ICON = {
  Wedding: Users,
  Corporate: Briefcase,
  General: Cake,
};

const clientsData = [
  {
    id: 1,
    name: "Ahmed & Sana Wedding",
    contactPerson: "Ahmed Khan",
    phone: "+92 300 1234567",
    email: "ahmed.khan@gmail.com",
    type: "Wedding",
    services: "Full wedding catering – 350 guests, 5-course menu",
    totalAmount: 850000,
    amountPaid: 850000,
    status: "Paid",
    payments: [
      { date: "Nov 15, 2024", amount: 425000, note: "50% advance" },
      { date: "Dec 10, 2024", amount: 425000, note: "Final payment" },
    ],
  },
  {
    id: 2,
    name: "Engro Corp AGM",
    contactPerson: "Farhan Malik",
    phone: "+92 321 9876543",
    email: "farhan@engro.pk",
    type: "Corporate",
    services: "Corporate AGM lunch for 120 executives",
    totalAmount: 245000,
    amountPaid: 180000,
    status: "Partial",
    payments: [{ date: "Dec 05, 2024", amount: 180000, note: "Advance" }],
  },
  {
    id: 3,
    name: "Zaid Birthday Party",
    contactPerson: "Zaid's Family",
    phone: "+92 333 5556666",
    email: "zaidparty@gmail.com",
    type: "General",
    services: "Kids birthday – 50 guests, snacks & cake",
    totalAmount: 85000,
    amountPaid: 0,
    status: "Pending",
    payments: [],
  },
  {
    id: 4,
    name: "HBL Year End Gala",
    contactPerson: "Sana Ahmed",
    phone: "+92 300 7778888",
    email: "events@hbl.com",
    type: "Corporate",
    services: "Gala dinner for 200 guests",
    totalAmount: 320000,
    amountPaid: 160000,
    status: "Partial",
    payments: [
      { date: "Dec 20, 2024", amount: 160000, note: "Initial deposit" },
    ],
  },
  {
    id: 5,
    name: "Khan Family Reunion",
    contactPerson: "Bilal Khan",
    phone: "+92 311 2223333",
    email: "bilal.khan@yahoo.com",
    type: "General",
    services: "Family gathering – 80 pax",
    totalAmount: 125000,
    amountPaid: 125000,
    status: "Paid",
    payments: [{ date: "Dec 28, 2024", amount: 125000, note: "Full payment" }],
  },
];

function NeuFilterBtn({
  label,
  active,
  icon: Icon,
  onClick,
  accent,
  textMuted,
  bg,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-2 rounded-2xl text-xs font-bold transition-all"
      style={{
        color: active ? accent : textMuted,
        background: bg,
        boxShadow: active ? "var(--neu-active-nav)" : "var(--neu-soft)",
        border: "none",
        cursor: "pointer",
      }}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </button>
  );
}

function StatusPill({ status }) {
  const cfg = STATUS_CFG[status];
  return (
    <span
      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
      style={{ background: cfg.bgStr, color: cfg.color }}
    >
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, iconColor, valueColor, bg }) {
  return (
    <NeumorphicCard className="p-4 lg:p-5">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: bg, boxShadow: "var(--neu-icon-inset)" }}
        >
          <Icon className="h-5 w-5" style={{ color: iconColor }} />
        </div>
        <div>
          <div
            className="text-[10px] font-extrabold uppercase tracking-wider mb-0.5"
            style={{ color: "var(--neu-text-muted)" }}
          >
            {label}
          </div>
          <div
            className="text-lg font-extrabold"
            style={{ color: valueColor || "var(--neu-text-primary)" }}
          >
            {value}
          </div>
        </div>
      </div>
    </NeumorphicCard>
  );
}

export default function Clients() {
  const neu = useNeu();
  const { bg, textPrimary, textMuted, divider, accent } = neu;

  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = clientsData.filter(
    (c) =>
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.contactPerson.toLowerCase().includes(search.toLowerCase())) &&
      (filterType === "All" || c.type === filterType) &&
      (filterStatus === "All" || c.status === filterStatus),
  );

  const totalReceivable = clientsData.reduce((s, c) => s + c.totalAmount, 0);
  const totalReceived = clientsData.reduce((s, c) => s + c.amountPaid, 0);
  const totalOutstanding = totalReceivable - totalReceived;

  const eventTypes = ["All", ...Object.keys(TYPE_CLASS)];

  return (
    <DashboardLayout title="Clients" subtitle="GN to Client payment tracking">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs font-bold px-2 py-0.5 rounded-xl tag-b2c">
          B2C
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 mb-6">
        <StatCard
          bg={bg}
          icon={CreditCard}
          label="Total Receivable"
          value={`${totalReceivable.toLocaleString()} PKR`}
          iconColor={accent}
        />
        <StatCard
          bg={bg}
          icon={CheckCircle2}
          label="Total Received"
          value={`${totalReceived.toLocaleString()} PKR`}
          iconColor="var(--neu-success)"
          valueColor="var(--neu-success)"
        />
        <StatCard
          bg={bg}
          icon={AlertCircle}
          label="Outstanding"
          value={`${totalOutstanding.toLocaleString()} PKR`}
          iconColor="var(--neu-danger)"
          valueColor="var(--neu-danger)"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: textMuted }}
          />
          <input
            type="text"
            placeholder="Search client or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="neu-input"
            style={{ paddingLeft: "40px" }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {eventTypes.map((typ) => (
            <NeuFilterBtn
              key={typ}
              label={typ}
              icon={TYPE_ICON[typ]}
              active={filterType === typ}
              onClick={() => setFilterType(typ)}
              accent={accent}
              textMuted={textMuted}
              bg={bg}
            />
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Partial", "Paid"].map((s) => (
            <NeuFilterBtn
              key={s}
              label={s}
              active={filterStatus === s}
              onClick={() => setFilterStatus(s)}
              accent={accent}
              textMuted={textMuted}
              bg={bg}
            />
          ))}
        </div>
      </div>

      <NeumorphicCard
        className="overflow-hidden"
        style={{ borderRadius: "24px" }}
      >
        {/* Table Header */}
        <div
          className="hidden md:grid grid-cols-12 gap-2 text-[10px] font-extrabold uppercase tracking-wider px-4 py-3"
          style={{
            background: "var(--neu-panel-bg)",
            borderBottom: `1px solid ${divider}`,
            color: textMuted,
            borderRadius: "24px 24px 0 0",
          }}
        >
          <div className="col-span-3">Client</div>
          <div className="col-span-2">Event Type</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-2 text-right">Received</div>
          <div className="col-span-2 text-right">Balance</div>
          <div className="col-span-1 text-center">Status</div>
        </div>

        {filtered.map((client) => {
          const balance = client.totalAmount - client.amountPaid;
          const pctPaid = Math.round(
            (client.amountPaid / client.totalAmount) * 100,
          );
          const isExpanded = expandedId === client.id;
          const TypeIcon = TYPE_ICON[client.type];

          return (
            <div key={client.id}>
              <div
                onClick={() => setExpandedId(isExpanded ? null : client.id)}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 lg:py-4 cursor-pointer neu-row-hover transition-colors"
                style={{ borderBottom: `1px solid ${divider}` }}
              >
                {/* Client Name + Avatar */}
                <div className="col-span-10 md:col-span-3 flex items-center gap-3 min-w-0">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 neu-avatar-client"
                    style={{ boxShadow: "var(--neu-soft)" }}
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
                      className="text-xs truncate"
                      style={{ color: textMuted }}
                    >
                      {client.contactPerson}
                    </div>
                  </div>
                </div>

                {/* Event Type */}
                <div className="hidden md:flex col-span-2 items-center">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${TYPE_CLASS[client.type] ?? ""}`}
                  >
                    {TypeIcon && <TypeIcon className="h-3 w-3" />}
                    {client.type}
                  </span>
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

                {/* Received */}
                <div className="hidden md:block col-span-2 text-right">
                  <div
                    className="text-sm font-bold"
                    style={{ color: "var(--neu-success)" }}
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
                          ? "var(--neu-danger)"
                          : "var(--neu-success)",
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

                {/* Status + Chevron */}
                <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center items-center gap-1">
                  <span className="hidden md:block">
                    <StatusPill status={client.status} />
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

              {/* Expanded Details */}
              {isExpanded && (
                <div
                  className="px-4 py-4"
                  style={{
                    background: "var(--neu-panel-bg)",
                    borderTop: `1px solid ${divider}`,
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NeumorphicCard className="p-4">
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
                          { icon: Users, text: client.services },
                        ].map(({ icon: Icon, text }) => (
                          <div
                            key={text}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: textPrimary }}
                          >
                            <Icon
                              className="h-4 w-4 flex-shrink-0 mt-0.5"
                              style={{ color: textMuted }}
                            />
                            {text}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <div
                          className="flex justify-between text-xs mb-1"
                          style={{ color: textMuted }}
                        >
                          <span>Payment Progress</span>
                          <span>{pctPaid}% received</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden neu-progress-track">
                          <div
                            className="h-full rounded-full transition-all neu-progress-fill-client"
                            style={{ width: `${pctPaid}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-bold">
                          <span style={{ color: "var(--neu-success)" }}>
                            Received: {client.amountPaid.toLocaleString()} PKR
                          </span>
                          <span style={{ color: "var(--neu-danger)" }}>
                            Due:{" "}
                            {(
                              client.totalAmount - client.amountPaid
                            ).toLocaleString()}{" "}
                            PKR
                          </span>
                        </div>
                      </div>
                    </NeumorphicCard>

                    <NeumorphicCard className="p-4">
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
                          <span className="text-sm">
                            No payments received yet
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {client.payments.map((p, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between px-3 py-2 rounded-2xl"
                              style={{
                                background: "var(--neu-item-bg)",
                                boxShadow: "var(--neu-history-item)",
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
                                style={{ color: "var(--neu-success)" }}
                              >
                                {p.amount.toLocaleString()}
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
                            <span>Total Due</span>
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
            No clients match your filters.
          </div>
        )}
      </NeumorphicCard>
    </DashboardLayout>
  );
}
