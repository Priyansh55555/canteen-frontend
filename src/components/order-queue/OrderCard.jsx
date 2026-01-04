
import { formateTime } from "../../utils/formateDate";
import {
    Clock,
    User,
    Hash,
    Loader,
    CheckCircle,
    XCircle,
    CookingPot,
    BadgeCheck,
  } from "lucide-react";
  
  /* ===============================
     Status Transition Rules
  ================================ */
  const STATUS_TRANSITIONS = {
    pending: ["preparing", "cancelled"],
    preparing: ["ready", "cancelled"],
    ready: ["completed", "cancelled"],
    completed: [],
    cancelled: [],
  };
  
  /* ===============================
     Status Badge Styles
  ================================ */
  const statusBadgeStyle = {
    pending: "bg-yellow-100 text-yellow-700",
    preparing: "bg-blue-100 text-blue-700",
    ready: "bg-green-100 text-green-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };
  
  /* ===============================
     Action Button Styles
  ================================ */
  const statusButtonStyle = {
    preparing: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    ready: "bg-green-100 text-green-700 hover:bg-green-200",
  completed: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    cancelled: "bg-red-100 text-red-700 hover:bg-red-200",
  };
  
  const statusIcon = {
    preparing: <Loader size={14} className="animate-spin" />,
    ready: <CheckCircle size={14} />,
  completed: <BadgeCheck size={14} />,
    cancelled: <XCircle size={14} />,
  };
  
  /* ===============================
     Status Action Buttons
  ================================ */
  const StatusActions = ({ status, onChange }) => {
    const options = STATUS_TRANSITIONS[status] || [];
  
    if (!options.length) return null;
  
    return (
      <div className="flex gap-2 pt-3">
        {options.map((nextStatus) => (
          <button
            key={nextStatus}
            onClick={() => onChange(nextStatus)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition
              ${statusButtonStyle[nextStatus]}`}
          >
            {statusIcon[nextStatus]}
            {nextStatus}
          </button>
        ))}
      </div>
    );
  };
  
  /* ===============================
     Order Card Component
  ================================ */
  const OrderCard = ({ order, onStatusChange }) => {
    return (
      <div className="rounded-xl bg-white shadow-md hover:shadow-lg transition p-4 flex flex-col gap-4">
  
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hash size={14} />
              <span className="font-medium">
                Token
                <span className="ml-2 rounded-md bg-blue-100 text-blue-700 px-2 py-0.5 font-semibold">
                  {order?.tokenNumber}
                </span>
              </span>
            </div>
  
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <User size={14} />
              {order?.userId?.name}
            </div>
  
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock size={13} />
              {formateTime(order?.createdAt)}
            </div>
          </div>
  
          {/* Status Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
              ${statusBadgeStyle[order?.status]}`}
          >
            {order?.status}
          </span>
        </div>
  
        {/* Divider */}
        <div className="border-t border-dashed" />
  
        {/* Items */}
        <div className="space-y-2">
          {order?.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.menuItemId.name}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
  
              <p className="font-semibold text-gray-700">
                ₹{item.menuItemId.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
  
        {/* Divider */}
        <div className="border-t border-dashed" />
  
        {/* Total */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-700">
            <CookingPot size={16} />
            <span className="font-medium">Total</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            ₹{order?.totalAmount}
          </span>
        </div>
  
        {/* Status Actions */}
        <StatusActions
          status={order?.status}
          onChange={(newStatus) =>
            onStatusChange(order._id, newStatus)
          }
        />
      </div>
    );
  };
  
  export default OrderCard;
  