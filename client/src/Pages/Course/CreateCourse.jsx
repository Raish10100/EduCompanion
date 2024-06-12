import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useId, useState } from "react";
import toast from "react-hot-toast";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCreatingCourse, setIsCreatingCourse] = useState(false)

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  const handleImgUpload = (e) => {
    e.preventDefault();
    const uploadedImg = e.target.files[0];
    if (uploadedImg) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImg);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImg,
        });
      });
      // console.log(`fileReader img: ${fileReader.result}`);
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    if( userInput.title.length < 5 || userInput.title.length > 60){
     toast.error("Title must be between 5 and 60 characters")
     return
    }

    if(userInput.description.length < 8 || userInput.description.length > 900) {
     toast.error("Description must be between 8 and 200 characters")
     return
    }


    setIsCreatingCourse(true);

    const response = await dispatch(createNewCourse(userInput, dispatch));
    if (response?.payload?.data?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });

      toast.success("Course created successfully", { id: response?.payload?.loadingMessageId});
    }

    console.log(response)
    setIsCreatingCourse(false);
    
    // navigate("/courses");
  };

  return (
    <HomeLayout>
      <section className="flex flex-col items-center justify-center py-8 px-3 min-h-[90vh] dark:bg-[#12213b] bg-[#e5e7eb]">
        <form
        onSubmit={onFormSubmit}
          action=""
          className="flex flex-col dark:bg-[#213049] bg-[#c2c5cb] gap-7 rounded-md md:py-5 py-7 md:px-7 px-3 md:w-[750px] w-full"
        >
          <h1 className="text-center  text-[#000101] dark:text-[#fff] text-3xl font-bold">
            Create New Course
          </h1>
          <main className="w-full flex md:flex-row md:justify-between justify-center flex-col md:gap-0 gap-5">
            <div className="left-side md:w-[48%] w-full flex flex-col gap-5">
              <div className="thumbnail border-2 dark:border-white border-[#00000079] text-black hover:border-black dark:text-white transition-all duration-300">
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      className="w-full h-44 m-auto"
                      alt=""
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center">
                      <h1 className="font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImgUpload}
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label
                  htmlFor="Instructor"
                  className="font-[500] text-xl text-[#080202]  dark:text-white font-lato"
                >
                  Instructor
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="Instructor"
                  placeholder="Enter Course Instructor"
                  className="bg-transparent  text-lg font-inter px-3 py-2  dark:border-white border-2 border-[#1807079e] transition-all duration-300 hover:border-black  dark:text-white outline-none  text-black dark:placeholder:text-white placeholder:text-black"
                  onChange={handleUserInput}
                  value={userInput.createdBy}
                />
              </div>
            </div>
            <div className="right-side w-full md:w-[48%] flex flex-col gap-5">
               <div className="flex flex-col gap-5  ">
                    <label
                    htmlFor="title"
                    className="font-[500] text-start flex items-start justify-start text-xl text-[#080202]  dark:text-white font-lato  leading-3 "
                    >
                    Title
                    </label>
                    <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Course Title"
                    className="bg-transparent  text-lg font-inter px-3 py-2  dark:border-white border-2 border-[#1807079e] transition-all duration-300 hover:border-black  dark:text-white outline-none  text-black dark:placeholder:text-white placeholder:text-black"
                    onChange={handleUserInput}
                    value={userInput.title}
                    />
               </div>
               <div className="flex flex-col gap-5  ">
                    <label
                    htmlFor="category"
                    className="font-[500] text-start flex items-start justify-start text-xl text-black  dark:text-white font-lato  leading-3 "
                    >
                    Category
                    </label>
                    <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Enter Course Category"
                    className="bg-transparent  text-lg font-inter px-3 py-2  dark:border-white border-2 border-[#1807079e] transition-all duration-300 hover:border-black  dark:text-white outline-none  text-black dark:placeholder:text-white placeholder:text-black"
                    onChange={handleUserInput}
                    value={userInput.category}
                    />
               </div>
               <div className="flex flex-col gap-[9.5px]  ">
                    <label
                    htmlFor="description"
                    className={`font-[500] text-start flex items-start justify-start text-xl text-black   dark:text-white font-lato`}
                    >
                    Description
                    </label>
                    <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Enter Course Description"
                    rows={3}
                    className="bg-transparent resize-none text-lg font-inter px-3 py-2  dark:border-white border-2 border-[#1807079e] transition-all duration-300 hover:border-black  dark:text-white outline-none  text-black dark:placeholder:text-white placeholder:text-black "
                    onChange={handleUserInput}
                    value={userInput.description}
                    />
               </div>
            </div>
          </main>
          <button
               type="submit"
               disabled={isCreatingCourse}
               className="mt-3 bg-black hover:bg-[#000000be] text-white dark:bg-[#fff] dark:text-black dark:hover:bg-[#ffffffcb]  transition-all ease-in-out duration-300 rounded-md py-2 font-[500]  text-lg cursor-pointer"
          >
             { isCreatingCourse ? "Creating Course..." : "Create Course" }  
          </button>
        </form>
      </section>
    </HomeLayout>
  );
}

export default CreateCourse;
