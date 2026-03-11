"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  UserCheck,
  Truck,
  Settings,
  Bell,
  Plus,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import {
  useNeu,
  NeumorphicCard,
  SoftIconButton,
  NeuNavItem,
} from "./neumorphic";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CalendarDays, label: "Events", path: "/events", badge: "4" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: UserCheck, label: "Clients", path: "/clients" },
  { icon: Truck, label: "Vendors", path: "/vendors" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const MOBILE_NAV = [
  { label: "Home", emoji: "🏠", path: "/" },
  { label: "Events", emoji: "📅", path: "/events" },
  { label: "Clients", emoji: "👥", path: "/clients" },
  { label: "Vendors", emoji: "🚚", path: "/vendors" },
];

function SidebarContent({ neu, router, pathname, closeMobile }) {
  const {
    sidebarBg,
    textPrimary,
    textMuted,
    divider,
    accent,
    toggleTheme,
    smallInset,
  } = neu;
  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NeuNavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={pathname === item.path}
            badge={item.badge}
            onClick={() => {
              router.push(item.path);
              closeMobile?.();
            }}
          />
        ))}
      </nav>

      <div
        className="px-3 pb-5 pt-4 space-y-3"
        style={{ borderTop: `1px solid ${divider}` }}
      >
        {/* Theme toggle — CSS show/hide avoids conditional JSX */}
        <NeumorphicCard className="p-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between text-sm font-semibold"
            style={{
              color: textMuted,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {/* Both spans always rendered; CSS decides which is visible */}
            <span className="dark:hidden">Light Mode</span>
            <span className="hidden dark:block">Dark Mode</span>
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="h-4 w-4 hidden dark:block" />
          </button>
        </NeumorphicCard>

        {/* User card */}
        <NeumorphicCard className="p-3.5">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-extrabold shrink-0"
              style={{
                color: accent,
                background: sidebarBg,
                boxShadow: "var(--neu-small-inset)",
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

export default function DashboardLayout({ children, title, subtitle }) {
  const router = useRouter();
  const pathname = usePathname();
  const neu = useNeu();
  const {
    bg,
    sidebarBg,
    textPrimary,
    textMuted,
    divider,
    accent,
    accentSoft,
    toggleTheme,
  } = neu;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: bg,
        transition: "background 0.3s ease",
      }}
    >
      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 h-screen sticky top-0 z-20"
        style={{ background: sidebarBg, borderRight: `1px solid ${divider}` }}
      >
        <div className="px-5 pt-6 pb-4">
          <NeumorphicCard className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="h-11 w-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0"
                style={{
                  color: accent,
                  background: sidebarBg,
                  boxShadow: "var(--neu-avatar)",
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
                  Management System
                </div>
              </div>
            </div>
          </NeumorphicCard>
        </div>
        <SidebarContent neu={neu} router={router} pathname={pathname} />
      </aside>

      {/* ── Mobile Drawer ───────────────────────────────────────────────── */}
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
              <NeumorphicCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-10 w-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0"
                      style={{
                        color: accent,
                        background: sidebarBg,
                        boxShadow: "var(--neu-avatar)",
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
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-9 w-9 rounded-2xl"
                  >
                    <X className="h-5 w-5" />
                  </SoftIconButton>
                </div>
              </NeumorphicCard>
            </div>
            <SidebarContent
              neu={neu}
              router={router}
              pathname={pathname}
              closeMobile={() => setMobileMenuOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* ── Main Column ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
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
              {title ?? "Dashboard"}
            </h1>
            {subtitle && (
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: textMuted }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SoftIconButton
              onClick={toggleTheme}
              className="h-10 w-10 rounded-2xl"
            >
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="h-4 w-4 hidden dark:block" />
            </SoftIconButton>

            <div className="relative">
              <SoftIconButton className="h-10 w-10 rounded-2xl">
                <Bell className="h-4 w-4" />
              </SoftIconButton>
              <span
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] font-extrabold flex items-center justify-center"
                style={{
                  background: accentSoft,
                  color: accent,
                  boxShadow: "var(--neu-notif)",
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
                boxShadow: "var(--neu-fab-shadow)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} /> New Event
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-28 lg:pb-8">
          {(title || subtitle) && (
            <div className="lg:hidden mb-5">
              {title && (
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: textPrimary }}
                >
                  {title}
                </div>
              )}
              {subtitle && (
                <div
                  className="text-sm font-semibold mt-0.5"
                  style={{ color: textMuted }}
                >
                  {subtitle}
                </div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Nav ─────────────────────────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: "var(--neu-mobile-nav)",
          backdropFilter: "blur(18px)",
          borderTop: `1px solid ${divider}`,
        }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          {MOBILE_NAV.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-0.5 transition-transform active:scale-90"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span className="text-xl leading-none">{item.emoji}</span>
                <span
                  className="text-[10px] font-bold mt-0.5"
                  style={{ color: isActive ? accent : textMuted }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div
                    className="h-1 w-4 rounded-full mt-0.5"
                    style={{ background: accent }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mobile FAB ───────────────────────────────────────────────────── */}
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
          boxShadow: "var(--neu-fab-shadow)",
        }}
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} /> New Event
      </button>
    </div>
  );
}
