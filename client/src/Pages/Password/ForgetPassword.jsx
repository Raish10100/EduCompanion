import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { isValidEmail } from "../../Helpers/RegexMatcher";
import { forgetPassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

function ForgetPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email id");
      return;
    }

    const res = await dispatch(forgetPassword({ email }));

    setEmail("");
  };

  return (
    <HomeLayout>
      <div className="flex justify-center items-center  py-10 dark:bg-[#12213b] bg-[#e5e7eb] h-[90vh] ">
        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[80%] sm:w-[50%] lg:w-[30%] vs:px-5  flex-col flex justify-center items-center  py-5 gap-4 rounded "
        >
          <h1 className="text-xl vs:text-3xl text-black dark:text-white font-bold ">
            Forget Password
          </h1>

          <div className="fields w-[90%] flex flex-col justify-center items-center mt-8 gap-6">
            <p className="text-black dark:text-white tracking-wide text-center">
              Enter your registered email, we will send you a verification link
              on your registered email from which you can reset your password.
            </p>
            <div className="w-[100%] flex flex-col gap-1">
              <label
                htmlFor="Email"
                className="text-start w-[100%] text-lg font-bold dark:text-white text-black"
              >
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                className=" px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-tight vs:tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] placeholder:text-sm vs:placeholder:text-xl dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl"
            >
              Send Email
            </button>
            <div className="flex gap-2 text-[12px] vs:text-lg">
              {isLoggedIn && (
                <div className="flex gap-2">
                  <p className="text-black dark:text-white">Back to profile?</p>
                  <Link
                    to={"/user/profile"}
                    className="link flex  gap-2 justify-center items-center text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out"
                  >
                    <p>Profile</p>
                  </Link>
                </div>
              )}

              {!isLoggedIn && (
                <div className="flex gap-2">
                  <p className="text-black dark:text-white">Back to login?</p>
                  <Link
                    to={"/login"}
                    className="link flex  gap-2 justify-center items-center text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out"
                  >
                    <p>Login</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgetPassword;
