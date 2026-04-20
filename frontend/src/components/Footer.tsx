import { PlatformData, SolutionsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

interface FooterProps {
  initialSolutions: SolutionsData;
  initialPlatformData: PlatformData;
}

export default function Footer({ initialSolutions, initialPlatformData }: FooterProps) {
  const solutions = initialSolutions;
  const platformData = initialPlatformData;

  const platformLinks = [...platformData.core, ...platformData.tech];

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8 font-sans">
      <div className="container-fluid">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="order-0 lg:hidden">
            <Image
              src="/footer/logo.png"
              alt="ServitiumCRM"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <div className="order-4 lg:order-1">
            <div className="hidden lg:flex items-center gap-4 mb-4">
              <Image
                src="/footer/logo.png"
                alt="ServitiumCRM"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            <div className="mt-8 lg:mt-12">
              <h4 className="text-gray-900 font-bold text-lg mb-6">Contact Us</h4>
              <div className="flex items-center gap-3 text-gray-600 text-sm mb-12">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Image
                    src="/footer/mail.svg"
                    alt="Mail"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <a href="mailto:enquiry@servitiumcrm.com" className="font-normal break-all">
                  enquiry@servitiumcrm.com
                </a>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-6 h-6 flex items-center justify-center text-gray-900">
                  <FaFacebookF size={18} />
                </a>
                <a href="#" className="w-6 h-6 flex items-center justify-center text-gray-900">
                  <FaLinkedinIn size={18} />
                </a>
                <a href="#" className="w-6 h-6 flex items-center justify-center text-gray-900">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="w-6 h-6 flex items-center justify-center text-gray-900">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">Solutions</h4>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-12">
              <div>
                <ul className="space-y-3">
                  {solutions.cso.map((item) => (
                    <li key={item.id}>
                      <Link href={`/solutions/${item.slug}`} className="text-gray-600 text-sm font-normal">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  {solutions.mobility.map((item) => (
                    <li key={item.id}>
                      <Link href={`/solutions/${item.slug}`} className="text-gray-600 text-sm font-normal">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-3">
            <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map((item) => (
                <li key={item.id}>
                  <Link href={`/platform/${item.slug}`} className="text-gray-600 text-sm font-normal">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8 order-3 lg:order-4">
            <div className="space-y-8 text-gray-900 font-bold text-sm uppercase tracking-wider">
              <div>
                <Link href="/industries" className="text-gray-900 text-sm font-semibold">
                  Industries
                </Link>
              </div>
              <div>
                <Link href="/blogs" className="text-gray-900 text-sm font-semibold">
                  Blogs
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/mycompany/about-us" className="text-gray-600 text-sm font-medium">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/mycompany/contact-us" className="text-gray-600 text-sm font-medium">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-500 font-normal">
          <div className="flex flex-col gap-4 items-start md:flex-row md:items-center md:gap-8">
            <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <div className="hidden md:block w-px h-4 bg-gray-400" />
            <Link href="/disclaimer" className="hover:text-gray-900 transition-colors">
              Disclaimer
            </Link>
            <div className="hidden md:block w-px h-4 bg-gray-400" />
            <span>© 2026 Path Infotech Limited. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
