import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store login data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false)

  // function to set the login data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // login handler function
  const onLogin = async (event) => {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    setIsLoading(true)
    // dispatch "login" AsyncThunk
    const response = await dispatch(login(loginData));
    // console.log(response);
    setIsLoading(false)
    if (response?.payload?.success) {
      setLoginData({
        email: "",
        password: "",
      });
      navigate("/");
    }
  };

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[90vh] dark:bg-[#12213b] bg-[#e5e7eb] ">
        <form
          onSubmit={onLogin}
          noValidate
          className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[90%] sm:w-[60%] lg:w-[45%] xl:w-[35%]  flex-col flex justify-center items-center py-3 sm:gap-6 rounded"
        >
          <h1 className="text-[23px] vs:text-3xl text-black dark:text-white pb-3 font-bold">
            LogIn
          </h1>
          <div className="fields w-[90%] flex flex-col justify-center items-center gap-3">
            <div className="w-[100%] flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-start w-[100%] sm:text-xl font-bold dark:text-white text-black"
              >
                Email
              </label>
              <input
                required
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                className="px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-sm sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                value={loginData.email}
                onChange={handleUserInput}
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-start w-[100%]  sm:text-xl font-bold dark:text-white text-black"
              >
                Password
              </label>
              <input
                required
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                className="px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-sm sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                value={loginData.password}
                onChange={handleUserInput}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl"
            >
              { isLoading ? "Processing..." : "LogIn"}
            </button>
            <div className="flex flex-col mt-3 gap-2">
              <p
                className="text-black dark:text-white text-sm sm:text-lg text-center"
                onClick={() =>
                  setLoginData({
                    email: "guest@edu-companion.online",
                    password: "Gu3st!Edu$2024",
                  })
                }
              >
                For quick access, use our{" "}
                <Link className="link text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out">
                  Guest login
                </Link>
              </p>
              <p
                className="text-black dark:text-white text-sm sm:text-lg text-center"
              >
                Want to be an ADMIN{" "}
                <a className="link text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out" href="https://www.explore.edu-companion.online" target="_blank">
                  ADMIN login
                </a>
              </p>
              <p className="text-black dark:text-white sm:text-lg text-sm">
                Want to create account ?{" "}
                <Link
                  to={"/signup"}
                  className="link text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Signup
                </Link>
              </p>
              <p className="text-black dark:text-white sm:text-lg text-sm">
                forget password ?{" "}
                <Link
                  to={"/forgetpassword"}
                  className="link text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out"
                >
                  forget password
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
