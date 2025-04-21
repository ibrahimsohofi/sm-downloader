import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function Privacy() {
  const { darkMode } = useContext(ThemeContext);

  const currentYear = new Date().getFullYear();

  return (
    <div className="py-6">
      <header className="w-full">
        <div className="max-w-4xl mx-auto text-center py-6 md:py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-4 md:mb-6">
            Last updated: April 2023
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-8 md:pb-12 text-sm md:text-base">
        <div className={`rounded-lg shadow-md p-6 md:p-8 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-3">
              MS Downloader ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p className="mb-3">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not
              access our website or use our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">2. Information We Collect</h2>

            <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">2.1 Personal Data</h3>
            <p className="mb-3">
              We may collect personally identifiable information, such as:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Email address (when you contact us or sign up for our newsletter)</li>
              <li>Name (when provided in contact forms)</li>
              <li>Usage data (as described below)</li>
            </ul>

            <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">2.2 Usage Data</h3>
            <p className="mb-3">
              We may also collect information about how you access and use our website:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Device information</li>
              <li>Unique device identifiers</li>
              <li>Operating system</li>
              <li>Referral source</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="mb-3">
              We use the information we collect for various purposes:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To allow you to participate in interactive features when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To fulfill any other purpose for which you provide information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="mb-3">
              We use cookies and similar tracking technologies to track activity on our website and store certain information.
              Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            <p className="mb-3">
              Types of cookies we use:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Necessary cookies:</strong> Essential for the website to function properly</li>
              <li><strong>Preference cookies:</strong> Allow the website to remember choices you have made</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant advertisements</li>
            </ul>
            <p className="mb-3">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you
              do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="mb-3">
              We may share your information with:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>Service Providers:</strong> We may employ third-party companies to facilitate our service, provide the service on our behalf, perform service-related functions, or assist us in analyzing how our service is used.</li>
              <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">6. Your Data Protection Rights</h2>

            <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">6.1 GDPR Rights (EU Users)</h3>
            <p className="mb-3">
              If you are a resident of the European Economic Area (EEA), you have certain data protection rights. You have the right to:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Withdraw consent</li>
            </ul>

            <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">6.2 CCPA Rights (California Residents)</h3>
            <p className="mb-3">
              If you are a California resident, you have the right to:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Request disclosure of the categories and specific pieces of personal information collected about you</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of the sale of your personal information</li>
              <li>Non-discrimination for exercising your CCPA rights</li>
            </ul>
            <p className="mb-3">
              To exercise these rights, please contact us at privacy@msdownloader.com.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">7. Data Security</h2>
            <p className="mb-3">
              The security of your data is important to us, but remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your
              personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">8. Third-Party Links</h2>
            <p className="mb-3">
              Our website may contain links to other sites that are not operated by us. If you click on a third-party link, you
              will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
            <p className="mb-3">
              We have no control over and assume no responsibility for the content, privacy policies, or practices of any
              third-party sites or services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="mb-3">
              Our service is not intended for use by children under the age of 13. We do not knowingly collect personally
              identifiable information from children under 13. If we discover that a child under 13 has provided us with
              personal information, we will immediately delete this from our servers.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-3">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
            <p className="mb-3">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="mb-3">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p className="font-medium">By email: privacy@msdownloader.com</p>
          </section>
        </div>

        <div className="text-center mt-8">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {currentYear} MS Downloader. All rights reserved.
          </p>
          <p className="mt-2">
            <Link to="/terms" className="text-blue-500 hover:underline mr-4">Terms & Conditions</Link>
            <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Privacy;
