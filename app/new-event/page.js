"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  User,
  Phone,
  MapPin,
  CalendarDays,
  Users,
  FileText,
  Utensils,
  Lightbulb,
  Package,
  Sparkles,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  ShoppingBag,
  Check,
  Edit2,
  Receipt,
  FileCheck,
  Hash,
  ClipboardList,
} from "lucide-react";

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const CLIENT_SUGGESTIONS = [
  "Ahmed Khan",
  "Sara Malik",
  "Bilal Hassan",
  "Fatima Noor",
  "Usman Tariq",
  "Nadia Iqbal",
  "Zara Ahmed",
  "Hassan Raza",
  "Ayesha Siddiqui",
  "Omar Sheikh",
];

const EVENT_TYPES = [
  "Wedding",
  "Walima",
  "Mehndi",
  "Engagement",
  "Corporate",
  "Birthday",
  "Nikah",
  "Baarat",
  "Other",
];

const REFERRAL_SOURCES = [
  "Walk-in",
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Existing Client",
  "Staff Referral",
  "Website",
  "Other",
];

const MENU_PACKAGES = [
  {
    id: "silver",
    name: "Silver Menu",
    pricePerHead: 1500,
    desc: "Standard event menu — ideal for corporate & casual events",
    items: [
      "Chicken Malai Boti",
      "Pulao (Yakhni)",
      "Live Naan",
      "Raita",
      "Green Salad",
      "Cold Drink",
      "Gulab Jamun",
    ],
  },
  {
    id: "gold",
    name: "Gold Menu",
    pricePerHead: 2000,
    desc: "Premium spread — great for weddings & engagements",
    items: [
      "Chicken Karahi",
      "Chicken Korma",
      "Zeera Rice",
      "Live Naan",
      "Raita",
      "Russian Salad",
      "Kheer",
      "Cold Drink",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Menu",
    pricePerHead: 2800,
    desc: "Luxury catering — walima, elite weddings",
    items: [
      "Mutton Karahi",
      "Butter Chicken",
      "Chicken Biryani",
      "Live Naan",
      "Raita",
      "Russian Salad",
      "Firni",
      "Jalebi",
      "Cold Drink",
      "Mineral Water",
    ],
  },
  {
    id: "bbq",
    name: "BBQ Menu",
    pricePerHead: 2200,
    desc: "BBQ night special — birthdays, mehndi, casual",
    items: [
      "Chicken Tikka",
      "Chicken BBQ",
      "Seekh Kabab",
      "Pulao",
      "Live Naan",
      "Raita",
      "Cold Drink",
    ],
  },
  {
    id: "minimal",
    name: "Minimal Menu",
    pricePerHead: 1200,
    desc: "Budget-friendly — small gatherings",
    items: ["Chicken Karahi", "Live Naan", "Raita", "Cold Drink"],
  },
  {
    id: "pothwari",
    name: "Pothwari Dawat",
    pricePerHead: 1800,
    desc: "Traditional Pothwari-style daig service",
    items: [
      "Chanay (Pothwari)",
      "Mutton Karahi",
      "Zeera Rice",
      "Live Naan",
      "Raita",
      "Gulab Jamun",
      "Tea / Coffee",
    ],
  },
];

const FOOD_CATEGORIES = [
  {
    name: "Starters",
    items: [
      {
        id: "fa_1",
        name: "Finger Fish (Starter)",
        price: 500,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fa_2",
        name: "Chicken Tempura (Starter)",
        price: 400,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fa_3",
        name: "Soup with Fish Crackers",
        price: 200,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fa_4",
        name: "Gol Goppay / Dahi Bhalay / Chana Chaat",
        price: 175,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fa_5",
        name: "Pathuray Chanay Achar Salad / Halwa Puri",
        price: 150,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fa_6",
        name: "Chicken Kabab / Tikka Boti / Malai Boti",
        price: 400,
        unit: "per head",
        perHead: true,
      },
    ],
  },
  {
    name: "Chicken Dishes",
    items: [
      {
        id: "fc_1",
        name: "Chicken Karahi",
        price: 350,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fc_2",
        name: "Chicken Qorma / Tawa Chicken",
        price: 250,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fc_3",
        name: "Butter Chicken",
        price: 300,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fc_4",
        name: "Chicken Stakes with Sauteed Vegetables",
        price: 550,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fc_5",
        name: "Chicken Steam Roast",
        price: 400,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fc_6",
        name: "Chicken Biryani",
        price: 280,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fc_7",
        name: "Chicken Korma",
        price: 280,
        unit: "per head",
        perHead: true,
      },
    ],
  },
  {
    name: "Mutton / Beef",
    items: [
      {
        id: "fm_1",
        name: "Mutton Karahi",
        price: 500,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fm_2",
        name: "Mutton Qorma",
        price: 450,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fm_3",
        name: "Mutton Steam Roast",
        price: 1350,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fm_4",
        name: "Mutton Joint Steam Roast",
        price: 1500,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fm_5",
        name: "Mutton Kunna (Whole Meat)",
        price: 600,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fm_6",
        name: "Whole Lamb with Kabli Pulao (11-13 kg)",
        price: 52000,
        unit: "flat",
        perHead: false,
      },
    ],
  },
  {
    name: "Rice",
    items: [
      {
        id: "fr_1",
        name: "Zeera Rice",
        price: 150,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fr_2",
        name: "Pulao (Yakhni)",
        price: 200,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fr_3",
        name: "Chinese Gravy with Egg Fried Rice",
        price: 400,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fr_4",
        name: "Kashmiri Daal Chawal (Vari Vata)",
        price: 300,
        unit: "per head",
        perHead: true,
      },
    ],
  },
  {
    name: "Breads",
    items: [
      {
        id: "fb_1",
        name: "Live Naan",
        price: 80,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fb_2",
        name: "Tandoori Roti",
        price: 60,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fb_3",
        name: "Paratha",
        price: 70,
        unit: "per head",
        perHead: true,
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        id: "fd_1",
        name: "Kheer / Firni",
        price: 150,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fd_2",
        name: "Kulfa / Trifle",
        price: 180,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fd_3",
        name: "Live Jalebi / Hot Gulab Jamun / Suji Halwa",
        price: 150,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fd_4",
        name: "Gajar Halwa / Petha Halwa",
        price: 200,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fd_5",
        name: "Dessert Bar (16 Varieties)",
        price: 400,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fd_6",
        name: "Chocolate Fountain",
        price: 15000,
        unit: "per unit",
        perHead: false,
      },
    ],
  },
  {
    name: "Beverages",
    items: [
      {
        id: "fv_1",
        name: "Cold Drink Can",
        price: 150,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fv_2",
        name: "Mineral Water",
        price: 80,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fv_3",
        name: "Kashmiri / Black / Kahwa / Green Tea",
        price: 150,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fv_4",
        name: "Mint Margarita & Pina Colada",
        price: 175,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fv_5",
        name: "Mint Margarita, Pina Colada & 2 Seasonal Juices",
        price: 200,
        unit: "per head",
        perHead: true,
      },
    ],
  },
  {
    name: "Sides & Chutneys",
    items: [
      {
        id: "fs_1",
        name: "Fresh Salad",
        price: 100,
        unit: "per head",
        perHead: true,
      },
      { id: "fs_2", name: "Raita", price: 80, unit: "per head", perHead: true },
      {
        id: "fs_3",
        name: "Variety of Salad",
        price: 150,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fs_4",
        name: "Russian Salad",
        price: 120,
        unit: "per head",
        perHead: true,
      },
      {
        id: "fs_5",
        name: "Aloo Bukhara Chutney",
        price: 125,
        unit: "per head",
        perHead: true,
      },
    ],
  },
];

const CATERING_DATA = [
  {
    category: "Setup Packages",
    items: [
      {
        id: "cs_1",
        name: "Dinner Setup",
        price: 300,
        unit: "per person",
        perHead: true,
        desc: "Tables, chairs, crockery, cutlery, waiters, buffet",
      },
      {
        id: "cs_2",
        name: "Premium Setup",
        price: 500,
        unit: "per person",
        perHead: true,
        desc: "Above + table decor, serving dishes, chafing dishes",
      },
      {
        id: "cs_3",
        name: "Dastarkhwan Setup",
        price: 250,
        unit: "per person",
        perHead: true,
        desc: "Traditional floor-seating dastarkhwan arrangement",
      },
    ],
  },
  {
    category: "Staff",
    items: [
      {
        id: "cs_4",
        name: "Head Waiter",
        price: 3000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cs_5",
        name: "Waiter",
        price: 1500,
        unit: "per person",
        perHead: false,
      },
      {
        id: "cs_6",
        name: "Buffet Boy",
        price: 1200,
        unit: "per person",
        perHead: false,
      },
      {
        id: "cs_7",
        name: "Chef (Main)",
        price: 5000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cs_8",
        name: "Assistant Chef",
        price: 3000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
  {
    category: "Furniture & Equipment",
    items: [
      {
        id: "cf_1",
        name: "Round Tables",
        price: 500,
        unit: "per table",
        perHead: false,
      },
      {
        id: "cf_2",
        name: "Banquet Chairs",
        price: 150,
        unit: "per chair",
        perHead: false,
      },
      {
        id: "cf_3",
        name: "VIP Chairs",
        price: 800,
        unit: "per chair",
        perHead: false,
      },
      {
        id: "cf_4",
        name: "Sofa Lounge Set",
        price: 15000,
        unit: "per set",
        perHead: false,
      },
      {
        id: "cf_5",
        name: "Generator (+ Fuel)",
        price: 20000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cf_6",
        name: "Flooring / Carpet",
        price: 8000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cf_7",
        name: "Chafing Dishes",
        price: 500,
        unit: "per dish",
        perHead: false,
      },
      {
        id: "cf_8",
        name: "Serving Trolley",
        price: 2000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
  {
    category: "Live Counters",
    items: [
      {
        id: "cl_1",
        name: "Live Naan Counter",
        price: 8000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cl_2",
        name: "BBQ Live Counter",
        price: 12000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cl_3",
        name: "Dahi Bhalla Counter",
        price: 6000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cl_4",
        name: "Halwa Puri Counter",
        price: 8000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cl_5",
        name: "Chaat Counter",
        price: 6000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "cl_6",
        name: "Juice & Beverages Counter",
        price: 5000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
];

const LIGHTING_DATA = [
  {
    category: "Lighting",
    items: [
      {
        id: "ll_1",
        name: "Standard Lighting Package",
        price: 15000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ll_2",
        name: "LED Canopy Lights",
        price: 12000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ll_3",
        name: "Fairy Lights (50m string)",
        price: 3500,
        unit: "per string",
        perHead: false,
      },
      {
        id: "ll_4",
        name: "Spotlight",
        price: 2000,
        unit: "per unit",
        perHead: false,
      },
      {
        id: "ll_5",
        name: "Chinese Lanterns",
        price: 8000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ll_6",
        name: "LED Wash Lights",
        price: 3000,
        unit: "per unit",
        perHead: false,
      },
      {
        id: "ll_7",
        name: "Moving Head Lights (pair)",
        price: 8000,
        unit: "per pair",
        perHead: false,
      },
      {
        id: "ll_8",
        name: "Laser Light Show",
        price: 12000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
  {
    category: "Stage",
    items: [
      {
        id: "ls_1",
        name: "Basic Stage Setup",
        price: 25000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ls_2",
        name: "Premium Stage with Backdrop",
        price: 50000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ls_3",
        name: "Flower Stage Decoration",
        price: 35000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ls_4",
        name: "LED Stage Backdrop",
        price: 40000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ls_5",
        name: "Stage Flowers (per side)",
        price: 5000,
        unit: "per side",
        perHead: false,
      },
    ],
  },
  {
    category: "Decor",
    items: [
      {
        id: "ld_1",
        name: "Fresh Flower Decor Package",
        price: 30000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ld_2",
        name: "Balloon Decoration",
        price: 8000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ld_3",
        name: "Flower Arrangement (per table)",
        price: 1500,
        unit: "per table",
        perHead: false,
      },
      {
        id: "ld_4",
        name: "Centerpiece (per table)",
        price: 2000,
        unit: "per table",
        perHead: false,
      },
      {
        id: "ld_5",
        name: "Entrance Gate Decoration",
        price: 15000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ld_6",
        name: "Photo Booth Setup",
        price: 20000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ld_7",
        name: "Neon Sign (Custom)",
        price: 8000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ld_8",
        name: "Aisle Decor",
        price: 12000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ld_9",
        name: "Ceiling Draping",
        price: 25000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ld_10",
        name: "Flower Car Decoration",
        price: 12000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
  {
    category: "Structure & Climate",
    items: [
      {
        id: "lstr_1",
        name: "Marquee / Shamiyana",
        price: 35000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "lstr_2",
        name: "Canopy Tent",
        price: 20000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "lstr_3",
        name: "AC Unit",
        price: 8000,
        unit: "per unit",
        perHead: false,
      },
      {
        id: "lstr_4",
        name: "Heater",
        price: 5000,
        unit: "per unit",
        perHead: false,
      },
      {
        id: "lstr_5",
        name: "Exhaust Fan",
        price: 2000,
        unit: "per unit",
        perHead: false,
      },
      {
        id: "lstr_6",
        name: "Industrial Fan",
        price: 3000,
        unit: "per unit",
        perHead: false,
      },
    ],
  },
];

const ADDITIONALS_DATA = [
  {
    category: "Sound & Screens",
    items: [
      {
        id: "as_1",
        name: "DJ Sound System",
        price: 25000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "as_2",
        name: "Professional DJ + System",
        price: 35000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "as_3",
        name: "SMD LED Screen",
        price: 15000,
        unit: "per screen",
        perHead: false,
      },
      {
        id: "as_4",
        name: "SMD Screen Operator",
        price: 5000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
  {
    category: "Photography & Video",
    items: [
      {
        id: "ap_1",
        name: "Photographer",
        price: 20000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ap_2",
        name: "Videographer",
        price: 25000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ap_3",
        name: "Photo + Video Package",
        price: 40000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ap_4",
        name: "Drone Photography",
        price: 15000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
  {
    category: "Special Effects",
    items: [
      {
        id: "ax_1",
        name: "Fireworks (Small)",
        price: 15000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ax_2",
        name: "Fireworks (Large Show)",
        price: 35000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ax_3",
        name: "Smoke Machine",
        price: 5000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ax_4",
        name: "Confetti Cannon",
        price: 3000,
        unit: "per unit",
        perHead: false,
      },
      {
        id: "ax_5",
        name: "Cold Pyro (Stage)",
        price: 8000,
        unit: "per pair",
        perHead: false,
      },
    ],
  },
  {
    category: "Event Extras",
    items: [
      {
        id: "ae_1",
        name: "Horse (Baarat)",
        price: 30000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ae_2",
        name: "Dholki Players",
        price: 8000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ae_3",
        name: "Qawwali Group",
        price: 25000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ae_4",
        name: "Mehndi Artist",
        price: 5000,
        unit: "per event",
        perHead: false,
      },
      {
        id: "ae_5",
        name: "Live Music Band",
        price: 40000,
        unit: "per event",
        perHead: false,
      },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmt = (n) => "PKR " + Math.round(n).toLocaleString("en-PK");

const getDayName = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long" });
};

const genRef = () => {
  const now = new Date();
  const d = String(now.getDate()).padStart(2, "0");
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const r = Math.floor(Math.random() * 9000) + 1000;
  return `QUO-${d}${m}-${r}`;
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function IconBox({ icon: Icon, color }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 12,
        flexShrink: 0,
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-raised-sm)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color || "var(--color-accent)",
      }}
    >
      <Icon size={17} strokeWidth={2.2} />
    </div>
  );
}

function SectionCard({ title, icon, iconColor, sectionTotal, children }) {
  return (
    <div className="neu-card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          borderBottom: "1px solid var(--neu-shadow-dark)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IconBox icon={icon} color={iconColor} />
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--color-text)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h3>
        </div>
        {sectionTotal > 0 && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-accent)",
            }}
          >
            {fmt(sectionTotal)}
          </span>
        )}
      </div>
      <div style={{ padding: "20px 24px" }}>{children}</div>
    </div>
  );
}

function ItemRow({ item, isAdded, onToggle, guestCount }) {
  const effectiveQty = item.perHead ? parseInt(guestCount) || 1 : 1;
  const preview = item.price * effectiveQty;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "9px 0",
        borderBottom: "1px solid var(--neu-shadow-dark)",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--color-text-muted)",
            marginTop: 2,
          }}
        >
          {fmt(item.price)} · {item.unit}
          {item.perHead && guestCount ? ` · Est. ${fmt(preview)}` : ""}
        </div>
        {item.desc && (
          <div
            style={{
              fontSize: 11,
              color: "var(--color-text-muted)",
              marginTop: 1,
              fontStyle: "italic",
            }}
          >
            {item.desc}
          </div>
        )}
      </div>
      <button
        onClick={() => onToggle(item)}
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isAdded ? "var(--neu-bg)" : "var(--color-accent)",
          boxShadow: isAdded ? "var(--neu-inset-sm)" : "none",
          color: isAdded ? "var(--color-accent)" : "#fff",
          transition: "all 0.15s ease",
        }}
      >
        {isAdded ? (
          <Check size={13} strokeWidth={3} />
        ) : (
          <Plus size={13} strokeWidth={3} />
        )}
      </button>
    </div>
  );
}

function CategoryGroup({
  category,
  items,
  lineItems,
  onToggle,
  guestCount,
  search,
}) {
  const [open, setOpen] = useState(false);
  const hasMatch =
    search &&
    items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const isOpen = search ? hasMatch : open;
  const addedCount = items.filter((i) =>
    lineItems.some((l) => l.id === i.id),
  ).length;
  const displayItems = search
    ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    : items;

  if (search && !hasMatch) return null;

  return (
    <div style={{ borderBottom: "1px solid var(--neu-shadow-dark)" }}>
      <button
        onClick={() => !search && setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 0",
          background: "none",
          border: "none",
          cursor: search ? "default" : "pointer",
          fontFamily: "inherit",
        }}
      >
        <span
          style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text)" }}
        >
          {category}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {addedCount > 0 && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--color-accent)",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-inset-sm)",
                borderRadius: 20,
                padding: "2px 8px",
              }}
            >
              {addedCount} added
            </span>
          )}
          <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
            {items.length} items
          </span>
          {!search &&
            (isOpen ? (
              <ChevronUp
                size={14}
                strokeWidth={2.5}
                style={{ color: "var(--color-text-muted)" }}
              />
            ) : (
              <ChevronDown
                size={14}
                strokeWidth={2.5}
                style={{ color: "var(--color-text-muted)" }}
              />
            ))}
        </div>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: 4 }}>
          {displayItems.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              isAdded={lineItems.some((l) => l.id === item.id)}
              onToggle={onToggle}
              guestCount={guestCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryLineItem({ item, onRemove, onQtyChange, onPriceChange }) {
  const [editingQty, setEditingQty] = useState(false);
  const [editingPrice, setEditingPrice] = useState(false);
  const effectivePrice = item.customPrice ?? item.price;
  const total = effectivePrice * item.qty;

  return (
    <div
      style={{
        padding: "8px 0",
        borderBottom: "1px solid var(--neu-shadow-dark)",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--color-text)",
            flex: 1,
            lineHeight: 1.4,
          }}
        >
          {item.name}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            flexShrink: 0,
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        <div
          onClick={() => setEditingQty(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "3px 8px",
            borderRadius: 8,
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-inset-sm)",
            cursor: "pointer",
            minWidth: 40,
          }}
        >
          {editingQty ? (
            <input
              autoFocus
              type="number"
              defaultValue={item.qty}
              onBlur={(e) => {
                onQtyChange(item.id, e.target.value);
                setEditingQty(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onQtyChange(item.id, e.target.value);
                  setEditingQty(false);
                }
              }}
              style={{
                width: 40,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--color-text)",
                fontFamily: "inherit",
              }}
            />
          ) : (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              {item.qty}
            </span>
          )}
          <Edit2 size={9} style={{ color: "var(--color-text-muted)" }} />
        </div>
        <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
          x
        </span>
        <div
          onClick={() => setEditingPrice(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "3px 8px",
            borderRadius: 8,
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-inset-sm)",
            cursor: "pointer",
          }}
        >
          {editingPrice ? (
            <input
              autoFocus
              type="number"
              defaultValue={effectivePrice}
              onBlur={(e) => {
                onPriceChange(item.id, e.target.value);
                setEditingPrice(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onPriceChange(item.id, e.target.value);
                  setEditingPrice(false);
                }
              }}
              style={{
                width: 60,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--color-text)",
                fontFamily: "inherit",
              }}
            />
          ) : (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color:
                  item.customPrice != null
                    ? "var(--color-accent)"
                    : "var(--color-text)",
              }}
            >
              {effectivePrice.toLocaleString()}
            </span>
          )}
          <Edit2 size={9} style={{ color: "var(--color-text-muted)" }} />
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--color-accent)",
            marginLeft: "auto",
          }}
        >
          PKR {Math.round(total).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function NewEventPage() {
  const [docType, setDocType] = useState("quotation");
  const [refNumber] = useState(genRef);

  const [client, setClient] = useState({
    name: "",
    phone: "",
    guestCount: "",
    eventType: "",
    venue: "",
    date: "",
    referral: "",
  });
  const setC = (k, v) => setClient((p) => ({ ...p, [k]: v }));

  const [lineItems, setLineItems] = useState([]);
  const [foodMode, setFoodMode] = useState("quick");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [foodSearch, setFoodSearch] = useState("");
  const [cateringSearch, setCateringSearch] = useState("");
  const [lightingSearch, setLightingSearch] = useState("");
  const [addSearch, setAddSearch] = useState("");

  const [manualEntry, setManualEntry] = useState({
    name: "",
    price: "",
    qty: "1",
    unit: "flat",
  });
  const setM = (k, v) => setManualEntry((p) => ({ ...p, [k]: v }));

  const [notes, setNotes] = useState("");
  const [paymentTerms, setPaymentTerms] = useState(
    "50% advance on confirmation. Remaining 50% minimum 15 days before event.",
  );
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  const [summaryOpen, setSummaryOpen] = useState(false);

  // ── Item management ──────────────────────────────────────────────────────

  const addItem = (item, section) => {
    if (lineItems.some((l) => l.id === item.id)) {
      removeItem(item.id);
      return;
    }
    const guests = parseInt(client.guestCount) || 1;
    const qty = item.perHead ? guests : 1;
    setLineItems((prev) => [
      ...prev,
      { ...item, qty, section, customPrice: null },
    ]);
  };

  const removeItem = (id) =>
    setLineItems((prev) => prev.filter((l) => l.id !== id));

  const updateQty = (id, val) => {
    const n = Math.max(1, parseInt(val) || 1);
    setLineItems((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: n } : l)),
    );
  };

  const updatePrice = (id, val) => {
    const n = parseFloat(val);
    setLineItems((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, customPrice: isNaN(n) || n === l.price ? null : n }
          : l,
      ),
    );
  };

  const handleGuestChange = (val) => {
    setC("guestCount", val);
    const n = parseInt(val) || 1;
    setLineItems((prev) =>
      prev.map((item) => (item.perHead ? { ...item, qty: n } : item)),
    );
  };

  const selectPackage = (pkg) => {
    if (selectedPackage === pkg.id) {
      setSelectedPackage(null);
      setLineItems((prev) => prev.filter((l) => l.id !== `pkg_${pkg.id}`));
      return;
    }
    setLineItems((prev) => prev.filter((l) => !l.id.startsWith("pkg_")));
    setSelectedPackage(pkg.id);
    const guests = parseInt(client.guestCount) || 1;
    setLineItems((prev) => [
      ...prev,
      {
        id: `pkg_${pkg.id}`,
        name: `${pkg.name} (Menu Package)`,
        price: pkg.pricePerHead,
        customPrice: null,
        qty: guests,
        unit: "per head",
        perHead: true,
        section: "food",
      },
    ]);
  };

  const addManualItem = () => {
    if (!manualEntry.name.trim() || !manualEntry.price) return;
    const id = `manual_${Date.now()}`;
    setLineItems((prev) => [
      ...prev,
      {
        id,
        name: manualEntry.name.trim(),
        price: parseFloat(manualEntry.price) || 0,
        customPrice: null,
        qty: parseInt(manualEntry.qty) || 1,
        unit: manualEntry.unit,
        perHead: false,
        section: "food",
      },
    ]);
    setManualEntry({ name: "", price: "", qty: "1", unit: "flat" });
  };

  // ── Computed totals ──────────────────────────────────────────────────────

  const getItemTotal = (item) => (item.customPrice ?? item.price) * item.qty;
  const sectionItems = (sec) => lineItems.filter((l) => l.section === sec);
  const sectionTotal = (sec) =>
    sectionItems(sec).reduce((s, i) => s + getItemTotal(i), 0);
  const grandTotal = useMemo(
    () => lineItems.reduce((s, i) => s + getItemTotal(i), 0),
    [lineItems],
  );
  const advance = grandTotal * 0.5;
  const balance = grandTotal * 0.5;

  // ── Shared summary panel ─────────────────────────────────────────────────

  const SECTIONS = [
    { key: "food", label: "Food", icon: Utensils },
    { key: "catering", label: "Catering Setup", icon: Package },
    { key: "lighting", label: "Lighting & Decor", icon: Lightbulb },
    { key: "additionals", label: "Additionals", icon: Sparkles },
  ];

  const SummaryContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--neu-shadow-dark)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ClipboardList size={15} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              {docType === "quotation" ? "Quotation" : "Invoice"} Summary
            </span>
          </div>
          <span
            style={{
              fontSize: 11,
              color: "var(--color-text-muted)",
              fontWeight: 600,
            }}
          >
            {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
          </span>
        </div>
        {client.name && (
          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "var(--color-text-muted)",
            }}
          >
            {client.name}
            {client.eventType ? ` · ${client.eventType}` : ""}
            {client.date ? ` · ${client.date}` : ""}
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        {lineItems.length === 0 ? (
          <div style={{ padding: "36px 0", textAlign: "center" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                margin: "0 auto 12px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-inset-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-muted)",
              }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-muted)",
                fontWeight: 500,
              }}
            >
              No items added yet
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-muted)",
                marginTop: 4,
              }}
            >
              Add food, catering, or extras
            </p>
          </div>
        ) : (
          SECTIONS.map((sec) => {
            const items = sectionItems(sec.key);
            if (!items.length) return null;
            return (
              <div key={sec.key} style={{ paddingTop: 14, paddingBottom: 6 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <sec.icon
                      size={12}
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "var(--color-text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {sec.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--color-text-muted)",
                    }}
                  >
                    PKR {Math.round(sectionTotal(sec.key)).toLocaleString()}
                  </span>
                </div>
                {items.map((item) => (
                  <SummaryLineItem
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onQtyChange={updateQty}
                    onPriceChange={updatePrice}
                  />
                ))}
              </div>
            );
          })
        )}
      </div>

      <div
        style={{
          padding: "14px 20px",
          borderTop: "1px solid var(--neu-shadow-dark)",
        }}
      >
        <div
          style={{
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-inset-sm)",
            borderRadius: 14,
            padding: "12px 16px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "var(--color-text-muted)",
                fontWeight: 600,
              }}
            >
              Grand Total
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "var(--color-accent)",
              }}
            >
              {fmt(grandTotal)}
            </span>
          </div>
          {grandTotal > 0 && (
            <>
              <div
                style={{
                  height: 1,
                  background: "var(--neu-shadow-dark)",
                  margin: "8px 0",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{ fontSize: 11, color: "var(--color-text-muted)" }}
                >
                  50% Advance
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--color-text)",
                  }}
                >
                  {fmt(advance)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <span
                  style={{ fontSize: 11, color: "var(--color-text-muted)" }}
                >
                  Balance Due
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--color-text)",
                  }}
                >
                  {fmt(balance)}
                </span>
              </div>
            </>
          )}
        </div>

        <button
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 14,
            border: "none",
            cursor: grandTotal > 0 ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            background:
              grandTotal > 0
                ? "var(--color-accent)"
                : "var(--color-text-muted)",
            opacity: grandTotal > 0 ? 1 : 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <FileCheck size={16} strokeWidth={2.5} />
          Generate {docType === "quotation" ? "Quotation" : "Invoice"}
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-text-muted)",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-raised-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Receipt size={14} strokeWidth={2.2} /> Print Preview
        </button>
      </div>
    </div>
  );

  // ── Shared styles ─────────────────────────────────────────────────────────
  const labelSt = {
    fontSize: 11,
    fontWeight: 700,
    color: "var(--color-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 6,
    display: "block",
  };
  const tabBtn = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 700,
    background: active ? "var(--color-accent)" : "var(--neu-bg)",
    color: active ? "#fff" : "var(--color-text-muted)",
    boxShadow: active ? "none" : "var(--neu-raised-sm)",
    transition: "all 0.18s ease",
  });

  return (
    <DashboardLayout>
      <div
        style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 20px 80px" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "var(--color-text)",
                  letterSpacing: "-0.03em",
                }}
              >
                New {docType === "quotation" ? "Quotation" : "Invoice"}
              </h1>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--color-text-muted)",
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-raised-sm)",
                  borderRadius: 8,
                  padding: "3px 9px",
                }}
              >
                {refNumber}
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-muted)",
                fontWeight: 500,
              }}
            >
              Fill any sections in any order — the live summary updates as you
              go.
            </p>
          </div>
          {/* Doc type toggle */}
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-inset-sm)",
              borderRadius: 14,
              padding: 4,
            }}
          >
            {["quotation", "invoice"].map((t) => (
              <button
                key={t}
                onClick={() => setDocType(t)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 700,
                  background:
                    docType === t ? "var(--color-accent)" : "transparent",
                  color: docType === t ? "#fff" : "var(--color-text-muted)",
                  transition: "all 0.18s ease",
                  textTransform: "capitalize",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* LEFT: Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* 1. Client & Event */}
            <SectionCard title="Client & Event" icon={User} sectionTotal={0}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelSt}>Client Name *</label>
                  <input
                    className="neu-input"
                    placeholder="e.g. Ahmed Khan"
                    value={client.name}
                    onChange={(e) => setC("name", e.target.value)}
                    list="client-suggest"
                  />
                  <datalist id="client-suggest">
                    {CLIENT_SUGGESTIONS.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label style={labelSt}>Phone</label>
                  <div style={{ position: "relative" }}>
                    <Phone
                      size={14}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <input
                      className="neu-input"
                      style={{ paddingLeft: 32 }}
                      placeholder="03XX-XXXXXXX"
                      value={client.phone}
                      onChange={(e) => setC("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelSt}>Guest Count</label>
                  <div style={{ position: "relative" }}>
                    <Users
                      size={14}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <input
                      className="neu-input"
                      style={{ paddingLeft: 32 }}
                      placeholder="e.g. 300"
                      type="number"
                      value={client.guestCount}
                      onChange={(e) => handleGuestChange(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelSt}>Event Type</label>
                  <select
                    className="neu-input"
                    value={client.eventType}
                    onChange={(e) => setC("eventType", e.target.value)}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelSt}>Referral / Source</label>
                  <select
                    className="neu-input"
                    value={client.referral}
                    onChange={(e) => setC("referral", e.target.value)}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">How did they find us?</option>
                    {REFERRAL_SOURCES.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelSt}>Venue / Location</label>
                  <div style={{ position: "relative" }}>
                    <MapPin
                      size={14}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <input
                      className="neu-input"
                      style={{ paddingLeft: 32 }}
                      placeholder="e.g. Hilton Hotel, Rawalpindi"
                      value={client.venue}
                      onChange={(e) => setC("venue", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelSt}>Event Date</label>
                  <div style={{ position: "relative" }}>
                    <CalendarDays
                      size={14}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <input
                      className="neu-input"
                      style={{ paddingLeft: 32 }}
                      type="date"
                      value={client.date}
                      onChange={(e) => setC("date", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelSt}>Day</label>
                  <input
                    className="neu-input"
                    readOnly
                    value={getDayName(client.date) || "Auto-filled"}
                    style={{
                      color: "var(--color-text-muted)",
                      cursor: "default",
                    }}
                  />
                </div>
              </div>
            </SectionCard>

            {/* 2. Food */}
            <SectionCard
              title="Food"
              icon={Utensils}
              sectionTotal={sectionTotal("food")}
            >
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 20,
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={tabBtn(foodMode === "quick")}
                  onClick={() => setFoodMode("quick")}
                >
                  <Search size={13} strokeWidth={2.5} /> Quick Add
                </button>
                <button
                  style={tabBtn(foodMode === "menu")}
                  onClick={() => setFoodMode("menu")}
                >
                  <ClipboardList size={13} strokeWidth={2.5} /> Menu Builder
                </button>
                <button
                  style={tabBtn(foodMode === "manual")}
                  onClick={() => setFoodMode("manual")}
                >
                  <Hash size={13} strokeWidth={2.5} /> Manual Entry
                </button>
              </div>

              {foodMode === "quick" && (
                <>
                  <div style={{ position: "relative", marginBottom: 16 }}>
                    <Search
                      size={14}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <input
                      className="neu-input"
                      style={{ paddingLeft: 34 }}
                      placeholder="Search items (e.g. chicken karahi, biryani...)"
                      value={foodSearch}
                      onChange={(e) => setFoodSearch(e.target.value)}
                    />
                  </div>
                  {FOOD_CATEGORIES.map((cat) => (
                    <CategoryGroup
                      key={cat.name}
                      category={cat.name}
                      items={cat.items}
                      lineItems={lineItems}
                      onToggle={(item) => addItem(item, "food")}
                      guestCount={client.guestCount}
                      search={foodSearch}
                    />
                  ))}
                </>
              )}

              {foodMode === "menu" && (
                <>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-muted)",
                      marginBottom: 16,
                    }}
                  >
                    Select a package below. Price auto-multiplies by guest
                    count. Tap rate in summary to override.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {MENU_PACKAGES.map((pkg) => {
                      const isSel = selectedPackage === pkg.id;
                      const guests = parseInt(client.guestCount) || 0;
                      return (
                        <button
                          key={pkg.id}
                          onClick={() => selectPackage(pkg)}
                          style={{
                            padding: 16,
                            borderRadius: 16,
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            textAlign: "left",
                            background: "var(--neu-bg)",
                            boxShadow: isSel
                              ? "var(--neu-inset-sm)"
                              : "var(--neu-raised-sm)",
                            outline: isSel
                              ? "2px solid var(--color-accent)"
                              : "2px solid transparent",
                            outlineOffset: 2,
                            transition: "all 0.18s ease",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: 6,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 800,
                                color: isSel
                                  ? "var(--color-accent)"
                                  : "var(--color-text)",
                              }}
                            >
                              {pkg.name}
                            </span>
                            <div style={{ textAlign: "right", marginLeft: 8 }}>
                              <div
                                style={{
                                  fontSize: 13,
                                  fontWeight: 800,
                                  color: "var(--color-accent)",
                                }}
                              >
                                PKR {pkg.pricePerHead.toLocaleString()}
                              </div>
                              <div
                                style={{
                                  fontSize: 10,
                                  color: "var(--color-text-muted)",
                                }}
                              >
                                per head
                              </div>
                            </div>
                          </div>
                          <p
                            style={{
                              fontSize: 11,
                              color: "var(--color-text-muted)",
                              marginBottom: 8,
                              lineHeight: 1.4,
                            }}
                          >
                            {pkg.desc}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 4,
                            }}
                          >
                            {pkg.items.map((item) => (
                              <span
                                key={item}
                                style={{
                                  fontSize: 10,
                                  fontWeight: 600,
                                  padding: "2px 7px",
                                  borderRadius: 20,
                                  background: "var(--neu-bg)",
                                  color: "var(--color-text-muted)",
                                  boxShadow: isSel
                                    ? "var(--neu-raised-sm)"
                                    : "var(--neu-inset-sm)",
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          {guests > 0 && (
                            <div
                              style={{
                                marginTop: 10,
                                paddingTop: 8,
                                borderTop: "1px solid var(--neu-shadow-dark)",
                                fontSize: 12,
                                fontWeight: 700,
                                color: "var(--color-accent)",
                              }}
                            >
                              {guests} guests = {fmt(pkg.pricePerHead * guests)}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {foodMode === "manual" && (
                <>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-muted)",
                      marginBottom: 16,
                    }}
                  >
                    Add custom items with your own name and pricing.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 100px 70px 110px auto",
                      gap: 10,
                      alignItems: "end",
                    }}
                  >
                    <div>
                      <label style={labelSt}>Item Name</label>
                      <input
                        className="neu-input"
                        placeholder="e.g. Custom Dish"
                        value={manualEntry.name}
                        onChange={(e) => setM("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelSt}>Price</label>
                      <input
                        className="neu-input"
                        type="number"
                        placeholder="0"
                        value={manualEntry.price}
                        onChange={(e) => setM("price", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelSt}>Qty</label>
                      <input
                        className="neu-input"
                        type="number"
                        placeholder="1"
                        value={manualEntry.qty}
                        onChange={(e) => setM("qty", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelSt}>Unit</label>
                      <select
                        className="neu-input"
                        value={manualEntry.unit}
                        onChange={(e) => setM("unit", e.target.value)}
                      >
                        <option value="flat">flat</option>
                        <option value="per head">per head</option>
                        <option value="per unit">per unit</option>
                        <option value="per event">per event</option>
                      </select>
                    </div>
                    <button
                      onClick={addManualItem}
                      style={{
                        height: 42,
                        paddingInline: 14,
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        background: "var(--color-accent)",
                        color: "#fff",
                        fontFamily: "inherit",
                        fontSize: 13,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  {sectionItems("food").filter((i) =>
                    i.id.startsWith("manual_"),
                  ).length > 0 && (
                    <div style={{ marginTop: 20 }}>
                      <p style={{ ...labelSt, marginBottom: 10 }}>
                        Added Items
                      </p>
                      {sectionItems("food")
                        .filter((i) => i.id.startsWith("manual_"))
                        .map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 0",
                              borderBottom: "1px solid var(--neu-shadow-dark)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--color-text)",
                              }}
                            >
                              {item.name}
                            </span>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 12,
                                  color: "var(--color-text-muted)",
                                }}
                              >
                                {fmt(item.price)} x {item.qty}
                              </span>
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: "var(--color-accent)",
                                }}
                              >
                                {fmt(getItemTotal(item))}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "var(--color-text-muted)",
                                  display: "flex",
                                }}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              )}
            </SectionCard>

            {/* 3. Catering Setup */}
            <SectionCard
              title="Catering Setup"
              icon={Package}
              sectionTotal={sectionTotal("catering")}
            >
              <div style={{ position: "relative", marginBottom: 16 }}>
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-muted)",
                  }}
                />
                <input
                  className="neu-input"
                  style={{ paddingLeft: 34 }}
                  placeholder="Search catering items..."
                  value={cateringSearch}
                  onChange={(e) => setCateringSearch(e.target.value)}
                />
              </div>
              {CATERING_DATA.map((cat) => (
                <CategoryGroup
                  key={cat.category}
                  category={cat.category}
                  items={cat.items}
                  lineItems={lineItems}
                  onToggle={(item) => addItem(item, "catering")}
                  guestCount={client.guestCount}
                  search={cateringSearch}
                />
              ))}
            </SectionCard>

            {/* 4. Lighting & Decor */}
            <SectionCard
              title="Lighting & Decor"
              icon={Lightbulb}
              iconColor="#f59e0b"
              sectionTotal={sectionTotal("lighting")}
            >
              <div style={{ position: "relative", marginBottom: 16 }}>
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-muted)",
                  }}
                />
                <input
                  className="neu-input"
                  style={{ paddingLeft: 34 }}
                  placeholder="Search lighting & decor..."
                  value={lightingSearch}
                  onChange={(e) => setLightingSearch(e.target.value)}
                />
              </div>
              {LIGHTING_DATA.map((cat) => (
                <CategoryGroup
                  key={cat.category}
                  category={cat.category}
                  items={cat.items}
                  lineItems={lineItems}
                  onToggle={(item) => addItem(item, "lighting")}
                  guestCount={client.guestCount}
                  search={lightingSearch}
                />
              ))}
            </SectionCard>

            {/* 5. Additionals */}
            <SectionCard
              title="Additionals"
              icon={Sparkles}
              iconColor="#8b5cf6"
              sectionTotal={sectionTotal("additionals")}
            >
              <div style={{ position: "relative", marginBottom: 16 }}>
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-muted)",
                  }}
                />
                <input
                  className="neu-input"
                  style={{ paddingLeft: 34 }}
                  placeholder="Search DJ, SMD screen, fireworks..."
                  value={addSearch}
                  onChange={(e) => setAddSearch(e.target.value)}
                />
              </div>
              {ADDITIONALS_DATA.map((cat) => (
                <CategoryGroup
                  key={cat.category}
                  category={cat.category}
                  items={cat.items}
                  lineItems={lineItems}
                  onToggle={(item) => addItem(item, "additionals")}
                  guestCount={client.guestCount}
                  search={addSearch}
                />
              ))}
            </SectionCard>

            {/* 6. Notes & Payment Terms */}
            <SectionCard title="Notes & Terms" icon={FileText} sectionTotal={0}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label style={labelSt}>
                    Additional Instructions{" "}
                    <span style={{ textTransform: "none", fontWeight: 500 }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    className="neu-textarea"
                    rows={3}
                    placeholder="Special instructions, requirements, or notes for the client..."
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelSt}>
                    Internal Notes{" "}
                    <span style={{ textTransform: "none", fontWeight: 500 }}>
                      (not printed on quotation)
                    </span>
                  </label>
                  <textarea
                    className="neu-textarea"
                    rows={2}
                    placeholder="Team-only notes, reminders..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelSt}>Payment Terms</label>
                  <textarea
                    className="neu-textarea"
                    rows={3}
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 10,
                    }}
                  >
                    {[
                      "50% advance on confirmation",
                      "Full payment before event",
                      "30/70 split",
                      "No advance required",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setPaymentTerms(term)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 20,
                          border: "none",
                          cursor: "pointer",
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: "inherit",
                          color: "var(--color-text-muted)",
                          background: "var(--neu-bg)",
                          boxShadow: "var(--neu-raised-sm)",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* RIGHT: Sticky Summary — desktop only */}
          <div
            className="hidden lg:block"
            style={{
              position: "sticky",
              top: 76,
              maxHeight: "calc(100vh - 96px)",
            }}
          >
            <div
              className="neu-card"
              style={{
                padding: 0,
                overflow: "hidden",
                height: "calc(100vh - 96px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SummaryContent />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Floating summary pill */}
      <div
        className="lg:hidden"
        style={{ position: "fixed", bottom: 80, right: 20, zIndex: 50 }}
      >
        <button
          onClick={() => setSummaryOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            borderRadius: 24,
            border: "none",
            cursor: "pointer",
            background: "var(--color-accent)",
            color: "#fff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            fontFamily: "inherit",
          }}
        >
          <ShoppingBag size={18} strokeWidth={2.5} />
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                opacity: 0.85,
                letterSpacing: "0.04em",
              }}
            >
              {lineItems.length} ITEM{lineItems.length !== 1 ? "S" : ""}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              {fmt(grandTotal)}
            </div>
          </div>
        </button>
      </div>

      {/* Mobile: Summary drawer */}
      {summaryOpen && (
        <div
          className="lg:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 100 }}
        >
          <div
            onClick={() => setSummaryOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "min(420px, 92vw)",
              background: "var(--neu-bg)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid var(--neu-shadow-dark)",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "var(--color-text)",
                }}
              >
                Summary
              </span>
              <button
                onClick={() => setSummaryOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  display: "flex",
                }}
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SummaryContent />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
