import { Link } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout.jsx'
import HomeImg from '../assets/homeImg.png'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function HomePage() {

    useEffect(() => {
     
        toast((t) => (
          <span style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ marginRight: '10px' }}>Would you like to become an <b>Admin</b>?</p>
              <button 
                  className="ml-3 bg-[#dd9d9d] p-2 rounded" 
                  style={{ marginRight: '10px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
                 >
                 <a href="https://www.explore.edu-companion.online" target='_blank' >Yes</a>
              </button>
              <button 
                  className="ml-3 bg-[#ddd] p-2 rounded" 
                  style={{ backgroundColor: '#5bc0de', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
                  onClick={() => {
                      toast.dismiss(t.id);
                  }}>
                  No
              </button>
          </span>
      ));
      
  }, []);


    return (
       
            <HomeLayout >
                    <div className="homePage h-[550px] justify-center items-center  vs:h-[600px] sm:h-[90vh] flex  gap-[100px] px-[10px] vs:px-[20px] dark:bg-transparent bg-[#e5e7eb]">
                        <div className="w-[95%] lg:w-[60%] flex justify-center items-center flex-col gap-6 ">
                            <h1 className='text-3xl sm:text-5xl text-center vs:text-start font-semibold text-[#000] dark:text-white'>
                                Empower Your Learning Journey with Our <span className='text-[#3d81d4] dark:text-[#3c8ff4]'>Comprehensive Courses</span>
                            </h1>
                            <p className='sm:text-xl text-center vs:text-start  text-[#120505ef] dark:text-[#fff]'>
                                Welcome to EduCompanion, the ultimate destination for high-quality courses designed to enhance your
                                skills and knowledge. Our platform offers a wide range of courses tailored to meet your educational needs.
                            </p>
                            <div className="flex flex-row flex-wrap vs:h-[150px] justify-center vs:justify-start w-[100%] gap-6 sm:gap-2 mt-6 vs:mt-0 ">
                                <button ><Link className=" bg-[#3c8ff4] w-[100%] hover:bg-[#3c6df4] shadow-2xl  transition-all ease-in-out duration-300 text-white sm:px-24 sm:py-4  px-8 py-2 rounded-sm text-2xl" to={'/courses'}>Courses</Link></button>
                                <button><Link className="border-2  hover:border-gray-500 shadow-2xl dark:border-gray-200 transition-all ease-in-out duration-300 text-[#0c0303eb] border-black dark:text-white sm:px-20 px-6 py-2 sm:py-[14px] rounded-sm text-2xl hover:bg-[#4076d330]" to={'/contact'}>Contact Us</Link></button>
                            </div>
                        </div>
                        <img src={HomeImg} alt="" className='max-w-[35%] item-hidden lg:block max-h-[550px] mt-[-40px] ' />
                    </div>
            </HomeLayout>
 
    )
}


export default HomePage;