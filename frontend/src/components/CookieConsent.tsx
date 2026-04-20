"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for better UX: don't slam the user immediately
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

 

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--primary-color)] text-white py-3 px-6 md:px-12 lg:px-20 border-t border-white/10 flex flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom duration-500">
      <p className="text-xs md:text-sm font-medium tracking-wide">
        We use cookies to ensure that you get the best experience on our website. By continuing to use this site, you give your consent to our{" "}
        <Link href="/privacy-policy" className="underline font-bold hover:text-white/80">
          Cookie policy
        </Link>
      </p>
      
      <button
        onClick={handleAccept}
        className="px-4 py-1 border border-white rounded font-bold hover:bg-white hover:text-[var(--primary-color)] transition-all duration-200 text-xs md:text-sm shrink-0"
      >
        OK
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation-fill-mode: forwards;
        }
        .fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .slide-in-from-bottom {
          animation: slide-in-from-bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
