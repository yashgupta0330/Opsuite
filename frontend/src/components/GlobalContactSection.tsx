"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ContactUsSection from "./Contact";

export default function GlobalContactSection() {
  const pathname = usePathname();
  const [hasPageContactSection, setHasPageContactSection] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHasPageContactSection(
        document.querySelector('[data-page-contact-section="true"]') !== null,
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Hide the global contact section on the dedicated contact-us, privacy-policy, and disclaimer pages
  if (pathname === "/mycompany/contact-us" || pathname === "/privacy-policy" || pathname === "/disclaimer") {
    return null;
  }

  if (hasPageContactSection) {
    return null;
  }

  return <ContactUsSection />;
}
