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

// ─── Nav Config ───────────────────────────────────────────────────────────────
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

// ─── Sidebar Inner Content ────────────────────────────────────────────────────
function SidebarContent({ neu, router, pathname, closeMobile }) {
  const {
    dark,
    bg,
    sidebarBg,
    textPrimary,
    textMuted,
    divider,
    accent,
    toggleTheme,
    avatarShadow,
    smallInsetShadow,
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
            dark={dark}
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
        {/* Theme toggle card */}
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

        {/* User card */}
        <NeumorphicCard dark={dark} className="p-3.5">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-extrabold shrink-0"
              style={{
                color: accent,
                background: sidebarBg,
                boxShadow: smallInsetShadow,
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

// ─── DashboardLayout ──────────────────────────────────────────────────────────
export default function DashboardLayout({ children, title, subtitle }) {
  const router = useRouter();
  const pathname = usePathname();
  const neu = useNeu();
  const {
    dark,
    bg,
    sidebarBg,
    textPrimary,
    textMuted,
    divider,
    accent,
    accentSoft,
    toggleTheme,
    avatarShadow,
  } = neu;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CSS injected once per layout render — keeps neumorphic global styles DRY
  const globalCss = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif !important; }
    html, body { margin: 0; padding: 0; }
    ::-webkit-scrollbar       { width: 6px; height: 6px; }
    ::-webkit-scrollbar-thumb { background: ${dark ? "#3a4352" : "#c6d0dc"}; border-radius: 999px; }
    ::-webkit-scrollbar-track { background: transparent; }

    .neu-input {
      width: 100%; border: none; outline: none; display: block;
      padding: 10px 40px 10px 40px; border-radius: 16px;
      background: ${dark ? "#23272f" : "#e9eef5"};
      color: ${textPrimary}; font-size: 14px; font-weight: 500;
      box-shadow: ${
        dark
          ? "inset 6px 6px 12px rgba(10,12,16,0.55), inset -6px -6px 12px rgba(66,74,90,0.18)"
          : "inset 6px 6px 12px rgba(163,177,198,0.4), inset -6px -6px 12px rgba(255,255,255,0.95)"
      };
    }
    .neu-input::placeholder { color: ${textMuted}; }
    .neu-input-bare {
      width: 100%; border: none; outline: none; display: block;
      padding: 10px 16px; border-radius: 16px;
      background: ${dark ? "#23272f" : "#e9eef5"};
      color: ${textPrimary}; font-size: 14px; font-weight: 500;
      box-shadow: ${
        dark
          ? "inset 6px 6px 12px rgba(10,12,16,0.55), inset -6px -6px 12px rgba(66,74,90,0.18)"
          : "inset 6px 6px 12px rgba(163,177,198,0.4), inset -6px -6px 12px rgba(255,255,255,0.95)"
      };
    }
    .neu-input-bare::placeholder { color: ${textMuted}; }
    .neu-textarea {
      width: 100%; border: none; outline: none; resize: none; display: block;
      padding: 12px 14px; border-radius: 18px;
      background: ${dark ? "#23272f" : "#e9eef5"};
      color: ${textPrimary}; font-size: 14px; font-weight: 500;
      box-shadow: ${
        dark
          ? "inset 6px 6px 12px rgba(10,12,16,0.55), inset -6px -6px 12px rgba(66,74,90,0.18)"
          : "inset 6px 6px 12px rgba(163,177,198,0.4), inset -6px -6px 12px rgba(255,255,255,0.95)"
      };
    }
    .neu-textarea::placeholder { color: ${textMuted}; }

    @keyframes soft-float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-2px); }
    }
    .soft-float { animation: soft-float 2.8s ease-in-out infinite; }

    @keyframes slide-up {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .slide-up { animation: slide-up 0.2s ease-out; }

    .neu-row-hover:hover { background: ${dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.5)"} !important; }
  `;

  return (
    <>
      <style>{globalCss}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: bg,
          transition: "background 0.3s ease",
        }}
      >
        {/* ── Desktop Sidebar ───────────────────────────────────────────── */}
        <aside
          className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 h-screen sticky top-0 z-20"
          style={{ background: sidebarBg, borderRight: `1px solid ${divider}` }}
        >
          {/* Logo */}
          <div className="px-5 pt-6 pb-4">
            <NeumorphicCard dark={dark} className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0"
                  style={{
                    color: accent,
                    background: sidebarBg,
                    boxShadow: avatarShadow,
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

        {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(15,23,42,0.35)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
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
                          boxShadow: avatarShadow,
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
                neu={neu}
                router={router}
                pathname={pathname}
                closeMobile={() => setMobileMenuOpen(false)}
              />
            </aside>
          </div>
        )}

        {/* ── Main Column ───────────────────────────────────────────────── */}
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
            {/* Mobile: hamburger + brand */}
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

            {/* Desktop: page title */}
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

            {/* Right: theme, bell, CTA */}
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
            {/* Mobile page title */}
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
      </div>

      {/* ── Mobile Bottom Nav ──────────────────────────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: dark ? "rgba(27,31,39,0.95)" : "rgba(233,238,245,0.96)",
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

      {/* ── Mobile FAB ─────────────────────────────────────────────────────── */}
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
        <Plus className="h-5 w-5" strokeWidth={2.5} /> New Event
      </button>
    </>
  );
}
