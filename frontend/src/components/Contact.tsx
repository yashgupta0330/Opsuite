"use client";

import { getStrapiMedia } from "@/lib/strapi-helper";
import Image from "next/image";
import { useState } from "react";
import {
  CountrySelector,
  defaultCountries,
  usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";
import "./contact.css";

interface ContactFeatureItem {
  id?: number;
  title: string;
  description?: string;
  icon?: {
    url?: string;
    data?: {
      attributes?: {
        url?: string;
      };
    };
  } | null;
}

interface ContactUsSectionProps {
  sectionTitle?: string;
  description?: string;
  featuresList?: ContactFeatureItem[];
  isPageSection?: boolean;
  onSubmit?: (data: any) => Promise<void> | void;
}

const fallbackContent: Required<Pick<ContactUsSectionProps, "sectionTitle" | "description" | "featuresList">> = {
  sectionTitle: "Ready to Transform Your After-Sales Service?",
  description:
    "Get in touch with our experts and see how ServitiumCRM can drive measurable outcomes for your business.",
  featuresList: [
    {
      title: "A 15-minute consultation with a CRM expert",
      icon: { url: "/cta/consultation.png" },
    },
    {
      title: "Completely customized to your business needs - crafted with care",
      icon: { url: "/cta/customized.png" },
    },
    {
      title: "Your questions answered, your options made clearer.",
      icon: { url: "/cta/questions.png" },
    },
  ],
};

export default function ContactUsSection({
  sectionTitle,
  description,
  featuresList,
  isPageSection = false,
  onSubmit,
}: ContactUsSectionProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    howDidYouHear: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const phoneInput = usePhoneInput({
    defaultCountry: "in",
    value: form.phone,
    countries: defaultCountries,
    disableDialCodeAndPrefix: true,
    onChange: ({ phone }) => {
      setForm((prev) => ({ ...prev, phone }));
    },
  });

  const resolvedTitle = sectionTitle || fallbackContent.sectionTitle;
  const resolvedDescription = description || fallbackContent.description;
  const resolvedFeatures =
    featuresList && featuresList.length > 0
      ? featuresList
      : fallbackContent.featuresList;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting contact form...");
    setLoading(true);
    setSuccess("");
    setError("");

    const payload = {
      data: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
        howDidYouHear: form.howDidYouHear,
      },
    };

    try {
      const res = await fetch("/api/strapi/contact-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error?.message || "Failed to submit");
      }

      setSuccess("Thank you! Your message has been sent.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        howDidYouHear: "",
      });
      phoneInput.setCountry("in");
      if (onSubmit) {
        await onSubmit(form);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-[#F4F6FC]"
      data-page-contact-section={isPageSection ? "true" : undefined}
    >

      <div className="container-fluid mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="heading-2 text-center lg:text-left">{resolvedTitle}</h2>
            <p className="sub-description mt-4 mb-12">{resolvedDescription}</p>
            <div className="flex flex-col text-gray-700">
              {resolvedFeatures.map((item, index) => {
                const iconPath = item.icon?.url || item.icon?.data?.attributes?.url;
                const iconUrl = iconPath ? getStrapiMedia(iconPath) : null;

                return (
                  <div
                    key={item.id || `${item.title}-${index}`}
                    className="flex items-center gap-3 mb-6 last:mb-0"
                  >
                    <Image
                      src={iconUrl || fallbackContent.featuresList[index]?.icon?.url || "/cta/consultation.png"}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="shrink-0 w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                    <p className="text-base md:text-lg lg:text-xl">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 placeholder-[rgba(95,101,119,1)]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 placeholder-[rgba(95,101,119,1)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 placeholder-[rgba(95,101,119,1)]"
                />
                <div className="phone-input-wrapper">
                  <div className="flex w-full">
                    <CountrySelector
                      selectedCountry={phoneInput.country.iso2}
                      onSelect={(country) => phoneInput.setCountry(country.iso2)}
                      renderButtonWrapper={({ rootProps }) => (
                        <button
                          {...rootProps}
                          type="button"
                          className="h-11.5 rounded-l-md bg-white px-3 border border-gray-200 border-r-0 hover:bg-gray-50 flex items-center gap-1 group"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            +{phoneInput.country.dialCode}
                          </span>
                          <svg
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              rootProps["aria-expanded"] ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}
                    />
                    <input
                      type="tel"
                      value={phoneInput.inputValue}
                      onChange={phoneInput.handlePhoneValueChange}
                      ref={phoneInput.inputRef}
                      placeholder="Phone number"
                      className="w-full h-11.5 rounded-r-md border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.5)] placeholder-[rgba(95,101,119,1)]"
                    />
                  </div>
                </div>
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 placeholder-[rgba(95,101,119,1)]"
              />

              <input
                type="text"
                name="howDidYouHear"
                placeholder="How did you hear about us?"
                value={form.howDidYouHear}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 placeholder-[rgba(95,101,119,1)]"
              />

              <button
                type="submit"
                className="w-full mt-3 rounded-md bg-[#3b82f6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Submitting...
                    <span className="button-spinner"></span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              <p className="text-sm md:text-xs text-gray-500">
                By providing your contact info, you agree to receive
                communications from ServitiumCRM. You can opt-out at any time.
                For details, refer to our{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>

              {success && <p className="text-green-600 text-sm">{success}</p>}
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
