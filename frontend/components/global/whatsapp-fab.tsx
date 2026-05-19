"use client";

import { useEffect, useState } from "react";

interface WhatsAppFabProps {
  whatsappNumber?: string | null;
}

export default function WhatsAppFab({ whatsappNumber }: WhatsAppFabProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!whatsappNumber) return null;

  return (
    <>
      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-7 right-7 z-[200] w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-[300ms] hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] group"
      >
        <span className="absolute right-[68px] top-1/2 -translate-y-1/2 bg-brand-dark text-white text-[13px] font-semibold px-[13px] py-[7px] rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Chat with us
        </span>
        <svg viewBox="0 0 32 32" className="w-[30px] h-[30px] fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.66 4.73 1.8 6.72L2 30l7.52-1.76A13.94 13.94 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm0 25.5a11.46 11.46 0 01-5.84-1.6l-.42-.25-4.34 1.02.98-4.26-.27-.44A11.46 11.46 0 014.5 16C4.5 9.6 9.6 4.5 16 4.5S27.5 9.6 27.5 16 22.4 27.5 16 27.5zm6.28-8.57c-.34-.17-2.02-1-2.34-1.1-.32-.12-.55-.17-.78.17-.23.34-.9 1.1-1.1 1.33-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.68-.57-.58-.78-.59h-.66c-.23 0-.6.09-.91.43-.31.34-1.19 1.16-1.19 2.84s1.22 3.3 1.39 3.53c.17.23 2.4 3.67 5.82 5.14.81.35 1.44.56 1.94.72.81.26 1.55.22 2.14.13.65-.1 2.02-.83 2.3-1.62.29-.8.29-1.48.2-1.62-.08-.14-.31-.23-.65-.4z"/>
        </svg>
      </a>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-24 right-7 z-[200] w-11 h-11 rounded-full bg-white border border-brand-border flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(0,0,0,0.12)] ${showScrollTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] stroke-brand-primary fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 14V4M4 9l5-5 5 5"/>
        </svg>
      </button>
    </>
  );
}
