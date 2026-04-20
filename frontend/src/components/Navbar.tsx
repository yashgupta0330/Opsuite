"use client";

import { getPlatform, getSolutions, PlatformData, SolutionsData } from "@/lib/data";
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
  hrefPrefix: "/solutions/" | "/platform/";
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
            ServitiumCRM is recognized as the Emerging Brand of the Year - Customer Service Platform
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
  initialPlatformData?: PlatformData;
}

const Navbar = ({ initialSolutions, initialPlatformData }: NavbarProps) => {

  const [navigationState, setNavigationState] =
    useState<NavigationState>("closed");
  const [mobileSubMenu, setMobileSubMenu] = useState<
    null | "cso" | "mobility" | "core" | "tech" | "company"
  >(null);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<
    null | "solutions" | "platform" | "company"
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
  const [platformData, setPlatformData] = useState<PlatformData>(initialPlatformData || { core: [], tech: [] });

  useEffect(() => {
    async function fetchData() {
      if (solutions.cso.length > 0 || platformData.core.length > 0) {
        console.log("Navbar: Already have SSR data, skipping client fetch");
        return;
      }
      console.log("Navbar: No SSR data, fetching on client...");
      const solData = await getSolutions();
      setSolutions(solData);

      const platData = await getPlatform();
      setPlatformData(platData);
    }
    fetchData();
  }, [solutions, platformData]);
  const [activePlatformTab, setActivePlatformTab] = useState<"core" | "tech">(
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

  const toggleDesktopMenu = (menu: "solutions" | "platform" | "company") => {
    setActiveDesktopMenu(activeDesktopMenu === menu ? null : menu);
  };

  const renderDesktopGrid = (
    pages: NavPage[],
    hrefPrefix: "/solutions/" | "/platform/",
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
      items: platformData.core as NavPage[],
      hrefPrefix: "/platform/" as const,
      emptyMessage: "No core capabilities available.",
      renderItem: (page: NavPage) => (
        <div className="py-2">
          <FeatureItem
            title={page.title}
            description={page.shortDescription}
            isActive={pathname === `/platform/${page.slug}`}
          />
        </div>
      ),
    },
    {
      key: "tech" as const,
      title: "Technology & Infrastructure",
      items: platformData.tech as NavPage[],
      hrefPrefix: "/platform/" as const,
      emptyMessage: "No technology infrastructure available.",
      renderItem: (page: NavPage) => (
        <div className="py-2">
          <FeatureItem
            title={page.title}
            description={page.shortDescription}
            isActive={pathname === `/platform/${page.slug}`}
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

  const platformTabItems: SubMenuTrigger[] = [
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
    key: "solutions" | "platform" | "company";
    label: string;
  }> = [
    { key: "solutions", label: "Solutions" },
    { key: "platform", label: "Platform" },
    { key: "company", label: "Company" },
  ];

  const renderDesktopDropdownToggle = (
    menu: "solutions" | "platform" | "company",
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

            {/* Solutions Dropdown - Hover Based */}
            <li className="group">
              {renderDesktopDropdownToggle(desktopDropdownItems[0].key, desktopDropdownItems[0].label)}
              {/* Solutions Dropdown */}

              {activeDesktopMenu === "solutions" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-[45%] bg-white shadow-lg z-50 transition-all duration-200 w-286 h-108 rounded-xl border border-gray-200"
                >
                  <div className="flex h-full w-full gap-8.5">
                    {/* Left Sidebar */}
                    <div
                      className="py-4 lg:py-6 h-full shrink-0 w-78.75 rounded-l-xl bg-[#F3F6FF]"
                    >
                      {solutionTabItems.map((item, idx) => (
                        <a
                          key={item.key}
                          href="#"
                          onMouseEnter={() => setActiveSolutionTab(item.key as "cso" | "mobility")}
                          className={`flex items-center justify-between w-full py-3 px-6 rounded-none text-left whitespace-nowrap cursor-pointer font-semibold text-base leading-5 min-h-15 ${idx === 0 ? "mb-2" : ""} ${activeSolutionTab === item.key
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
                    <div
                      className="py-8 pr-8 pl-4 h-full overflow-hidden w-193"
                    >
                      {activeSolutionTab === "cso" && (
                        renderDesktopGrid(
                          solutions.cso as NavPage[],
                          "/solutions/",
                          "No solutions available.",
                        )
                      )}

                      {activeSolutionTab === "mobility" && (
                        renderDesktopGrid(
                          solutions.mobility as NavPage[],
                          "/solutions/",
                          "No solutions available.",
                        )
                      )}

                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Platform Dropdown - Hover Based */}
            <li className=" group">
              {renderDesktopDropdownToggle(desktopDropdownItems[1].key, desktopDropdownItems[1].label)}

              {/* Platform Dropdown */}
              {activeDesktopMenu === "platform" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-[45%] bg-white shadow-lg z-50 transition-all duration-200 w-286 rounded-xl border border-gray-200"
                >
                  <div className="flex h-full w-full gap-8.5">
                    {/* Left Sidebar */}
                    <div
                      className="py-4 lg:py-6 shrink-0 w-78.75 rounded-l-xl bg-[#F3F6FF]"
                    >
                      {platformTabItems.map((item, idx) => (
                        <a
                          key={item.key}
                          href="#"
                          onMouseEnter={() => setActivePlatformTab(item.key as "core" | "tech")}
                          className={`flex items-center justify-between w-full py-3 px-6 rounded-none text-left whitespace-nowrap cursor-pointer font-semibold text-base leading-5 min-h-15 ${idx === 0 ? "mb-2" : ""} ${activePlatformTab === item.key
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
                      {activePlatformTab === "core" && (
                        renderDesktopGrid(
                          platformData.core as NavPage[],
                          "/platform/",
                          "No core capabilities available.",
                        )
                      )}

                      {activePlatformTab === "tech" && (
                        renderDesktopGrid(
                          platformData.tech as NavPage[],
                          "/platform/",
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
                        Building intelligent service platforms that power scalable, customer-first operations.
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
                    { title: "Platform", items: platformTabItems },
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