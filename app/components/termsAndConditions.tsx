"use client";
import React, { useEffect } from "react";
// import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
// import Link from "next/link";

const TermsAndPrivacy = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="tAndC">
        <h1 id="use">Terms of Use</h1>

        <h3>1. Introduction</h3>
        <p>
          Welcome to FreeTaxHistory.com. These Terms of Use govern your use of
          our website, and by accessing or using the site, you agree to comply
          with and be bound by these terms. If you do not agree to these terms,
          please do not use our website.
        </p>

        <h3>2. Use of the Website</h3>
        <p>
          You may use the website only for lawful purposes and in accordance
          with these Terms. You agree not to:
          <br />
          · Use the website in any way that violates applicable local, state, or
          federal laws.
          <br />
          · Attempt to gain unauthorized access to our systems or networks.
          <br />· Use any automated systems to scrape, download, or extract data
          from the website without prior written consent.
        </p>
        <h3>3. Services</h3>
        <p>
          FreeTaxHistory.com provides tax-related services, including access to
          tax history information and related content. All services provided are
          subject to availability and may be modified or discontinued at our
          discretion.
        </p>
        <h3>4. User Account</h3>
        <p>
          To access certain features or services, you may be required to create
          an account. You agree to provide accurate and complete information and
          to keep your account information secure. You are responsible for all
          activities under your account.
        </p>
        <h3>5. Content</h3>
        <p>
          All content on the website, including text, images, graphics, and
          logos, is owned by or licensed to FreeTaxHistory.com and is protected
          by copyright laws. You may not reproduce, distribute, or create
          derivative works of any content from the website without our express
          written consent.
        </p>
        <h3>6. Disclaimers</h3>
        <p>
          While we strive to provide accurate and up-to-date information,
          FreeTaxHistory.com makes no warranties, express or implied, regarding
          the accuracy or completeness of the content. We disclaim any liability
          for errors or omissions in the content, or for any damages arising
          from the use of the site.
        </p>
        <h3>7. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, FreeTaxHistory.com shall not
          be liable for any indirect, incidental, special, or consequential
          damages, including loss of data or business interruptions, resulting
          from the use or inability to use the website.
        </p>

        <h3>8. Indemnification</h3>
        <p>
          You agree to indemnify and hold harmless FreeTaxHistory.com, its
          affiliates, officers, employees, and agents from any claims, damages,
          losses, or expenses arising from your use of the website or violation
          of these Terms.
        </p>
        <h3>9. Changes to Terms</h3>
        <p>
          We reserve the right to modify these Terms at any time. Any changes
          will be posted on this page, and your continued use of the website
          after such changes signifies your acceptance of the updated Terms.
        </p>
        <h3>10. Governing Law</h3>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the state of California. Any disputes arising from these Terms
          shall be resolved in the courts located in Tustin, CA. ---
        </p>

        <h1 id="privacy">Privacy Policy</h1>

        <h3>1. Introduction</h3>
        <p>
          This Privacy Policy explains how FreeTaxHistory.com collects, uses,
          and protects your personal information. By using our website, you
          agree to the terms of this policy.
        </p>
        <h3>2. Information We Collect</h3>

        <p>
          We may collect personal information, including but not limited to:
          <br />
          · Personal Identification Information: Name, email address, phone
          number, and mailing address.
          <br />· Non-Personal Information: Browser type, IP address, and
          website usage data.
        </p>
        <h3>3. How We Use Your Information</h3>
        <p>
          We use the information we collect for:
          <br />
          · Providing and improving our services.
          <br />
          · Responding to your inquiries and providing customer support.
          <br />
          · Sending promotional emails about new products or services that may
          interest you (with your consent).
          <br />· Complying with legal obligations.
        </p>
        <h3>4. Sharing of Your Information</h3>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information with trusted service providers
          who assist us in operating the website, conducting our business, or
          servicing you, so long as those parties agree to keep this information
          confidential.
        </p>
        <h3>5. Security of Your Information</h3>
        <p>
          We use a variety of security measures to maintain the safety of your
          personal information. However, no method of electronic transmission or
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your personal information, we cannot guarantee its
          absolute security.
        </p>

        <h3>6. Cookies and Tracking Technologies</h3>
        <p>
          We may use cookies, web beacons, and similar technologies to enhance
          your user experience. Cookies help us remember your preferences and
          track usage patterns. You can control cookie settings through your
          browser.
        </p>
        <h3>7. Third-Party Links</h3>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the content or privacy practices of these sites and
          encourage you to review their privacy policies.
        </p>
        <h3>8. Your Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal
          information. If you wish to exercise these rights, please contact us
          at info@freetaxhistory.com.
        </p>
        <h3>9. Children&apos;s Privacy</h3>
        <p>
          Our website is not intended for children under the age of 13. We do
          not knowingly collect personal information from children. If we become
          aware that a child under 13 has provided us with personal information,
          we will take steps to delete that information.
        </p>
        <h3>10. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and your continued use of the website
          signifies your acceptance of the updated policy.
        </p>
        <h3>11. Contact Information</h3>
        <h4>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </h4>
        <p>
          Email: info@freetaxhistory.com
          <br />
          Phone: (800) 805-3310
          <br />
          Address: 1810 E Sahara Ave Suite 334
          <br />
          Las Vegas, NV 89104
        </p>
      </div>
    </>
  );
};

export default TermsAndPrivacy;
