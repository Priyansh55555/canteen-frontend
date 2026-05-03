import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, ChevronDown, X } from 'lucide-react';

const GlobalErrorHandler = ({ children }) => {
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Global error handler for unhandled errors
  React.useEffect(() => {
    const handleError = (event) => {
      event.preventDefault();
      setError({
        message: event.error?.message || 'An unexpected error occurred',
        stack: event.error?.stack || 'No stack trace available',
      });
    };

    const handleUnhandledRejection = (event) => {
      event.preventDefault();
      setError({
        message: event.reason?.message || 'An unexpected promise rejection occurred',
        stack: event.reason?.stack || 'No stack trace available',
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setError(null);
    setShowDetails(false);
  };

  if (!error) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-red-50 border-b border-red-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Something went wrong</h2>
              <p className="text-sm text-gray-600">An unexpected error occurred</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="px-6 py-5">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800 font-medium">{error.message}</p>
          </div>

          {/* Stack Trace Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            />
            {showDetails ? 'Hide' : 'Show'} error details
          </button>

          {/* Stack Trace */}
          {showDetails && (
            <div className="mt-3 bg-gray-900 rounded-xl p-4 overflow-auto max-h-48">
              <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                {error.stack}
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={handleReload}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-lg shadow-orange-500/25"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
          <button
            onClick={handleDismiss}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorHandler;
