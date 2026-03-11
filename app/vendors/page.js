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

// dept → CSS class (static, no dark conditional)
const DEPT_CLASS = {
  Food: "dept-food",
  Lights: "dept-lights",
  Decor: "dept-decor",
  Equipment: "dept-equipment",
  Other: "dept-other",
};
const DEPT_ICON = {
  Food: Utensils,
  Lights: Lightbulb,
  Decor: Sparkles,
  Equipment: Package,
  Other: MoreHorizontal,
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

export default function Vendors() {
  const neu = useNeu();
  const { bg, textPrimary, textMuted, divider, accent, purpleIcon } = neu;

  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = vendorsData.filter(
    (v) =>
      (v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.contactPerson.toLowerCase().includes(search.toLowerCase())) &&
      (filterDept === "All" || v.department === filterDept) &&
      (filterStatus === "All" || v.status === filterStatus),
  );

  const totalPayable = vendorsData.reduce((s, v) => s + v.totalAmount, 0);
  const totalPaid = vendorsData.reduce((s, v) => s + v.amountPaid, 0);
  const totalBalance = totalPayable - totalPaid;
  const departments = ["All", ...Object.keys(DEPT_CLASS)];

  return (
    <DashboardLayout title="Vendors" subtitle="GN to Vendor payment tracking">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs font-bold px-2 py-0.5 rounded-xl tag-b2b">
          B2B
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 mb-6">
        <StatCard
          bg={bg}
          icon={Truck}
          label="Total Payable"
          value={`${totalPayable.toLocaleString()} PKR`}
          iconColor={purpleIcon}
        />
        <StatCard
          bg={bg}
          icon={CheckCircle2}
          label="Total Paid"
          value={`${totalPaid.toLocaleString()} PKR`}
          iconColor="var(--neu-success)"
          valueColor="var(--neu-success)"
        />
        <StatCard
          bg={bg}
          icon={AlertCircle}
          label="Outstanding"
          value={`${totalBalance.toLocaleString()} PKR`}
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
            placeholder="Search vendor or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="neu-input"
            style={{ paddingLeft: "40px" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {departments.map((dept) => (
            <NeuFilterBtn
              key={dept}
              label={dept}
              icon={DEPT_ICON[dept]}
              active={filterDept === dept}
              onClick={() => setFilterDept(dept)}
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
              accent={purpleIcon}
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
        <div
          className="hidden md:grid grid-cols-12 gap-2 text-[10px] font-extrabold uppercase tracking-wider px-4 py-3"
          style={{
            background: "var(--neu-panel-bg)",
            borderBottom: `1px solid ${divider}`,
            color: textMuted,
            borderRadius: "24px 24px 0 0",
          }}
        >
          <div className="col-span-3">Vendor</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-2 text-right">Paid</div>
          <div className="col-span-2 text-right">Balance</div>
          <div className="col-span-1 text-center">Status</div>
        </div>

        {filtered.map((vendor) => {
          const balance = vendor.totalAmount - vendor.amountPaid;
          const pctPaid = Math.round(
            (vendor.amountPaid / vendor.totalAmount) * 100,
          );
          const isExpanded = expandedId === vendor.id;
          const DeptIcon = DEPT_ICON[vendor.department];

          return (
            <div key={vendor.id}>
              <div
                onClick={() => setExpandedId(isExpanded ? null : vendor.id)}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 lg:py-4 cursor-pointer neu-row-hover transition-colors"
                style={{ borderBottom: `1px solid ${divider}` }}
              >
                <div className="col-span-10 md:col-span-3 flex items-center gap-3 min-w-0">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 neu-avatar-vendor"
                    style={{ boxShadow: "var(--neu-soft)" }}
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

                <div className="hidden md:flex col-span-2 items-center">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${DEPT_CLASS[vendor.department] ?? ""}`}
                  >
                    {DeptIcon && <DeptIcon className="h-3 w-3" />}
                    {vendor.department}
                  </span>
                </div>

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

                <div className="hidden md:block col-span-2 text-right">
                  <div
                    className="text-sm font-bold"
                    style={{ color: "var(--neu-success)" }}
                  >
                    {vendor.amountPaid.toLocaleString()}
                  </div>
                  <div className="text-xs" style={{ color: textMuted }}>
                    PKR
                  </div>
                </div>

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

                <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center items-center gap-1">
                  <span className="hidden md:block">
                    <StatusPill status={vendor.status} />
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
                      <div className="mt-4">
                        <div
                          className="flex justify-between text-xs mb-1"
                          style={{ color: textMuted }}
                        >
                          <span>Payment Progress</span>
                          <span>{pctPaid}% paid</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden neu-progress-track">
                          <div
                            className="h-full rounded-full transition-all neu-progress-fill-vendor"
                            style={{ width: `${pctPaid}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-bold">
                          <span style={{ color: "var(--neu-success)" }}>
                            Paid: {vendor.amountPaid.toLocaleString()} PKR
                          </span>
                          <span style={{ color: "var(--neu-danger)" }}>
                            Due:{" "}
                            {(
                              vendor.totalAmount - vendor.amountPaid
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
