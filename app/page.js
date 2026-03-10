"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Plus,
  Trash2,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: 1,
      text: "Called Ahmed re: wedding catering. Confirmed 200 guests. Need to finalize menu by Friday.",
      timestamp: "Today, 9:14 AM",
    },
    {
      id: 2,
      text: "Zia vendor payment pending — Rs. 45,000. Follow up end of week.",
      timestamp: "Yesterday, 3:42 PM",
    },
    {
      id: 3,
      text: "New corporate inquiry from TechPak — 500 pax, Jan 15th. Send quote.",
      timestamp: "Mar 9, 11:00 AM",
    },
  ]);
  const [newNote, setNewNote] = useState("");

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const eventDays = [5, 12, 18, 25, 28];
  const todayDay = today.getMonth() === currentMonth && today.getFullYear() === currentYear ? today.getDate() : null;

  const recentEvents = [
    { name: "Corporate Gala 2024", date: "Dec 28, 2024", guests: 250, status: "Confirmed" },
    { name: "Winter Wedding - Smith", date: "Dec 30, 2024", guests: 180, status: "Planning" },
    { name: "New Year Tech Summit", date: "Jan 2, 2025", guests: 500, status: "Confirmed" },
  ];

  const addNote = () => {
    if (!newNote.trim()) return;
    const now = new Date();
    const timestamp = `Today, ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
    setDiaryEntries(prev => [{ id: Date.now(), text: newNote.trim(), timestamp }, ...prev]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    setDiaryEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">

        {/* LEFT: Calendar + Recent Events + Revenue + Distribution */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">

          {/* Event Calendar */}
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-semibold text-white">Event Calendar</h2>
              <div className="flex items-center gap-1 lg:gap-2">
                <button onClick={prevMonth} className="p-1 lg:p-1.5 hover:bg-teal-700 rounded-lg transition-colors">
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                <div className="text-xs lg:text-sm font-medium text-white px-2 lg:px-3 min-w-[100px] text-center">
                  {monthNames[currentMonth]} {currentYear}
                </div>
                <button onClick={nextMonth} className="p-1 lg:p-1.5 hover:bg-teal-700 rounded-lg transition-colors">
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
            <div className="p-3 lg:p-6">
              <div className="grid grid-cols-7 gap-1 lg:gap-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 lg:mb-3">
                {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1 lg:gap-2">
                {Array.from({ length: firstDay }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const hasEvent = eventDays.includes(day);
                  const isToday = todayDay === day;
                  return (
                    <button
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-md lg:rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                        isToday
                          ? "bg-teal-600 text-white font-bold shadow-md"
                          : hasEvent
                            ? "bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:hover:bg-teal-900/50"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="mb-3 lg:mb-4 flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Events</h2>
              <button className="text-xs lg:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
                View All →
              </button>
            </div>
            <div className="space-y-2 lg:space-y-3">
              {recentEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-gray-100 dark:border-gray-700 p-3 lg:p-4 hover:border-teal-200 dark:hover:border-teal-800 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-gray-200 text-sm truncate">{event.name}</div>
                    <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{event.date} · {event.guests} guests</div>
                  </div>
                  <span className={`self-start sm:self-center rounded-full px-2 lg:px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                    event.status === "Confirmed"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Revenue + Event Distribution */}
          <div className="grid gap-4 lg:gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-xl bg-white dark:bg-gray-900 p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="mb-3 lg:mb-4 flex items-center justify-between">
                <h2 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100">Monthly Revenue</h2>
                <select className="rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 px-2 py-1.5 text-xs font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                  <option>Last 6 Months</option>
                  <option>Last 12 Months</option>
                </select>
              </div>
              <div className="h-40 lg:h-52 flex items-end gap-2 lg:gap-3">
                {[65, 78, 85, 72, 90, 88].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-md shadow-sm" style={{ height: `${height}%` }} />
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {["Jul","Aug","Sep","Oct","Nov","Dec"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-gray-900 p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="mb-3 text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100">Distribution</h2>
              <div className="mb-4 flex h-28 items-center justify-center">
                <div className="relative h-28 w-28">
                  <svg className="h-full w-full -rotate-90">
                    <circle cx="56" cy="56" r="48" className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="14" fill="none" />
                    <circle cx="56" cy="56" r="48" stroke="#0d9488" strokeWidth="14" fill="none" strokeDasharray={`${2*Math.PI*48*0.45} ${2*Math.PI*48}`} />
                    <circle cx="56" cy="56" r="48" stroke="#14b8a6" strokeWidth="14" fill="none" strokeDasharray={`${2*Math.PI*48*0.35} ${2*Math.PI*48}`} strokeDashoffset={`${-2*Math.PI*48*0.45}`} />
                    <circle cx="56" cy="56" r="48" stroke="#5eead4" strokeWidth="14" fill="none" strokeDasharray={`${2*Math.PI*48*0.2} ${2*Math.PI*48}`} strokeDashoffset={`${-2*Math.PI*48*0.8}`} />
                  </svg>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                {[["bg-teal-700","Wedding","45%"],["bg-teal-500","Corporate","35%"],["bg-teal-300","Private","20%"]].map(([color, label, pct]) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
                      <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Diary + Inventory Alerts */}
        <div className="space-y-4 lg:space-y-6">

          {/* Diary */}
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-white" />
              <h2 className="text-sm font-semibold text-white">Diary</h2>
            </div>

            {/* Add note input */}
            <div className="p-3 border-b border-gray-100 dark:border-gray-800">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) addNote(); }}
                placeholder="Write a note... (Ctrl+Enter to save)"
                rows={3}
                className="w-full text-sm resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
              <button
                onClick={addNote}
                disabled={!newNote.trim()}
                className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold py-2 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Note
              </button>
            </div>

            {/* Notes list */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-96 overflow-y-auto">
              {diaryEntries.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-600">No notes yet</div>
              ) : (
                diaryEntries.map((entry) => (
                  <div key={entry.id} className="group px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{entry.text}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                        <Clock className="h-3 w-3" />
                        {entry.timestamp}
                      </span>
                      <button
                        onClick={() => deleteNote(entry.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 p-4 lg:p-6 shadow-sm border border-amber-200 dark:border-amber-900/50">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
              <h2 className="text-base font-semibold text-amber-900 dark:text-amber-100">Inventory Alerts</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="rounded-lg bg-white dark:bg-gray-900 p-3 text-amber-900 dark:text-amber-100 shadow-sm">
                <div className="font-semibold text-xs">Premium Napkins (White)</div>
                <div className="text-amber-700 dark:text-amber-400 text-xs mt-0.5">12 left — Restock needed</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-gray-900 p-3 text-amber-900 dark:text-amber-100 shadow-sm">
                <div className="font-semibold text-xs">Chardonnay (Vintage 2018)</div>
                <div className="text-amber-700 dark:text-amber-400 text-xs mt-0.5">4 bottles — Low stock</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
