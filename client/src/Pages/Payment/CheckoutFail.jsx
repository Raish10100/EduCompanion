import { RxCrossCircled } from "react-icons/rx";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { useEffect } from "react";

 
function CheckoutFail() {
  
   
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [])
 
 
  return (
       <HomeLayout>
             <div className="min-h-[90vh] flex items-center justify-center text-white dark:bg-transparent bg-[#e5e7eb] px-2">

        <div className="sm:w-80 h-[22rem] sm:h-[26rem] flex flex-col w-[280px] justify-center items-center shadow-[0_0_10px_black] rounded-lg relative dark:bg-[#253e6a] bg-white">
          <h1 className="bg-red-500 absolute top-0 w-full text-center py-4 text-lg sm:text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-6 text-black dark:text-white">
            <p className="text-center ">
              <h2 className="sm:text-lg font-semibold mb-4">
                Oops! Your Payment Failed
              </h2>
              Please try it again as it can be a temporary issue.
            </p>

            <RxCrossCircled className="text-5xl text-red-500" />

            <p>Failed</p>
          </div>

          <Link
            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-lg sm:text-2xl font-bold rounded-bl-lg rounded-br-lg"
            to={"/checkout"}
          >
            <button>Try again</button>
          </Link>
        </div>
      </div>
       </HomeLayout>
  );
 
 
};
 
export default CheckoutFail;