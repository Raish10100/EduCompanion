import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import aboutImg from '../assets/about.png'

function AboutUs(){

    return (
        <HomeLayout>
            <div className="homePage vs:min-h-[600px]   flex justify-between items-center   px-[20px] dark:bg-transparent bg-[#e5e7eb] ">
                <div className="w-[95%] lg:w-[60%] flex justify-center items-center my-[20px] flex-col gap-12 ">
                    <h1 className='text-4xl lg:item-hidden sm:text-5xl  vs:pb-[20px] font-semibold text-[#000] dark:text-white'>
                    About <span className='text-[#3d81d4] dark:text-[#3c8ff4]'>Us</span>
                    </h1>
                    <h2 className='text-2xl sm:text-4xl font-semibold text-[#000] dark:text-white lg:text-start  text-center'>
                    Welcome to Your LMS Platform - Empowering  <span className='text-[#3d81d4] dark:text-[#3c8ff4]'>Learners Worldwide!</span>
                    </h2>
                    <p className='sm:text-xl text-[#120505ef] dark:text-[#fff] lg:text-start text-center'>
                    At Your LMS Platform, our mission is to provide accessible, high-quality education to learners worldwide. We believe education should be available to everyone, regardless of location or socioeconomic status.
                        Our platform offers interactive courses and diverse learning materials. We aim to empower individuals with the knowledge and skills for success.
                    </p>
                    <div className="flex flex-row  flex-wrap gap-8 sm:gap-2 sm:mt-12 pb-[20px] w-[100%]  justify-center lg:justify-start ">
                        <button><Link className="border-2  border-gray-500 shadow-2xl hover:border-gray-200 transition-all ease-in-out duration-300 text-[#0c0303eb] dark:text-white sm:px-20 px-6 py-2 sm:py-4 rounded-sm text-2xl">Contact Us</Link></button>
                    </div>
                </div>
                <div className=" justify-center items-center item-hidden lg:block">
                {/* <img src={about} alt="" className="item-hidden lg:block w-[100%] h-[350px]  bg-white rounded-full mt-[-150px] " /> */}
                <img src={aboutImg} alt="" className=" w-[100%] h-[350px]   mt-[-150px]  " />
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;