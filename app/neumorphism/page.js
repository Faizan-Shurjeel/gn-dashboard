"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
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
  LayoutDashboard,
  FileText,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

function NeumorphicCard({
  children,
  className = "",
  onClick,
  style: extraStyle = {},
  dark,
}) {
  const [pressed, setPressed] = useState(false);

  const baseBackground = dark ? "#23272f" : "#e9eef5";
  const raisedShadow = dark
    ? "8px 8px 18px rgba(10,12,16,0.55), -8px -8px 18px rgba(66,74,90,0.26)"
    : "8px 8px 18px rgba(163,177,198,0.55), -8px -8px 18px rgba(255,255,255,0.95)";
  const insetShadow = dark
    ? "inset 6px 6px 12px rgba(10,12,16,0.55), inset -6px -6px 12px rgba(66,74,90,0.18)"
    : "inset 6px 6px 12px rgba(163,177,198,0.45), inset -6px -6px 12px rgba(255,255,255,0.9)";

  return (
    <div
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`relative rounded-[28px] transition-all duration-150 ease-out ${onClick ? "cursor-pointer select-none" : ""} ${className}`}
      style={{
        background: baseBackground,
        boxShadow: pressed ? insetShadow : raisedShadow,
        transform: pressed
          ? "translateY(1px) scale(0.99)"
          : "translateY(0) scale(1)",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

function SoftIconButton({
  children,
  onClick,
  dark,
  className = "",
  style = {},
}) {
  const bg = dark ? "#23272f" : "#e9eef5";
  const color = dark ? "#aab4c8" : "#5d6b82";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center transition-all active:scale-95 ${className}`}
      style={{
        background: bg,
        color,
        boxShadow: dark
          ? "6px 6px 12px rgba(10,12,16,0.5), -6px -6px 12px rgba(66,74,90,0.2)"
          : "6px 6px 12px rgba(163,177,198,0.45), -6px -6px 12px rgba(255,255,255,0.9)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function NavItem({ icon: Icon, label, active, onClick, dark, badge }) {
  const activeStyle = dark
    ? {
        color: "#7dd3fc",
        background: "#23272f",
        boxShadow:
          "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.16)",
      }
    : {
        color: "#2563eb",
        background: "#e9eef5",
        boxShadow:
          "inset 5px 5px 10px rgba(163,177,198,0.45), inset -5px -5px 10px rgba(255,255,255,0.92)",
      };

  const inactiveStyle = dark
    ? { color: "#8e99ae", background: "transparent" }
    : { color: "#617086", background: "transparent" };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all"
      style={active ? activeStyle : inactiveStyle}
      onMouseEnter={(e) => {
        if (!active)
          e.currentTarget.style.background = dark
            ? "rgba(255,255,255,0.03)"
            : "rgba(255,255,255,0.45)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className="min-w-5 h-5 px-1 rounded-full text-[10px] font-extrabold flex items-center justify-center"
          style={{
            background: active
              ? dark
                ? "#0f172a"
                : "#dbeafe"
              : dark
                ? "#2d3440"
                : "#dfe7f2",
            color: active
              ? dark
                ? "#7dd3fc"
                : "#2563eb"
              : dark
                ? "#aab4c8"
                : "#5d6b82",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function SidebarContent({
  navItems,
  dark,
  divider,
  textMuted,
  textPrimary,
  accent,
  sidebarBg,
  toggleTheme,
  router,
  setMobileMenuOpen,
}) {
  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.active}
            badge={item.badge}
            dark={dark}
            onClick={() => {
              router.push(item.path);
              setMobileMenuOpen(false);
            }}
          />
        ))}
      </nav>

      <div
        className="px-3 pb-5 pt-4 space-y-3"
        style={{ borderTop: `1px solid ${divider}` }}
      >
        <NeumorphicCard dark={dark} className="p-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between text-sm font-semibold"
            style={{ color: textMuted }}
          >
            <span>{dark ? "Dark Mode" : "Light Mode"}</span>
            {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </NeumorphicCard>

        <NeumorphicCard dark={dark} className="p-3.5">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-extrabold shrink-0"
              style={{
                color: accent,
                background: sidebarBg,
                boxShadow: dark
                  ? "inset 4px 4px 8px rgba(10,12,16,0.45), inset -4px -4px 8px rgba(66,74,90,0.15)"
                  : "inset 4px 4px 8px rgba(163,177,198,0.32), inset -4px -4px 8px rgba(255,255,255,0.95)",
              }}
            >
              MC
            </div>
            <div className="min-w-0">
              <div
                className="text-sm font-bold truncate"
                style={{ color: textPrimary }}
              >
                Marcus Chen
              </div>
              <div className="text-xs font-medium" style={{ color: textMuted }}>
                Admin
              </div>
            </div>
          </div>
        </NeumorphicCard>
      </div>
    </>
  );
}

export default function NeumorphismDashboardPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const bg = dark ? "#1b1f27" : "#e9eef5";
  const sidebarBg = dark ? "#20242c" : "#e9eef5";
  const textPrimary = dark ? "#eef4ff" : "#1f2937";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const divider = dark ? "rgba(148,163,184,0.12)" : "rgba(100,116,139,0.12)";
  const accent = dark ? "#7dd3fc" : "#2563eb";
  const accentSoft = dark ? "#172554" : "#dbeafe";
  const warning = dark ? "#fbbf24" : "#d97706";

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/neumorphism",
      active: true,
    },
    { icon: CalendarDays, label: "Events", path: "/events", badge: "4" },
    { icon: FileText, label: "Invoices", path: "/invoices" },
    { icon: Users, label: "Clients", path: "/clients" },
    { icon: Truck, label: "Vendors", path: "/vendors" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif !important; }
        html, body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb {
          background: ${dark ? "#3a4352" : "#c6d0dc"};
          border-radius: 999px;
        }
        ::-webkit-scrollbar-track { background: transparent; }
        @keyframes soft-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        .soft-float { animation: soft-float 2.8s ease-in-out infinite; }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slide-up 0.2s ease-out; }
        .neu-textarea {
          width: 100%;
          border: none;
          outline: none;
          resize: none;
          display: block;
          padding: 12px 14px;
          border-radius: 18px;
          background: ${dark ? "#23272f" : "#e9eef5"};
          color: ${textPrimary};
          font-size: 14px;
          font-weight: 500;
          box-shadow: ${
            dark
              ? "inset 6px 6px 12px rgba(10,12,16,0.55), inset -6px -6px 12px rgba(66,74,90,0.18)"
              : "inset 6px 6px 12px rgba(163,177,198,0.4), inset -6px -6px 12px rgba(255,255,255,0.95)"
          };
        }
        .neu-textarea::placeholder { color: ${textMuted}; }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: bg,
          transition: "background 0.3s ease",
        }}
      >
        <aside
          className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 h-screen sticky top-0 z-20"
          style={{
            background: sidebarBg,
            borderRight: `1px solid ${divider}`,
          }}
        >
          <div className="px-5 pt-6 pb-4">
            <NeumorphicCard dark={dark} className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0"
                  style={{
                    color: accent,
                    background: sidebarBg,
                    boxShadow: dark
                      ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.18)"
                      : "inset 5px 5px 10px rgba(163,177,198,0.4), inset -5px -5px 10px rgba(255,255,255,0.95)",
                  }}
                >
                  GN
                </div>
                <div>
                  <div
                    className="text-sm font-extrabold"
                    style={{ color: textPrimary }}
                  >
                    GN Caterers
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: textMuted }}
                  >
                    Neumorphism UI
                  </div>
                </div>
              </div>
            </NeumorphicCard>
          </div>
          <SidebarContent
            navItems={navItems}
            dark={dark}
            divider={divider}
            textMuted={textMuted}
            textPrimary={textPrimary}
            accent={accent}
            sidebarBg={sidebarBg}
            toggleTheme={toggleTheme}
            router={router}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </aside>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(15,23,42,0.35)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside
              className="relative w-72 h-full flex flex-col z-10"
              style={{ background: sidebarBg }}
            >
              <div className="px-5 pt-6 pb-4">
                <NeumorphicCard dark={dark} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-10 w-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0"
                        style={{
                          color: accent,
                          background: sidebarBg,
                          boxShadow: dark
                            ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.18)"
                            : "inset 5px 5px 10px rgba(163,177,198,0.4), inset -5px -5px 10px rgba(255,255,255,0.95)",
                        }}
                      >
                        GN
                      </div>
                      <span
                        className="text-base font-extrabold"
                        style={{ color: textPrimary }}
                      >
                        GN Caterers
                      </span>
                    </div>
                    <SoftIconButton
                      dark={dark}
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-9 w-9 rounded-2xl"
                    >
                      <X className="h-5 w-5" />
                    </SoftIconButton>
                  </div>
                </NeumorphicCard>
              </div>
              <SidebarContent
                navItems={navItems}
                dark={dark}
                divider={divider}
                textMuted={textMuted}
                textPrimary={textPrimary}
                accent={accent}
                sidebarBg={sidebarBg}
                toggleTheme={toggleTheme}
                router={router}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </aside>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <header
            className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4"
            style={{
              background: bg,
              borderBottom: `1px solid ${divider}`,
              backdropFilter: "blur(14px)",
            }}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <SoftIconButton
                dark={dark}
                onClick={() => setMobileMenuOpen(true)}
                className="h-10 w-10 rounded-2xl"
              >
                <Menu className="h-5 w-5" />
              </SoftIconButton>
              <span className="text-lg font-extrabold">
                <span style={{ color: accent }}>GN</span>
                <span style={{ color: textPrimary }}> Caterers</span>
              </span>
            </div>

            <div className="hidden lg:block">
              <h1
                className="text-xl font-extrabold"
                style={{ color: textPrimary }}
              >
                Dashboard
              </h1>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: textMuted }}
              >
                Good morning, Marcus 👋
              </p>
            </div>

            <div className="flex items-center gap-2">
              <SoftIconButton
                dark={dark}
                onClick={toggleTheme}
                className="h-10 w-10 rounded-2xl"
              >
                {dark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </SoftIconButton>

              <div className="relative">
                <SoftIconButton dark={dark} className="h-10 w-10 rounded-2xl">
                  <Bell className="h-4 w-4" />
                </SoftIconButton>
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] font-extrabold flex items-center justify-center"
                  style={{
                    background: accentSoft,
                    color: accent,
                    boxShadow: dark
                      ? "4px 4px 8px rgba(10,12,16,0.45), -4px -4px 8px rgba(66,74,90,0.16)"
                      : "4px 4px 8px rgba(163,177,198,0.38), -4px -4px 8px rgba(255,255,255,0.95)",
                  }}
                >
                  3
                </span>
              </div>

              <button
                onClick={() => router.push("/new-event")}
                className="hidden lg:flex items-center gap-2 px-4 py-3 rounded-[18px] text-sm font-bold soft-float"
                style={{
                  color: accent,
                  background: bg,
                  boxShadow: dark
                    ? "8px 8px 16px rgba(10,12,16,0.52), -8px -8px 16px rgba(66,74,90,0.18)"
                    : "8px 8px 16px rgba(163,177,198,0.45), -8px -8px 16px rgba(255,255,255,0.92)",
                }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} /> New Invoice
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-28 lg:pb-8">
            <div className="lg:hidden mb-5">
              <div
                className="text-2xl font-extrabold"
                style={{ color: textPrimary }}
              >
                Good morning 👋
              </div>
              <div
                className="text-sm font-semibold mt-0.5"
                style={{ color: textMuted }}
              >
                Here is what&apos;s happening today
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6 lg:mb-8">
              {[
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
              ].map((card) => (
                <NeumorphicCard
                  key={card.label}
                  dark={dark}
                  onClick={card.onClick}
                  className="p-4 lg:p-5"
                >
                  <div
                    className="h-10 w-10 rounded-2xl flex items-center justify-center mb-3"
                    style={{
                      background: bg,
                      boxShadow: dark
                        ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.16)"
                        : "inset 5px 5px 10px rgba(163,177,198,0.38), inset -5px -5px 10px rgba(255,255,255,0.95)",
                    }}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                <div>
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
                                style={{
                                  background: ev.typeBg,
                                  color: ev.typeColor,
                                }}
                              >
                                {ev.type}
                              </span>

                              <span
                                className="text-[11px] font-semibold flex items-center gap-1"
                                style={{ color: textMuted }}
                              >
                                <CalendarDays className="h-3 w-3" />
                                {ev.date}
                              </span>

                              <span
                                className="text-[11px] font-semibold flex items-center gap-1"
                                style={{ color: textMuted }}
                              >
                                <Users className="h-3 w-3" />
                                {ev.guests}
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
                </div>

                <div>
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
                        className="flex items-center gap-3 px-4 py-3 rounded-[22px] transition-colors"
                        style={{
                          borderBottom:
                            i < activity.length - 1
                              ? `1px solid ${divider}`
                              : "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = dark
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(255,255,255,0.42)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
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
                </div>
              </div>

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
                      style={{
                        background: dark ? "#252a33" : "#eef3f9",
                      }}
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
                            <Clock className="h-3 w-3" />
                            {entry.time}
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
                          style={{ color: textMuted }}
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
          </main>
        </div>
      </div>

      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: dark ? "rgba(27,31,39,0.95)" : "rgba(233,238,245,0.96)",
          backdropFilter: "blur(18px)",
          borderTop: `1px solid ${divider}`,
        }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          {[
            { label: "Home", emoji: "🏠", path: "/neumorphism", active: true },
            { label: "Invoices", emoji: "📄", path: "/invoices" },
            { label: "Clients", emoji: "👥", path: "/clients" },
            { label: "Settings", emoji: "⚙️", path: "/settings" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-0.5 transition-transform active:scale-90"
            >
              <span className="text-xl leading-none">{item.emoji}</span>
              <span
                className="text-[10px] font-bold mt-0.5"
                style={{ color: item.active ? accent : textMuted }}
              >
                {item.label}
              </span>
              {item.active && (
                <div
                  className="h-1 w-4 rounded-full mt-0.5"
                  style={{ background: accent }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/new-event")}
        className="lg:hidden fixed z-50 flex items-center gap-2 font-bold text-sm"
        style={{
          bottom: "74px",
          right: "16px",
          color: accent,
          background: bg,
          borderRadius: "18px",
          padding: "12px 18px",
          border: "none",
          cursor: "pointer",
          boxShadow: dark
            ? "8px 8px 16px rgba(10,12,16,0.52), -8px -8px 16px rgba(66,74,90,0.18)"
            : "8px 8px 16px rgba(163,177,198,0.45), -8px -8px 16px rgba(255,255,255,0.92)",
        }}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} /> New Invoice
      </button>
    </>
  );
}
