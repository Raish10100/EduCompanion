import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CourseCard from "../../Components/CourseCard";

function CourseList() {


    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        // toast("trying to fetch courses data");
        await dispatch(getAllCourses());
    };

    console.log(courseData)

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 dark:bg-transparent bg-[#e5e7eb]      text-black dark:text-white">
                <div className="flex flex-col w-[100%] items-center h-[30%] gap-5 pb-12 sm:pb-[13vh]">
                    <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl w-[95%]  font-semibold tracking-wider">
                        Discover courses crafted by leading  
                        <span className="font-bold text-[#308ff4]"> industry professionals</span>
                    </h1>
                    {/* <p className="text-center sm:text-lg text-[13px] text-semibold dark:text-[#ffffffc2] vs:text-[15px] w-[80%]  sm:w-[70%] lg:w-[40%] tracking-wide">
                        Learn from the best in the field and advance your career with top-notch content and practical skills. 
                    </p> */}
                </div>
                <div className="flex gap-8 justify-center items-center  flex-wrap pb-20 px-4   ">
                    {/* <CourseCard />
                    <CourseCard/>
                    <CourseCard/> */}
                    {courseData.map((course, index) => {
                        return <CourseCard key={index} data={course} />
                    })}
                </div>
            </div>

        </HomeLayout>
    )
}


export default CourseList;