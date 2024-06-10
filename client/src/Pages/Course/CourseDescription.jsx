import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data, role } = useSelector((state) => state.auth);

  useEffect(() => {}, []);
  return (
    <HomeLayout>
      <section className=" md:pt-12 pt-2 px-4 lg:px-20 flex flex-col bg-[#e5e7eb] dark:bg-transparent  text-black dark:text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 pb-[100px] relative">
          <div className="lg:col-span-1 space-y-5">
            <img
              className="sm:w-[40%]  lg:w-[30vw] rounded-md shadow-md"
              alt="thumbnail"
              src={state?.thumbnail?.secure_url}
            />

            <div className="space-y-4">
              <div className="flex flex-col text-lg ">
                <p className="font-semibold">
                  <span className="text-[#2f71c1]  font-bold">
                    Total lectures:{" "}
                  </span>
                  {state?.numberOfLectures}
                </p>

                <p className="font-semibold">
                  <span className="text-[#2f71c1] text-xl font-bold">
                    Instructor:{" "}
                  </span>
                  {state?.createdBy}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4 text-lg  flex flex-col justify-between ">
            <h1 className="md:text-3xl text-2xl lg:text-4xl font-bold  text-[#2f71c1] mb-5 text-center w-fit  relative ">
              {state?.title}
            </h1>

            <div className="space-y-5 flex flex-col flex-between">
              <h2 className="text-2xl text-gray-800 dark:text-white font-[600] font-inter">
                Course description:
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-[500] ">
                {state?.description}
              </p>
            </div>

            {role === "ADMIN" || data?.subscription?.status === "active" ? (
              <button
                onClick={() =>
                  navigate("/course/displaylectures", { state: { ...state } })
                }
                className="bg-[#2f71c1] hover:bg-[#2f71c1bc] text-white text-xl rounded-md font-bold px-5 w-full py-3   transition-all ease-in-out duration-300"
              >
                Watch lectures
              </button>
            ) : (
              <button
                onClick={() => navigate("/checkout")}
                className="bg-[#2f71c1] hover:bg-[#2f71c1bc] text-white text-xl rounded-md font-bold px-5 py-3 w-full    transition-all ease-in-out duration-300"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}

export default CourseDescription;
