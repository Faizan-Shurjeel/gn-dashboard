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
} from "lucide-react";

function ClayCard({
  children,
  className = "",
  onClick,
  dark,
  style: extraStyle = {},
}) {
  const [pressed, setPressed] = useState(false);
  const bottomEdge = dark ? "#141210" : "#C4A882";
  const topHighlight = dark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.8)";
  const shadow = dark ? "rgba(0,0,0,0.55)" : "rgba(150,100,60,0.18)";
  return (
    <div
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`rounded-[22px] p-4 relative transition-all duration-150 ease-out ${onClick ? "cursor-pointer select-none" : ""} ${className}`}
      style={{
        background: dark ? "#2C2825" : "#FFFFFF",
        boxShadow: pressed
          ? `0 1px 0 ${topHighlight} inset, 0 2px 0 ${bottomEdge}, 0 4px 10px ${shadow}`
          : `0 1px 0 ${topHighlight} inset, 0 6px 0 ${bottomEdge}, 0 12px 24px ${shadow}`,
        transform: pressed
          ? "scale(0.97) rotate(-0.4deg) translateY(4px)"
          : "scale(1) rotate(0deg) translateY(0)",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, dark, badge }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all"
      style={
        active
          ? {
              background: "linear-gradient(135deg,#C8341A,#E85D42)",
              color: "#fff",
              boxShadow: "0 4px 0 #9B2112, 0 6px 14px rgba(200,52,26,0.3)",
            }
          : {
              color: dark ? "#8B7D72" : "#78716C",
            }
      }
      onMouseEnter={(e) => {
        if (!active)
          e.currentTarget.style.background = dark
            ? "rgba(255,255,255,0.05)"
            : "#F5F0E8";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className="h-4 min-w-4 px-1 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center"
          style={{ background: "#C8341A" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Home() {
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
    const h = now.getHours(),
      m = String(now.getMinutes()).padStart(2, "0");
    setDiaryEntries((p) => [
      {
        id: Date.now(),
        text: newNote.trim(),
        time: `${h % 12 || 12}:${m} ${h >= 12 ? "PM" : "AM"}`,
      },
      ...p,
    ]);
    setNewNote("");
    setShowNoteInput(false);
  };

  const upcomingEvents = [
    {
      id: "EVT-2025-0041",
      name: "Ahmed & Sana Wedding",
      type: "Wedding",
      date: "Dec 12, 2025",
      guests: 350,
      status: "Paid",
      statusColor: "#16a34a",
      typeBg: dark ? "rgba(251,113,133,0.2)" : "#FFE4E6",
      typeColor: dark ? "#fb7185" : "#be123c",
    },
    {
      id: "EVT-2025-0045",
      name: "Engro Corp AGM",
      type: "Corporate",
      date: "Dec 15, 2025",
      guests: 120,
      status: "PKR 45,000 Due",
      statusColor: "#dc2626",
      typeBg: dark ? "rgba(96,165,250,0.2)" : "#DBEAFE",
      typeColor: dark ? "#60a5fa" : "#1d4ed8",
    },
    {
      id: "EVT-2025-0048",
      name: "Birthday — Zaid",
      type: "General",
      date: "Dec 18, 2025",
      guests: 50,
      status: "Paid",
      statusColor: "#16a34a",
      typeBg: dark ? "rgba(251,191,36,0.2)" : "#FEF3C7",
      typeColor: dark ? "#fbbf24" : "#92400e",
    },
  ];

  const activity = [
    { text: "Invoice #412 created", time: "2 mins ago" },
    { text: "Payment received from Ahmed", time: "1 hour ago" },
    { text: "New quotation for HBL", time: "3 hours ago" },
    { text: "Event #041 updated", time: "5 hours ago" },
    { text: "Customer profile: Zaid", time: "1 day ago" },
  ];

  const bg = dark ? "#1A1714" : "#F5F0E8";
  const tp = dark ? "#F5F0E8" : "#1C1410";
  const tm = dark ? "#8B7D72" : "#78716C";
  const border = dark ? "#3D3530" : "#EDE5D8";
  const sidebarBg = dark ? "#211E1B" : "#FFFFFF";

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/", active: true },
    { icon: CalendarDays, label: "Events", path: "/events", badge: "4" },
    { icon: FileText, label: "Invoices", path: "/invoices" },
    { icon: Users, label: "Clients", path: "/clients" },
    { icon: Truck, label: "Vendors", path: "/vendors" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const SidebarContent = () => (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
              setMobileMenuOpen(false);
            }}
          />
        ))}
      </nav>
      <div
        className="px-3 pb-5 space-y-2.5"
        style={{ borderTop: `1px solid ${border}`, paddingTop: 14 }}
      >
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all"
          style={{
            background: dark ? "rgba(255,255,255,0.05)" : "#F5F0E8",
            color: tm,
          }}
        >
          <span>{dark ? "Dark Mode" : "Light Mode"}</span>
          {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
          style={{ background: dark ? "rgba(255,255,255,0.05)" : "#F5F0E8" }}
        >
          <div
            className="h-8 w-8 rounded-xl flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#C8341A,#E85D42)" }}
          >
            MC
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold truncate" style={{ color: tp }}>
              Marcus Chen
            </div>
            <div className="text-xs font-medium" style={{ color: tm }}>
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "#3D3530" : "#D6C9B8"}; border-radius: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        @keyframes fab-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(200,52,26,0.35),0 6px 0 #9B2112,0 10px 20px rgba(200,52,26,0.3); }
          50% { box-shadow: 0 0 0 10px rgba(200,52,26,0),0 6px 0 #9B2112,0 10px 20px rgba(200,52,26,0.3); }
        }
        .fab-pulse { animation: fab-pulse 2.5s ease-in-out infinite; }
        @keyframes slide-up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .slide-up { animation: slide-up 0.2s ease-out; }
        .clay-textarea {
          width:100%; background:${dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)"};
          border:2px solid ${dark ? "#3D3530" : "#E8DDD0"}; border-radius:14px;
          padding:10px 14px; font-size:14px; font-weight:500;
          color:${tp}; outline:none; resize:none; display:block;
          transition:border-color 0.2s;
        }
        .clay-textarea:focus { border-color:#C8341A; }
        .clay-textarea::placeholder { color:${tm}; }
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
          className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 h-screen sticky top-0 z-20"
          style={{
            background: sidebarBg,
            borderRight: `1px solid ${border}`,
            boxShadow: dark
              ? "2px 0 20px rgba(0,0,0,0.4)"
              : "2px 0 20px rgba(150,100,60,0.08)",
          }}
        >
          <div
            className="px-5 pt-6 pb-4 flex items-center gap-3"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            <div
              className="h-10 w-10 rounded-2xl flex items-center justify-center font-extrabold text-sm text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg,#C8341A,#E85D42)",
                boxShadow: "0 4px 0 #9B2112,0 6px 14px rgba(200,52,26,0.3)",
              }}
            >
              GN
            </div>
            <div>
              <div className="text-sm font-extrabold" style={{ color: tp }}>
                GN Caterers
              </div>
              <div className="text-xs font-medium" style={{ color: tm }}>
                Management System
              </div>
            </div>
          </div>
          <SidebarContent />
        </aside>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside
              className="relative w-72 h-full flex flex-col z-10"
              style={{ background: sidebarBg }}
            >
              <div
                className="px-5 pt-6 pb-4 flex items-center justify-between"
                style={{ borderBottom: `1px solid ${border}` }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-9 w-9 rounded-2xl flex items-center justify-center font-extrabold text-sm text-white"
                    style={{
                      background: "linear-gradient(135deg,#C8341A,#E85D42)",
                      boxShadow: "0 3px 0 #9B2112",
                    }}
                  >
                    GN
                  </div>
                  <span
                    className="text-base font-extrabold"
                    style={{ color: tp }}
                  >
                    GN Caterers
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
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
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header */}
          <header
            className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4"
            style={{
              background: bg,
              borderBottom: `1px solid ${border}`,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                style={{ color: tm }}
              >
                <Menu className="h-6 w-6" />
              </button>
              <span className="text-lg font-extrabold">
                <span style={{ color: "#C8341A" }}>GN</span>
                <span style={{ color: tp }}> Caterers</span>
              </span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-extrabold" style={{ color: tp }}>
                Dashboard
              </h1>
              <p className="text-xs font-semibold mt-0.5" style={{ color: tm }}>
                Good morning, Marcus 👋
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="h-9 w-9 rounded-2xl flex items-center justify-center transition-all active:scale-95"
                style={{
                  background: dark ? "rgba(255,255,255,0.07)" : "#EDE5D8",
                  color: tm,
                  boxShadow: dark ? "0 3px 0 #141210" : "0 3px 0 #C4A882",
                }}
              >
                {dark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <div
                className="relative h-9 w-9 rounded-2xl flex items-center justify-center"
                style={{
                  background: dark ? "#2C2825" : "#FFFFFF",
                  boxShadow: dark
                    ? "0 4px 0 #141210,0 6px 14px rgba(0,0,0,0.4)"
                    : "0 4px 0 #C4A882,0 6px 14px rgba(150,100,60,0.15)",
                }}
              >
                <Bell className="h-4 w-4" style={{ color: tm }} />
                <span
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center"
                  style={{ background: "#C8341A" }}
                >
                  3
                </span>
              </div>
              <button
                onClick={() => router.push("/new-event")}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-white transition-all active:scale-95 fab-pulse"
                style={{
                  background: "linear-gradient(135deg,#C8341A,#E85D42)",
                  boxShadow: "0 4px 0 #9B2112,0 6px 14px rgba(200,52,26,0.3)",
                }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} /> New Invoice
              </button>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-28 lg:pb-8">
            <div className="lg:hidden mb-5">
              <div className="text-2xl font-extrabold" style={{ color: tp }}>
                Good morning 👋
              </div>
              <div
                className="text-sm font-semibold mt-0.5"
                style={{ color: tm }}
              >
                Here's what's happening today
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6 lg:mb-8">
              {[
                {
                  icon: CalendarDays,
                  label: "Today's Events",
                  value: "4",
                  sub: "2 active now",
                  iconBg: "#3B82F6",
                  onClick: () => router.push("/events"),
                },
                {
                  icon: TrendingUp,
                  label: "This Month",
                  value: "PKR 850k",
                  sub: "+12% vs last",
                  iconBg: "#22C55E",
                },
                {
                  icon: CreditCard,
                  label: "Client Dues",
                  value: "PKR 125k",
                  sub: "Pending from clients",
                  iconBg: "#EF4444",
                  valueColor: "#C8341A",
                  tag: "B2C",
                  onClick: () => router.push("/clients"),
                },
                {
                  icon: Truck,
                  label: "Vendor Dues",
                  value: "PKR 65k",
                  sub: "Owed to vendors",
                  iconBg: "#8B5CF6",
                  valueColor: "#7C3AED",
                  tag: "B2B",
                  onClick: () => router.push("/vendors"),
                },
              ].map((card) => (
                <ClayCard key={card.label} dark={dark} onClick={card.onClick}>
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                    style={{
                      background: card.iconBg,
                      boxShadow: `0 3px 8px ${card.iconBg}55`,
                    }}
                  >
                    <card.icon
                      className="h-4 w-4 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div
                    className="text-[10px] font-extrabold uppercase tracking-wider mb-1"
                    style={{ color: tm }}
                  >
                    {card.label}
                  </div>
                  <div
                    className="text-lg lg:text-xl font-extrabold leading-tight"
                    style={{ color: card.valueColor || tp }}
                  >
                    {card.value}
                  </div>
                  <div
                    className="text-[10px] font-semibold mt-0.5"
                    style={{ color: tm }}
                  >
                    {card.sub}
                  </div>
                  {card.tag && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-0.5">
                      <span
                        className="text-[9px] font-extrabold tracking-wide"
                        style={{ color: card.iconBg }}
                      >
                        {card.tag}
                      </span>
                      <ChevronRight
                        className="h-3 w-3"
                        style={{ color: dark ? "#4A3F38" : "#C4B5A0" }}
                      />
                    </div>
                  )}
                  {card.onClick && !card.tag && (
                    <ChevronRight
                      className="absolute bottom-3 right-3 h-3.5 w-3.5"
                      style={{ color: dark ? "#4A3F38" : "#C4B5A0" }}
                    />
                  )}
                </ClayCard>
              ))}
            </div>

            {/* Two-column grid on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Left */}
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                {/* Upcoming Events */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-base font-extrabold"
                      style={{ color: tp }}
                    >
                      Upcoming Events
                    </span>
                    <button
                      className="text-sm font-bold"
                      style={{ color: "#C8341A" }}
                      onClick={() => router.push("/events")}
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {upcomingEvents.map((ev) => (
                      <ClayCard
                        key={ev.id}
                        dark={dark}
                        onClick={() => {}}
                        className="!p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div
                              className="text-[10px] font-bold mb-1"
                              style={{ color: tm }}
                            >
                              {ev.id}
                            </div>
                            <div
                              className="text-sm font-extrabold truncate mb-2"
                              style={{ color: tp }}
                            >
                              {ev.name}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                                style={{
                                  background: ev.typeBg,
                                  color: ev.typeColor,
                                }}
                              >
                                {ev.type}
                              </span>
                              <span
                                className="text-[11px] font-semibold flex items-center gap-1"
                                style={{ color: tm }}
                              >
                                <CalendarDays className="h-3 w-3" />
                                {ev.date}
                              </span>
                              <span
                                className="text-[11px] font-semibold flex items-center gap-1"
                                style={{ color: tm }}
                              >
                                <Users className="h-3 w-3" />
                                {ev.guests}
                              </span>
                            </div>
                          </div>
                          <span
                            className="text-sm font-extrabold flex-shrink-0"
                            style={{ color: ev.statusColor }}
                          >
                            {ev.status}
                          </span>
                        </div>
                      </ClayCard>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4" style={{ color: "#8B5CF6" }} />
                    <span
                      className="text-base font-extrabold"
                      style={{ color: tp }}
                    >
                      Recent Activity
                    </span>
                  </div>
                  <ClayCard dark={dark} className="!p-0 overflow-hidden">
                    {activity.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 transition-colors"
                        style={{
                          borderBottom:
                            i < activity.length - 1
                              ? `1px solid ${border}`
                              : "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = dark
                            ? "rgba(255,255,255,0.03)"
                            : "#FAF7F2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <div
                          className="h-2 w-2 rounded-full flex-shrink-0"
                          style={{
                            background:
                              i === 0
                                ? "#C8341A"
                                : dark
                                  ? "#3D3530"
                                  : "#D6C9B8",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm font-semibold truncate"
                            style={{ color: tp }}
                          >
                            {item.text}
                          </div>
                          <div
                            className="text-[11px] font-semibold"
                            style={{ color: tm }}
                          >
                            {item.time}
                          </div>
                        </div>
                        <ChevronRight
                          className="h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: dark ? "#3D3530" : "#D6C9B8" }}
                        />
                      </div>
                    ))}
                  </ClayCard>
                </div>
              </div>

              {/* Right: Diary */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen
                      className="h-4 w-4"
                      style={{ color: "#F59E0B" }}
                    />
                    <span
                      className="text-base font-extrabold"
                      style={{ color: tp }}
                    >
                      Diary
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNoteInput((v) => !v)}
                    className="h-8 w-8 rounded-xl flex items-center justify-center text-white transition-all active:scale-95"
                    style={{
                      background: "#F59E0B",
                      boxShadow:
                        "0 3px 0 #B45309,0 5px 10px rgba(245,158,11,0.3)",
                    }}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>

                {showNoteInput && (
                  <div className="mb-3 slide-up">
                    <ClayCard dark={dark} className="!p-3">
                      <textarea
                        autoFocus
                        rows={3}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write a note..."
                        className="clay-textarea mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addNote}
                          disabled={!newNote.trim()}
                          className="flex-1 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40 active:scale-95 transition-all"
                          style={{
                            background: "#F59E0B",
                            boxShadow: "0 3px 0 #B45309",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setShowNoteInput(false);
                            setNewNote("");
                          }}
                          className="px-4 py-2 rounded-xl text-sm font-bold"
                          style={{
                            background: dark
                              ? "rgba(255,255,255,0.07)"
                              : "#F5F0E8",
                            color: tm,
                            boxShadow: dark
                              ? "0 3px 0 #141210"
                              : "0 3px 0 #C4A882",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </ClayCard>
                  </div>
                )}

                <div className="space-y-2">
                  {diaryEntries.map((entry) => (
                    <ClayCard
                      key={entry.id}
                      dark={dark}
                      className="!p-3.5 group"
                      extraStyle={{ background: dark ? "#272014" : "#FFFBEB" }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium leading-relaxed"
                            style={{ color: dark ? "#D4C5A0" : "#5C4A1E" }}
                          >
                            {entry.text}
                          </p>
                          <div
                            className="flex items-center gap-1 mt-1.5 text-[11px] font-bold"
                            style={{ color: "#F59E0B" }}
                          >
                            <Clock className="h-3 w-3" />
                            {entry.time}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDiaryEntries((p) =>
                              p.filter((d) => d.id !== entry.id),
                            );
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
                          style={{ color: dark ? "#6B5B52" : "#C4B5A0" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#EF4444")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = dark
                              ? "#6B5B52"
                              : "#C4B5A0")
                          }
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </ClayCard>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: dark ? "rgba(26,23,20,0.97)" : "rgba(245,240,232,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: `1px solid ${border}`,
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
              <span className="text-xl leading-none">{item.emoji}</span>
              <span
                className="text-[10px] font-bold mt-0.5"
                style={{ color: item.active ? "#C8341A" : tm }}
              >
                {item.label}
              </span>
              {item.active && (
                <div
                  className="h-1 w-4 rounded-full mt-0.5"
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
        className="lg:hidden fixed z-50 fab-pulse flex items-center gap-2 text-white font-bold text-sm"
        style={{
          bottom: "74px",
          right: "16px",
          background: "linear-gradient(135deg,#C8341A,#E85D42)",
          borderRadius: "18px",
          padding: "12px 18px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} /> New Invoice
      </button>
    </>
  );
}
