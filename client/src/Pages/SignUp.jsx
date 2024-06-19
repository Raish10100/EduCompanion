import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isValidEmail, isValidPassword } from "../Helpers/RegexMatcher";

function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    // for user input
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    })

    const [ fileName, setFileName ] = useState("")

    // function to set the signup data
    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    }

    // function to handle image upload
    const getImage = (event) => {
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        setFileName(uploadedImage.name);

        if(uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage,
            });
        }
    };

    // function to create account
     const createNewAccount = async(event) => {
        event.preventDefault();
        // toast.success("trying to refresh page")
        if(!signupData.fullName || !signupData.email || !signupData.password){
            toast.error('Please fill all the details');   
            return;
        }
        
        // checking usename
        if(signupData.fullName.length < 5) {
           return toast.error("Name should be atleast 5 charactor long")
        }
        // checking email
        if(!isValidEmail(signupData.email)){
           return toast.error("Invalid email id")
        }
        // checking password
        if(signupData.password.length < 8 || signupData.password.length > 16 ) {
          return  toast.error('Password length must be between 8 and 16 characters')
        }
        
        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append('email', signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        
        // dispatch "create account" action
        const response = await dispatch(createAccount(formData));
        console.log(response)
        if(response?.payload?.success) {
            navigate('/')
        }


        // remove data from states
        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: "",
        })
        setFileName("")

        // toast.success()
    }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center  py-10 dark:bg-[#12213b] bg-[#e5e7eb] lg:h-[90vh] ">
        <form
          onSubmit={createNewAccount}
          noValidate
          className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[90%] sm:w-[60%] lg:w-[45%] xl:w-[35%]  flex-col flex justify-center items-center py-3 gap-6 rounded "
        >
          <h1 className="text-xl vs:text-3xl text-black dark:text-white font-bold">Create Account</h1>
          <div className="fields w-[90%] flex flex-col justify-center items-center gap-4">
            <div className="w-[100%] flex flex-col gap-1">
            <label htmlFor="Name" className="text-start w-[100%] text-xl font-bold dark:text-white text-black">Name</label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                name="fullName"
                id="fullName"
                // style={"text-transform": "capit" }
                className="lowercase-input px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white placeholder:normal-case"
                value={signupData.fullName}
                onChange={handleUserInput}
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
              <label htmlFor="Email" className="text-start w-[100%] text-xl font-bold dark:text-white text-black">Email</label>
              <input
                required
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                className="px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                value={signupData.email}
                onChange={handleUserInput}
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
              <label htmlFor="Password" className="text-start w-[100%] text-xl font-bold dark:text-white text-black">Password</label>
              <input
                required
                type="password"
                placeholder="Enter your password"
                name="password"
                id='password'
                className="px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                value={signupData.password}
                onChange={handleUserInput}
              />
            </div>
            <div className="w-[100%] flex flex-col gap-1">
              <label htmlFor="Avatar" className="text-start w-[100%] text-xl font-bold dark:text-white text-black">Avatar</label>
              <div className=" vs:w-[100%] w-[100%]  text-wrap custom-group-avatar relative">
                <input
                onChange={getImage}
                  type="file"
                  // className=" absolute opacity-0   bg-black  h-[80%] vs:mt-3 ml-2 overflow-x-hidden max-w-[200px] h-[40px] vs:max-w-[500px] mt-4  vs:px-8 sm:px-24 cursor-pointer"
                  className=" absolute opacity-0  bg-black  h-[80%] w-[95%] mt-2 ml-2 vs:px-8 sm:px-24 cursor-pointer"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                />
                <button className=" flex justify-between flex-wrap px-3 py-3 w-[100%]   tracking-widest border-black   dark:border-[#ffffff91] border-2 text-md sm:text-xl rounded bg-transparent cursor-pointer">
                  <span className="avatar-btn-hover bg-black  text-white text-wrap  dark:bg-[#ffffffd0] transition-all ease-in-out duration-300   dark:text-black tracking-normal px-2 py-1 cursor-pointer rounded font-semibold">
                  { fileName ? `Avatar:  ${fileName}` : "Upload your avatar"}
                  </span>
                  <span className="dark:text-[#5f6cf6] text-[#e45f5f] font-bold">{fileName ? "" :"(Optional)"}</span>
                </button>
              </div>
            </div>
            <button  type="submit" className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl">
              Sign Up
            </button>
            <p className="text-black dark:text-white sm:text-lg">
                Already have an account ?{" "}
                <Link to={'/login'} className="link text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out">
                    Login
                </Link>
            </p>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
