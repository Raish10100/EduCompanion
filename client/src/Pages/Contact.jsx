import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { isValidEmail } from "../Helpers/RegexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function Contact() {

    const [isLoading, setIsLoading] = useState(false)
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserInput({
            ...userInput,
            [name] : value,
        })
    }

    const onFormSubmit = async(e) => {
        e.preventDefault();
        // console.log("debugging")
        if(!userInput.name || !userInput.email || !userInput.message){
           return  toast.error("All fields are required");
        };

        if(!isValidEmail(userInput.email)){
           return toast.error("Please enter valid email");
        }

        const loadingMessage = toast.loading("Submitting your message...")
        setIsLoading(true)
        try {
            const response = await axiosInstance.post("/contact", userInput)
                // console.log(response);
                setIsLoading(false)
                toast.success("Message submitted successfully", { id: loadingMessage});

                if(response?.data?.success) {
                    setUserInput({
                        name: "",
                        email: "",
                        message: "",
                    })
                }
        } catch (error) {
          setIsLoading(false)
            toast.error("Operation failed...", { id: loadingMessage})
        }
    }

  return (
    <HomeLayout>
      <div className="flex justify-center  items-center h-[90vh] py-10 dark:bg-[#12213b] bg-[#e5e7eb] ">
        <form
            onSubmit={onFormSubmit}
            noValidate
          className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl  w-[90%] sm:w-[60%] lg:w-[45%] xl:w-[35%] flex-col flex justify-center items-center py-5 gap-6 rounded "
        >
          <h1 className="text-xl vs:text-3xl text-black dark:text-white font-bold">
            Contact Us
          </h1>
          <div className="fields w-[90%] flex flex-col justify-center items-center gap-3">
            <div className="w-[100%] flex flex-col gap-1">
                <label htmlFor="Name" className="text-start w-[100%] sm:text-xl font-bold dark:text-white text-black">Name</label>
                <input
                required
                type="name"
                placeholder="Enter your name"
                name="name"
                id="name"
                className="px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                  value={userInput.name}
                  onChange={handleUserInput}
                />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
                <label htmlFor="Email" className="text-start w-[100%] sm:text-xl font-bold dark:text-white text-black">Email</label> 
                <input
                required
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                className="px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                  value={userInput.email}
                  onChange={handleUserInput}
                />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
                <label htmlFor="message" className="text-start w-[100%] sm:text-xl font-bold dark:text-white text-black">Message</label>
                <textarea
                    required
                    placeholder="Enter your message"
                    name="message"
                    id="message"
                    className="px-3 sm:py-3 py-2 w-[100%] outline-none resize-none h-20 sm:h-40 dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                      value={userInput.message}
                      onChange={handleUserInput}
                />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`signup-btn dark:bg-[#ffffffe5] bg-[#000000] ${isLoading ? "bg-[#000000a2] dark:bg-[#ffffff7f]" : ""} rounded text-white active:bg-[#000000a2] dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl`}
            >
              {
                isLoading ? "Submitting..." : "Submit"
              }
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}


export default Contact;
