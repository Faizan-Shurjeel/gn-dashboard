"use client";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

// ─── Theme hook ───────────────────────────────────────────────────────────────
export function useNeu() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  const bg = dark ? "#1b1f27" : "#e9eef5";
  const cardBg = dark ? "#23272f" : "#e9eef5";
  const sidebarBg = dark ? "#20242c" : "#e9eef5";

  return {
    dark,
    toggleTheme,
    bg,
    cardBg,
    sidebarBg,
    textPrimary: dark ? "#eef4ff" : "#1f2937",
    textMuted: dark ? "#94a3b8" : "#64748b",
    divider: dark ? "rgba(148,163,184,0.12)" : "rgba(100,116,139,0.12)",
    accent: dark ? "#7dd3fc" : "#2563eb",
    accentSoft: dark ? "#172554" : "#dbeafe",
    warning: dark ? "#fbbf24" : "#d97706",
    success: dark ? "#4ade80" : "#15803d",
    danger: dark ? "#f87171" : "#dc2626",

    raisedShadow: dark
      ? "8px 8px 18px rgba(10,12,16,0.55), -8px -8px 18px rgba(66,74,90,0.26)"
      : "8px 8px 18px rgba(163,177,198,0.55), -8px -8px 18px rgba(255,255,255,0.95)",

    insetShadow: dark
      ? "inset 6px 6px 12px rgba(10,12,16,0.55), inset -6px -6px 12px rgba(66,74,90,0.18)"
      : "inset 6px 6px 12px rgba(163,177,198,0.45), inset -6px -6px 12px rgba(255,255,255,0.9)",

    softShadow: dark
      ? "6px 6px 12px rgba(10,12,16,0.5), -6px -6px 12px rgba(66,74,90,0.2)"
      : "6px 6px 12px rgba(163,177,198,0.45), -6px -6px 12px rgba(255,255,255,0.9)",

    iconInsetShadow: dark
      ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.16)"
      : "inset 5px 5px 10px rgba(163,177,198,0.38), inset -5px -5px 10px rgba(255,255,255,0.95)",

    smallInsetShadow: dark
      ? "inset 4px 4px 8px rgba(10,12,16,0.45), inset -4px -4px 8px rgba(66,74,90,0.15)"
      : "inset 4px 4px 8px rgba(163,177,198,0.32), inset -4px -4px 8px rgba(255,255,255,0.95)",

    avatarShadow: dark
      ? "inset 5px 5px 10px rgba(10,12,16,0.55), inset -5px -5px 10px rgba(66,74,90,0.18)"
      : "inset 5px 5px 10px rgba(163,177,198,0.4), inset -5px -5px 10px rgba(255,255,255,0.95)",
  };
}

// ─── NeumorphicCard ───────────────────────────────────────────────────────────
export function NeumorphicCard({
  children,
  className = "",
  onClick,
  style: extraStyle = {},
  dark,
}) {
  const [pressed, setPressed] = useState(false);

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
      className={`relative rounded-[28px] transition-all duration-150 ease-out ${
        onClick ? "cursor-pointer select-none" : ""
      } ${className}`}
      style={{
        background: dark ? "#23272f" : "#e9eef5",
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

// ─── SoftIconButton ───────────────────────────────────────────────────────────
export function SoftIconButton({
  children,
  onClick,
  dark,
  className = "",
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center transition-all active:scale-95 ${className}`}
      style={{
        background: dark ? "#23272f" : "#e9eef5",
        color: dark ? "#aab4c8" : "#5d6b82",
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

// ─── NeuNavItem ───────────────────────────────────────────────────────────────
export function NeuNavItem({
  icon: Icon,
  label,
  active,
  onClick,
  dark,
  badge,
}) {
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

// ─── NeuBadge ─────────────────────────────────────────────────────────────────
export function NeuBadge({ children, color, bg }) {
  return (
    <span
      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  );
}

// ─── NeuStatusDot ─────────────────────────────────────────────────────────────
// Matches statusConfig used on clients/vendors pages
export const STATUS_CFG = {
  Paid: {
    color: (dark) => (dark ? "#4ade80" : "#15803d"),
    bgStr: (dark) => (dark ? "rgba(74,222,128,0.15)" : "rgba(21,128,61,0.1)"),
  },
  Partial: {
    color: (dark) => (dark ? "#fbbf24" : "#d97706"),
    bgStr: (dark) => (dark ? "rgba(251,191,36,0.15)" : "rgba(217,119,6,0.1)"),
  },
  Pending: {
    color: (dark) => (dark ? "#f87171" : "#dc2626"),
    bgStr: (dark) => (dark ? "rgba(248,113,113,0.15)" : "rgba(220,38,38,0.1)"),
  },
};
