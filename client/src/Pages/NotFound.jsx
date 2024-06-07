import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="notfound flex items-center justify-center flex-col h-[100vh] ">
                <h2 className="header text-[100px] sm:text-[150px] lg:text-[220px] mt-[-40px] vs:mt-[-100px] notFoundHeader  text-white">
                    4<span className="text-[#f35b5b]">0</span>4
                </h2>
                <h4 className="text-white text-[25px] sm:text-[30px] lg:text-[40px] font-bold">
                    Oops<span className="text-red-600 font-[700] ">!</span> page not found
                </h4>
                <p className="text-white mt-8 lg:mt-12 sm:text-xl font-semibold lg:text-2xl w-[90%] sm:w-[40%] text-center">
                    Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                </p>
                <div className="flex flex-row justify-center flex-wrap h-[90px] vs:h-[150px]  w-[100%]  gap-2  mt-12 vs:mt-8 ">
                    <button ><Link className=" border-[#f35b5b] border-2 hover:bg-[#221718]  shadow-2xl  transition-all ease-in-out duration-300 text-gray-300  px-6 py-2 rounded-sm lg:text-2xl" to={'/'}>Return Home</Link></button>
                    <button><Link className="border-2  border-[#ba3e3e] shadow-2xl hover:bg-[#221718]  transition-all ease-in-out duration-300 text-gray-300    px-6 py-2 rounded-sm lg:text-2xl" to={'/contact'}>Report Problem</Link></button>
            </div>
        </div>
    )
}


export default NotFound;