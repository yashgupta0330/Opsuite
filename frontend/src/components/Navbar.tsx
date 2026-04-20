"use client";

import { getModules, getSolutions, ModuleData, SolutionsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState, memo } from "react";

type NavigationState = "closed" | "menu";

interface FeatureItemProps {
  title: string;
  description: string;
  notAvailable?: boolean;
  isActive?: boolean;
}

interface NavPage {
  id: string | number;
  slug: string;
  title: string;
  shortDescription: string;
}

interface MobileSubMenuPanelProps {
  menuKey: "cso" | "mobility" | "core" | "tech";
  activeMenu: null | "cso" | "mobility" | "core" | "tech" | "company";
  title: string;
  items: NavPage[];
  hrefPrefix: "/solutions/" | "/modules/";
  emptyMessage: string;
  onBack: () => void;
  onClose: () => void;
  pathname: string;
  renderItem?: (item: NavPage) => ReactNode;
}

interface SubMenuTrigger {
  key: "cso" | "mobility" | "core" | "tech";
  label: string;
  ariaLabel: string;
  showArrow?: boolean;
}

interface TopLevelLink {
  href: string;
  label: string;
}

const FeatureItem = memo(({
  title,
  description,
  notAvailable,
  isActive,
}: FeatureItemProps) => (
  <>
    <div
      className={`font-semibold text-base leading-5 tracking-normal mb-2 ${isActive ? "text-brand-primary" : "text-[#011857]"}`}
    >
      {title}
      {notAvailable && (
        <span className="text-xs text-gray-400"> (Not Available)</span>
      )}
    </div>
    <div
      className="font-normal text-sm leading-5 text-[#535862] tracking-normal"
    >
      {description}
    </div>
  </>
));

FeatureItem.displayName = "FeatureItem";

const MobileSubMenuPanel = memo(({
  menuKey,
  activeMenu,
  title,
  items,
  hrefPrefix,
  emptyMessage,
  onBack,
  onClose,
  pathname,
  renderItem,
}: MobileSubMenuPanelProps) => (
  <div
    className={`absolute inset-0 bg-white transition-transform duration-300 z-20 flex flex-col ${activeMenu === menuKey ? "translate-x-0" : "translate-x-full"}`}
  >
    <div className="flex items-center justify-between px-4 border-b min-h-14 bg-white">
      <button
        onClick={onBack}
        className="p-2 min-w-11 min-h-11 flex items-center justify-center"
        aria-label="Go back"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="black"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <span className="font-semibold text-lg text-black">{title}</span>
      <button
        onClick={onClose}
        className="p-2 min-w-11 min-h-11 flex items-center justify-center"
        aria-label="Close"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="black"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav className="flex-1 px-4 py-6 overflow-y-auto bg-white">
      <ul className="space-y-6">
        {items.length > 0 ? (
          items.map((page) => {
            const isActive = pathname === `${hrefPrefix}${page.slug}`;
            return (
              <li key={page.id}>
                <Link
                  href={`${hrefPrefix}${page.slug}`}
                  className={`block rounded-lg transition-colors ${isActive ? "bg-brand-light p-3" : ""}`}
                  onClick={onClose}
                >
                  {renderItem ? (
                    renderItem(page)
                  ) : (
                    <div>
                      <div className={`font-semibold text-base leading-5 tracking-normal mb-2 ${isActive ? "text-brand-primary" : "text-[#011857]"}`}>
                        {page.title}
                      </div>
                      <div className="font-normal text-sm leading-5 text-[#535862] tracking-normal">
                        {page.shortDescription}
                      </div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })
        ) : (
          <li className="text-gray-500">{emptyMessage}</li>
        )}
      </ul>
    </nav>
  </div>
));

MobileSubMenuPanel.displayName = "MobileSubMenuPanel";

export const AnnouncementBanner = () => {
  // Backend controlled flag for showing banner (for now hardcoded)
  const showBannerFromBackend = false; // This will come from backend API
  const [showBanner, setShowBanner] = useState(showBannerFromBackend);

  if (!showBanner) return null;

  return (
    <div className="w-full z-30 bg-black text-white min-h-15 md:h-28 py-2 relative flex items-center">
      <div className="flex flex-row items-center justify-between max-w-360 mx-auto px-4 md:px-6 w-full gap-2 md:gap-4">
        {/* Left Award Image - Smaller on mobile */}
        <div className="shrink-0">
          <Image
            src="/navband/icon.png"
            alt="Business Leader Award"
            width={394}
            height={112}
            className="object-contain w-30 md:w-98.5 h-auto"
          />
        </div>

        {/* Middle Text - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <p className="text-[12px] sm:text-[14px] md:text-[20px] leading-tight font-semibold text-center md:max-w-137.5 px-1">
            ServitiumCRM is recognized as the Emerging Brand of the Year - Customer Service Modules
          </p>
        </div>

        {/* Right Enquire Now Button and Close Icon */}
        <div className="flex items-center gap-1 md:gap-4 shrink-0">
          <button className="btn btn-primary text-xs md:text-base py-1 px-2 md:py-2 md:px-4">
            Enquire Now
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 md:p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
            aria-label="Close banner"
          >
            <svg
              className="w-4 h-4 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};




interface NavbarProps {
  initialSolutions?: SolutionsData;
  initialModuleData?: ModuleData;
}

const Navbar = ({ initialSolutions, initialModuleData }: NavbarProps) => {

  const [navigationState, setNavigationState] =
    useState<NavigationState>("closed");
  const [mobileSubMenu, setMobileSubMenu] = useState<
    null | "cso" | "mobility" | "core" | "tech" | "company"
  >(null);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<
    null | "solutions" | "modules" | "company"
  >(null);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSolutionTab, setActiveSolutionTab] = useState<
    "cso" | "mobility"
  >(
    "cso",
  );

  const [solutions, setSolutions] = useState<SolutionsData>(initialSolutions || { cso: [], mobility: [] });
  const [moduleData, setModuleData] = useState<ModuleData>(initialModuleData || { core: [], tech: [] });

  useEffect(() => {
    async function fetchData() {
      if (solutions.cso.length > 0 || moduleData.core.length > 0) {
        console.log("Navbar: Already have SSR data, skipping client fetch");
        return;
      }
      console.log("Navbar: No SSR data, fetching on client...");
      const solData = await getSolutions();
      setSolutions(solData);

      const platData = await getModules();
      setModuleData(platData);
    }
    fetchData();
  }, [solutions, moduleData]);
  const [activeModuleTab, setActiveModuleTab] = useState<"core" | "tech">(
    "core",
  );

  // Helper to calculate rows for vertical flow (favoring 4 items in first column)
  const getGridRows = (length: number) => {
    if (length <= 1) return 1;
    if (length <= 4) return Math.ceil(length / 2);
    // For 5+ items, try to keep at least 4 in the first column
    return Math.max(4, Math.ceil(length / 2));
  };


  // Lock body scroll when any overlay is open
  useEffect(() => {
    if (navigationState !== "closed") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [navigationState]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setActiveDesktopMenu(null);
      }
    };

    if (activeDesktopMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDesktopMenu]);

  const closeNavigation = () => {
    setNavigationState("closed");
    setMobileSubMenu(null);
  };
  const openMenu = () => setNavigationState("menu");
  const openSubMenu = (menu: "cso" | "mobility" | "core" | "tech") =>
    setMobileSubMenu(menu);
  const closeSubMenu = () => setMobileSubMenu(null);

  const toggleDesktopMenu = (menu: "solutions" | "modules" | "company") => {
    setActiveDesktopMenu(activeDesktopMenu === menu ? null : menu);
  };

  const renderDesktopGrid = (
    pages: NavPage[],
    hrefPrefix: "/solutions/" | "/modules/",
    emptyMessage: string,
  ) => (
    <div
      className="grid grid-flow-col gap-x-12 gap-y-4"
      style={{
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gridTemplateRows: `repeat(${getGridRows(pages.length)}, minmax(0, 1fr))`,
      }}
    >
      {pages.length > 0 ? (
        pages.map((page) => {
          const isActive = pathname === `${hrefPrefix}${page.slug}`;
          return (
            <Link
              key={page.id}
              href={`${hrefPrefix}${page.slug}`}
              onClick={() => setActiveDesktopMenu(null)}
              className={`block rounded-lg transition-colors -mx-3 px-3 py-2 ${isActive ? "bg-brand-light" : "hover:bg-gray-100"}`}
            >
              <h3 className={`nav-menu-title mb-2 ${isActive ? "text-brand-primary" : ""}`}>{page.title}</h3>
              <p className="nav-menu-desc ">{page.shortDescription}</p>
            </Link>
          );
        })
      ) : (
        <p className="col-span-2 text-gray-500">{emptyMessage}</p>
      )}
    </div>
  );

  const mobileSubMenuPanels = [
    {
      key: "cso" as const,
      title: "Customer Service Operations",
      items: solutions.cso as NavPage[],
      hrefPrefix: "/solutions/" as const,
      emptyMessage: "No solutions available.",
    },
    {
      key: "mobility" as const,
      title: "Mobility Suite",
      items: solutions.mobility as NavPage[],
      hrefPrefix: "/solutions/" as const,
      emptyMessage: "No solutions available.",
    },
    {
      key: "core" as const,
      title: "Core Capabilities",
      items: moduleData.core as NavPage[],
      hrefPrefix: "/modules/" as const,
      emptyMessage: "No core capabilities available.",
      renderItem: (page: NavPage) => (
        <div className="py-2">
          <FeatureItem
            title={page.title}
            description={page.shortDescription}
            isActive={pathname === `/modules/${page.slug}`}
          />
        </div>
      ),
    },
    {
      key: "tech" as const,
      title: "Technology & Infrastructure",
      items: moduleData.tech as NavPage[],
      hrefPrefix: "/modules/" as const,
      emptyMessage: "No technology infrastructure available.",
      renderItem: (page: NavPage) => (
        <div className="py-2">
          <FeatureItem
            title={page.title}
            description={page.shortDescription}
            isActive={pathname === `/modules/${page.slug}`}
          />
        </div>
      ),
    },
  ];

  const solutionTabItems: SubMenuTrigger[] = [
    {
      key: "cso",
      label: "Customer Service Operations",
      ariaLabel: "Open Customer Service Operations",
      showArrow: true,
    },
    {
      key: "mobility",
      label: "Mobility Suite",
      ariaLabel: "Open Mobility Suite",
      showArrow: false,
    },
  ];

  const moduleTabItems: SubMenuTrigger[] = [
    {
      key: "core",
      label: "Core Capabilities",
      ariaLabel: "Open Core Capabilities",
      showArrow: true,
    },
    {
      key: "tech",
      label: "Technology & Infrastructure",
      ariaLabel: "Open Technology & Infrastructure",
      showArrow: true,
    },
  ];

  const companyLinks = [
    {
      href: "/mycompany/about-us",
      label: "About Us",
      notAvailable: false,
    },
    {
      href: "/mycompany/contact-us",
      label: "Contact Us",
      notAvailable: false,
    },
  ];

  const desktopTopLevelLinks: TopLevelLink[] = [
    { href: "/", label: "Home" },
  ];

  const desktopMiddleLinks: TopLevelLink[] = [
    { href: "/industries", label: "Industries" },
    { href: "/blogs", label: "Blogs" },
  ];

  const mobilePrimaryLinks: TopLevelLink[] = [
    ...desktopTopLevelLinks,
  ];

  const mobileSecondaryLinks: TopLevelLink[] = [
    ...desktopMiddleLinks,
  ];

  const desktopDropdownItems: Array<{
    key: "solutions" | "modules" | "company";
    label: string;
  }> = [
    { key: "solutions", label: "Solutions" },
    { key: "modules", label: "Modules" },
    { key: "company", label: "Company" },
  ];

  const renderDesktopDropdownToggle = (
    menu: "solutions" | "modules" | "company",
    label: string,
  ) => (
    <button
      onClick={() => toggleDesktopMenu(menu)}
      className="flex items-center justify-between py-2 px-3 text-gray-900 rounded hover:bg-transparent border-0 p-0 font-bold text-base cursor-pointer"
    >
      {label}
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );

  return (
    <nav
      className={`${(pathname === '/' && navigationState === "closed") ? 'sticky' : 'fixed'} top-0 w-full z-100 transition-all duration-300
${navigationState !== "closed" ? "bg-white" : isScrolled ? "backdrop-blur-xl saturate-150 bg-white/70" : pathname === '/' ? "bg-white" : "bg-transparent backdrop-blur-sm"}`}
    >
      <div
        ref={navbarRef}
        className="flex lg:flex-nowrap items-center justify-between max-w-360 mx-auto px-4 md:px-6 min-h-14 md:h-20 py-0 relative"
      >
        <Link href="/" className="flex items-center  ">
          <Image
            src="/logo.png"
            alt="ServitiumCRM Logo"
            width={136}
            height={33}
            style={{ aspectRatio: "136/33" }}
            className="w-34 h-8.25 shrink-0 md:w-51.25 md:h-12.5"
            priority
          />
        </Link>

        <button
          onClick={openMenu}
          type="button"
          className="inline-flex items-center  w-11 h-11 justify-center text-sm text-black rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={navigationState !== "closed"}
          aria-label="Open navigation menu"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#000000"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        <div className="hidden lg:block w-full md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row lg:space-x-4 xl:space-x-8 md:mt-0 md:border-0  items-center">
            {desktopTopLevelLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-transparent border-0 p-0 font-bold text-base"
                  aria-current={link.href === "/" ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Solutions Dropdown - Mega Menu (Fixed Size) */}
            <li className="group">
              {renderDesktopDropdownToggle(desktopDropdownItems[0].key, desktopDropdownItems[0].label)}
              {activeDesktopMenu === "solutions" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1144px] bg-white shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300 border border-gray-100 rounded-2xl overflow-hidden mt-2">
                  <div className="flex h-full min-h-[500px]">
                    {/* Left Content Area */}
                    <div className="flex-1 p-8 bg-white overflow-y-auto">
                      <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          Technology Solutions
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                        {[...solutions.cso, ...solutions.mobility].slice(0, 6).map((item) => (
                          <Link
                            key={item.id}
                            href={`/solutions/${item.slug}`}
                            onClick={() => setActiveDesktopMenu(null)}
                            className="group/item flex flex-col items-start"
                          >
                            <div className="mb-3 p-2 bg-[#F3F6FF] rounded-lg group-hover/item:bg-brand-primary transition-colors duration-300">
                              <svg className="w-5 h-5 text-brand-primary group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                            </div>
                            <h3 className="text-sm font-bold text-[#011857] mb-1 leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-[12px] text-gray-500 leading-normal mb-2 line-clamp-2">
                              {item.shortDescription || "Full lifecycle tracking from procurement"}
                            </p>
                            <span className="text-[12px] font-semibold text-brand-primary flex items-center group-hover/item:translate-x-1 transition-transform">
                              Learn More <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Sidebar - Black */}
                    <div className="w-[340px] bg-[#0A0A0B] text-white p-8 flex flex-col shrink-0">
                      <div className="mb-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block mb-3">
                          Featured
                        </span>
                        <h4 className="text-lg font-bold mb-3 leading-tight">
                          End-to-End Integration Platform
                        </h4>
                        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                          Connect all your systems with our unified integration layer.
                        </p>
                        <button className="bg-white/10 hover:bg-white/20 text-white text-xs py-2 px-4 rounded border border-white/20 transition-all flex items-center w-fit">
                          Learn More <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </button>
                      </div>

                      <div className="bg-white/5 rounded-xl p-5 mb-8 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-3">
                          Popular Resources
                        </span>
                        <ul className="space-y-2">
                          {[
                            { icon: "📄", text: "Integration Guide" },
                            { icon: "🔌", text: "API Documentation" },
                            { icon: "📊", text: "Solution Comparison" }
                          ].map((res, i) => (
                            <li key={i} className="flex items-center text-xs text-gray-300 hover:text-white cursor-pointer transition-colors">
                              <span className="mr-3 filter grayscale brightness-150">{res.icon}</span> {res.text}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto border-l border-white/20 pl-4 italic">
                        <p className="text-[12px] text-gray-500 leading-normal">
                          "Systematic tracking of every moving part."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Area */}
                  <div className="border-t border-gray-100 bg-gray-50 p-4 shrink-0">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-600">
                        Need help choosing the right modules?
                      </p>
                      <Link href="/mycompany/contact-us" onClick={() => setActiveDesktopMenu(null)} className="text-xs font-bold text-[#011857] hover:text-brand-primary flex items-center transition-colors">
                        Talk to an Expert <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Modules Dropdown - Hover Based */}
            <li className=" group">
              {renderDesktopDropdownToggle(desktopDropdownItems[1].key, desktopDropdownItems[1].label)}

              {/* Modules Dropdown */}
              {activeDesktopMenu === "modules" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-[45%] bg-white shadow-lg z-50 transition-all duration-200 w-286 rounded-xl border border-gray-200"
                >
                  <div className="flex h-full w-full gap-8.5">
                    {/* Left Sidebar */}
                    <div
                      className="py-4 lg:py-6 shrink-0 w-78.75 rounded-l-xl bg-[#F3F6FF]"
                    >
                      {moduleTabItems.map((item, idx) => (
                        <a
                          key={item.key}
                          href="#"
                          onMouseEnter={() => setActiveModuleTab(item.key as "core" | "tech")}
                          className={`flex items-center justify-between w-full py-3 px-6 rounded-none text-left whitespace-nowrap cursor-pointer font-semibold text-base leading-5 min-h-15 ${idx === 0 ? "mb-2" : ""} ${activeModuleTab === item.key
                            ? "bg-white text-[#011857]"
                            : "text-gray-700 hover:bg-white/50"
                            }`}
                          tabIndex={0}
                        >
                          {item.label}
                          {item.showArrow && (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 py-8 pr-8 pl-4">
                      {activeModuleTab === "core" && (
                        renderDesktopGrid(
                          moduleData.core as NavPage[],
                          "/modules/",
                          "No core capabilities available.",
                        )
                      )}

                      {activeModuleTab === "tech" && (
                        renderDesktopGrid(
                          moduleData.tech as NavPage[],
                          "/modules/",
                          "No technology infrastructure available.",
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>


            {desktopMiddleLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-transparent border-0 p-0 font-bold text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Company Dropdown - Hover Based */}
            <li className="group">
              {renderDesktopDropdownToggle(desktopDropdownItems[2].key, desktopDropdownItems[2].label)}

              {activeDesktopMenu === "company" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-[45%] bg-white shadow-lg z-50 transition-all duration-200 w-217.5 rounded-xl border border-gray-200"
                >
                  <div className="flex h-full w-full p-8 gap-8">
                    <Link
                      href="/mycompany/about-us"
                      onClick={() => setActiveDesktopMenu(null)}
                      className="block rounded-lg transition-colors hover:bg-gray-100 flex-1 -mx-4 px-4 py-3"
                    >
                      <h3 className="nav-menu-title mb-2 ">
                        About Us
                      </h3>
                      <p className="nav-menu-desc ">
                        Building intelligent service Moduless that power scalable, customer-first operations.
                      </p>
                    </Link>
                    <Link
                      href="/mycompany/contact-us"
                      onClick={() => setActiveDesktopMenu(null)}
                      className="block rounded-lg transition-colors hover:bg-gray-100 flex-1 -mx-4 px-4 py-3"
                    >
                      <h3 className="nav-menu-title mb-2 ">
                        Contact Us
                      </h3>
                      <p className="nav-menu-desc ">
                        Get in touch to explore smarter, scalable service management solutions.
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div >

        <div className="hidden lg:flex items-center ml-4 shrink-0">
          <Link href="/mycompany/contact-us" className="btn btn-primary inline-flex items-center whitespace-nowrap">
            Request Demo
          </Link>
        </div>

      </div >

      {/* Mobile Menu */}
      {
        navigationState === "menu" && (
          <div className="fixed inset-0 bg-white z-110 lg:hidden flex flex-col overflow-hidden h-dvh w-full">
            {/* Main Menu */}
            <div
              className={`absolute inset-0 bg-white transition-transform duration-300 flex flex-col h-full w-full ${mobileSubMenu ? "-translate-x-full" : "translate-x-0"}`}
            >
              <div className="flex items-center justify-between px-4 border-b min-h-14 bg-white z-10">
                <Image
                  src="/logo.png"
                  alt="ServitiumCRM Logo"
                  width={136}
                  height={33}
                  style={{ aspectRatio: "136/33" }}
                  className="w-34 h-8.25 shrink-0"
                />
                <button
                  onClick={closeNavigation}
                  className="p-3 min-w-11 min-h-11 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="black"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 px-4 overflow-y-auto bg-white h-full">
                <ul className="space-y-1 ">
                  {mobilePrimaryLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-3 text-black font-semibold text-lg leading-snug"
                        onClick={closeNavigation}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  {[ 
                    { title: "Solutions", items: solutionTabItems },
                    { title: "modules", items: moduleTabItems },
                  ].map((group) => (
                    <li key={group.title}>
                      <p className="py-3 text-black font-semibold text-lg leading-snug">
                        {group.title}
                      </p>
                      <ul className="ml-4 space-y-1">
                        {group.items.map((item) => (
                          <li key={item.key}>
                            <button
                              className="flex items-center justify-between w-full py-2 px-2 text-black font-medium text-base leading-tight"
                              onClick={() => openSubMenu(item.key)}
                              aria-label={item.ariaLabel}
                            >
                              {item.label}
                              <svg
                                className="w-5 h-5 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}

                  {mobileSecondaryLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-3 text-black font-semibold text-lg leading-snug"
                        onClick={closeNavigation}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  <li>
                    <p className="py-3 text-black font-semibold text-lg leading-snug">
                      Company
                    </p>
                    <ul className="ml-4 space-y-1">
                      {companyLinks.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block py-2 px-2 text-black font-medium text-base leading-tight"
                            onClick={closeNavigation}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>

                <div className="bg-white py-4 border-t flex justify-center sticky bottom-0">
                  <Link
                    href="/mycompany/contact-us"
                    className="btn btn-primary w-full text-center"
                    onClick={closeNavigation}
                  >
                    Request Demo
                  </Link>
                </div>
              </nav>
            </div>

            {mobileSubMenuPanels.map((panel) => (
              <MobileSubMenuPanel
                key={panel.key}
                menuKey={panel.key}
                activeMenu={mobileSubMenu}
                title={panel.title}
                items={panel.items}
                hrefPrefix={panel.hrefPrefix}
                emptyMessage={panel.emptyMessage}
                onBack={closeSubMenu}
                onClose={closeNavigation}
                pathname={pathname}
                renderItem={panel.renderItem}
              />
            ))}
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
