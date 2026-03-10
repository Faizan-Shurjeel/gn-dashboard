"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  UserCheck,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  Users,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react";

const clientsData = [
  {
    id: 1,
    name: "Ahmed Raza",
    phone: "+92 300 1234567",
    email: "ahmed.raza@gmail.com",
    event: "Wedding Reception",
    eventDate: "Dec 28, 2024",
    guests: 350,
    totalAmount: 485000,
    amountPaid: 250000,
    status: "Partial",
    payments: [
      { date: "Nov 15, 2024", amount: 150000, note: "Advance payment" },
      { date: "Dec 01, 2024", amount: 100000, note: "2nd installment" },
    ],
  },
  {
    id: 2,
    name: "Sara Malik",
    phone: "+92 321 9876543",
    email: "sara.malik@yahoo.com",
    event: "Birthday Gala",
    eventDate: "Jan 2, 2025",
    guests: 120,
    totalAmount: 185000,
    amountPaid: 185000,
    status: "Paid",
    payments: [
      { date: "Dec 10, 2024", amount: 100000, note: "Full advance" },
      { date: "Dec 28, 2024", amount: 85000, note: "Final payment" },
    ],
  },
  {
    id: 3,
    name: "TechPak Pvt Ltd",
    phone: "+92 51 2345678",
    email: "events@techpak.com",
    event: "Corporate Summit",
    eventDate: "Jan 15, 2025",
    guests: 500,
    totalAmount: 920000,
    amountPaid: 0,
    status: "Pending",
    payments: [],
  },
  {
    id: 4,
    name: "Usman & Fatima",
    phone: "+92 333 5551234",
    email: "usman.f@outlook.com",
    event: "Walima Ceremony",
    eventDate: "Dec 30, 2024",
    guests: 200,
    totalAmount: 310000,
    amountPaid: 200000,
    status: "Partial",
    payments: [
      { date: "Nov 20, 2024", amount: 100000, note: "Booking token" },
      { date: "Dec 15, 2024", amount: 100000, note: "Mid payment" },
    ],
  },
  {
    id: 5,
    name: "Hina Baig",
    phone: "+92 312 7778899",
    email: "hina.baig@gmail.com",
    event: "Mehndi Night",
    eventDate: "Dec 26, 2024",
    guests: 80,
    totalAmount: 95000,
    amountPaid: 95000,
    status: "Paid",
    payments: [
      { date: "Dec 20, 2024", amount: 95000, note: "Full payment" },
    ],
  },
];

const statusConfig = {
  Paid: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  Partial: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  Pending: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
};

export default function Clients() {
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = clientsData.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.event.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPending = clientsData.reduce((sum, c) => sum + (c.totalAmount - c.amountPaid), 0);
  const totalReceived = clientsData.reduce((sum, c) => sum + c.amountPaid, 0);
  const totalClients = clientsData.length;

  return (
    <DashboardLayout>
      <div className="space-y-4 lg:space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Clients</h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">B2C</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">GN to Client payment tracking</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Clients</div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{totalClients}</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Received</div>
                <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  {totalReceived.toLocaleString()} <span className="text-sm font-normal">PKR</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Pending Balance</div>
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  {totalPending.toLocaleString()} <span className="text-sm font-normal">PKR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search client or event..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div className="flex gap-2">
            {["All","Pending","Partial","Paid"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterStatus === s
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Clients List */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            <div className="col-span-3">Client</div>
            <div className="col-span-2">Event</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-2 text-right">Paid</div>
            <div className="col-span-2 text-right">Balance</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map(client => {
              const balance = client.totalAmount - client.amountPaid;
              const pctPaid = Math.round((client.amountPaid / client.totalAmount) * 100);
              const isExpanded = expandedId === client.id;
              const StatusIcon = statusConfig[client.status].icon;

              return (
                <div key={client.id}>
                  {/* Row */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : client.id)}
                    className="grid grid-cols-12 gap-2 items-center px-4 py-3 lg:py-4 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="col-span-10 md:col-span-3 flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                        {client.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{client.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {client.eventDate}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block col-span-2 min-w-0">
                      <div className="text-sm text-gray-700 dark:text-gray-300 truncate">{client.event}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Users className="h-3 w-3" /> {client.guests} guests
                      </div>
                    </div>

                    <div className="hidden md:block col-span-2 text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{client.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">PKR</div>
                    </div>

                    <div className="hidden md:block col-span-2 text-right">
                      <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{client.amountPaid.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">PKR</div>
                    </div>

                    <div className="hidden md:block col-span-2 text-right">
                      <div className={`text-sm font-bold ${balance > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {balance > 0 ? balance.toLocaleString() : "—"}
                      </div>
                      {balance > 0 && <div className="text-xs text-gray-400">PKR</div>}
                    </div>

                    <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center items-center gap-1">
                      <span className={`hidden md:inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${statusConfig[client.status].color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {client.status}
                      </span>
                      {isExpanded
                        ? <ChevronUp className="h-4 w-4 text-gray-400 ml-1" />
                        : <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                      }
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Client Info */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Client Details</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              {client.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              {client.event} — {client.eventDate}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              {client.guests} guests
                            </div>
                          </div>

                          {/* Payment progress */}
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>Payment Progress</span>
                              <span>{pctPaid}% paid</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all"
                                style={{ width: `${pctPaid}%` }}
                              />
                            </div>
                            <div className="flex justify-between mt-2 text-xs font-semibold">
                              <span className="text-emerald-600 dark:text-emerald-400">Paid: {client.amountPaid.toLocaleString()} PKR</span>
                              <span className="text-red-600 dark:text-red-400">Left: {(client.totalAmount - client.amountPaid).toLocaleString()} PKR</span>
                            </div>
                          </div>
                        </div>

                        {/* Payment History */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Payment History</h3>
                          {client.payments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-24 text-sm text-gray-400 dark:text-gray-600">
                              <AlertCircle className="h-6 w-6 mb-1" />
                              No payments recorded
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {client.payments.map((p, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2">
                                  <div>
                                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{p.note}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{p.date}</div>
                                  </div>
                                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    +{p.amount.toLocaleString()}
                                  </div>
                                </div>
                              ))}
                              <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-sm font-bold">
                                <span className="text-gray-700 dark:text-gray-300">Total Invoice</span>
                                <span className="text-gray-900 dark:text-gray-100">{client.totalAmount.toLocaleString()} PKR</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-600">
                No clients match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
