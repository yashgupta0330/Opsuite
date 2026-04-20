"use client";
import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "Heading",
    answer:
      "",
  },
  {
    question: "Heading",
    answer:
      ".",
  },
  {
    question: "Heading",
    answer:
      "",
  },
  {
    question: "Heading",
    answer:
      "",
  },
  {
    question: "Heading",
    answer:
      "",
  },
];



export default function OmnichannelPage() {

  const [openIndex, setOpenIndex] = useState<number | null>(null);


  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section
        className="w-full py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, #e9d5ff 0%, #f3e8ff 60%, #fff 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-5xl mx-auto mt-10 mb-10">
              Meet Your Customers Wherever They Are with Unified, Omnichannel
              Support
            </h1>
            <button className="btn btn-primary">
              Register for a Demo
            </button>
          </div>
          {/* Dashboard Image */}
          <div className="w-full flex justify-center mt-12">
            <div className="w-full max-w-5xl">
              <Image
                src="/omnichannel/banner.png"
                alt="ServitiumCRM Omnichannel Dashboard"
                width={1200}
                height={700}
                priority
                className="w-full h-auto rounded-xl "
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="w-full ">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 max-w-[75%] mx-auto text-center mb-16">
            Transform Support into a Unified, Data-Driven,
            and Personal Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            {[
              {
                title: "Unified Omni Channel Experience",
                desc:
                  "Connect with customers across calls, emails, chat, and social channels all in one place. ServitiumCRM ensures smooth communication and faster, consistent support.",
                icon: "/omnichannel/united.png",
              },
              {
                title: "Smarter Case Resolution",
                desc:
                  "Empower agents with a unified view of every interaction for quicker, more accurate responses. AI-driven workflows help close cases efficiently and boost satisfaction.",
                icon: "/omnichannel/smarter.png",
              },
              {
                title: "Personalized Customer Engagement",
                desc:
                  "Use real-time insights to understand customer needs and tailor every interaction. Deliver meaningful, connected experiences that build loyalty and trust.",
                icon: "/omnichannel/personalized.png",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col ">
                <div className="flex mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Image src={item.icon} alt={item.title} width={24} height={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">
                  {item.title}
                </h3>
                <p className="text-base md:text-xl text-gray-600 text-left">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMAGE + CONTENT SECTION (NEW) ================= */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-bold text-center max-w-full text-gray-900 mx-auto mb-2">
            Unified Omni-Channel Customer Engagement Platform  Calls,
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold text-center max-w-3xl text-gray-900 mx-auto mb-16">
            Email, Chat, and Social
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left Image */}
            <div className="w-full">
              <Image
                src="/omnichannel/unified.png"
                alt="Call Center & IVR Management"
                width={700}
                height={500}
                className="w-full h-auto rounded-xl "
              />
            </div>

            {/* Right Content */}
            <div >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Call Center & IVR Management
              </h3>
              <p className="text-base md:text-xl text-gray-600 mb-6">
                Manage customer calls with smart IVR, intelligent routing, and
                real-time agent insights.
              </p>

              <ul className="space-y-5">

                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Image src="/omnichannel/optimize.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Optimize call routing & IVR flows
                    </p>
                    <p className="text-base text-gray-600">
                      Automatically route calls to the right team using IVR.
                      Reduce wait times and unnecessary transfers.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Image src="/omnichannel/improve.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Improve agent efficiency & call handling
                    </p>
                    <p className="text-base text-gray-600">
                      Give agents full call context and customer history.
                      Handle more calls with faster, informed responses.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Image src="/omnichannel/increase.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Increase first-call resolution
                    </p>
                    <p className="text-base text-gray-600">
                      Use real-time data insights to resolve issues faster and
                      boost first-contact customer satisfaction.
                    </p>
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ================= LEFT CARD ================= */}
            <div className="rounded-2xl border overflow-hidden">

              {/* TEXT AREA (bordered part) */}
              <div className="p-6 md:p-8 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  WhatsApp Support Made Simple
                </h3>

                <p className="text-base text-gray-600 leading-relaxed">
                  Engage customers instantly through WhatsApp for faster query
                  handling. Share updates, receive feedback, and manage multiple
                  conversations seamlessly from one workspace.
                </p>
              </div>

              {/* IMAGE AREA (NO BORDER) */}
              <div className="w-full">
                <Image
                  src="/omnichannel/whatsapp.png"
                  alt="WhatsApp Support"
                  width={420}
                  height={260}
                  className="w-full h-auto object-contain"
                />
              </div>

            </div>


            {/* ================= RIGHT CARD ================= */}
            <div className="rounded-2xl border overflow-hidden bg-white">

              {/* TEXT AREA */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  SMS Support
                </h3>

                <p className="text-base text-gray-600 leading-relaxed">
                  Keep customers informed with instant SMS updates and alerts.
                  Send real-time notifications for service requests, confirmations,
                  and reminders to ensure timely communication and better engagement.
                </p>
              </div>

              {/* IMAGE AREA (FULL WIDTH, NO BG COLOR) */}
              <div className="w-full">
                <Image
                  src="/omnichannel/sms.png"
                  alt="SMS Support"
                  width={420}
                  height={260}
                  className="w-full h-auto object-cover"
                />
              </div>

            </div>


          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* ===== SECTION HEADING (MOVED OUT OF GRID) ===== */}
          <div className="max-w-xl ">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Smart Email Communication
            </h2>
            <p className="text-base md:text-xl text-gray-600">
              Automate personalized CRM emails. Send timely updates and
              follow-ups effortlessly.
            </p>
          </div>

          {/* ===== CONTENT GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* ================= LEFT CONTENT ================= */}
            <div>
              <ul className="space-y-6">

                {/* Item 1 */}
                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Image src="/omnichannel/automated.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Automated customer updates
                    </p>
                    <p className="text-base text-gray-600">
                      Send service confirmations, ticket details, and updates.
                      Keep customers informed every step.
                    </p>
                  </div>
                </li>

                {/* Item 2 */}
                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Image src="/omnichannel/consistent.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Personalized & consistent messaging
                    </p>
                    <p className="text-base text-gray-600">
                      Customize emails with customer and ticket data.
                      Ensure consistent brand voice everywhere.
                    </p>
                  </div>
                </li>

                {/* Item 3 */}
                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Image src="/omnichannel/fast.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Fast and reliable support
                    </p>
                    <p className="text-base text-gray-600">
                      Trigger emails automatically from CRM workflows.
                      Reduce manual effort and speed up response times.
                    </p>
                  </div>
                </li>

              </ul>
            </div>

            {/* ================= RIGHT IMAGE ================= */}
            <div className="relative">
              <Image
                src="/omnichannel/email.png"
                alt="Smart Email Communication"
                width={640}
                height={420}
                className="w-full h-auto rounded-xl"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ================= LEFT CARD ================= */}
            <div className="rounded-2xl border-2 overflow-hidden">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Instant Support from Your Website
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Provide quick, automated help directly from your website.
                  Customers can chat, raise tickets, and track requests with ease.
                </p>
              </div>

              {/* Image Area */}
              <div className="w-full">
                <Image
                  src="/omnichannel/instant.png"
                  alt="Website Support"
                  width={420}
                  height={260}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* ================= RIGHT CARD ================= */}
            <div className="rounded-2xl border-2 overflow-hidden">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  24/7 Support with AI-Powered Chatbots
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Deliver 24/7 assistance through smart chatbots that handle FAQs,
                  queries, and simple cases automatically.
                </p>
              </div>

              {/* Image Area */}
              <div className="w-full">
                <Image
                  src="/omnichannel/support.png"
                  alt="AI Chatbot Support"
                  width={420}
                  height={260}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-2xl text-white"
            style={{
              backgroundImage: 'url(/omnichannel/background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="relative grid grid-cols-1 md:grid-cols-2 items-center min-h-[400px] md:min-h-0">
              {/* LEFT CONTENT */}
              <div className="p-6 md:p-12">
                <p className="text-sm font-semibold mb-4 tracking-wide">
                  HÄFELE
                </p>
                <p className="font-medium text-3xl md:text-4xl leading-tight max-w-lg">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt”
                </p>
              </div>
              {/* RIGHT IMAGE */}
              <div className="flex justify-center md:justify-end pr-20 ">
                <Image
                  src="/omnichannel/hafele.png"
                  alt="Customer Testimonial"
                  width={260}
                  height={320}
                  className="object-contain "
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* ================= LEFT IMAGE ================= */}
            <div className="relative mt-12">
              <Image
                src="/omnichannel/ecommerce.png"
                alt="E-Commerce & IVR Platforms"
                width={640}
                height={420}
                className="w-full h-auto rounded-xl "
              />
            </div>

            {/* ================= RIGHT CONTENT ================= */}
            <div className="self-start ">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                E-Commerce & IVR Platforms
              </h2>

              <p className="text-base md:text-xl text-gray-600 mb-12 max-w-lg">
                Enable seamless customer-retailer communication. Access real-time
                updates, tracking, and support anywhere.
              </p>

              <ul className="space-y-6">

                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Image src="/omnichannel/real.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Real-time order & service updates
                    </p>
                    <p className="text-base text-gray-600">
                      Provide instant order, delivery, and request updates.
                      Keep customers informed via IVR and digital channels.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Image src="/omnichannel/seamless.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Seamless customer communication
                    </p>
                    <p className="text-base text-gray-600">
                      Connect via IVR, calls, or mobile apps.
                      Ensure quick responses and consistent engagement.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Image src="/omnichannel/anywhere.png" alt="" width={18} height={18} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Anywhere, anytime access
                    </p>
                    <p className="text-base text-gray-600">
                      Give retailers and customers instant access to key info.
                      Stay connected across all devices and platforms.
                    </p>
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </section>




      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* ================= HEADING ================= */}
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 max-w-5xl mx-auto mb-16">
            Self-Service Customer App and Retailer Portal for Fast Claims,
            Warranty Management, and Updates
          </h2>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

              {/* Customer App */}
              <div>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Image src="/omnichannel/smarter.png" alt="" width={24} height={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Customer App
                </h3>
                <p className="text-base md:text-xl text-gray-600 max-w-xs">
                  Let customers register products, raise requests, and track
                  service updates easily from their phones.
                </p>
              </div>

              {/* Retailer App */}
              <div>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Image src="/omnichannel/personalized.png" alt="" width={24} height={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Retailer App
                </h3>
                <p className="text-base md:text-xl text-gray-600 max-w-xs">
                  Help retailers manage claims, warranties, and service requests
                  quickly from a single app.
                </p>
              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center lg:justify-end">

              {/* Main phone */}
              <Image
                src="/omnichannel/service.png"
                alt="Customer App Interface"
                width={500}
                height={520}
                className="rounded-2xl  max-w-[220px] sm:max-w-none"
              />



            </div>

          </div>
        </div>
      </section>



      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* ================= HEADING ================= */}
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 max-w-4xl mx-auto mb-16">
            Seamless Integration with Your Industrys <br />
            Must-Have Apps
          </h2>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ================= LEFT IMAGE ================= */}
            <div className="flex justify-center">
              <Image
                src="/omnichannel/industry.png" // 👈 single full image
                alt="CRM Integrations"
                width={640}
                height={420}
                className="w-full max-w-[520px] h-auto"
                priority
              />
            </div>

            {/* ================= RIGHT TEXT ================= */}
            <div>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-lg">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt” <br /><br />
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt”
              </p>
            </div>

          </div>
        </div>
      </section>


      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* HEADING */}
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 max-w-4xl mx-auto mb-16">
            Insights and Resources for Driving Customer-First
            <br />
            Business Growth
          </h2>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

            {/* CARD 1 */}
            <div className="flex flex-col">
              <div className="relative h-[420px] rounded-xl overflow-hidden">
                <Image
                  src="/omnichannel/effect.png"
                  alt="Effect in Action"
                  fill
                  className="object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="mt-4">
                <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-1">
                  Knowledge Insights
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ServitiumCRM in Effect
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="flex flex-col">
              <div className="relative h-[420px] rounded-xl overflow-hidden">
                <Image
                  src="/omnichannel/fixing.png"
                  alt="Fixing Broken Support"
                  fill
                  className="object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="mt-4">
                <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-1">
                  Academy
                </p>
                <p className="text-lg font-bold text-gray-900">
                  Fixing Broken Support
                </p>
              </div>
            </div>

            {/* CARD 3 – FULL BG IMAGE */}
            <div className="relative h-[420px] rounded-xl overflow-hidden">
              <Image
                src="/omnichannel/servitium.png"
                alt="Newsletter"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>




      <section className="w-full py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions (FAQs)
          </h2>

          {/* FAQ List */}
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <button
                  key={index}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full text-left py-5 flex items-center justify-between gap-6
                           focus:outline-none"
                >
                  <span className="text-gray-900 font-medium">
                    {faq.question}
                  </span>

                  {/* Chevron */}
                  <span
                    className={`transform transition-transform duration-300
                    ${isOpen ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>

                  {/* Answer */}
                  {isOpen && (
                    <div className="absolute left-0 mt-14 text-sm text-gray-600 max-w-3xl">
                      {faq.answer}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
