import { Link, useNavigate, useParams } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

 
function ResetPassword() {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        password: "",
        cnfPassword: "",
        resetToken: useParams().resetToken   
    });

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        const newData = { ...data, [name] : value }
        setData(newData);
    }
 

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    

        if(!data.resetToken) {
            toast.error("You are not authorized to do this action")
        }

        if (!data.password || !data.cnfPassword) {
          toast.error("All fields are mandatory");
          return;
        }
    
        console.log(data)
        if (data.password.length < 8 || data.password.length > 16) {
          toast.error(
            "Password length must be between 8 and 16 characters."
          );
          return;
        }

    
        if (data.password !== data.cnfPassword) {
          toast.error("Both password should be same");
          return;
        }
    
        const res = await dispatch(resetPassword(data));
    
        if (res.payload.success) {
          navigate("/login");
        }
      };





  return (
       <HomeLayout>
             <div className="flex justify-center items-center  py-10 dark:bg-[#12213b] bg-[#e5e7eb] h-[90vh] ">
        <form
            onSubmit={handleFormSubmit}
            noValidate
          className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[90%] sm:w-[60%] lg:w-[45%] xl:w-[35%]  px-5  flex-col flex justify-center items-center  py-5 gap-4 rounded "
        >
          <h1 className="text-xl vs:text-3xl text-black dark:text-white font-bold ">
            Reset Password
          </h1>

          <div className="fields w-[90%] flex flex-col justify-center items-center mt-8 gap-6">
            <div className="w-[100%] flex flex-col gap-1">
              <label
                htmlFor="Name"
                className="text-start w-[100%] text-lg font-bold dark:text-white text-black"
              >
               New Password
              </label>
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Enter your new password"
                className=" px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-tight vs:tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                onChange={handleUserInput}
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
              <label
                htmlFor="cnfPassword"
                className="text-start w-[100%] text-lg font-bold dark:text-white text-black"
              >
                Confirm Password
              </label>
              <input
                required
                type="password"
                name="cnfPassword"
                id="cnfPassword"
                placeholder="Confirm your new password"
                className=" px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-tight vs:tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                onChange={handleUserInput}
              />
            </div>
            

            <button
              type="submit"
              className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] placeholder:text-sm vs:placeholder:text-xl dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl"
            >
              Reset
            </button>
            
          </div>
        </form>
      </div>
       </HomeLayout>
  );
 
 
};
 
export default ResetPassword;