import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

function Drawer() {
  

    const hideDrawer = () => {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
    }

    return (
        <>
            <div className="drawer flex lg:nav-hidden order-1 w-10 cursor-pointer ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className=" drawer-button flex lg:nav-hidden order-1 text-black dark:text-white text-[30px] vs:text-[40px]"><FiMenu /></label>
                </div> 
                <div className="drawer-side ">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu  p-4 pt-7 h-[100%] min-w-[250px] max-w-[350px]  bg-white dark:bg-[#29303ea3] backdrop-blur-[8px] text-gray-500 font-inter dark:text-slate-50 md:text-[17px] text-base font-[600] relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} className="text-[#351212]" />
                            </button>
                        </li>
                        <div className='  mt-[60px] flex flex-col gap-3 items-center'>
                            <li><Link className="hover:text-[#3c8ff4] text-black  transition-all duration-300 ease-in-out">Home</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] text-black transition-all duration-300 ease-in-out">Admin Dashboard</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] text-black transition-all duration-300 ease-in-out">Courses</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] text-black transition-all duration-300 ease-in-out">About Us</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] text-black transition-all duration-300 ease-in-out">Contact Us</Link></li>
                        </div>
                        <div className="  fixed bottom-[50px] flex items-center justify-center w-[90%] gap-1">
                            <button ><Link className="bg-[#fff] hover:bg-[#ffffffd5] transition-all ease-in-out duration-300 text-[#3c8ff4] px-8 py-[5px] rounded-sm border-2 border-gray-500 hover:border-gray-300">Login</Link></button>
                            <button><Link className="bg-[#3c8ff4] hover:bg-[#3c6df4db] transition-all ease-in-out duration-300 text-white px-8 py-2 rounded-sm">Signup</Link></button>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Drawer;