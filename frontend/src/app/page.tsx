import HeroPage from "./pages/Homepage/hero";
import StatsSection from "./pages/Homepage/stats";
import BrandPage from "./pages/Homepage/brand";
import CustomerServiceTabs from "./pages/Homepage/customerservice";
import IndustriesSection from "./pages/Homepage/industriesection";
import WhyServitium from "./pages/Homepage/whyservitium";
import MobilityAppsSection from "./pages/Homepage/mobility";
import AutomationSection from "./pages/Homepage/smartautomation";
import TestimonialsSection from "./pages/Homepage/testimonials";

export default function Home() {
  return (
    <>
      <HeroPage />
      <BrandPage />
      <WhyServitium />
      <StatsSection />
      <IndustriesSection />
      <CustomerServiceTabs />
      <MobilityAppsSection />
      <AutomationSection />
      <TestimonialsSection />
    </>
  );
}
