import ContactUsSection from "@/components/Contact";
import Image from "next/image";

const locations = [
  {
    city: "USA",
    address: "Address in Words",
    contact: "+1 415 255 5962",
    image: "/contact-us/USA.png",
  },
  {
    city: "Singapore",
    address: "Address in Words",
    contact: "+65 6776 6492",
    image: "/contact-us/sinagpore.jpg",
  },
  {
    city: "India",
    address: "Address in Words",
    contact: "+91 120 4726 100",
    image: "/contact-us/Noida.jpg",
  },
  {
    city: "Australia",
    address: "Address in Words",
    contact: "+61 2 8277 4554",
    image: "/contact-us/australia.jpg",
  },
];

function TeamsSection() {
  return (
    <section className="w-full bg-[#FCF9FF] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="heading-2  mb-4">
            Teams Across Locations
          </h2>
          <p className="sub-description mx-auto md:max-w-[85%]">
            Our teams work across locations to support customers globally. Each
            office plays a key role in product development, customer success,
            and service operations -- helping us stay close to the businesses
            we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-3 flex flex-col min-h-87.5"
            >
              <div className="relative h-44 w-full rounded-md overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={loc.image}
                  alt={loc.city}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {loc.city}
              </h3>
              <p className="text-base text-gray-500 mb-6">{loc.address}</p>
              <a
                href="#"
                className="mt-auto text-sm text-blue-500 font-medium hover:underline"
              >
                {loc.contact}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ContactUsPage() {
  return (
    <main className="pt-20">
      <ContactUsSection />
      <TeamsSection />
    </main>
  );
}