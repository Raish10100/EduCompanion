import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice";

 
function CheckoutSuccess() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    // dispatch(getCourseLectures())
  }, [])
 
 
  return (
       <HomeLayout>
             <div className="min-h-[90vh] flex items-center justify-center text-white  dark:bg-transparent bg-[#e5e7eb]">

        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative dark:bg-[#253e6a] bg-white">
          <h1 className="bg-green-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment Successful
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-4">
            <div className="text-center space-y-6">
              <h2 className="text-lg font-semibold dark:text-white text-black">
              Welcome to the Pro Bundle
              </h2>
              <p className="text-center dark:text-white text-black ">
                Now you can enjoy the taste of learning from our vast library of
                courses from the top subject matter experts of the industry
              </p>
            </div>

            <AiFillCheckCircle className="text-5xl text-green-500" />
          </div>

          <Link
            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
            to={"/"}
          >
            <button>Go to Dashboard</button>
          </Link>
        </div>
      </div>
       </HomeLayout>
  );
 
 
};
 
export default CheckoutSuccess;