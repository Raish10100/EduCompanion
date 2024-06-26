import Footer from "../Components/footer";

import Navbar from "../Pages/Navbar";


function HomeLayout({ children }) {



    return (
        <div  className="bg-white dark:bg-[#12213b] shadow-2xl">
            <Navbar />
          
            {children}

            <Footer/>
        </div>
    )
}

export default HomeLayout;