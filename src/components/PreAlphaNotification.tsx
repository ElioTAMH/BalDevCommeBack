import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PreAlphaNotification() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document
        .getElementById("notification")
        ?.classList.remove("opacity-0", "translate-y-10");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="notification"
      className={`fixed bottom-4 right-4 max-w-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl p-6 z-50 transform transition-all duration-500 ease-out opacity-0 translate-y-10
        ${isExiting ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}
        hover:scale-105`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold tracking-tight animate-fade-in">
            Pre-Alpha Version
          </h3>
          <p className="text-sm text-indigo-100 mt-2 leading-relaxed animate-fade-in delay-150">
            This site is currently in pre-alpha. Content and features are still
            under development.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="text-indigo-100 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-indigo-500/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
