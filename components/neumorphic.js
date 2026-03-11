"use client";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

// ─── useNeu ───────────────────────────────────────────────────────────────────
// All color/shadow values are CSS custom property references — identical strings
// on server and client. Never put `dark ? x : y` in a style prop.
export function useNeu() {
  const { toggleTheme } = useTheme();

  return {
    toggleTheme,
    bg: "var(--neu-bg)",
    cardBg: "var(--neu-card-bg)",
    sidebarBg: "var(--neu-sidebar-bg)",
    textPrimary: "var(--neu-text-primary)",
    textMuted: "var(--neu-text-muted)",
    accent: "var(--neu-accent)",
    accentSoft: "var(--neu-accent-soft)",
    warning: "var(--neu-warning)",
    success: "var(--neu-success)",
    danger: "var(--neu-danger)",
    purple: "var(--neu-purple)",
    purpleIcon: "var(--neu-purple-icon)",
    divider: "var(--neu-divider)",
    raisedShadow: "var(--neu-raised)",
    insetShadow: "var(--neu-pressed)",
    softShadow: "var(--neu-soft)",
    iconInset: "var(--neu-icon-inset)",
    smallInset: "var(--neu-small-inset)",
    avatarShadow: "var(--neu-avatar)",
  };
}

// ─── NeumorphicCard ───────────────────────────────────────────────────────────
export function NeumorphicCard({
  children,
  className = "",
  onClick,
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
      className={`neu-card relative rounded-[28px] transition-all duration-150 ease-out ${onClick ? "cursor-pointer select-none" : ""} ${className}`}
      style={{
        boxShadow: pressed ? "var(--neu-pressed)" : "var(--neu-raised)",
        transform: pressed
          ? "translateY(1px) scale(0.99)"
          : "translateY(0px) scale(1)",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

// ─── SoftIconButton ───────────────────────────────────────────────────────────
export function SoftIconButton({
  children,
  onClick,
  className = "",
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center transition-all active:scale-95 ${className}`}
      style={{
        background: "var(--neu-card-bg)",
        color: "var(--neu-text-muted)",
        boxShadow: "var(--neu-soft)",
        border: "none",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── NeuNavItem ───────────────────────────────────────────────────────────────
export function NeuNavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`neu-nav-btn w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all ${active ? "active" : ""}`}
      style={
        active
          ? {
              color: "var(--neu-accent)",
              background: "var(--neu-card-bg)",
              boxShadow: "var(--neu-active-nav)",
            }
          : { color: "var(--neu-nav-inactive)", background: "transparent" }
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className="min-w-5 h-5 px-1 rounded-full text-[10px] font-extrabold flex items-center justify-center"
          style={
            active
              ? {
                  background: "var(--neu-accent-soft)",
                  color: "var(--neu-accent)",
                }
              : {
                  background: "var(--neu-card-bg)",
                  color: "var(--neu-text-muted)",
                }
          }
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── STATUS_CFG (CSS var strings, same on server + client) ───────────────────
export const STATUS_CFG = {
  Paid: { color: "var(--neu-paid-color)", bgStr: "var(--neu-paid-bg)" },
  Partial: {
    color: "var(--neu-partial-color)",
    bgStr: "var(--neu-partial-bg)",
  },
  Pending: {
    color: "var(--neu-pending-color)",
    bgStr: "var(--neu-pending-bg)",
  },
};
