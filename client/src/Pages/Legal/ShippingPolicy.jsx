import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function ShippingPolicy() {
  return (
    <HomeLayout>
      <main className="dark:bg-transparent bg-[#e5e7eb] min-h-screen text-black dark:text-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Shipping Policy
          </h1>
          <section className="mb-8">
            <p className="mb-4">
              At EduCompanion, our courses are delivered digitally. Once a
              purchase is completed, access to the course materials will be
              granted instantly.
            </p>

            <h3 className="text-lg font-semibold mb-2">Access Issues</h3>
            <p className="mb-4">
              If you encounter any issues with accessing your course materials,
              please contact our support team at{" "}
              <a
                href="mailto:educompanion.it@gmail.com"
                className="hover:text-[#3c8ff4] underline text-blue-600 hover:underline transition-all duration-300 ease-in-out"
              >
                educompanion.it@gmail.com
              </a>
              . We are here to help and ensure you have a smooth learning
              experience.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              Refunds and Cancellations
            </h3>
            <p className="mb-4">
              For information on our refund and cancellation policy, please
              refer to our{" "}
              <Link
                to="/legal/refund-cancellation-policy"
                className="hover:text-[#3c8ff4] underline text-blue-600 hover:underline transition-all duration-300 ease-in-out"
              >
                Refund & Cancellation Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </HomeLayout>
  );
}

export default ShippingPolicy;
