import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state?.lecture);
  console.log(lectures)
  const { role } = useSelector((state) => state?.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  const vidSrc = lectures.length > 0  ? lectures?.[currentVideo]?.lecture?.secure_url : ""

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <section className="flex flex-col  items-center bg-[#e5e7eb] dark:bg-transparent  py-0 px-0 h-[90vh] overflow-y-scroll sm:justify-center">
        <div className="flex flex-col  bg-[#c2c5cb] dark:bg-[#213049] relative md:gap-8 gap-5 rounded md:py-10 md:pt-3 py-0 pt-3 md:px-7 px-0 md:w-[90%] lg:w-[70%] xl:w-[1100px] md:h-[90%] w-full h-full overflow-y-hidden shadow-custom dark:shadow-xl">
          <h1 className="text-center relative  px-3 w-fit text-[#3c8ff4] md:text-2xl text-lg font-bold ">
            Course:{" "} 
            <span className="text-black dark:text-white ">
              {state?.title}
            </span>
          </h1>
          {/* parent of left and right section */}
          <div className="flex md:flex-row flex-col md:justify-between w-full h-full justify-between">
            {/* left section for video */} 
            <div className="md:w-[48%] w-full md:p-3 p-1 overflow-y-scroll md:h-full h-[70%] flex justify-center shadow-xl ">
              <div className="w-full h-[270px] ">
                <video
                  src={vidSrc}
                  // src={
                  //   lectures && lectures[currentVideo].lecture.secure_url
                  // }
                  disablePictureInPicture
                  disableRemotePlayback 
                  controls
                  controlsList="nodownload"
                  className="w-[90%] h-[80%] vs:w-[80%] sm:w-full sm:h-auto  m-auto "
                ></video>
                <div className="py-7 px-2">
                  <h1 className="text-[17px] text-black font-[500] dark:text-white ">
                    <span className="text-[#3c8ff4] font-semibold text-lg">
                      {" "}
                      Title:{" "}
                    </span>
                    {lectures && lectures?.[currentVideo]?.title}
                  </h1>
                  <p className="text-[16.5px] pb-12 text-black font-[500] dark:text-white font-lato">
                    <span className="text-[#3c8ff4] text-lg">
                      Description:{" "}
                    </span>
                    {lectures && lectures?.[currentVideo]?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* right section for lectures list */}
            <div className="md:w-[44%]  md:flex-row flex-col h-[100%]  w-full md:h-full overflow-y-scroll md:overflow-y-auto shadow-xl">
              <ul className="w-full md:px-2 md:pt-0 flex flex-col h-full overflow-y-scroll pb-[120px] gap-5 shadow-sm md:dark:bg-transparent md:bg-transparent dark:bg-[#ffffff2c] bg-[#77787a31]">
                <li className="font-semibold bg-[#77787a]  dark:bg-[#023666]  p-3 rounded-sm shadow-lg sticky top-0 text-xl text-[#fff] font-nunito-sans flex items-center justify-between">
                  <p>Lectures list</p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() =>
                        navigate("/course/addlecture", { state: { ...state } })
                      }
                      className="bg-blue-500 px-3 py-2 font-inter rounded-md font-semibold text-sm"
                    >
                      Add new lecture
                    </button>
                  )}
                </li>
                {lectures &&
                  lectures.map((lecture, idx) => {
                    return (
                      <li className="space-y-2" key={lecture._id}>
                        <p
                          className={`cursor-pointer text-base font-[500]  font-open-sans mx-6 ${
                            currentVideo === idx
                              ? "text-blue-500 "
                              : " text-black dark:text-white"
                          }`}
                          onClick={() => setCurrentVideo(idx)}
                        >
                          <span className="font-inter">{idx + 1}. </span>
                          {lecture?.title} 
                          {/* {lecture?.title} <br/> */}
                        </p>
                        {role === "ADMIN" && (
                          <button
                            onClick={() =>
                              onLectureDelete(state?._id, lecture?._id)
                            }
                            className="bg-[#ff3838] mx-7 py-1 px-2  rounded-md text-white font-inter font-[500]  text-sm"
                          >
                            Delete lecture
                          </button>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}

export default DisplayLectures;
