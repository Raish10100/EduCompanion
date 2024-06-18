import HomeLayout from "../../Layouts/HomeLayout";

function PrivacyPolicy() {
  return (
    <HomeLayout>
      <main className="dark:bg-transparent bg-[#e5e7eb] min-h-screen text-black dark:text-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="mb-4">
              Welcome to <span className="font-bold">EduCompanion</span>. This
              Privacy Policy governs the manner in which we collect, use,
              maintain, and disclose information collected from users of our
              website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              2. Information Collection
            </h2>
            <p className="mb-4">
              We may collect personal identification information from Users in a
              variety of ways, including, but not limited to, when Users visit
              our site, fill out a form, and in connection with other
              activities, services, features or resources we make available on
              our Site.
            </p>
            <p className="mb-4">
              Users may be asked for, as appropriate, name, email address,
              mailing address. Users may, however, visit our Site anonymously.
              We will collect personal identification information from Users
              only if they voluntarily submit such information to us. Users can
              always refuse to supply personally identification information,
              except that it may prevent them from engaging in certain Site
              related activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Data Usage</h2>
            <p className="mb-4">
              We may use the information we collect for the following purposes:
            </p>
            <ul className="list-disc ml-8 mb-4">
              <li>To personalize user experience</li>
              <li>To give authority to access our Comprehensive courses.</li>
              <li>To facilitate sending reset password emails.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. Data Protection</h2>
            <p className="mb-4">
              We employ rigorous data collection, storage, and processing
              practices along with robust security measures to safeguard your
              personal information, including usernames, passwords, transaction
              details, and other data stored on our site. Our security features
              include encryption of passwords, ensuring that even administrators
              cannot access your password.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
            <p className="mb-4">
              Our Site may use "cookies" to enhance user experience. User's web
              browser places cookies on their hard drive for record-keeping
              purposes and sometimes to track information about them. Users may
              choose to set their web browser to refuse cookies, or to alert you
              when cookies are being sent. If they do so, note that some parts
              of the Site may not function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">6. User Rights</h2>
            <p className="mb-4">
              Users have the right to access their data from the profile page,
              edit their information, cancel subscriptions, and change
              passwords. Additionally, if a user forgets their password, they
              can utilize the reset password option available on the login page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">7. Changes to Policy</h2>
            <p className="mb-4">
              We have the right to update this privacy policy at any time. We
              encourage Users to frequently check this page for any changes. You
              acknowledge and agree that it is your responsibility to review
              this privacy policy periodically and become aware of
              modifications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Contact Information
            </h2>
            <p className="mb-4">
              For questions or concerns regarding this Privacy Policy, please
              contact us at:
            </p>
            <p className="mb-4">
              Email:{" "}
              <a
                href="mailto:educompanion.it@gmail.com"
                target="_blank"
                className="hover:text-[#3c8ff4] underline text-blue-600 hover:underline transition-all duration-300 ease-in-out"
              >
                educompanion.it@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </HomeLayout>
  );
}

export default PrivacyPolicy;
