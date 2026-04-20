"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center pt-28 pb-20 px-4 overflow-hidden bg-white">
      {/* Background Image Restored */}
      <div 
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url('/hero/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Subtle Side Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-100/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="inline-flex items-center px-5 py-2 rounded-full border border-cyan-400 bg-cyan-50/50 text-cyan-600 text-sm font-medium backdrop-blur-sm">
            Run Your Facility on Autopilot
          </span>
        </div>

        {/* Headline */}
        <h1 className="heading-1">
          All-in-One Platform with <br />
          <span className="text-[#00D1FF]">AI Powered Asset and Facility Management</span>
        </h1>

        {/* Description */}
        <p className="sub-description mt-5 max-w-[65%]">
          Digitize and streamline your asset and facility operations with a unified platform that 
          enhances efficiency, reduces downtime and drives smarter decision-making.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 px-4 w-full mt-5">
          <button 
            onClick={() => router.push("#features")}
            className="w-full sm:w-auto px-10 py-3.5 rounded-full border-2 border-[#011857] text-[#011857] font-bold text-lg hover:bg-gray-50 transition-all"
          >
            Explore Features
          </button>
          <button 
            onClick={() => router.push("/contact-us")}
            className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#011857] text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-900/20 transition-all border-2 border-[#011857]"
          >
            Request a Demo
          </button>
        </div>

        {/* Hero Banner Image with Mockup Effect */}
        <div className="w-full relative max-w-6xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="relative group">
            {/* Laptop Screen Shadow */}
            
            <div className="relative rounded-2xl  overflow-hidden">
              <Image
                src="/hero/banner.png"
                alt="OpsSuite Dashboard"
                width={1200}
                height={750}
                priority
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
