"use client";

export default function EnterpriseIntegrations() {
  return (
    <section className=" bg-white">
      {/* Existing Integrations Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="w-full text-center z-10 mb-16">
          <h2 className=" mb-4 heading-2 text-center">
            Seamless Integrations for a Connected Enterprise{" "}
          </h2>
          <p className="sub-description drop-shadow text-center md:max-w-[70%] mx-auto">
            Connect ServitiumCRM with ERP, analytics, payments, and more to
            maintain seamless data flow across your enterprise systems.
          </p>
        </div>
      </div>

      {/* Background Wrapper for Logos */}
      <div
        className="w-full z-0 relative"
        style={{
          backgroundImage: "url(/enterprise/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="w-full relative z-10 overflow-hidden">
          <div className="w-full">
            <video
              src="/enterprise/seamless.mp4"
              className="w-full h-auto block"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
