"use client";

import { useState } from "react";
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
  Star,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// ─── Decorative SVG pattern tile ───────────────────────────────────────────
const PatternBg = ({ dark }) => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: dark ? 0.04 : 0.045,
      pointerEvents: "none",
    }}
  >
    <defs>
      <pattern
        id="maxPattern"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        <path
          d="M20 0 L20 40 M0 20 L40 20"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M0 0 L40 40 M40 0 L0 40"
          stroke="currentColor"
          strokeWidth="0.3"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#maxPattern)" />
  </svg>
);

// ─── Bold stat card ─────────────────────────────────────────────────────────
function MaxCard({
  children,
  className = "",
  onClick,
  accent = "#C8341A",
  dark,
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`relative overflow-hidden rounded-3xl transition-all duration-200 ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{
        transform: hov && onClick ? "translateY(-3px)" : "translateY(0)",
        boxShadow:
          hov && onClick
            ? `0 20px 40px ${accent}33, 0 2px 0 ${accent}22`
            : `0 4px 20px rgba(0,0,0,${dark ? "0.4" : "0.1"})`,
        border: `2px solid ${hov && onClick ? accent : dark ? "#2A2520" : "#EDE0D0"}`,
        background: dark ? "#1E1A16" : "#FEFAF5",
        transition: "all 0.2s ease",
      }}
    >
      <PatternBg dark={dark} />
      {children}
    </div>
  );
}

// ─── Sidebar nav item ───────────────────────────────────────────────────────
function NavItem({ icon: Icon, label, active, onClick, dark, badge }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-bold transition-all"
      style={{
        background: active
          ? "#C8341A"
          : hov
            ? dark
              ? "rgba(200,52,26,0.12)"
              : "rgba(200,52,26,0.08)"
            : "transparent",
        color: active ? "#fff" : hov ? "#C8341A" : dark ? "#9E8E82" : "#7C6A5E",
        letterSpacing: "0.01em",
      }}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className="h-5 min-w-5 px-1 rounded-full text-[10px] font-extrabold flex items-center justify-center"
          style={{
            background: active ? "rgba(255,255,255,0.3)" : "#C8341A",
            color: "#fff",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: 1,
      text: "Ahmed re: wedding — confirm 350 guests by Friday.",
      time: "9:14 AM",
    },
    {
      id: 2,
      text: "Zia vendor Rs.45,000 pending. Follow up end of week.",
      time: "Yesterday",
    },
    {
      id: 3,
      text: "TechPak corporate inquiry — 500 pax, Jan 15. Send quote ASAP.",
      time: "Mar 9",
    },
  ]);
  const [note, setNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const addNote = () => {
    if (!note.trim()) return;
    const now = new Date();
    const h = now.getHours(),
      m = String(now.getMinutes()).padStart(2, "0");
    setDiaryEntries((p) => [
      {
        id: Date.now(),
        text: note.trim(),
        time: `${h % 12 || 12}:${m} ${h >= 12 ? "PM" : "AM"}`,
      },
      ...p,
    ]);
    setNote("");
    setAddingNote(false);
  };

  const events = [
    {
      id: "EVT-0041",
      name: "Ahmed & Sana Wedding",
      type: "Wedding",
      date: "Dec 12",
      guests: 350,
      paid: true,
      color: "#E11D48",
    },
    {
      id: "EVT-0045",
      name: "Engro Corp AGM",
      type: "Corporate",
      date: "Dec 15",
      guests: 120,
      paid: false,
      due: "PKR 45k",
      color: "#2563EB",
    },
    {
      id: "EVT-0048",
      name: "Birthday — Zaid",
      type: "General",
      date: "Dec 18",
      guests: 50,
      paid: true,
      color: "#D97706",
    },
    {
      id: "EVT-0051",
      name: "HBL Annual Gala",
      type: "Corporate",
      date: "Dec 22",
      guests: 400,
      paid: false,
      due: "PKR 90k",
      color: "#7C3AED",
    },
  ];

  const activity = [
    { text: "Invoice #412 created", time: "2m ago", dot: "#C8341A" },
    { text: "Payment received · Ahmed", time: "1h ago", dot: "#16A34A" },
    { text: "New quotation · HBL", time: "3h ago", dot: "#2563EB" },
    { text: "Event #041 updated", time: "5h ago", dot: "#D97706" },
    { text: "Customer profile: Zaid", time: "1d ago", dot: "#7C3AED" },
  ];

  const bg = dark ? "#120F0D" : "#F7F0E6";
  const tp = dark ? "#F5EDE0" : "#1A0F08";
  const tm = dark ? "#7A6A5E" : "#9A7A6A";
  const border = dark ? "#2A2218" : "#E8D8C4";
  const sidebarBg = dark ? "#170F0A" : "#FFFCF7";
  const cardBg = dark ? "#1E1A16" : "#FEFAF5";

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/", active: true },
    { icon: CalendarDays, label: "Events", path: "/events", badge: "4" },
    { icon: FileText, label: "Invoices", path: "/invoices" },
    { icon: Users, label: "Clients", path: "/clients" },
    { icon: Truck, label: "Vendors", path: "/vendors" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const stats = [
    {
      label: "TODAY'S EVENTS",
      value: "4",
      sub: "2 currently active",
      accent: "#C8341A",
      icon: CalendarDays,
      tag: "LIVE",
      onClick: () => router.push("/events"),
    },
    {
      label: "THIS MONTH",
      value: "PKR 850k",
      sub: "+12% vs last month",
      accent: "#16A34A",
      icon: TrendingUp,
      tag: "↑ GROWTH",
    },
    {
      label: "CLIENT DUES",
      value: "PKR 125k",
      sub: "Pending from clients",
      accent: "#E11D48",
      icon: CreditCard,
      tag: "B2C",
      onClick: () => router.push("/clients"),
    },
    {
      label: "VENDOR DUES",
      value: "PKR 65k",
      sub: "Owed to vendors",
      accent: "#7C3AED",
      icon: Truck,
      tag: "B2B",
      onClick: () => router.push("/vendors"),
    },
  ];

  const SidebarContent = () => (
    <>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.active}
            dark={dark}
            badge={item.badge}
            onClick={() => {
              router.push(item.path);
              setMenuOpen(false);
            }}
          />
        ))}
      </nav>

      {/* Revenue ticker */}
      <div
        className="mx-3 mb-3 p-3 rounded-2xl"
        style={{
          background: dark ? "#1E1A16" : "#FFF5EE",
          border: `1px solid ${border}`,
        }}
      >
        <div
          className="text-[9px] font-black uppercase tracking-widest mb-1"
          style={{ color: "#C8341A" }}
        >
          Live Revenue
        </div>
        <div className="text-xl font-black" style={{ color: tp }}>
          PKR 4.2M
        </div>
        <div
          className="text-[10px] font-bold mt-0.5"
          style={{ color: "#16A34A" }}
        >
          ↑ 18% this quarter
        </div>
      </div>

      <div
        className="px-3 pb-5 space-y-2"
        style={{ borderTop: `1px solid ${border}`, paddingTop: 14 }}
      >
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: dark ? "rgba(200,52,26,0.1)" : "rgba(200,52,26,0.06)",
            color: tm,
          }}
        >
          <span>{dark ? "Dark Mode" : "Light Mode"}</span>
          {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{
            background: dark ? "rgba(200,52,26,0.08)" : "rgba(200,52,26,0.05)",
          }}
        >
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,#C8341A,#FF6B4A)",
              fontFamily: "inherit",
            }}
          >
            MC
          </div>
          <div>
            <div className="text-sm font-black" style={{ color: tp }}>
              Marcus Chen
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-wide"
              style={{ color: "#C8341A" }}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { font-family: 'DM Sans', sans-serif !important; box-sizing: border-box; }
        .syne { font-family: 'Syne', sans-serif !important; }
        html, body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "#3A2E28" : "#D6C4B0"}; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.3s ease-out; }
        @keyframes pulse-dot {
          0%,100% { box-shadow: 0 0 0 0 rgba(200,52,26,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(200,52,26,0); }
        }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes tag-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .max-textarea {
          width: 100%;
          background: ${dark ? "rgba(255,255,255,0.04)" : "rgba(200,52,26,0.03)"};
          border: 2px solid ${dark ? "#3A2E28" : "#F0DAC8"};
          border-radius: 14px;
          padding: 10px 14px;
          font-size: 14px;
          font-weight: 500;
          color: ${tp};
          outline: none;
          resize: none;
          display: block;
          transition: border-color 0.2s;
        }
        .max-textarea:focus { border-color: #C8341A; }
        .max-textarea::placeholder { color: ${tm}; }
        .ev-card:hover { transform: translateX(3px); }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: bg,
          transition: "background 0.3s",
        }}
      >
        {/* ── Desktop Sidebar ── */}
        <aside
          className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 h-screen sticky top-0 z-20"
          style={{ background: sidebarBg, borderRight: `2px solid ${border}` }}
        >
          {/* Logo */}
          <div
            className="px-5 pt-7 pb-5"
            style={{ borderBottom: `2px solid ${border}` }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div
                className="h-11 w-11 rounded-2xl flex items-center justify-center font-black text-base text-white syne"
                style={{
                  background: "linear-gradient(135deg,#C8341A,#FF6B4A)",
                  boxShadow: "0 6px 20px rgba(200,52,26,0.4)",
                }}
              >
                GN
              </div>
              <div>
                <div
                  className="text-base font-black syne"
                  style={{ color: tp, letterSpacing: "-0.03em" }}
                >
                  GN Caterers
                </div>
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mt-0.5"
                  style={{ color: "#C8341A" }}
                >
                  Management System
                </div>
              </div>
            </div>
          </div>
          <SidebarContent />
        </aside>

        {/* ── Mobile Drawer ── */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <aside
              className="relative w-72 h-full flex flex-col z-10"
              style={{
                background: sidebarBg,
                borderRight: `2px solid ${border}`,
              }}
            >
              <div
                className="px-5 pt-6 pb-4 flex items-center justify-between"
                style={{ borderBottom: `2px solid ${border}` }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm text-white syne"
                    style={{
                      background: "linear-gradient(135deg,#C8341A,#FF6B4A)",
                    }}
                  >
                    GN
                  </div>
                  <span
                    className="font-black syne text-base"
                    style={{ color: tp }}
                  >
                    GN Caterers
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{ color: tm }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent />
            </aside>
          </div>
        )}

        {/* ── Main ── */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden min-w-0">
          {/* Header */}
          <header
            className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4"
            style={{ background: bg, borderBottom: `2px solid ${border}` }}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <button onClick={() => setMenuOpen(true)} style={{ color: tm }}>
                <Menu className="h-6 w-6" />
              </button>
              <div
                className="syne font-black text-lg"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span style={{ color: "#C8341A" }}>GN</span>
                <span style={{ color: tp }}> Caterers</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-3">
                <h1
                  className="text-2xl font-black syne"
                  style={{ color: tp, letterSpacing: "-0.04em" }}
                >
                  Dashboard
                </h1>
                <span
                  className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest"
                  style={{ background: "#C8341A", color: "#fff" }}
                >
                  LIVE
                </span>
              </div>
              <p className="text-xs font-semibold mt-0.5" style={{ color: tm }}>
                Wednesday, March 11 · Good morning, Marcus
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="h-9 w-9 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: dark
                    ? "rgba(200,52,26,0.12)"
                    : "rgba(200,52,26,0.08)",
                  color: "#C8341A",
                }}
              >
                {dark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <div
                className="relative h-9 w-9 rounded-xl flex items-center justify-center"
                style={{ background: cardBg, border: `2px solid ${border}` }}
              >
                <Bell className="h-4 w-4" style={{ color: tm }} />
                <span
                  className="pulse-dot absolute -top-1 -right-1 h-4 w-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                  style={{ background: "#C8341A" }}
                >
                  3
                </span>
              </div>
              <button
                onClick={() => router.push("/new-event")}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black text-white"
                style={{
                  background: "linear-gradient(135deg,#C8341A,#FF6B4A)",
                  boxShadow: "0 4px 14px rgba(200,52,26,0.4)",
                  letterSpacing: "0.01em",
                }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} /> New Invoice
              </button>
            </div>
          </header>

          {/* Body */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-28 lg:pb-10">
            {/* Mobile greeting */}
            <div className="lg:hidden mb-6">
              <div
                className="syne text-3xl font-black"
                style={{ color: tp, letterSpacing: "-0.04em" }}
              >
                Good
                <br />
                morning 👋
              </div>
              <div className="text-sm font-semibold mt-1" style={{ color: tm }}>
                Wednesday, March 11
              </div>
            </div>

            {/* ── STAT CARDS ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
              {stats.map((s) => (
                <MaxCard
                  key={s.label}
                  dark={dark}
                  accent={s.accent}
                  onClick={s.onClick}
                  className="p-4 lg:p-5"
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: s.accent }}
                  />

                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.accent}18`, color: s.accent }}
                    >
                      <s.icon className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md"
                      style={{ background: `${s.accent}15`, color: s.accent }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  <div
                    className="text-[9px] font-black uppercase tracking-widest mb-1.5"
                    style={{ color: tm }}
                  >
                    {s.label}
                  </div>
                  <div
                    className="syne text-xl lg:text-2xl font-black leading-none"
                    style={{ color: tp, letterSpacing: "-0.03em" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] font-semibold mt-1.5"
                    style={{ color: tm }}
                  >
                    {s.sub}
                  </div>

                  {s.onClick && (
                    <ArrowUpRight
                      className="absolute bottom-3 right-3 h-4 w-4"
                      style={{ color: s.accent, opacity: 0.5 }}
                    />
                  )}
                </MaxCard>
              ))}
            </div>

            {/* ── TWO-COLUMN GRID ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* LEFT: Events + Activity */}
              <div className="lg:col-span-2 space-y-4 lg:space-y-5">
                {/* Upcoming Events */}
                <MaxCard dark={dark} className="p-5 lg:p-6">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background:
                        "linear-gradient(90deg,#C8341A,#7C3AED,#2563EB,#16A34A)",
                    }}
                  />

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        className="h-4 w-4"
                        style={{ color: "#C8341A" }}
                      />
                      <span
                        className="syne font-black text-base"
                        style={{ color: tp, letterSpacing: "-0.02em" }}
                      >
                        Upcoming Events
                      </span>
                    </div>
                    <button
                      className="text-xs font-black uppercase tracking-wide flex items-center gap-1"
                      style={{ color: "#C8341A" }}
                      onClick={() => router.push("/events")}
                    >
                      All <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className="ev-card flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer"
                        style={{
                          background: dark
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.02)",
                          border: `1.5px solid ${border}`,
                        }}
                      >
                        {/* Color bar */}
                        <div
                          className="h-10 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: ev.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className="text-[9px] font-black uppercase tracking-wider"
                              style={{ color: ev.color }}
                            >
                              {ev.id}
                            </span>
                            <span
                              className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md"
                              style={{
                                background: `${ev.color}18`,
                                color: ev.color,
                              }}
                            >
                              {ev.type}
                            </span>
                          </div>
                          <div
                            className="font-bold text-sm truncate"
                            style={{ color: tp }}
                          >
                            {ev.name}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span
                              className="text-[11px] font-medium flex items-center gap-1"
                              style={{ color: tm }}
                            >
                              <CalendarDays className="h-3 w-3" />
                              {ev.date}
                            </span>
                            <span
                              className="text-[11px] font-medium flex items-center gap-1"
                              style={{ color: tm }}
                            >
                              <Users className="h-3 w-3" />
                              {ev.guests} pax
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {ev.paid ? (
                            <span
                              className="text-[11px] font-black"
                              style={{ color: "#16A34A" }}
                            >
                              PAID ✓
                            </span>
                          ) : (
                            <span
                              className="text-[11px] font-black"
                              style={{ color: "#C8341A" }}
                            >
                              {ev.due}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </MaxCard>

                {/* Recent Activity */}
                <MaxCard dark={dark} className="p-5 lg:p-6">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: "#7C3AED" }}
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-4 w-4" style={{ color: "#7C3AED" }} />
                    <span
                      className="syne font-black text-base"
                      style={{ color: tp, letterSpacing: "-0.02em" }}
                    >
                      Recent Activity
                    </span>
                  </div>
                  <div className="relative pl-4">
                    {/* Timeline line */}
                    <div
                      className="absolute left-1.5 top-2 bottom-2 w-px"
                      style={{ background: border }}
                    />
                    <div className="space-y-0">
                      {activity.map((item, i) => (
                        <div
                          key={i}
                          className="relative flex items-center gap-3 py-2.5 cursor-pointer group"
                        >
                          <div
                            className="absolute -left-2.5 h-3 w-3 rounded-full border-2 flex-shrink-0 transition-transform group-hover:scale-125"
                            style={{
                              background: i === 0 ? item.dot : cardBg,
                              borderColor: item.dot,
                            }}
                          />
                          <div className="flex-1 min-w-0 pl-2">
                            <div
                              className="text-sm font-semibold truncate"
                              style={{ color: tp }}
                            >
                              {item.text}
                            </div>
                          </div>
                          <div
                            className="text-[11px] font-bold flex-shrink-0"
                            style={{ color: tm }}
                          >
                            {item.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MaxCard>
              </div>

              {/* RIGHT: Diary */}
              <div className="lg:col-span-1 space-y-4">
                <MaxCard dark={dark} accent="#D97706" className="p-5">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background: "linear-gradient(90deg,#D97706,#F59E0B)",
                    }}
                  />

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen
                        className="h-4 w-4"
                        style={{ color: "#D97706" }}
                      />
                      <span
                        className="syne font-black text-base"
                        style={{ color: tp, letterSpacing: "-0.02em" }}
                      >
                        Diary
                      </span>
                    </div>
                    <button
                      onClick={() => setAddingNote((v) => !v)}
                      className="h-7 w-7 rounded-xl flex items-center justify-center text-white transition-all active:scale-95"
                      style={{ background: "#D97706" }}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                  </div>

                  {addingNote && (
                    <div className="mb-3 fade-up">
                      <textarea
                        autoFocus
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write a note..."
                        className="max-textarea mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addNote}
                          disabled={!note.trim()}
                          className="flex-1 py-2 rounded-xl text-sm font-black text-white disabled:opacity-40 transition-all"
                          style={{ background: "#D97706" }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setAddingNote(false);
                            setNote("");
                          }}
                          className="px-4 py-2 rounded-xl text-sm font-bold"
                          style={{
                            color: tm,
                            background: dark
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.05)",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {diaryEntries.map((entry, i) => (
                      <div
                        key={entry.id}
                        className="group p-3 rounded-2xl transition-all"
                        style={{
                          background: dark
                            ? "rgba(217,119,6,0.08)"
                            : "rgba(217,119,6,0.06)",
                          border: `1.5px solid ${dark ? "rgba(217,119,6,0.15)" : "rgba(217,119,6,0.2)"}`,
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm font-medium leading-relaxed"
                              style={{ color: dark ? "#E8D5B0" : "#5C3E10" }}
                            >
                              {entry.text}
                            </p>
                            <div
                              className="flex items-center gap-1 mt-1.5 text-[11px] font-bold"
                              style={{ color: "#D97706" }}
                            >
                              <Clock className="h-3 w-3" />
                              {entry.time}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              setDiaryEntries((p) =>
                                p.filter((d) => d.id !== entry.id),
                              )
                            }
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
                            style={{ color: tm }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "#EF4444")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = tm)
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </MaxCard>

                {/* Quick stats box */}
                <MaxCard dark={dark} accent="#16A34A" className="p-5">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: "#16A34A" }}
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4" style={{ color: "#16A34A" }} />
                    <span
                      className="syne font-black text-base"
                      style={{ color: tp, letterSpacing: "-0.02em" }}
                    >
                      This Week
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Events Completed",
                        value: "7",
                        pct: 70,
                        color: "#16A34A",
                      },
                      {
                        label: "Invoices Sent",
                        value: "12",
                        pct: 85,
                        color: "#2563EB",
                      },
                      {
                        label: "Payments Received",
                        value: "9",
                        pct: 55,
                        color: "#C8341A",
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="text-xs font-bold"
                            style={{ color: tm }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="text-xs font-black syne"
                            style={{ color: tp }}
                          >
                            {item.value}
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full"
                          style={{ background: dark ? "#2A2218" : "#EDE0D0" }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${item.pct}%`,
                              background: item.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </MaxCard>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: dark ? "rgba(18,15,13,0.97)" : "rgba(247,240,230,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: `2px solid ${border}`,
        }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          {[
            { label: "Home", emoji: "🏠", path: "/", active: true },
            { label: "Invoices", emoji: "📄", path: "/invoices" },
            { label: "Clients", emoji: "👥", path: "/clients" },
            { label: "Settings", emoji: "⚙️", path: "/settings" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-0.5 transition-transform active:scale-90"
            >
              <span className="text-xl">{item.emoji}</span>
              <span
                className="text-[10px] font-black uppercase tracking-wide"
                style={{ color: item.active ? "#C8341A" : tm }}
              >
                {item.label}
              </span>
              {item.active && (
                <div
                  className="h-0.5 w-6 rounded-full"
                  style={{ background: "#C8341A" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => router.push("/new-event")}
        className="lg:hidden fixed z-50 flex items-center gap-2 text-white font-black text-sm"
        style={{
          bottom: "76px",
          right: "16px",
          background: "linear-gradient(135deg,#C8341A,#FF6B4A)",
          borderRadius: "18px",
          padding: "13px 20px",
          border: "none",
          cursor: "pointer",
          boxShadow:
            "0 6px 20px rgba(200,52,26,0.45), 0 2px 0 rgba(255,255,255,0.15) inset",
          letterSpacing: "0.01em",
        }}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} /> New Invoice
      </button>
    </>
  );
}
