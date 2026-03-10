"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Truck,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Utensils,
  Lightbulb,
  Sparkles,
  Package,
  MoreHorizontal,
} from "lucide-react";

const departmentConfig = {
  Food: { icon: Utensils, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  Lights: { icon: Lightbulb, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  Decor: { icon: Sparkles, color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" },
  Equipment: { icon: Package, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  Other: { icon: MoreHorizontal, color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" },
};

const vendorsData = [
  {
    id: 1,
    name: "Zia Catering Supplies",
    contactPerson: "Muhammad Zia",
    phone: "+92 300 1112222",
    email: "zia@ziacatering.pk",
    department: "Food",
    services: "Raw ingredients, dry goods, spices",
    totalAmount: 180000,
    amountPaid: 135000,
    status: "Partial",
    payments: [
      { date: "Nov 28, 2024", amount: 75000, note: "Advance for December stock" },
      { date: "Dec 10, 2024", amount: 60000, note: "Mid-month supplies" },
    ],
  },
  {
    id: 2,
    name: "Pathn Lighting Co.",
    contactPerson: "Khalid Pathni",
    phone: "+92 321 4445555",
    email: "info@pathn.pk",
    department: "Lights",
    services: "LED setups, stage lighting, fairy lights",
    totalAmount: 95000,
    amountPaid: 95000,
    status: "Paid",
    payments: [
      { date: "Dec 20, 2024", amount: 50000, note: "Advance" },
      { date: "Dec 28, 2024", amount: 45000, note: "Final clearance" },
    ],
  },
  {
    id: 3,
    name: "Royal Decor Studio",
    contactPerson: "Asif Khan",
    phone: "+92 333 7778888",
    email: "asif@royaldecor.pk",
    department: "Decor",
    services: "Floral arrangements, stage backdrop, table décor",
    totalAmount: 220000,
    amountPaid: 0,
    status: "Pending",
    payments: [],
  },
  {
    id: 4,
    name: "Prime Tent & Equipment",
    contactPerson: "Nasir Ali",
    phone: "+92 311 0001111",
    email: "nasir@primeequip.pk",
    department: "Equipment",
    services: "Tents, chairs, tables, crockery rental",
    totalAmount: 145000,
    amountPaid: 80000,
    status: "Partial",
    payments: [
      { date: "Dec 05, 2024", amount: 80000, note: "Equipment deposit" },
    ],
  },
  {
    id: 5,
    name: "Fresh Farms Lahore",
    contactPerson: "Imran Baig",
    phone: "+92 300 6667777",
    email: "imran@freshfarms.pk",
    department: "Food",
    services: "Fresh vegetables, dairy, poultry",
    totalAmount: 65000,
    amountPaid: 65000,
    status: "Paid",
    payments: [
      { date: "Dec 27, 2024", amount: 65000, note: "Full payment on delivery" },
    ],
  },
];

const statusConfig = {
  Paid: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  Partial: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  Pending: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
};

export default function Vendors() {
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = vendorsData.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "All" || v.department === filterDept;
    const matchStatus = filterStatus === "All" || v.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const totalPayable = vendorsData.reduce((sum, v) => sum + v.totalAmount, 0);
  const totalPaid = vendorsData.reduce((sum, v) => sum + v.amountPaid, 0);
  const totalBalance = totalPayable - totalPaid;

  const departments = ["All", ...Object.keys(departmentConfig)];

  return (
    <DashboardLayout>
      <div className="space-y-4 lg:space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Vendors</h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">B2B</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">GN to Vendor payment tracking</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Payable</div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {totalPayable.toLocaleString()} <span className="text-sm font-normal">PKR</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Paid</div>
                <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  {totalPaid.toLocaleString()} <span className="text-sm font-normal">PKR</span>
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
                <div className="text-xs text-gray-500 dark:text-gray-400">Outstanding</div>
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  {totalBalance.toLocaleString()} <span className="text-sm font-normal">PKR</span>
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
              placeholder="Search vendor or contact..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          {/* Department filter */}
          <div className="flex gap-1.5 flex-wrap">
            {departments.map(dept => {
              const cfg = departmentConfig[dept];
              const DeptIcon = cfg?.icon;
              return (
                <button
                  key={dept}
                  onClick={() => setFilterDept(dept)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterDept === dept
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-300"
                  }`}
                >
                  {DeptIcon && <DeptIcon className="h-3 w-3" />}
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Status filter */}
          <div className="flex gap-1.5">
            {["All","Pending","Partial","Paid"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterStatus === s
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-purple-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Vendors List */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            <div className="col-span-3">Vendor</div>
            <div className="col-span-2">Department</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-2 text-right">Paid</div>
            <div className="col-span-2 text-right">Balance</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map(vendor => {
              const balance = vendor.totalAmount - vendor.amountPaid;
              const pctPaid = Math.round((vendor.amountPaid / vendor.totalAmount) * 100);
              const isExpanded = expandedId === vendor.id;
              const StatusIcon = statusConfig[vendor.status].icon;
              const deptCfg = departmentConfig[vendor.department];
              const DeptIcon = deptCfg?.icon;

              return (
                <div key={vendor.id}>
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : vendor.id)}
                    className="grid grid-cols-12 gap-2 items-center px-4 py-3 lg:py-4 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="col-span-10 md:col-span-3 flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                        {vendor.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{vendor.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{vendor.contactPerson}</div>
                      </div>
                    </div>

                    <div className="hidden md:flex col-span-2 items-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${deptCfg?.color}`}>
                        {DeptIcon && <DeptIcon className="h-3 w-3" />}
                        {vendor.department}
                      </span>
                    </div>

                    <div className="hidden md:block col-span-2 text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{vendor.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">PKR</div>
                    </div>

                    <div className="hidden md:block col-span-2 text-right">
                      <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{vendor.amountPaid.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">PKR</div>
                    </div>

                    <div className="hidden md:block col-span-2 text-right">
                      <div className={`text-sm font-bold ${balance > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {balance > 0 ? balance.toLocaleString() : "—"}
                      </div>
                      {balance > 0 && <div className="text-xs text-gray-400">PKR</div>}
                    </div>

                    <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center items-center gap-1">
                      <span className={`hidden md:inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${statusConfig[vendor.status].color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {vendor.status}
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
                        {/* Vendor Info */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Vendor Details</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              {vendor.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              {vendor.email}
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Package className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span>{vendor.services}</span>
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
                                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all"
                                style={{ width: `${pctPaid}%` }}
                              />
                            </div>
                            <div className="flex justify-between mt-2 text-xs font-semibold">
                              <span className="text-emerald-600 dark:text-emerald-400">Paid: {vendor.amountPaid.toLocaleString()} PKR</span>
                              <span className="text-red-600 dark:text-red-400">Due: {(vendor.totalAmount - vendor.amountPaid).toLocaleString()} PKR</span>
                            </div>
                          </div>
                        </div>

                        {/* Payment History */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Payment History</h3>
                          {vendor.payments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-24 text-sm text-gray-400 dark:text-gray-600">
                              <AlertCircle className="h-6 w-6 mb-1" />
                              No payments made yet
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {vendor.payments.map((p, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2">
                                  <div>
                                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{p.note}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{p.date}</div>
                                  </div>
                                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    {p.amount.toLocaleString()}
                                  </div>
                                </div>
                              ))}
                              <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-sm font-bold">
                                <span className="text-gray-700 dark:text-gray-300">Total Due</span>
                                <span className="text-gray-900 dark:text-gray-100">{vendor.totalAmount.toLocaleString()} PKR</span>
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
                No vendors match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
