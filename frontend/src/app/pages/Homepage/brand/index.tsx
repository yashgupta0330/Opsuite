"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./brand.css";

export default function BrandPage() {
  const brands = [
    { name: "USHA", logo: "/brand/usha.png" },
    { name: "Sujata", logo: "/brand/sujata.png" },
    { name: "Sharp", logo: "/brand/sharp.png" },
    { name: "Fujita", logo: "/brand/fujita.png" },
    { name: "Faber", logo: "/brand/faber.png" },
    { name: "Cera", logo: "/brand/cera.png" },
    { name: "Vestar", logo: "/brand/vestar.png" },
    { name: "Axiom", logo: "/brand/axiom.png" },
    { name: "Anchor", logo: "/brand/anchor.png" },
    { name: "Eltech", logo: "/brand/eltech.png" },
    { name: "Zeco", logo: "/brand/zeco.png" },
    { name: "Polycao", logo: "/brand/polycao.png" },
    { name: "Nohon Kohden", logo: "/brand/nohon.png" },
    { name: "Kenstar", logo: "/brand/kenstar.png" },
    { name: "Inalsa", logo: "/brand/inalsa.png" },
    { name: "GM", logo: "/brand/gm.png" },
    { name: "Hindware", logo: "/brand/hindware.png" },
    { name: "Assa Abloy", logo: "/brand/assa.png" },
    { name: "Attomate", logo: "/brand/attomate.png" },
    { name: "Borosil", logo: "/brand/borosil.png" },
    { name: "Brita", logo: "/brand/brita.png" },
    { name: "Butterfly", logo: "/brand/butterfly.png" },
    { name: "Eveready", logo: "/brand/eveready.png" },
    { name: "Finolex", logo: "/brand/finolex.png" },
    { name: "Geberit", logo: "/brand/geberit.png" },
    { name: "Johnson", logo: "/brand/johnson.png" },
    { name: "Kohler", logo: "/brand/kohler.png" },
    { name: "RR", logo: "/brand/rr.png" },
    { name: "Sintex", logo: "/brand/sintex.png" },
    { name: "Symphony", logo: "/brand/symphony.png" },
    { name: "VNT", logo: "/brand/vnt.png" },
    { name: "Wonderchef", logo: "/brand/wonderchef.png" },
  ];


  const visibleSlots = 5;
  const [visibleBrands, setVisibleBrands] = useState(
    Array.from({ length: 5 }, (_, idx) => idx),
  );
  const [animatingSlot, setAnimatingSlot] = useState<number | null>(null);
  const [nextBrand, setNextBrand] = useState<number | null>(null);
  const currentSlotRef = useRef(0);
  const nextBrandCursorRef = useRef(5 % brands.length);
  const visibleBrandsRef = useRef(visibleBrands);

  useEffect(() => {
    visibleBrandsRef.current = visibleBrands;
  }, [visibleBrands]);

  useEffect(() => {
    const interval = setInterval(() => {
      const slotToAnimate = currentSlotRef.current;
      let newBrandIndex = nextBrandCursorRef.current;

      // Ensure the new brand is not already visible in any slot
      let attempts = 0;
      while (
        visibleBrandsRef.current.includes(newBrandIndex) &&
        attempts < brands.length
      ) {
        newBrandIndex = (newBrandIndex + 1) % brands.length;
        attempts++;
      }

      setNextBrand(newBrandIndex);
      setAnimatingSlot(slotToAnimate);

      setTimeout(() => {
        setVisibleBrands((prev) => {
          const updated = [...prev];
          updated[slotToAnimate] = newBrandIndex;
          visibleBrandsRef.current = updated;
          return updated;
        });
        setAnimatingSlot(null);
        setNextBrand(null);
      }, 520);

      // Move to next slot and set cursor for next interval
      currentSlotRef.current = (currentSlotRef.current + 1) % visibleSlots;
      nextBrandCursorRef.current = (newBrandIndex + 1) % brands.length;
    }, 1500); // Slightly slower interval for better visibility

    return () => clearInterval(interval);
  }, [brands.length]);


  return (
    <section className="container-fluid bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="heading-2 text-center">
          Trusted by industry leaders across regions
        </h2>
        <p className="sub-description text-center md:max-w-[65%] md:mx-auto mt-4">
          With 20+ years of service delivery expertise, brands trust
          ServitiumCRM to run complex after-sales operations reliably and
          scalable customer experiences.
        </p>

        {/* Brand Grid - 5x5 on desktop */}
        <div className="mt-6 md:mt-15">
          <div className="grid grid-cols-5 ">
            {visibleBrands.map((brandIndex, slotIndex) => {
              const brand = brands[brandIndex];
              const isAnimating = animatingSlot === slotIndex;
              const upcomingBrand =
                nextBrand !== null ? brands[nextBrand] : null;

              return (
              <div
                key={slotIndex}
                className="flex items-center justify-center relative overflow-hidden h-14 md:h-20"
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center ${isAnimating ? "animate-slide-up" : ""}`}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={240}
                    height={60}
                    className="brand-logo-image object-contain max-w-full max-h-full"
                  />
                </div>

                {isAnimating && upcomingBrand && (
                  <div className="absolute inset-0 flex items-center justify-center animate-fade-in-from-bottom">
                    <Image
                      src={upcomingBrand.logo}
                      alt={upcomingBrand.name}
                      width={140}
                      height={60}
                      className="brand-logo-image object-contain max-w-full max-h-full"
                    />
                  </div>
                )}
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}