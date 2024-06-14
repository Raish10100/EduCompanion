import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { changePassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userPasswords, setUserPasswords] = useState({
        oldPassword: "",
        newPassword: ""
    })


    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setUserPasswords({
            ...userPasswords,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();


        
        if (!userPasswords.oldPassword || !userPasswords.newPassword) {
            toast.error("All fields are mandatory");
            return;
            }
        if(userPasswords.oldPassword == userPasswords.newPassword) {
            toast.error("New password must be different from the old assword");
            return
        }
  
      if ( userPasswords.newPassword.length < 8 || userPasswords.newPassword.length > 16 ) {
        toast.error(
          "Password length must be between 8 and 16 characters "
        );
        return;
      }

      const res = await dispatch(changePassword(userPasswords));

      
      if (res.payload.success) {
        setUserPasswords({
          oldPassword: "",
          newPassword: "",
        });

        navigate("/user/profile")
    };
  
    }


  return (
    <HomeLayout>
      <div className="flex justify-center items-center  py-10 dark:bg-[#12213b] bg-[#e5e7eb] h-[90vh] ">
        <form
            onSubmit={handleFormSubmit}
            noValidate
          className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[80%] sm:w-[50%] lg:w-[30%] px-5  flex-col flex justify-center items-center  py-5 gap-4 rounded "
        >
          <h1 className="text-xl vs:text-3xl text-black dark:text-white font-bold ">
            Change Password
          </h1>

          <div className="fields w-[90%] flex flex-col justify-center items-center mt-8 gap-6">
            <div className="w-[100%] flex flex-col gap-1">
              <label
                htmlFor="Name"
                className="text-start w-[100%] text-lg font-bold dark:text-white text-black"
              >
                Current Password
              </label>
              <input
                required
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter your current password"
                className=" px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-tight vs:tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
              <label
                htmlFor="Name"
                className="text-start w-[100%] text-lg  font-bold dark:text-white text-black"
              >
                New Password
              </label>
              <input
                required
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter your new password"
                className=" px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 vs:tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:text-sm vs:placeholder:text-xl tracking-tight placeholder:dark:text-white"
                onChange={handlePasswordChange}
              />
            </div>

            <button
              type="submit"
              className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] placeholder:text-sm vs:placeholder:text-xl dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl"
            >
              Change
            </button>
            <div className="flex gap-2 text-[12px] vs:text-lg">
              <p>Forget password ? </p>
              <Link
                to={"/forgetpassword"}
                className="link flex  gap-2 justify-center items-center text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out"
              >
                <p>Reset Password</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
