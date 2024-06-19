import { Link, useNavigate } from "react-router-dom";

function Denied() {

    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-2)
    }

    return (
        <div className="notfound flex items-center justify-center flex-col h-[100vh] bg-[#12213b] ">
            <h2 className="header text-[100px] sm:text-[150px] lg:text-[220px] mt-[-40px] vs:mt-[-100px] notFoundHeader  text-white">
                4<span className="text-[#ef3d5a]">0</span>3
            </h2>
            <h4 className=" text-[25px] sm:text-[30px] lg:text-[40px] bg-white text-[#1d232a] px-4 rounded">
                Access<span className="font-[700] ">!</span> denied
            </h4>
            <p className="text-white mt-8 lg:mt-12 sm:text-xl font-semibold lg:text-2xl w-[90%] sm:w-[40%] text-center">
                We apologize, but you are not authorized to access the page.
            </p>
            <div className="flex flex-row justify-center flex-wrap   w-[100%]  gap-2  mt-8 ">
                <Link className=" bg-[#ef3d5a]  rounded-3xl hover:bg-[#f35b5ba8] transition-all ease-in-out duration-300 text-gray-300  px-6 py-2 lg:text-xl" onClick={()=>  handleGoBack()}>Go Back</Link>
            </div>
        </div>
    )
}

export default Denied;