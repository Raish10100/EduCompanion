import Footer from "../Components/footer";
import {Link} from 'react-router-dom'
import { MdOutlineDarkMode } from 'react-icons/md'
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { CiLight } from "react-icons/ci";


function HomeLayout({ children }) {

    const [lightMode, setLightMode] = useState(true)

    const hideDrawer = () => {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
    }

    const lightModeHandler = () => {
        setLightMode(!lightMode)
    }


    return (
        <div >
            <nav className="sticky top-0   flex justify-between items-center px-[3px] sm:px-[10px] md:px-[20px] py-[20px] bg-[#12213b] text-white border-b-2 border-gray-600 shadow-2xl" >
            <p className="Logo font-semibold text-3xl order-2">EduCompanion</p>

               
            
                        <div className="flex lg:gap-10 items-center order-3 ">
             {
                lightMode
               ? 
                    <MdOutlineDarkMode onClick={() => lightModeHandler()}  className="cursor-pointer hover:bg-[#24324c] py-2 text-[50px] lg:text-[40px] transition-all ease-in-out duration-300 rounded-sm"/>
                : 
                    <CiLight onClick={() => lightModeHandler()}  className="cursor-pointer hover:bg-[#24324c] py-2 text-[50px] lg:text-[40px] transition-all ease-in-out duration-300 rounded-sm" />
              }
                        <ul className="lg:flex nav-hidden gap-5">
                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">Home</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">Courses</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">About Us</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">Contact Us</Link></li>
                        </ul>
                        <div className="lg:flex nav-hidden gap-3">
                            <button ><Link className=" border-gray-500 hover:border-gray-100 border-2 transition-all ease-in-out duration-300 text-[#3c8ff4] px-4 py-2 rounded-sm">Login</Link></button>
                            <button><Link className="bg-[#3c8ff4] hover:bg-[#3c6df4db] transition-all ease-in-out duration-300 text-white px-4 py-2 rounded-sm">Signup</Link></button>
                        </div>
                        </div>
                   
                        {/* <div className="flex lg:nav-hidden order-1 text-[40px]"><FiMenu /></div> */}

                        <div className="drawer flex lg:nav-hidden order-1 w-10 cursor-pointer">
                                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer" className=" drawer-button flex lg:nav-hidden order-1 text-[40px]"><FiMenu /></label>
                                </div> 
                                <div className="drawer-side ">
                                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                    <ul className="menu p-4 w-60 min-h-full text-base-content bg-[#12213b]">
                                        {/* Sidebar content here */}
                                        <li className="w-fit absolute right-2 z-50">
                                            <button onClick={hideDrawer}>
                                                <AiFillCloseCircle size={24} />
                                            </button>
                                        </li>
                                        <ul className='mt-[60px] flex flex-col gap-3 items-center'>
                                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">Home</Link></li>
                                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">Courses</Link></li>
                                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">About Us</Link></li>
                                            <li><Link className="hover:text-[#3c8ff4] transition-all duration-300 ease-in-out">Contact Us</Link></li>
                                        </ul>
                                        <div className="  fixed bottom-[50px] flex items-center justify-center w-[90%] gap-1">
                                            <button ><Link className="bg-[#fff] hover:bg-[#ffffffd5] transition-all ease-in-out duration-300 text-[#3c8ff4] px-8 py-2 rounded-sm">Login</Link></button>
                                            <button><Link className="bg-[#3c8ff4] hover:bg-[#3c6df4db] transition-all ease-in-out duration-300 text-white px-8 py-2 rounded-sm">Signup</Link></button>
                                        </div>
                                    </ul>
                                </div>
                        </div>
                    
               
            </nav>
          

              {children}

            <Footer/>
        </div>
    )
}

export default HomeLayout;