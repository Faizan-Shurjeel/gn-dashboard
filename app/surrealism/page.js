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

function DreamCard({
  children,
  className = "",
  onClick,
  dark,
  style: extraStyle = {},
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`relative overflow-hidden rounded-[30px] transition-all duration-200 ${
        onClick ? "cursor-pointer select-none" : ""
      } ${className}`}
      style={{
        background: dark
          ? "linear-gradient(135deg, rgba(47,26,70,0.92), rgba(18,36,58,0.88), rgba(32,20,40,0.95))"
          : "linear-gradient(135deg, rgba(255,240,246,0.92), rgba(227,245,255,0.88), rgba(255,247,216,0.92))",
        border: `1.5px solid ${
          dark ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.55)"
        }`,
        boxShadow: pressed
          ? dark
            ? "0 8px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 10px 24px rgba(150,115,255,0.16), inset 0 1px 0 rgba(255,255,255,0.55)"
          : dark
            ? "0 20px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset"
            : "0 24px 60px rgba(153,122,255,0.18), 0 10px 24px rgba(98,195,255,0.12), 0 0 0 1px rgba(255,255,255,0.4) inset",
        transform: pressed
          ? "scale(0.985) translateY(2px) rotate(-0.2deg)"
          : "scale(1) translateY(0) rotate(0deg)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        ...extraStyle,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: dark
            ? "radial-gradient(circle at 20% 10%, rgba(255,120,220,0.12), transparent 30%), radial-gradient(circle at 80% 0%, rgba(120,210,255,0.13), transparent 28%)"
            : "radial-gradient(circle at 20% 10%, rgba(255,137,204,0.22), transparent 30%), radial-gradient(circle at 80% 0%, rgba(117,215,255,0.22), transparent 28%)",
        }}
      />
      {children}
    </div>
  );
}

function FloatingOrb({
  size,
  top,
  left,
  right,
  bottom,
  color,
  blur = 0,
  opacity = 1,
  duration = "10s",
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        borderRadius: "999px",
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: "none",
        animation: `surreal-float ${duration} ease-in-out infinite`,
      }}
    />
  );
}

function DreamButton({
  children,
  onClick,
  dark,
  className = "",
  style = {},
  active = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center transition-all active:scale-95 ${className}`}
      style={{
        background: active
          ? dark
            ? "linear-gradient(135deg,#FF77C8,#7E7BFF)"
            : "linear-gradient(135deg,#FF83CD,#66D7FF)"
          : dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.55)",
        color: active ? "#ffffff" : dark ? "#E6DFF8" : "#5F5678",
        border: `1px solid ${
          dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.7)"
        }`,
        boxShadow: active
          ? dark
            ? "0 14px 30px rgba(126,123,255,0.28)"
            : "0 14px 30px rgba(102,215,255,0.22)"
          : dark
            ? "0 10px 22px rgba(0,0,0,0.2)"
            : "0 10px 24px rgba(145,126,255,0.14)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function NavItem({ icon: Icon, label, active, onClick, dark, badge }) {
  return (
    <DreamButton
      onClick={onClick}
      dark={dark}
      active={active}
      className="w-full gap-3 px-3 py-3 rounded-[20px] text-sm font-bold"
      style={{
        justifyContent: "flex-start",
      }}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className="min-w-5 h-5 px-1 rounded-full text-[10px] font-extrabold flex items-center justify-center"
          style={{
            background: dark ? "rgba(255,230,102,0.9)" : "#FFE88F",
            color: "#3A315B",
          }}
        >
          {badge}
        </span>
      )}
    </DreamButton>
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

      <div className="px-3 pb-5 pt-4 space-y-3">
        <DreamCard dark={dark} className="p-3.5">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between text-sm font-bold"
            style={{ color: textMuted }}
          >
            <span>{dark ? "Dark Mode" : "Light Mode"}</span>
            {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </DreamCard>

        <DreamCard dark={dark} className="p-3.5">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-[18px] flex items-center justify-center text-xs font-extrabold shrink-0"
              style={{
                background: dark
                  ? "linear-gradient(135deg,#FFD86A,#FF84C8)"
                  : "linear-gradient(135deg,#7DE3FF,#FF99DA)",
                color: "#3E335F",
                boxShadow: dark
                  ? "0 10px 18px rgba(255,132,200,0.24)"
                  : "0 10px 18px rgba(125,227,255,0.22)",
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
        </DreamCard>
      </div>
    </>
  );
}

export default function SurrealismDashboardPage() {
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
        statusColor: dark ? "#86F7A8" : "#1E9F56",
        typeBg: dark ? "rgba(255,140,210,0.24)" : "#FFD7F0",
        typeColor: dark ? "#FFC7E8" : "#AF2F7B",
      },
      {
        id: "EVT-2025-0045",
        name: "Engro Corp AGM",
        type: "Corporate",
        date: "Dec 15, 2025",
        guests: 120,
        status: "PKR 45,000 Due",
        statusColor: dark ? "#FF909A" : "#CF334D",
        typeBg: dark ? "rgba(117,215,255,0.18)" : "#D8F4FF",
        typeColor: dark ? "#AEEBFF" : "#156C9C",
      },
      {
        id: "EVT-2025-0048",
        name: "Birthday — Zaid",
        type: "General",
        date: "Dec 18, 2025",
        guests: 50,
        status: "Paid",
        statusColor: dark ? "#86F7A8" : "#1E9F56",
        typeBg: dark ? "rgba(255,230,102,0.18)" : "#FFF1B8",
        typeColor: dark ? "#FFEAA0" : "#9A6A00",
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

  const bg = dark
    ? "radial-gradient(circle at 10% 10%, #3B1D59 0%, transparent 28%), radial-gradient(circle at 90% 15%, #14395C 0%, transparent 25%), radial-gradient(circle at 50% 100%, #291A35 0%, transparent 30%), #110E18"
    : "radial-gradient(circle at 10% 10%, #FFD8F0 0%, transparent 28%), radial-gradient(circle at 90% 12%, #D4F6FF 0%, transparent 25%), radial-gradient(circle at 50% 100%, #FFF0B8 0%, transparent 30%), #F7F1FF";
  const sidebarBg = dark ? "rgba(27,20,35,0.55)" : "rgba(255,255,255,0.34)";
  const textPrimary = dark ? "#F8F1FF" : "#483C66";
  const textMuted = dark ? "#C8B7E8" : "#7D719D";
  const accent = dark ? "#7E7BFF" : "#7D6CFF";
  const accentSoft = dark ? "#FF84C8" : "#FF88CB";
  const warning = dark ? "#FFD86A" : "#E6A200";

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/surrealism",
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
        *, *::before, *::after {
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        html, body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb {
          background: ${dark ? "rgba(255,255,255,0.18)" : "rgba(125,108,255,0.28)"};
          border-radius: 999px;
        }
        ::-webkit-scrollbar-track { background: transparent; }
        @keyframes surreal-float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-10px) translateX(6px) rotate(4deg); }
        }
        @keyframes surreal-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.03) rotate(0.8deg); }
        }
        .surreal-breathe {
          animation: surreal-breathe 4.5s ease-in-out infinite;
        }
        @keyframes surreal-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .surreal-pop { animation: surreal-pop 0.22s ease-out; }
        .dream-textarea {
          width: 100%;
          border: 1.5px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.7)"};
          outline: none;
          resize: none;
          display: block;
          padding: 12px 14px;
          border-radius: 18px;
          background: ${dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.6)"};
          color: ${textPrimary};
          font-size: 14px;
          font-weight: 600;
          box-shadow: ${
            dark
              ? "0 12px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 12px 26px rgba(145,126,255,0.12), inset 0 1px 0 rgba(255,255,255,0.55)"
          };
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .dream-textarea::placeholder {
          color: ${textMuted};
        }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingOrb
          size={220}
          top="-40px"
          left="-30px"
          color={dark ? "#FF7FC799" : "#FF8FD888"}
          blur={10}
          opacity={0.8}
          duration="12s"
        />
        <FloatingOrb
          size={260}
          top="8%"
          right="-60px"
          color={dark ? "#78D7FF7A" : "#7EE3FF80"}
          blur={8}
          opacity={0.8}
          duration="14s"
        />
        <FloatingOrb
          size={180}
          bottom="10%"
          left="8%"
          color={dark ? "#FFE16966" : "#FFE78A88"}
          blur={6}
          opacity={0.9}
          duration="11s"
        />

        <aside
          className="hidden lg:flex flex-col w-60 xl:w-64 shrink-0 h-screen sticky top-0 z-20"
          style={{
            background: sidebarBg,
            borderRight: `1px solid ${
              dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.45)"
            }`,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          <div className="px-5 pt-6 pb-4">
            <DreamCard dark={dark} className="p-4 surreal-breathe">
              <div className="flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-[20px] flex items-center justify-center font-extrabold text-sm shrink-0"
                  style={{
                    background: dark
                      ? "linear-gradient(135deg,#FFD86A,#FF84C8)"
                      : "linear-gradient(135deg,#7DE3FF,#FF99DA)",
                    color: "#44366A",
                    boxShadow: dark
                      ? "0 14px 24px rgba(255,132,200,0.25)"
                      : "0 14px 24px rgba(125,227,255,0.2)",
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
                    Surrealism UI
                  </div>
                </div>
              </div>
            </DreamCard>
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
                background: dark
                  ? "rgba(11,8,16,0.62)"
                  : "rgba(140,112,220,0.28)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside
              className="relative w-72 h-full flex flex-col z-10"
              style={{
                background: sidebarBg,
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
              }}
            >
              <div className="px-5 pt-6 pb-4">
                <DreamCard dark={dark} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-10 w-10 rounded-[18px] flex items-center justify-center font-extrabold text-sm shrink-0"
                        style={{
                          background: dark
                            ? "linear-gradient(135deg,#FFD86A,#FF84C8)"
                            : "linear-gradient(135deg,#7DE3FF,#FF99DA)",
                          color: "#44366A",
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
                    <DreamButton
                      dark={dark}
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-9 w-9 rounded-[18px]"
                    >
                      <X className="h-5 w-5" />
                    </DreamButton>
                  </div>
                </DreamCard>
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

        <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative z-10">
          <header
            className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4"
            style={{
              background: dark
                ? "rgba(17,14,24,0.45)"
                : "rgba(247,241,255,0.38)",
              borderBottom: `1px solid ${
                dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.5)"
              }`,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <DreamButton
                dark={dark}
                onClick={() => setMobileMenuOpen(true)}
                className="h-10 w-10 rounded-[18px]"
              >
                <Menu className="h-5 w-5" />
              </DreamButton>
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
              <DreamButton
                dark={dark}
                onClick={toggleTheme}
                className="h-10 w-10 rounded-[18px]"
              >
                {dark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </DreamButton>

              <div className="relative">
                <DreamButton dark={dark} className="h-10 w-10 rounded-[18px]">
                  <Bell className="h-4 w-4" />
                </DreamButton>
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] font-extrabold flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#FF77C8,#FFD86A)",
                    color: "#433665",
                    boxShadow: "0 6px 14px rgba(255,119,200,0.25)",
                  }}
                >
                  3
                </span>
              </div>

              <button
                onClick={() => router.push("/new-event")}
                className="hidden lg:flex items-center gap-2 px-4 py-3 rounded-[20px] text-sm font-extrabold surreal-breathe transition-all active:scale-95"
                style={{
                  color: "#ffffff",
                  background: dark
                    ? "linear-gradient(135deg,#FF84C8,#7E7BFF)"
                    : "linear-gradient(135deg,#FF88CB,#73DFFF)",
                  boxShadow: dark
                    ? "0 16px 30px rgba(126,123,255,0.28)"
                    : "0 16px 30px rgba(115,223,255,0.22)",
                  border: "1px solid rgba(255,255,255,0.2)",
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
                Good morning 👁️✨
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
                  iconBg: "linear-gradient(135deg,#77E2FF,#8F8BFF)",
                  onClick: () => router.push("/events"),
                },
                {
                  icon: TrendingUp,
                  label: "This Month",
                  value: "PKR 850k",
                  sub: "+12% vs last",
                  iconBg: "linear-gradient(135deg,#95FFB4,#7DE3FF)",
                },
                {
                  icon: CreditCard,
                  label: "Client Dues",
                  value: "PKR 125k",
                  sub: "Pending from clients",
                  iconBg: "linear-gradient(135deg,#FF98B8,#FFB6F3)",
                  valueColor: dark ? "#FFC0CC" : "#BC3D67",
                  tag: "B2C",
                  onClick: () => router.push("/clients"),
                },
                {
                  icon: Truck,
                  label: "Vendor Dues",
                  value: "PKR 65k",
                  sub: "Owed to vendors",
                  iconBg: "linear-gradient(135deg,#FFD86A,#FF9BDA)",
                  valueColor: dark ? "#FFE4A0" : "#9C5A0A",
                  tag: "B2B",
                  onClick: () => router.push("/vendors"),
                },
              ].map((card) => (
                <DreamCard
                  key={card.label}
                  dark={dark}
                  onClick={card.onClick}
                  className="p-4 lg:p-5"
                >
                  <div
                    className="h-10 w-10 rounded-[18px] flex items-center justify-center mb-3"
                    style={{
                      background: card.iconBg,
                      boxShadow: dark
                        ? "0 12px 20px rgba(0,0,0,0.18)"
                        : "0 12px 20px rgba(125,108,255,0.16)",
                    }}
                  >
                    <card.icon
                      className="h-4 w-4"
                      strokeWidth={2.5}
                      style={{ color: "#3F3460" }}
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
                        style={{ color: dark ? "#FFD86A" : "#7D6CFF" }}
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
                </DreamCard>
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
                      className="text-sm font-extrabold"
                      style={{ color: accentSoft }}
                      onClick={() => router.push("/events")}
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {upcomingEvents.map((ev) => (
                      <DreamCard
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
                                className="text-[11px] font-extrabold px-2.5 py-1 rounded-full"
                                style={{
                                  background: ev.typeBg,
                                  color: ev.typeColor,
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
                      </DreamCard>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap
                      className="h-4 w-4"
                      style={{ color: dark ? "#CDAEFF" : "#8D67FF" }}
                    />
                    <span
                      className="text-base font-extrabold"
                      style={{ color: textPrimary }}
                    >
                      Recent Activity
                    </span>
                  </div>

                  <DreamCard dark={dark} className="p-1 overflow-hidden">
                    {activity.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 rounded-[22px] transition-colors"
                        style={{
                          borderBottom:
                            i < activity.length - 1
                              ? `1px solid ${
                                  dark
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(255,255,255,0.5)"
                                }`
                              : "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = dark
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(255,255,255,0.35)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <div
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{
                            background:
                              i === 0
                                ? accentSoft
                                : dark
                                  ? "#FFE18A"
                                  : "#8D67FF",
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
                  </DreamCard>
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

                  <DreamButton
                    dark={dark}
                    onClick={() => setShowNoteInput((v) => !v)}
                    className="h-9 w-9 rounded-[18px]"
                    style={{
                      background: dark
                        ? "linear-gradient(135deg,#FFD86A,#FF84C8)"
                        : "linear-gradient(135deg,#7DE3FF,#FFD86A)",
                      color: "#44366A",
                    }}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </DreamButton>
                </div>

                {showNoteInput && (
                  <div className="mb-3 surreal-pop">
                    <DreamCard dark={dark} className="p-3">
                      <textarea
                        autoFocus
                        rows={3}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write a note..."
                        className="dream-textarea mb-3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addNote}
                          disabled={!newNote.trim()}
                          className="flex-1 py-2.5 rounded-[18px] text-sm font-extrabold transition-all disabled:opacity-40 active:scale-95"
                          style={{
                            color: "#ffffff",
                            background: dark
                              ? "linear-gradient(135deg,#FF84C8,#7E7BFF)"
                              : "linear-gradient(135deg,#FF88CB,#73DFFF)",
                            boxShadow: dark
                              ? "0 14px 28px rgba(126,123,255,0.25)"
                              : "0 14px 28px rgba(115,223,255,0.2)",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setShowNoteInput(false);
                            setNewNote("");
                          }}
                          className="px-4 py-2.5 rounded-[18px] text-sm font-extrabold transition-all active:scale-95"
                          style={{
                            color: textPrimary,
                            background: dark
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(255,255,255,0.6)",
                            border: `1px solid ${
                              dark
                                ? "rgba(255,255,255,0.12)"
                                : "rgba(255,255,255,0.7)"
                            }`,
                            boxShadow: dark
                              ? "0 12px 24px rgba(0,0,0,0.16)"
                              : "0 12px 24px rgba(145,126,255,0.12)",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </DreamCard>
                  </div>
                )}

                <div className="space-y-2.5">
                  {diaryEntries.map((entry) => (
                    <DreamCard
                      key={entry.id}
                      dark={dark}
                      className="p-3.5 group"
                      style={{
                        background: dark
                          ? "linear-gradient(135deg, rgba(58,39,30,0.86), rgba(53,30,60,0.88), rgba(38,34,65,0.88))"
                          : "linear-gradient(135deg, rgba(255,248,225,0.8), rgba(255,231,246,0.78), rgba(225,245,255,0.78))",
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = dark
                              ? "#FFB7C8"
                              : "#D24570";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = textMuted;
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </DreamCard>
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
          background: dark ? "rgba(20,15,29,0.72)" : "rgba(247,241,255,0.55)",
          borderTop: `1px solid ${
            dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)"
          }`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          {[
            { label: "Home", emoji: "🪞", path: "/surrealism", active: true },
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
                  className="h-1 w-4 rounded-full mt-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${accentSoft}, ${accent})`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/new-event")}
        className="lg:hidden fixed z-50 flex items-center gap-2 font-extrabold text-sm surreal-breathe"
        style={{
          bottom: "74px",
          right: "16px",
          color: "#ffffff",
          background: dark
            ? "linear-gradient(135deg,#FF84C8,#7E7BFF)"
            : "linear-gradient(135deg,#FF88CB,#73DFFF)",
          borderRadius: "18px",
          padding: "12px 18px",
          border: "1px solid rgba(255,255,255,0.2)",
          cursor: "pointer",
          boxShadow: dark
            ? "0 18px 32px rgba(126,123,255,0.28)"
            : "0 18px 32px rgba(115,223,255,0.22)",
        }}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} /> New Invoice
      </button>
    </>
  );
}
