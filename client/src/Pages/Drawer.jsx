import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

function Drawer() {
  
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const hideDrawer = () => {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
    }

    // logout handler
    async function handleLogout(e) {
        e.preventDefault();

        const res = await dispatch(logout())
        if(res?.payload?.success) {
            navigate('/')
        }
    }

    return (
        <>
            <div className="drawer flex lg:nav-hidden order-1 w-10 cursor-pointer ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className=" drawer-button  flex lg:nav-hidden order-1 text-black dark:text-white text-[30px] vs:text-[40px] cursor-pointer "><FiMenu /></label>
                </div> 
                <div className="drawer-side ">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu  p-4 pt-7 h-[100%] min-w-[250px] max-w-[350px]  bg-white dark:bg-[#29303ea3] backdrop-blur-[8px] text-gray-500 font-inter dark:text-slate-50 md:text-[17px] text-base font-[600] relative">
                        <li className="w-fit absolute right-2 top-5 z-50">
                            <button onClick={hideDrawer}>
                                <RxCross2 size={34} className="light:text-[#000000] font-extrabold hover:text-gray-600 text-red-600" />
                            </button>
                        </li>
                        <div className='  mt-[60px] flex flex-col gap-3 items-center'>
                            <li><Link className="hover:text-[#3c8ff4] light:text-black  transition-all duration-300 ease-in-out" to={'/'}>Home</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] light:text-black transition-all duration-300 ease-in-out">Admin Dashboard</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] light:text-black transition-all duration-300 ease-in-out" to={'/courses'} >Courses</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] light:text-black transition-all duration-300 ease-in-out" to={'/about'}>About Us</Link></li>
                            <li><Link className="hover:text-[#3c8ff4] light:text-black transition-all duration-300 ease-in-out">Contact Us</Link></li>
                        </div>
                        <div className="  fixed bottom-[50px] flex items-center justify-center w-[90%] gap-1 ">

                            {
                                isLoggedIn 
                                ?
                                <button ><Link onClick={handleLogout} className="bg-[#fff] hover:bg-[#ffffffd5] transition-all ease-in-out duration-300 text-[#3c8ff4] px-6 py-[6px] rounded-sm   hover:border-gray-300 border-2">LogOut</Link></button>
                                :
                                <button ><Link className="bg-[#fff] hover:bg-[#ffffffd5] transition-all ease-in-out duration-300 text-[#3c8ff4] px-8 py-[6px] rounded-sm  hover:border-gray-300 border-2" to={'/login'}>LogIn</Link></button>
                            }
                            {
                                isLoggedIn
                                ?
                                <button><Link className="bg-[#3c8ff4] hover:bg-[#3c6df4db] transition-all ease-in-out duration-300 text-white px-7 py-[7px] rounded-sm">Profile</Link></button>
                                :
                                <button><Link className="bg-[#3c8ff4] hover:bg-[#3c6df4db] transition-all ease-in-out duration-300 text-white px-7 py-[7px] rounded-sm" to={'/signup'}>SignUp</Link></button>
                            }
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Drawer;