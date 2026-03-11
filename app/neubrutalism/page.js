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

function BrutalCard({
  children,
  className = "",
  onClick,
  dark,
  style: extraStyle = {},
}) {
  const [pressed, setPressed] = useState(false);

  const bg = dark ? "#1F1A17" : "#FFF7E8";
  const border = "#111111";
  const shadow = dark ? "#000000" : "#111111";

  return (
    <div
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`relative border-[3px] rounded-[24px] transition-all duration-100 ${
        onClick ? "cursor-pointer select-none" : ""
      } ${className}`}
      style={{
        background: bg,
        borderColor: border,
        boxShadow: pressed
          ? `2px 2px 0 ${shadow}`
          : dark
            ? `8px 8px 0 ${shadow}`
            : `8px 8px 0 ${shadow}`,
        transform: pressed ? "translate(5px, 5px)" : "translate(0, 0)",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

function BrutalIconButton({
  children,
  onClick,
  dark,
  className = "",
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      className={`border-[3px] rounded-[18px] flex items-center justify-center font-extrabold transition-all active:translate-x-[3px] active:translate-y-[3px] ${className}`}
      style={{
        background: dark ? "#2A221E" : "#FFFFFF",
        color: dark ? "#F4E7D0" : "#111111",
        borderColor: "#111111",
        boxShadow: "4px 4px 0 #111111",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function BrutalNavItem({ icon: Icon, label, active, onClick, dark, badge }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-3 rounded-[18px] border-[3px] font-bold text-sm transition-all active:translate-x-[3px] active:translate-y-[3px]"
      style={
        active
          ? {
              background: dark ? "#FF7A59" : "#FF6B3D",
              color: "#111111",
              borderColor: "#111111",
              boxShadow: "4px 4px 0 #111111",
            }
          : {
              background: dark ? "#2A221E" : "#FFFFFF",
              color: dark ? "#D6C3A5" : "#4B453F",
              borderColor: "#111111",
              boxShadow: "4px 4px 0 #111111",
            }
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className="min-w-5 h-5 px-1 rounded-full border-2 text-[10px] font-extrabold flex items-center justify-center"
          style={{
            background: dark ? "#FFE66D" : "#FFE066",
            color: "#111111",
            borderColor: "#111111",
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
  textMuted,
  textPrimary,
  toggleTheme,
  router,
  setMobileMenuOpen,
}) {
  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <BrutalNavItem
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

      <div className="px-3 pb-5 pt-4 space-y-3">
        <BrutalCard dark={dark} className="p-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between text-sm font-extrabold"
            style={{ color: textMuted }}
          >
            <span>{dark ? "Dark Mode" : "Light Mode"}</span>
            {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </BrutalCard>

        <BrutalCard dark={dark} className="p-3.5">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-[16px] border-[3px] flex items-center justify-center text-xs font-extrabold shrink-0"
              style={{
                background: dark ? "#FFE066" : "#FFD43B",
                color: "#111111",
                borderColor: "#111111",
                boxShadow: "3px 3px 0 #111111",
              }}
            >
              MC
            </div>
            <div className="min-w-0">
              <div
                className="text-sm font-extrabold truncate"
                style={{ color: textPrimary }}
              >
                Marcus Chen
              </div>
              <div className="text-xs font-bold" style={{ color: textMuted }}>
                Admin
              </div>
            </div>
          </div>
        </BrutalCard>
      </div>
    </>
  );
}

export default function NeubrutalismDashboardPage() {
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
        statusColor: dark ? "#7CFF6B" : "#0F9D58",
        typeBg: dark ? "#FF9CEE" : "#FFB3F1",
        typeColor: "#111111",
      },
      {
        id: "EVT-2025-0045",
        name: "Engro Corp AGM",
        type: "Corporate",
        date: "Dec 15, 2025",
        guests: 120,
        status: "PKR 45,000 Due",
        statusColor: dark ? "#FF8A8A" : "#D7263D",
        typeBg: dark ? "#7CCBFF" : "#82CFFF",
        typeColor: "#111111",
      },
      {
        id: "EVT-2025-0048",
        name: "Birthday — Zaid",
        type: "General",
        date: "Dec 18, 2025",
        guests: 50,
        status: "Paid",
        statusColor: dark ? "#7CFF6B" : "#0F9D58",
        typeBg: dark ? "#FFE66D" : "#FFD43B",
        typeColor: "#111111",
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

  const bg = dark ? "#17120F" : "#F7EEDB";
  const sidebarBg = dark ? "#201915" : "#FFF9EF";
  const textPrimary = dark ? "#FFF3E0" : "#111111";
  const textMuted = dark ? "#D7B98F" : "#5B5146";
  const accent = dark ? "#FFE066" : "#FFB703";
  const accentSoft = dark ? "#FF7A59" : "#FF6B3D";
  const warning = dark ? "#FFE066" : "#D97706";

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/neubrutalism",
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');
        *, *::before, *::after {
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        html, body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb {
          background: #111111;
          border-radius: 999px;
        }
        ::-webkit-scrollbar-track { background: transparent; }
        @keyframes brutal-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          75% { transform: rotate(1deg); }
        }
        .brutal-wiggle { animation: brutal-wiggle 2.2s ease-in-out infinite; }
        @keyframes brutal-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .brutal-pop { animation: brutal-pop 0.18s ease-out; }
        .brutal-textarea {
          width: 100%;
          border: 3px solid #111111;
          outline: none;
          resize: none;
          display: block;
          padding: 12px 14px;
          border-radius: 18px;
          background: ${dark ? "#2A221E" : "#FFFFFF"};
          color: ${textPrimary};
          font-size: 14px;
          font-weight: 700;
          box-shadow: 4px 4px 0 #111111;
        }
        .brutal-textarea::placeholder {
          color: ${textMuted};
        }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: bg,
          transition: "background 0.2s ease",
        }}
      >
        <aside
          className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 h-screen sticky top-0 z-20 border-r-[3px]"
          style={{
            background: sidebarBg,
            borderColor: "#111111",
          }}
        >
          <div className="px-5 pt-6 pb-4">
            <BrutalCard dark={dark} className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-[18px] border-[3px] flex items-center justify-center font-extrabold text-sm shrink-0"
                  style={{
                    background: accentSoft,
                    color: "#111111",
                    borderColor: "#111111",
                    boxShadow: "4px 4px 0 #111111",
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
                    className="text-xs font-bold"
                    style={{ color: textMuted }}
                  >
                    Neubrutalism UI
                  </div>
                </div>
              </div>
            </BrutalCard>
          </div>

          <SidebarContent
            navItems={navItems}
            dark={dark}
            textMuted={textMuted}
            textPrimary={textPrimary}
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
                background: "rgba(17,17,17,0.45)",
              }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside
              className="relative w-72 h-full flex flex-col z-10 border-r-[3px]"
              style={{
                background: sidebarBg,
                borderColor: "#111111",
              }}
            >
              <div className="px-5 pt-6 pb-4">
                <BrutalCard dark={dark} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-10 w-10 rounded-[16px] border-[3px] flex items-center justify-center font-extrabold text-sm shrink-0"
                        style={{
                          background: accentSoft,
                          color: "#111111",
                          borderColor: "#111111",
                          boxShadow: "3px 3px 0 #111111",
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
                    <BrutalIconButton
                      dark={dark}
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-9 w-9"
                    >
                      <X className="h-5 w-5" />
                    </BrutalIconButton>
                  </div>
                </BrutalCard>
              </div>

              <SidebarContent
                navItems={navItems}
                dark={dark}
                textMuted={textMuted}
                textPrimary={textPrimary}
                toggleTheme={toggleTheme}
                router={router}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </aside>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <header
            className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4 border-b-[3px]"
            style={{
              background: bg,
              borderColor: "#111111",
            }}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <BrutalIconButton
                dark={dark}
                onClick={() => setMobileMenuOpen(true)}
                className="h-10 w-10"
              >
                <Menu className="h-5 w-5" />
              </BrutalIconButton>
              <span className="text-lg font-extrabold">
                <span style={{ color: accentSoft }}>GN</span>
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
                className="text-xs font-bold mt-0.5"
                style={{ color: textMuted }}
              >
                Good morning, Marcus 👋
              </p>
            </div>

            <div className="flex items-center gap-2">
              <BrutalIconButton
                dark={dark}
                onClick={toggleTheme}
                className="h-10 w-10"
              >
                {dark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </BrutalIconButton>

              <div className="relative">
                <BrutalIconButton dark={dark} className="h-10 w-10">
                  <Bell className="h-4 w-4" />
                </BrutalIconButton>
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full border-[2px] text-[10px] font-extrabold flex items-center justify-center"
                  style={{
                    background: "#FF5D8F",
                    color: "#111111",
                    borderColor: "#111111",
                  }}
                >
                  3
                </span>
              </div>

              <button
                onClick={() => router.push("/new-event")}
                className="hidden lg:flex items-center gap-2 px-4 py-3 rounded-[18px] border-[3px] text-sm font-extrabold brutal-wiggle transition-all active:translate-x-[4px] active:translate-y-[4px]"
                style={{
                  color: "#111111",
                  background: accent,
                  borderColor: "#111111",
                  boxShadow: "5px 5px 0 #111111",
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
                className="text-sm font-bold mt-0.5"
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
                  iconBg: "#82CFFF",
                  onClick: () => router.push("/events"),
                },
                {
                  icon: TrendingUp,
                  label: "This Month",
                  value: "PKR 850k",
                  sub: "+12% vs last",
                  iconBg: "#7CFF6B",
                },
                {
                  icon: CreditCard,
                  label: "Client Dues",
                  value: "PKR 125k",
                  sub: "Pending from clients",
                  iconBg: "#FF8A8A",
                  valueColor: dark ? "#FFD1D1" : "#B42318",
                  tag: "B2C",
                  onClick: () => router.push("/clients"),
                },
                {
                  icon: Truck,
                  label: "Vendor Dues",
                  value: "PKR 65k",
                  sub: "Owed to vendors",
                  iconBg: "#C9A7FF",
                  valueColor: dark ? "#E7D8FF" : "#6B21A8",
                  tag: "B2B",
                  onClick: () => router.push("/vendors"),
                },
              ].map((card) => (
                <BrutalCard
                  key={card.label}
                  dark={dark}
                  onClick={card.onClick}
                  className="p-4 lg:p-5"
                >
                  <div
                    className="h-10 w-10 rounded-[16px] border-[3px] flex items-center justify-center mb-3"
                    style={{
                      background: card.iconBg,
                      borderColor: "#111111",
                      boxShadow: "3px 3px 0 #111111",
                    }}
                  >
                    <card.icon
                      className="h-4 w-4"
                      strokeWidth={2.5}
                      style={{ color: "#111111" }}
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
                    className="text-[10px] font-bold mt-0.5"
                    style={{ color: textMuted }}
                  >
                    {card.sub}
                  </div>

                  {card.tag && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1">
                      <span
                        className="text-[10px] font-extrabold tracking-wide"
                        style={{ color: "#111111" }}
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
                </BrutalCard>
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
                      className="text-sm font-extrabold underline"
                      style={{ color: accentSoft }}
                      onClick={() => router.push("/events")}
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {upcomingEvents.map((ev) => (
                      <BrutalCard
                        key={ev.id}
                        dark={dark}
                        onClick={() => {}}
                        className="p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div
                              className="text-[10px] font-extrabold mb-1"
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
                                className="text-[11px] font-extrabold px-2.5 py-1 rounded-full border-[2px]"
                                style={{
                                  background: ev.typeBg,
                                  color: ev.typeColor,
                                  borderColor: "#111111",
                                }}
                              >
                                {ev.type}
                              </span>

                              <span
                                className="text-[11px] font-bold flex items-center gap-1"
                                style={{ color: textMuted }}
                              >
                                <CalendarDays className="h-3 w-3" />
                                {ev.date}
                              </span>

                              <span
                                className="text-[11px] font-bold flex items-center gap-1"
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
                      </BrutalCard>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap
                      className="h-4 w-4"
                      style={{ color: dark ? "#C9A7FF" : "#7C3AED" }}
                    />
                    <span
                      className="text-base font-extrabold"
                      style={{ color: textPrimary }}
                    >
                      Recent Activity
                    </span>
                  </div>

                  <BrutalCard dark={dark} className="p-1 overflow-hidden">
                    {activity.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 rounded-[18px] transition-colors"
                        style={{
                          borderBottom:
                            i < activity.length - 1
                              ? "3px solid #111111"
                              : "none",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className="h-2.5 w-2.5 rounded-full shrink-0 border"
                          style={{
                            background:
                              i === 0
                                ? accentSoft
                                : dark
                                  ? "#FFE066"
                                  : "#111111",
                            borderColor: "#111111",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm font-bold truncate"
                            style={{ color: textPrimary }}
                          >
                            {item.text}
                          </div>
                          <div
                            className="text-[11px] font-extrabold"
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
                  </BrutalCard>
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

                  <BrutalIconButton
                    dark={dark}
                    onClick={() => setShowNoteInput((v) => !v)}
                    className="h-9 w-9"
                    style={{
                      background: dark ? "#FFE066" : "#FFD43B",
                      color: "#111111",
                    }}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </BrutalIconButton>
                </div>

                {showNoteInput && (
                  <div className="mb-3 brutal-pop">
                    <BrutalCard dark={dark} className="p-3">
                      <textarea
                        autoFocus
                        rows={3}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write a note..."
                        className="brutal-textarea mb-3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addNote}
                          disabled={!newNote.trim()}
                          className="flex-1 py-2.5 rounded-[18px] border-[3px] text-sm font-extrabold transition-all disabled:opacity-40 active:translate-x-[3px] active:translate-y-[3px]"
                          style={{
                            color: "#111111",
                            background: accent,
                            borderColor: "#111111",
                            boxShadow: "4px 4px 0 #111111",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setShowNoteInput(false);
                            setNewNote("");
                          }}
                          className="px-4 py-2.5 rounded-[18px] border-[3px] text-sm font-extrabold transition-all active:translate-x-[3px] active:translate-y-[3px]"
                          style={{
                            color: textPrimary,
                            background: dark ? "#2A221E" : "#FFFFFF",
                            borderColor: "#111111",
                            boxShadow: "4px 4px 0 #111111",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </BrutalCard>
                  </div>
                )}

                <div className="space-y-2.5">
                  {diaryEntries.map((entry) => (
                    <BrutalCard
                      key={entry.id}
                      dark={dark}
                      className="p-3.5 group"
                      style={{
                        background: dark ? "#2A221E" : "#FFFBEF",
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-bold leading-relaxed"
                            style={{ color: textPrimary }}
                          >
                            {entry.text}
                          </p>
                          <div
                            className="flex items-center gap-1 mt-1.5 text-[11px] font-extrabold"
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
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </BrutalCard>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t-[3px]"
        style={{
          background: dark ? "#201915" : "#FFF9EF",
          borderColor: "#111111",
        }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          {[
            { label: "Home", emoji: "🏠", path: "/neubrutalism", active: true },
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
                className="text-[10px] font-extrabold mt-0.5"
                style={{ color: item.active ? accentSoft : textMuted }}
              >
                {item.label}
              </span>
              {item.active && (
                <div
                  className="h-1.5 w-5 rounded-full border"
                  style={{ background: accentSoft, borderColor: "#111111" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/new-event")}
        className="lg:hidden fixed z-50 flex items-center gap-2 font-extrabold text-sm border-[3px] brutal-wiggle"
        style={{
          bottom: "74px",
          right: "16px",
          color: "#111111",
          background: accent,
          borderRadius: "18px",
          padding: "12px 18px",
          borderColor: "#111111",
          cursor: "pointer",
          boxShadow: "5px 5px 0 #111111",
        }}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} /> New Invoice
      </button>
    </>
  );
}
