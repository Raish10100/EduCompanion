import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
import Drawer from "../Pages/Drawer";
import { CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, role } = useSelector((state) => state?.auth);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  // console.log(darkMode);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  // console.log(darkMode)

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // handle for navbar sub-menu
  const handleMouseEnter = () => {
    setIsSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubmenuOpen(false);
  };

  function addActiveClass() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("active-link");
      }
    });
  }

  // logout handler
  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    if (res?.payload?.success) {
      navigate("/");
    }
  }

  useEffect(() => {
    const element = document.querySelector("html");
    element.classList.remove("light", "dark");
    if (darkMode || localStorage.theme == undefined) {
      // console.log("darkMode");
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      console.log("lightMode");
      element.classList.add("light");
      localStorage.setItem("theme", "light");
    }

    addActiveClass();
  }, [darkMode, location]);

  return (
    <nav className="sticky top-0 z-50  flex justify-between items-center px-[10px] md:px-[20px] py-[20px]  bg-[#e5e7eb] dark:bg-[#12213b] text-white border-b-2 border-gray-600 ">
      <p className="Logo font-semibold text-2xl vs:text-3xl order-2 dark:text-[#fff] text-[#12213b]">
        EduCompanion
      </p>
      <div className="theme-mode flex lg:gap-7 items-center order-3 ">
        {darkMode ? (
          <CiLight
            onClick={() => toggleDarkMode()}
            className="cursor-pointer dark:text-[#fff] text-[#12213b] hover:bg-[#24324c9f] py-2 text-[45px] lg:text-[40px] transition-all ease-in-out duration-300 rounded-sm"
          />
        ) : (
          <MdOutlineDarkMode
            onClick={() => toggleDarkMode()}
            className="cursor-pointer dark:text-[#fff] text-[#12213b] hover:bg-[#12213b3e] py-2 lg:text-[40px] text-[45px]  transition-all ease-in-out duration-300 rounded-sm"
          />
        )}
        <ul className="lg:flex nav-hidden gap-5 nav-links">
          <li>
            <Link
              className="hover:text-[#3c8ff4]  transition-all text-sm duration-300 ease-in-out nav-link  hover:py-4 py-[14px] hover:border-b-2 border-[#3c8ff4]  "
              to={"/"}
            >
              Home
            </Link>
          </li>

          {isLoggedIn && role === "ADMIN" && (
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link className="admin-submenu  dark:hover:text-[#3c8ff4] hover:text-[#3c8ff4] dark:text-white text-black  transition-all text-sm duration-300 ease-in-out nav-link py-8 ">
                Admin Panel
               {
                !isSubmenuOpen  &&  <MdArrowDropDown className="inline text-xl ml-[-1px] font-bold " />
               }
               {
                isSubmenuOpen &&  <IoMdArrowDropup className="inline text-xl ml-[-1px] font-bold " />
               }
              </Link>
              {isSubmenuOpen && (
                <ul className="absolute left-[-20px] mt-1 w-[160px] pl-6 py-2 space-y-2    dark:bg-[#213049] bg-[#b3b4b7] shadow-lg rounded border-2 border-black  dark:border-white">
                  <li>
                    <Link
                      className="hover:text-[#3c8ff4]   transition-all text-sm duration-300 ease-in-out nav-link text-center w-full"
                      to={"/admin/dashboard"}
                    >
                      Admin<span className="ml-[3px]">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#3c8ff4]    transition-all text-sm duration-300 ease-in-out nav-link text-center"
                      to={"/course/create"}
                    >
                      Create<span className="ml-[3px]">Course</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          <li>
            <Link
              className="hover:text-[#3c8ff4]  transition-all text-sm duration-300 ease-in-out  nav-link hover:py-4 py-[14px] hover:border-b-2 border-[#3c8ff4]"
              to={"/courses"}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-[#3c8ff4]  transition-all text-sm duration-300 ease-in-out  nav-link hover:py-4 py-[14px] hover:border-b-2 border-[#3c8ff4]"
              to={"/about"}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-[#3c8ff4]  transition-all text-sm duration-300 ease-in-out  nav-link hover:py-4 py-[9px] hover:border-b-2 border-[#3c8ff4]"
              to={"/contact"}
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="lg:flex nav-hidden gap-3">
          {isLoggedIn ? (
            <button>
              <Link
                onClick={handleLogout}
                className=" hover:border-gray-500 border-gray-100 border-2 text-sm transition-all ease-in-out duration-300 text-[#3c8ff4] px-4 py-[6px] rounded-sm hover:bg-[#4076d330]"
              >
                LogOut
              </Link>
            </button>
          ) : (
            <button>
              <Link
                className=" hover:border-gray-500 border-gray-100 border-2 text-sm transition-all ease-in-out duration-300 text-[#3c8ff4] px-4 py-[6px] rounded-sm hover:bg-[#4076d330]"
                to={"/login"}
              >
                LogIn
              </Link>
            </button>
          )}
          {isLoggedIn ? (
            <button>
              <Link
                className="bg-[#3c8ff4] hover:bg-[#3c6df4db] transition-all text-sm ease-in-out duration-300 text-white px-4 py-2 rounded-sm "
                to={"/user/profile"}
              >
                Profile
              </Link>
            </button>
          ) : (
            <button>
              <Link
                className="bg-[#3c8ff4] hover:bg-[#3c6df4db] transition-all text-sm ease-in-out duration-300 text-white px-4 py-2 rounded-sm "
                to={"/signup"}
              >
                SignUp
              </Link>
            </button>
          )}
        </div>
      </div>
      <Drawer />
    </nav>
    
  );
}

export default Navbar;
