import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function TermsAndConditions() {
  return (
    <HomeLayout>
      <main className="dark:bg-transparent bg-[#e5e7eb] min-h-screen text-black dark:text-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Terms and Conditions
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="mb-4">
            Welcome to <span className="font-bold">EduCompanion</span>. These Terms and Conditions govern your use of the Platform. By accessing or using the Platform, you agree to these Terms and Conditions in full. If you do not agree with any part of these terms, do not use the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              2. User Responsibilities
            </h2>
            <p className="mb-4">
              <strong>Account Registration:</strong> You agree to provide
              accurate and complete information when registering for an account
              on the Platform.
            </p>
            <p className="mb-4">
              <strong>Account Security:</strong> You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account.
            </p>
            <p className="mb-4">
              <strong>Content Usage:</strong> Content available on the Platform
              is for personal, non-commercial use. You may not distribute,
              modify, transmit, reuse, download, repost, copy, or use said
              content for commercial purposes without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Platform Usage</h2>
            <p className="mb-4">
              <strong>Access and Availability:</strong> The Platform strives to
              be available 24/7, but maintenance, updates, or technical issues
              may occasionally restrict access.
            </p>
            <p className="mb-4">
              <strong>Usage Restrictions:</strong> Users may not engage in any
              activity that disrupts or interferes with the Platform’s operation
              or security, or any networks connected to the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. User Conduct</h2>
            <p className="mb-4">
              <strong>Code of Conduct:</strong> Users agree to use the Platform
              in accordance with applicable laws and regulations.
            </p>
            <p className="mb-4">
              <strong>Prohibited Activities:</strong> Prohibited activities
              include but are not limited to: transmitting spam, distributing
              viruses or other harmful computer code, engaging in unlawful or
              fraudulent activities, or harassing others.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. Payments and Fees</h2>
            <p className="mb-4">
              <strong>Payment Terms:</strong> Users agree to pay all fees and
              charges incurred in connection with their use of the Platform.
            </p>
            <p className="mb-4">
              <strong>Subscription:</strong> Subscription fees, if applicable,
              are detailed during the sign-up process.
            </p>
            <p className="mb-4">
              <strong>Taxes:</strong> Users are responsible for any applicable
              taxes associated with their use of the Platform’s services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              6. Privacy and Data Protection
            </h2>
            <p className="mb-4">
              <strong >Privacy Policy:</strong> The Platform’s <Link to={"/legal/privacyandpolicy"} className="hover:text-[#3c8ff4] underline cursor-pointer text-blue-600 hover:underline transition-all duration-300 ease-in-out ">Privacy Policy</Link>
              explains how personal data is collected, used, and protected.
            </p>
            <p className="mb-4">
              <strong>Cookies:</strong> The Platform may use cookies and similar
              technologies to enhance user experience. Users may adjust browser
              settings to refuse cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              7. Disclaimers and Limitations of Liability
            </h2>
            <p className="mb-4">
              <strong>Content Accuracy:</strong> The Platform strives to provide
              accurate and up-to-date content but does not guarantee its
              accuracy.
            </p>
            <p className="mb-4">
              <strong>Third-Party Links:</strong> The Platform may contain links
              to third-party websites or resources. These links are provided for
              convenience only and do not imply endorsement.
            </p>
            <p className="mb-4">
              <strong>Limitation of Liability:</strong> In no event shall the
              Platform or its affiliates be liable for any indirect, incidental,
              special, consequential, or punitive damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              8. Termination and Suspension
            </h2>
            <p className="mb-4">
              <strong>Termination:</strong> The Platform reserves the right to
              suspend or terminate user accounts for violations of these Terms
              and Conditions or for any reason at its discretion.
            </p>
            <p className="mb-4">
              <strong>Effect of Termination:</strong> Upon termination, users
              lose access to the Platform and any associated content or
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              9. Contact Information
            </h2>
            <p className="mb-4">
              For questions or concerns regarding these Terms and Conditions,
              please contact us at:
            </p>
            <p className="mb-4">Email: <a href="mailto:educompanion.it@gmail.com" target='_blank' className="hover:text-[#3c8ff4] underline text-blue-600 hover:underline transition-all duration-300 ease-in-out " >educompanion.it@gmail.com</a></p>
          </section>
        </div>
      </main>
    </HomeLayout>
  );
}

export default TermsAndConditions;
