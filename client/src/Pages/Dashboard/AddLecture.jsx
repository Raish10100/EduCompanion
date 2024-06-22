import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function AddLecture() {
  const courseDetails = useLocation();
  console.log(courseDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [userInput, setUserInput] = useState({
    courseId: courseDetails.state._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });
  // console.log(userInput.courseId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleVideo = (e) => {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    // console.log(`Video URL --->${source}`);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("Please fill all the fields");
      return
    }

    if( userInput.title.length <5 || userInput.title.length > 120){
        toast.error("Title length must be between 5 and 120 characters.")
        return
    }

    if( userInput.description.length < 8 || userInput.title.length > 900){
        toast.error("Description length must be between 8 and 900 characters.")
        return;
    }

    const formData = new FormData();
    formData.append("lecture", userInput.lecture);
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("id", userInput.id);

    const lectureData = {
      id: userInput.courseId,
      formData,
    };
    
    setIsLoading(true);

    const response = await dispatch(addCourseLecture(lectureData));
    // console.log(response)
    if (response?.payload?.success) {
      setUserInput({
        lecture: {
          lectures: [],
        },
        title: "",
        description: "",
        videoSrc: "",
      });
      setIsLoading(false);
      // toast.success("Successfully Added Lecture");
      await dispatch(getCourseLectures(userInput.courseId));
      navigate(-1);
    } else {
      toast.error("Something went wrong while adding lecture");
    }
  };

  useEffect(() => {
    if (!courseDetails) {
      toast.error("Course details not found!!");
      navigate("/courses");
    }
  }, []);

  return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-[90vh] dark:bg-[#12213b] py-8 bg-[#e5e7eb] ">
        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="relative dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[35%] flex-col flex justify-center items-center py-5 gap-6 rounded "
        >
          <header className=" flex justify-center items-center ">
            <h1 className="text-2xl vs:text-3xl text-black dark:text-white font-bold">
              Add your new lecture
            </h1>
          </header>
          <div className="fields w-[90%] flex flex-col justify-center items-center gap-3">
            <div className="w-[100%] flex flex-col gap-1">
              <label
                className="text-start w-[100%]  tracking-wide text-xl font-bold dark:text-white text-black"
              >
                Title
              </label>
              <input
                required
                type="text"
                placeholder="Enter the title for lecture"
                name="title"
                id="title"
                className="px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                value={userInput.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
              <label
                className="text-start w-[100%] text-xl tracking-wide font-bold dark:text-white text-black"
              >
                Description
              </label>
              <textarea
              type="text"
                required
                placeholder="Enter the description for lecture"
                name="description"
                id="description"
                className="px-3 py-3 w-[100%] outline-none resize-none h-[120px] dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                value={userInput.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="rounded border-2 dark:border-white border-[#00000079] text-black hover:border-black dark:text-white transition-all w-full duration-300">
              {userInput.videoSrc ? (
                <video
                  src={userInput.videoSrc}
                  muted
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                ></video>
              ) : (
                <div className="w-full h-44 m-auto flex flex-col  items-center justify-center relative">
                  <label className="font-bold text-lg text-center absolute  cursor-pointer">
                    Choose your video
                  </label>
                  <input
                    type="file"
                    name="lecture"
                    id="lecture"
                    onChange={handleVideo}
                    accept="video/mp4,video/x-m4v,video/*"
                    className=" bg-white w-full h-full opacity-0"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`signup-btn dark:bg-[#ffffffe5] bg-[#000000] ${
                isLoading ? "bg-[#000000a2] dark:bg-[#ffffff7f]" : ""
              } rounded text-white active:bg-[#000000a2] dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl`}
            >
              {isLoading ? "Processing..." : "Add Lecture"}
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
