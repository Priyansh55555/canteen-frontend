import { Bell, CheckCircle, ChefHat, Clock, Filter, XCircle } from "lucide-react";

const Statics = [
    {
        icon: Clock,
        value: 0,
        status: "Pending",
        theme_color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },  {
        icon: ChefHat,
        value: 0,
        status: "Preparing",
        theme_color: "bg-blue-50 text-blue-600 border-blue-200",
    },  {
        icon: Bell,
        value: 0,
        status: "Ready",
        theme_color: "bg-green-50 text-green-600 border-green-200",
    }
];

const filters = [
    {
      icon: Clock,
      status: "Pending",
      // Container: Soft Amber
      class: "bg-amber-50 text-amber-700 border border-amber-100",
      // Icon: Slightly deeper amber with a subtle background
      iconClass: "text-amber-600 bg-amber-100/50",
    },
    {
      icon: ChefHat,
      status: "Preparing",
      // Container: Soft Blue
      class: "bg-blue-50 text-blue-700 border border-blue-100",
      // Icon: Vibrant Blue
      iconClass: "text-blue-600 bg-blue-100/50",
    },
    {
      icon: Bell,
      status: "Ready",
      // Container: Soft Indigo
      class: "bg-indigo-50 text-indigo-700 border border-indigo-100",
      // Icon: Indigo
      iconClass: "text-indigo-600 bg-indigo-100/50",
    },
    {
      icon: CheckCircle,
      status: "Completed",
      // Container: Soft Emerald
      class: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      // Icon: Emerald Green
      iconClass: "text-emerald-600 bg-emerald-100/50",
    },
    {
      icon: XCircle,
      status: "Cancelled",
      // Container: Soft Rose/Red
      class: "bg-rose-50 text-rose-700 border border-rose-100",
      // Icon: Rose Red
      iconClass: "text-rose-600 bg-rose-100/50",
    }
  ]

export { filters, Statics };