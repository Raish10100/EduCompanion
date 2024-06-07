import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { FaBriefcase } from 'react-icons/fa'
function Footer() {

   

    return (
        <footer className=' dark:bg-[#12213b] border-t-2 bg-gray-200 border-gray-500 py-7 z-0'>
            <section className = 'relative left-0 bottom-0  py-5  flex gap-12 sm:gap-6 flex-col flex-wrap sm:flex-row sm:items-start justify-between text-[#000000] dark:text-white sm:px-20  '>
            <section className='flex flex-col gap-6 justify-center sm:items-start items-center '>
            <p className="Logo font-semibold text-3xl">EduCompanion</p>
            <p className='text-center sm:text-start'>Empower Your Learning Journey with Our <br/> Comprehensive Courses</p>
            </section>
            <section className='flex flex-col gap-3 justify-center items-center sm:items-start'>
                <h2 className='font-bold text-2xl'>Quick Links</h2>
                <ul className='flex flex-col sm:items-start items-center gap-3 mt-3'>
                    <li><a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>Home</a></li>
                    <li><a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>Courses</a></li>
                    <li><a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>About Us</a></li>
                    <li><a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>Contact</a></li>
                </ul>
            </section>
            <section className='flex flex-col gap-3 justify-center items-center sm:items-start'>
                <h2 className='font-bold text-2xl'>Legal</h2>
                <ul className='flex flex-col sm:items-start gap-3 items-center mt-3'>
                   <li><a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>Refund & Cancellation Policy</a></li>
                   <li><a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>Privacy Policy</a></li>
                   <li><a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>Terms of use</a></li>
                </ul>
            </section>
            <section className='flex flex-col gap-6 justify-center items-center sm:items-start'>
                <h2 className='font-bold text-2xl '>GET IN TOUCH</h2>
                <p ><a href="https://mail.google.com/mail/?view=cm&fs=1&to=educompanion.it@gmail.com" target='_blank' className='hover:text-[#3c8ff4] hover:underline transition-all duration-300 ease-in-out '>educompanion.it@gmail.com</a></p>
                <section className='socials flex justify-center items-center flex-wrap pb-3 gap-2 text-2xl text-white'>
                    <a href="https://www.linkedin.com/in/raish-vadaviya-439213289/" target='_blank' className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>
                        <FaBriefcase />
                    </a>
                    <a href="https://www.linkedin.com/in/raish-vadaviya-439213289/" target='_blank' className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>
                        <BsLinkedin />
                    </a>
                    <a href="https://x.com/RaishVadaviya" target='_blank' className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>
                        <BsTwitter />
                    </a>
                    <a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>
                        <BsFacebook />
                    </a>
                    <a href="" className='hover:text-[#3c8ff4] transition-all ease-in-out duration-300'>
                        <BsInstagram />
                    </a>
                </section>
                </section>
                
            </section>
            <section className='copyright text-lg text-[#000] dark:text-white text-center mt-16'>
                ©  {new Date().getFullYear()}
                <a className='font-extrabold hover:text-[#3c8ff4] transition-all ease-in-out' href='https://www.linkedin.com/in/raish-vadaviya-439213289/' target='_blank'> Raish Vadaviya</a>.
                All rights reserved
            </section>
    </footer>
    )
}

export default Footer;