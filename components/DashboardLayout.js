"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Users,
  DollarSign,
  Settings,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  UserCheck,
  Truck,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { key: "/", icon: LayoutDashboard, label: "Dashboard" },
    { key: "/events", icon: Calendar, label: "Events" },
    { key: "/inventory", icon: Package, label: "Inventory" },
    { key: "/staff", icon: Users, label: "Staff" },
    { key: "/finance", icon: DollarSign, label: "Finance" },
    { key: "/settings", icon: Settings, label: "Settings" },
  ];

  const b2cB2bItems = [
    { key: "/clients", icon: UserCheck, label: "Clients", tag: "B2C" },
    { key: "/vendors", icon: Truck, label: "Vendors", tag: "B2B" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
      `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-4 lg:px-6 lg:py-5">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity"
            >
              <svg className="h-10 w-10 lg:h-12 lg:w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="10" fill="url(#gradient)" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0d9488" />
                    <stop offset="1" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <text x="24" y="32" fontFamily="serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">GN</text>
              </svg>
              <div>
                <div className="text-base lg:text-lg font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">GN Caterers</div>
                <div className="text-xs text-gray-500">Management System</div>
              </div>
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { router.push(item.key); setSidebarOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 lg:py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-50 to-teal-50/50 dark:from-teal-900/20 dark:to-teal-900/10 text-teal-700 dark:text-teal-400 shadow-sm"
                      : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}

            {/* B2C / B2B divider */}
            <div className="pt-3 pb-1">
              <div className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-1">
                Payments
              </div>
            </div>

            {b2cB2bItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { router.push(item.key); setSidebarOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 lg:py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-50 to-teal-50/50 dark:from-teal-900/20 dark:to-teal-900/10 text-teal-700 dark:text-teal-400 shadow-sm"
                      : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    item.tag === "B2C"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400"
                  }`}>
                    {item.tag}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle & User Profile */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 p-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-md">
                MC
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">Marcus Chen</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Admin Account</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 lg:px-6 py-3 lg:py-4 shadow-sm">
          <div className="flex items-center gap-3 lg:gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative flex-1 max-w-md lg:max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm dark:text-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3 ml-2">
            <button className="relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-xs font-bold text-white shadow-md">3</span>
            </button>
            <button
              onClick={() => router.push("/new-event")}
              className="hidden sm:flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-2 text-sm font-semibold text-white hover:from-teal-700 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">New Event</span>
            </button>
            {pathname !== "/new-event" && (
              <button
                onClick={() => router.push("/new-event")}
                className="sm:hidden fixed bottom-6 right-6 z-30 flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="h-6 w-6" />
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
