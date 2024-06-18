import HomeLayout from "../../Layouts/HomeLayout";

function RefundCancellationPolicy() {
  return (
    <HomeLayout>
      <main className="dark:bg-transparent bg-[#e5e7eb] min-h-screen text-black dark:text-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Refund & Cancellation Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="mb-4">
              This Refund & Cancellation Policy provides the specific terms and
              conditions under which users of our platform may cancel
              subscriptions and request refunds.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              2. Subscription Cancellation
            </h2>
            <p className="mb-4">
              Users may cancel their subscriptions at any time by accessing
              their profile page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Refund Policy</h2>
            <p className="mb-4">
              Refunds will be issued under the following circumstances:
            </p>
            <ul className="list-disc ml-8 mb-4">
              <li>
                Users are eligible for a refund if they cancel their
                subscription within 14 days of purchase. Refund will be
                processed automatically upon unsubscribing within this period.
              </li>
              <li>
                Refunds are not available for cancellations made after this
                period.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              4. Contact Information
            </h2>
            <p className="mb-4">
              For questions or concerns regarding our Refund & Cancellation
              Policy, please contact us at:
            </p>
            <p className="mb-4">
              Email:{" "}
              <a
                href="mailto:educompanion.it@gmail.com"
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

export default RefundCancellationPolicy;
