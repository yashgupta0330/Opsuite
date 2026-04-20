export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="container-fluid masthead">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-2xl mb-4">Website Disclaimer </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="container-fluid">
        <div className="max-w-7xl mx-auto px-4 md:px-6 ">
          <div className="space-y-10">
            <div>
              <p className="text-base">
                The information contained on this website is provided by
                ServitiumCRM by Path Infotech Limited, for general informational
                purposes only.{" "}
              </p>
              <p className="text-base mt-4">
                This website may contain proprietary notices and copyright
                information, the terms of which must be observed and followed.
                While we strive to ensure the accuracy of the information
                presented, the content may occasionally include technical
                inaccuracies or typographical errors. Information may be
                modified, updated or removed without prior notice.
              </p>
              <p className="text-base mt-4">
                ServitiumCRM and Path Infotech reserve the right to make
                improvements and/or changes to the products, services, programs
                or content described on this website at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-2 ">Confidential Information</h2>
              <p className="text-base mb-6">
                ServitiumCRM does not seek to receive confidential or
                proprietary information through this website.
              </p>
              <p className="text-base mb-4">
                Any information or materials submitted to us through this
                website will be deemed non-confidential and non-proprietary. By
                submitting any information or material, you grant Path Infotech
                an unrestricted, irrevocable, worldwide, royalty-free license to
                use, reproduce, display, perform, modify, transmit and
                distribute such materials. You also agree that we are free to
                use any ideas, concepts, know-how or techniques contained in
                such communications for any purpose, including product
                development and marketing.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-2">Third-Party Links </h2>
              <p className="text-base mb-6">
                This website may contain links to third-party websites for your
                convenience.
              </p>
              <p className="text-base mt-4">
                ServitiumCRM and Path Infotech make no representations or
                warranties regarding any third-party website accessible through
                this site. The inclusion of a link does not imply endorsement,
                sponsorship or acceptance of responsibility for the content,
                accuracy or use of such websites
              </p>
              <p className="text-base mt-4">
                Users are advised to take appropriate precautions to ensure that
                any downloads or materials accessed from external websites are
                free from viruses, malware or other harmful components.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-2">Limitation of Liability</h2>
              <p className="text-base">
                Under no circumstances shall ServitiumCRM or Path Infotech be
                liable to any party for any direct, indirect, incidental,
                special or consequential damages arising out of or related to
                the use of this website or any hyperlinked website. This
                includes, without limitation, damages for loss of data, loss of
                programs or business interruption.
              </p>
              <p className="text-base mt-4">
                All information on this website is provided on an “as is” basis
                without warranties of any kind, either express or implied,
                including but not limited to implied warranties of
                merchantability or fitness for a particular purpose.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-2">Trademarks </h2>
              <p className="text-base">
                All product names, company names, logos and trademarks displayed
                on this website are the property of their respective owners.
                Their inclusion does not imply affiliation with or endorsement
                by those entities unless explicitly stated.
              </p>
            </div>

            
          </div>
        </div>
      </section>
    </main>
  );
}
