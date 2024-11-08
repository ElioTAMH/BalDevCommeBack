import { useState } from "react";
import { X } from "lucide-react";

export default function PreAlphaNotification() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-indigo-600 text-white rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start">
        <div className="flex-1">
          <p className="font-medium">Pre-Alpha Version</p>
          <p className="text-sm text-indigo-100 mt-1">
            This site is currently in pre-alpha. Content and features are still
            under development.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-indigo-100 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
