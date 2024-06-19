import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaBriefcase, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="dark:bg-[#12213b] border-t-2 bg-gray-200 border-gray-500 py-7 z-0 ">
      <section className="relative left-0 bottom-0 py-5 flex flex-col sm:flex-row sm:gap-6 gap-12 flex-wrap items-start justify-between text-[#000000] dark:text-white sm:px-20">
        <section className="flex flex-col gap-6 justify-center sm:items-start items-center">
          <p className="Logo font-semibold text-3xl">EduCompanion</p>
          <p className="text-center sm:text-start">
            Empower Your Learning Journey with Our <br /> Comprehensive Courses
          </p>
        </section>
        <section className="flex flex-col gap-3 justify-center items-center sm:items-start">
          <h2 className="font-bold text-2xl">Quick Links</h2>
          <ul className="flex flex-col sm:items-start items-center gap-3 mt-3">
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/courses"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 justify-center items-center sm:items-start">
          <h2 className="font-bold text-2xl">Legal</h2>
          <ul className="flex flex-col sm:items-start items-center gap-3 mt-3">
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/legal/refund-cancellation-policy"
              >
                Refund & Cancellation Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/legal/privacy-and-policy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/legal/terms-and-conditions"
              >
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
                to="/legal/shipping-policy"
              >
                Shipping Policy
              </Link>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 justify-center items-center sm:items-start">
          <h2 className="font-bold text-2xl ">GET IN TOUCH</h2>
          <p className="mt-3">
            <a
              href="mailto:educompanion.it@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
            >
              educompanion.it@gmail.com
            </a>
          </p>
          <p className="">
            <a
              href="tel:+919426316486"
              className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
            >
              +91 9426316486
            </a>
          </p>
          <p className="text-center sm:text-left">
            <a
              href="https://www.google.com/maps?q=Wankaner,+Morbi,+Gujarat,+363621,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3c8ff4] underline text-blue-600 transition-all duration-300 ease-in-out"
            >
              EduCompanion, Wankaner, Morbi, <br /> Gujarat, 363621, India
            </a>
          </p>
          <section className="socials flex justify-center items-center flex-wrap  gap-2 text-2xl text-white">
            <a
              href="https://github.com/Raish10100/EduCompanion"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3c8ff4] transition-all ease-in-out duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/raish-vadaviya-439213289/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3c8ff4] transition-all ease-in-out duration-300"
            >
              <FaBriefcase />
            </a>
            <a
              href="https://www.linkedin.com/in/raish-vadaviya-439213289/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3c8ff4] transition-all ease-in-out duration-300"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://x.com/RaishVadaviya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3c8ff4] transition-all ease-in-out duration-300"
            >
              <BsTwitter />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3c8ff4] transition-all ease-in-out duration-300"
            >
              <BsFacebook />
            </a>
          </section>
        </section>
      </section>
      <section className="copyright text-lg text-[#000] dark:text-white text-center mt-16">
        © {new Date().getFullYear()}
        <a
          className="hover:text-[#3c8ff4] underline font-bold text-blue-600 transition-all duration-300 ease-in-out"
          href="https://www.linkedin.com/in/raish-vadaviya-439213289/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Raish Vadaviya
        </a>
        . All rights reserved
      </section>
    </footer>
  );
}

export default Footer;
