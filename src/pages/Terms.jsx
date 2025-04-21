import React, { useContext } from 'react';
import { ThemeContext } from '../App';

function Terms() {
  const { darkMode } = useContext(ThemeContext);

  const currentYear = new Date().getFullYear();

  return (
    <div className="py-6">
      <header className="w-full">
        <div className="max-w-4xl mx-auto text-center py-6 md:py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Terms <span className="text-orange-500">&</span> Conditions
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
              Welcome to MS Downloader. These Terms and Conditions govern your use of our website, services, and any
              related applications ("Service").
            </p>
            <p className="mb-3">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
              of the terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">2. Use of the Service</h2>
            <p className="mb-3">
              Our Service allows you to download, convert, and process media files from various online sources. You
              agree to use the Service only for lawful purposes and in accordance with these Terms.
            </p>
            <p className="mb-3">
              You are responsible for ensuring that your use of the Service:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Complies with all applicable laws and regulations</li>
              <li>Does not infringe on the intellectual property rights of others</li>
              <li>Does not violate the terms of service of the source platforms</li>
              <li>Is for personal, non-commercial use only unless otherwise specified</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">3. Intellectual Property</h2>
            <p className="mb-3">
              3.1. <strong>Our Service:</strong> The Service and its original content, features, and functionality are owned by
              MS Downloader and are protected by international copyright, trademark, patent, trade secret,
              and other intellectual property laws.
            </p>
            <p className="mb-3">
              3.2. <strong>User Responsibility:</strong> You acknowledge that all third-party content you access or download
              through the Service may be protected by copyrights, trademarks, or other intellectual property rights.
              You are solely responsible for obtaining the proper permissions or licenses for any content
              you download using our Service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">4. Disclaimer</h2>
            <p className="mb-3">
              4.1. Our Service is provided "as is" and "as available" without warranties of any kind, either express or
              implied, including, but not limited to, implied warranties of merchantability, fitness for a particular
              purpose, non-infringement, or course of performance.
            </p>
            <p className="mb-3">
              4.2. We do not warrant that the Service will function uninterrupted, secure, or available at any particular
              time or location, or that any errors or defects will be corrected.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p className="mb-3">
              In no event shall MS Downloader, its directors, employees, partners, agents, suppliers, or affiliates
              be liable for any indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">6. Privacy Policy</h2>
            <p className="mb-3">
              Your use of our Service is also governed by our Privacy Policy, which outlines how we collect, use,
              and protect your personal information. By using our Service, you consent to the practices described
              in our Privacy Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">7. Changes to Terms and Service</h2>
            <p className="mb-3">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material
              change will be determined at our sole discretion.
            </p>
            <p className="mb-3">
              We also reserve the right to modify, suspend, or discontinue the Service, temporarily or permanently,
              without prior notice.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">8. Contact Us</h2>
            <p className="mb-3">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="font-medium">support@msdownloader.com</p>
          </section>
        </div>

        <div className={`text-center mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© {currentYear} MS Downloader. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}

export default Terms;
