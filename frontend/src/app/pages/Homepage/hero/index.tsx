"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();

  // Scroll to the section with id 'service-excellence-section'
  const handleExploreFeatures = () => {
    const section = document.getElementById("service-excellence-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container-fluid masthead relative flex items-center justify-center overflow-hidden mx-auto">
      {/* White overlay for light effect */}
      <div className="absolute inset-0 bg-white opacity-60 pointer-events-none z-0"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
<h1 className="heading-1 mb-6 text-balance lg:mx-auto">
          A Unified,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #6055FD 0%, #FD2A97 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI-Powered CRM
          </span>{" "}
          Elevating <span>Customer Service Through Smart Automation</span>
        </h1>
        <p className="sub-description md:mx-auto md:max-w-[65%] mb-6">
          India’s most trusted after-sales service platform delivering seamless
          omnichannel experiences and empowering field teams with intelligent AI
          workflows.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mb-6 md:mb-15 w-full sm:w-auto ">
          <button
            className="btn btn-primary "
            onClick={() => router.push("/mycompany/contact-us")}
          >
            Get Started
          </button>
          <button
            className="btn btn-outlined "
            onClick={handleExploreFeatures}
          >
            Explore Features
          </button>
        </div>
        <div className="w-full flex justify-center">
          <Image
            src="/banner.webp"
            alt="CRM Dashboard Banner"
            width={1100}
            height={300}
            priority
          />
        </div>
      </div>
    </section>
  );
}