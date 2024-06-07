import { Link } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout.jsx'

function HomePage() {
    return (
       
            <HomeLayout >
                    <div className="homePage h-[600px] sm:h-[800px] flex   px-[20px] ">
                        <div className="w-[95%] lg:w-[60%] flex sm:mt-[200px] mt-[20px] vs:mt-[100px] flex-col gap-6 ">
                            <h1 className='text-3xl sm:text-5xl font-semibold text-[#000] dark:text-white'>
                                Empower Your Learning Journey with Our <span className='text-[#3d81d4] dark:text-[#3c8ff4]'>Comprehensive Courses</span>
                            </h1>
                            <p className='sm:text-xl text-[#120505ef] dark:text-[#fff]'>
                                Welcome to EduCompanion, the ultimate destination for high-quality courses designed to enhance your
                                skills and knowledge. Our platform offers a wide range of courses tailored to meet your educational needs.
                            </p>
                            <div className="flex flex-row  flex-wrap gap-8 sm:gap-2 mt-12 ">
                                <button ><Link className="bg-[#3c8ff4] hover:bg-[#3c6df4] shadow-2xl  transition-all ease-in-out duration-300 text-white sm:px-24 sm:py-4  px-8 py-2 rounded-sm text-2xl">Courses</Link></button>
                                <button><Link className="border-2  border-gray-500 shadow-2xl hover:border-gray-200 transition-all ease-in-out duration-300 text-[#0c0303eb] dark:text-white sm:px-20 px-6 py-2 sm:py-4 rounded-sm text-2xl">Contact Us</Link></button>
                            </div>
                        </div>
                    </div>
            </HomeLayout>
 
    )
}


export default HomePage;