import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { FaUserCircle } from "react-icons/fa";
import {Link, useNavigate}  from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

 
function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userData = useSelector(state => state?.auth?.data);

    async function handleCancellation() {

      if(userData.email == 'guest@edu-companion.online'){
        toast.error("You are not authorized to cancel subscription as this is a guest account");
        return;
      }


      // toast("Initiating cancellation")
      await dispatch(cancelCourseBundle());
      await dispatch(getUserData());
      // toast.success("Cancellation completed!")
      navigate("/");
    }

  return (
       <HomeLayout>
          <div className="flex justify-center items-center  py-10 dark:bg-[#12213b] bg-[#e5e7eb] h-[90vh] ">
            <main
              
              className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[90%] sm:w-[60%] lg:w-[45%] xl:w-[35%]   flex-col flex justify-center items-center pb-4 sm:py-5 sm:gap-4 rounded "
            >
              { userData.avatar.secure_url === "random" ? <FaUserCircle className="w-full rounded-full dark:text-white text-black pt-2" size="100" /> : <img src={userData.avatar.secure_url}  className="rounded-full w-[100px] h-[100px] text-black pt-2  border-black " />}
              <div className="fields w-[90%] flex flex-col justify-center items-center gap-4 sm:gap-6">
                <div className="w-[100%] flex flex-col  gap-0">
                <label htmlFor="Name" className="text-start w-[100%] text-sm  dark:text-white text-black">Username</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    disabled
                    className=" py-1 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-lg sm:text-xl font-bold  border-b-2  bg-transparent placeholder:text-black placeholder:dark:text-white"
                    value={userData.fullName}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-0">
                  <label htmlFor="Email" className="text-start w-[100%]  text-sm dark:text-white text-black">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    className=" py-1 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  font-bold  border-b-2  bg-transparent placeholder:text-black placeholder:dark:text-white"
                    value={userData.email}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-0">
                  <label htmlFor="Subscription" className="text-start w-[100%]  text-sm dark:text-white text-black">Subscription</label>
                  <input
                    type="Subscription"
                    name="Subscription"
                    id='Subscription'
                    disabled
                    className=" py-1 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-lg sm:text-xl font-bold  border-b-2  bg-transparent placeholder:text-black placeholder:dark:text-white"
                    value={userData?.subscription?.status || "Inactive"}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-0">
                  <label htmlFor="Role" className="text-start w-[100%]  text-sm dark:text-white text-black">Role</label>
                  <input
                    type="role"
                    name="role"
                    id='role'
                    disabled
                    className=" py-1 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-lg sm:text-xl font-bold  border-b-2  bg-transparent placeholder:text-black placeholder:dark:text-white"
                    value={userData?.role}
                  />
                </div>
              <div className="flex justify-between w-[100%] gap-2 mt-[10px]">
                  <button   className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-1 w-[50%] dark:text-black font-semibold text-md sm:text-xl">
                    <Link to={"/user/changepassword"}>Change Password</Link>
                  </button>
                  <button   className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-1 w-[50%] dark:text-black font-semibold text-md sm:text-xl">
                  <Link to={"/user/editprofile"}>Edit Profile</Link>
                  </button>
              </div>
                {
                  userData?.subscription?.status === "active"
                    &&
                  <button  type="submit" onClick={handleCancellation}  className="signup-btn mt-[-10px] bg-[#f74c4ce5] hover:bg-[#e36666f3] bg-[#000000] rounded text-white  active:bg-[#e3666688] transition-all ease-in-out duration-300 border-none px-3 py-1 w-[100%] dark:text-white font-semibold text-md sm:text-xl">
                  Cancel Subscription
                  </button>
                  
                }
              </div>
            </main>
           </div>
       </HomeLayout>
  );
 
 
};
 
export default Profile;