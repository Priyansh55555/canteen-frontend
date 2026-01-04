import React, { useState } from 'react';
import { Ticket, Clock, ChevronDown } from 'lucide-react';

const OrderHistoryCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper: Format currency in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Status themes with total amount color
  const statusThemes = {
    pending: {
      cardBg: 'bg-yellow-50',
      badgeBg: 'bg-yellow-50',
      badgeText: 'text-yellow-700',
      badgeBorder: 'border-yellow-200',
      dot: 'bg-yellow-500',
      totalText: 'text-yellow-600'
    },
    preparing: {
      cardBg: 'bg-blue-50',
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-700',
      badgeBorder: 'border-blue-200',
      dot: 'bg-blue-500',
      totalText: 'text-blue-600'
    },
    ready: {
      cardBg: 'bg-purple-50',
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-700',
      badgeBorder: 'border-purple-200',
      dot: 'bg-purple-500',
      totalText: 'text-purple-600'
    },
    completed: {
      cardBg: 'bg-green-50',
      badgeBg: 'bg-green-50',
      badgeText: 'text-green-700',
      badgeBorder: 'border-green-200',
      dot: 'bg-green-500',
      totalText: 'text-green-600'
    },
    cancelled: {
      cardBg: 'bg-red-50',
      badgeBg: 'bg-red-50',
      badgeText: 'text-red-700',
      badgeBorder: 'border-red-200',
      dot: 'bg-red-500',
      totalText: 'text-red-600'
    }
  };

  const theme = statusThemes[data.status.toLowerCase()] || statusThemes.pending;

  return (
    <div className={`w-full h-fit rounded-xl border ${theme.badgeBorder} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${theme.cardBg}`}>
      
      {/* --- Main Card Content --- */}
      <div className="p-6 bg-white">
        {/* Header: Token ID and Status */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Ticket className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Token Number</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              #{data.tokenNumber}
            </span>
          </div>

          {/* Status Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
            {data.status}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-4" />

        {/* Footer: Date and Total */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-50 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{new Date(data.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 font-medium">Total Amount</span>
            <div className={`flex items-center font-bold text-xl ${theme.totalText}`}>
              {formatCurrency(data.totalAmount)}
            </div>
          </div>
        </div>
      </div>

      {/* --- Expand/Collapse Button --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 border-t border-gray-100 text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors text-sm font-medium"
      >
        {isOpen ? 'Hide Items' : 'View Items'}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* --- Expanded Items Section --- */}
      {isOpen && (
        <div className="bg-gray-50 border-t border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
          {data.items.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              {/* Left: Image & Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    src={item.menuItemId.image} 
                    alt={item.menuItemId.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                    {item.menuItemId.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.menuItemId.category} • {formatCurrency(item.menuItemId.price)} each
                  </p>
                </div>
              </div>

              {/* Right: Quantity & Subtotal */}
              <div className="text-right">
                <span className="block text-xs font-semibold text-gray-400 mb-0.5">
                  x{item.quantity}
                </span>
                <span className="block text-sm font-bold text-gray-900">
                  {formatCurrency(item.menuItemId.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryCard;
