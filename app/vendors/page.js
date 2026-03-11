"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNeu, NeumorphicCard, STATUS_CFG } from "@/components/neumorphic";
import {
  Truck,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Search,
  Utensils,
  Lightbulb,
  Sparkles,
  Package,
  MoreHorizontal,
} from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────
const DEPT_CFG = {
  Food: {
    icon: Utensils,
    color: (dark) => (dark ? "#fb923c" : "#c2410c"),
    bg: (dark) => (dark ? "rgba(251,146,60,0.15)" : "rgba(194,65,12,0.08)"),
  },
  Lights: {
    icon: Lightbulb,
    color: (dark) => (dark ? "#fbbf24" : "#b45309"),
    bg: (dark) => (dark ? "rgba(251,191,36,0.15)" : "rgba(180,83,9,0.08)"),
  },
  Decor: {
    icon: Sparkles,
    color: (dark) => (dark ? "#f9a8d4" : "#be185d"),
    bg: (dark) => (dark ? "rgba(249,168,212,0.15)" : "rgba(190,24,93,0.08)"),
  },
  Equipment: {
    icon: Package,
    color: (dark) => (dark ? "#93c5fd" : "#1d4ed8"),
    bg: (dark) => (dark ? "rgba(147,197,253,0.15)" : "rgba(29,78,216,0.08)"),
  },
  Other: {
    icon: MoreHorizontal,
    color: (dark) => (dark ? "#9ca3af" : "#4b5563"),
    bg: (dark) => (dark ? "rgba(156,163,175,0.15)" : "rgba(75,85,99,0.08)"),
  },
};

const vendorsData = [
  {
    id: 1,
    name: "Zia Catering Supplies",
    contactPerson: "Muhammad Zia",
    phone: "+92 300 1112222",
    email: "zia@ziacatering.pk",
    department: "Food",
    services: "Raw ingredients, dry goods, spices",
    totalAmount: 180000,
    amountPaid: 135000,
    status: "Partial",
    payments: [
      {
        date: "Nov 28, 2024",
        amount: 75000,
        note: "Advance for December stock",
      },
      { date: "Dec 10, 2024", amount: 60000, note: "Mid-month supplies" },
    ],
  },
  {
    id: 2,
    name: "Pathn Lighting Co.",
    contactPerson: "Khalid Pathni",
    phone: "+92 321 4445555",
    email: "info@pathn.pk",
    department: "Lights",
    services: "LED setups, stage lighting, fairy lights",
    totalAmount: 95000,
    amountPaid: 95000,
    status: "Paid",
    payments: [
      { date: "Dec 20, 2024", amount: 50000, note: "Advance" },
      { date: "Dec 28, 2024", amount: 45000, note: "Final clearance" },
    ],
  },
  {
    id: 3,
    name: "Royal Decor Studio",
    contactPerson: "Asif Khan",
    phone: "+92 333 7778888",
    email: "asif@royaldecor.pk",
    department: "Decor",
    services: "Floral arrangements, stage backdrop, table décor",
    totalAmount: 220000,
    amountPaid: 0,
    status: "Pending",
    payments: [],
  },
  {
    id: 4,
    name: "Prime Tent & Equipment",
    contactPerson: "Nasir Ali",
    phone: "+92 311 0001111",
    email: "nasir@primeequip.pk",
    department: "Equipment",
    services: "Tents, chairs, tables, crockery rental",
    totalAmount: 145000,
    amountPaid: 80000,
    status: "Partial",
    payments: [
      { date: "Dec 05, 2024", amount: 80000, note: "Equipment deposit" },
    ],
  },
  {
    id: 5,
    name: "Fresh Farms Lahore",
    contactPerson: "Imran Baig",
    phone: "+92 300 6667777",
    email: "imran@freshfarms.pk",
    department: "Food",
    services: "Fresh vegetables, dairy, poultry",
    totalAmount: 65000,
    amountPaid: 65000,
    status: "Paid",
    payments: [
      { date: "Dec 27, 2024", amount: 65000, note: "Full payment on delivery" },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function NeuFilterBtn({
  label,
  active,
  onClick,
  dark,
  bg,
  accent,
  textMuted,
  icon: Icon,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-2 rounded-2xl text-xs font-bold transition-all"
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
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </button>
  );
}

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
export default function Vendors() {
  const neu = useNeu();
  const { dark, bg, textPrimary, textMuted, divider, accent } = neu;

  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = vendorsData.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "All" || v.department === filterDept;
    const matchStatus = filterStatus === "All" || v.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const totalPayable = vendorsData.reduce((s, v) => s + v.totalAmount, 0);
  const totalPaid = vendorsData.reduce((s, v) => s + v.amountPaid, 0);
  const totalBalance = totalPayable - totalPaid;

  const departments = ["All", ...Object.keys(DEPT_CFG)];
  const tableHeaderStyle = {
    background: dark ? "#23272f" : "#dde4ef",
    borderBottom: `1px solid ${divider}`,
    borderRadius: "20px 20px 0 0",
    padding: "12px 16px",
  };
  const rowDivider = { borderBottom: `1px solid ${divider}` };

  return (
    <DashboardLayout title="Vendors" subtitle="GN to Vendor payment tracking">
      {/* Header tag */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-xl"
          style={{
            background: dark ? "rgba(139,92,246,0.2)" : "#ede9fe",
            color: dark ? "#c4b5fd" : "#6d28d9",
          }}
        >
          B2B
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 mb-6">
        <StatCard
          dark={dark}
          bg={bg}
          icon={Truck}
          label="Total Payable"
          value={`${totalPayable.toLocaleString()} PKR`}
          iconColor={dark ? "#c4b5fd" : "#7c3aed"}
        />
        <StatCard
          dark={dark}
          bg={bg}
          icon={CheckCircle2}
          label="Total Paid"
          value={`${totalPaid.toLocaleString()} PKR`}
          iconColor={dark ? "#4ade80" : "#16a34a"}
          valueColor={dark ? "#4ade80" : "#15803d"}
        />
        <StatCard
          dark={dark}
          bg={bg}
          icon={AlertCircle}
          label="Outstanding"
          value={`${totalBalance.toLocaleString()} PKR`}
          iconColor={dark ? "#f87171" : "#dc2626"}
          valueColor={dark ? "#f87171" : "#dc2626"}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: textMuted }}
          />
          <input
            type="text"
            placeholder="Search vendor or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="neu-input"
            style={{ paddingLeft: "40px" }}
          />
        </div>

        {/* Department filters */}
        <div className="flex gap-2 flex-wrap">
          {departments.map((dept) => {
            const cfg = DEPT_CFG[dept];
            return (
              <NeuFilterBtn
                key={dept}
                label={dept}
                icon={cfg?.icon}
                active={filterDept === dept}
                onClick={() => setFilterDept(dept)}
                dark={dark}
                bg={bg}
                accent={accent}
                textMuted={textMuted}
              />
            );
          })}
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
              accent={dark ? "#c4b5fd" : "#7c3aed"}
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
          <div className="col-span-3">Vendor</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-2 text-right">Paid</div>
          <div className="col-span-2 text-right">Balance</div>
          <div className="col-span-1 text-center">Status</div>
        </div>

        {/* Rows */}
        {filtered.map((vendor) => {
          const balance = vendor.totalAmount - vendor.amountPaid;
          const pctPaid = Math.round(
            (vendor.amountPaid / vendor.totalAmount) * 100,
          );
          const isExpanded = expandedId === vendor.id;
          const deptCfg = DEPT_CFG[vendor.department];
          const DeptIcon = deptCfg?.icon;

          return (
            <div key={vendor.id}>
              {/* Main row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : vendor.id)}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 lg:py-4 cursor-pointer neu-row-hover transition-colors"
                style={rowDivider}
              >
                {/* Vendor name */}
                <div className="col-span-10 md:col-span-3 flex items-center gap-3 min-w-0">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{
                      background: dark
                        ? "#2d1f5e"
                        : "linear-gradient(135deg,#a78bfa,#7c3aed)",
                      boxShadow: dark
                        ? "3px 3px 7px rgba(10,12,16,0.45), -3px -3px 7px rgba(66,74,90,0.18)"
                        : "3px 3px 7px rgba(163,177,198,0.4), -3px -3px 7px rgba(255,255,255,0.9)",
                    }}
                  >
                    {vendor.name
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
                      {vendor.name}
                    </div>
                    <div
                      className="text-xs truncate"
                      style={{ color: textMuted }}
                    >
                      {vendor.contactPerson}
                    </div>
                  </div>
                </div>

                {/* Department */}
                <div className="hidden md:flex col-span-2 items-center">
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: deptCfg?.bg(dark),
                      color: deptCfg?.color(dark),
                    }}
                  >
                    {DeptIcon && <DeptIcon className="h-3 w-3" />}
                    {vendor.department}
                  </span>
                </div>

                {/* Total */}
                <div className="hidden md:block col-span-2 text-right">
                  <div
                    className="text-sm font-bold"
                    style={{ color: textPrimary }}
                  >
                    {vendor.totalAmount.toLocaleString()}
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
                    {vendor.amountPaid.toLocaleString()}
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
                    <StatusPill status={vendor.status} dark={dark} />
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
                    {/* Vendor details */}
                    <NeumorphicCard dark={dark} className="p-4">
                      <div
                        className="text-[10px] font-extrabold uppercase tracking-wider mb-3"
                        style={{ color: textMuted }}
                      >
                        Vendor Details
                      </div>
                      <div className="space-y-2">
                        {[
                          { icon: Phone, text: vendor.phone },
                          { icon: Mail, text: vendor.email },
                          { icon: Package, text: vendor.services },
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
                                ? "linear-gradient(90deg,#c4b5fd,#a78bfa)"
                                : "linear-gradient(90deg,#7c3aed,#a78bfa)",
                            }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-bold">
                          <span style={{ color: dark ? "#4ade80" : "#15803d" }}>
                            Paid: {vendor.amountPaid.toLocaleString()} PKR
                          </span>
                          <span style={{ color: dark ? "#f87171" : "#dc2626" }}>
                            Due:{" "}
                            {(
                              vendor.totalAmount - vendor.amountPaid
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

                      {vendor.payments.length === 0 ? (
                        <div
                          className="flex flex-col items-center justify-center h-24"
                          style={{ color: textMuted }}
                        >
                          <AlertCircle className="h-6 w-6 mb-1" />
                          <span className="text-sm">No payments made yet</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {vendor.payments.map((p, i) => (
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
                              {vendor.totalAmount.toLocaleString()} PKR
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
            No vendors match your filters.
          </div>
        )}
      </NeumorphicCard>
    </DashboardLayout>
  );
}
