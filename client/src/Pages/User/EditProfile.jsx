import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";

 
function EditProfile() {
  
     const dispatch = useDispatch();
     const navigate = useNavigate()


     const userAvatar  = useSelector(state => state?.auth?.data?.avatar?.secure_url)
     const userName  = useSelector(state => state?.auth?.data?.fullName)

  const [previewImage, setImagePreview] = useState(userAvatar);
     const [profileUpdated, setProfileUpdated] = useState(false)


     const [data, setData] = useState({
          fullName: userName,
          avatar: undefined,
          userId: useSelector((state) => state?.auth?.data?._id)
     });




       // function to handle the image upload
  const getImage = (event) => {
     setProfileUpdated(true)
     event.preventDefault();
     // getting the image
     const uploadedImage = event.target.files[0];
 
     // if image exists then getting the url link of it
     if (uploadedImage) {
       setData({
         ...data,
         avatar: uploadedImage,
       });
       const fileReader = new FileReader();
       fileReader.readAsDataURL(uploadedImage);
       fileReader.addEventListener("load", function () {
         setImagePreview(this.result);
       });
     }
   };
 


     const setName = (event) => {
          setProfileUpdated(true)
          const { name, value } = event.target;
          const newUserData = { ...data, [name]: value };
          setData(newUserData);
        };      


     const submitErrorHandler = (e) => {
          event.preventDefault();
          handleFormSubmit(e);
     }

     const handleFormSubmit = async (event) => {
          if(profileUpdated) {
               event.preventDefault();
      
          if (!data.fullName && !data.avatar) {
            toast.error("Please fill the field you want to edit");
            return;
          }
          console.log(data.fullName)
          if(data.fullName !== userName &&  (data.fullName.length < 5 || data.fullName.length > 25)){
               toast.error("Name must be between 5 and 25 characters long");
               return;
          }

      
          const formData = new FormData();
          data.fullName && formData.append("fullName", data.fullName);
          data.avatar !==  "random" && formData.append("avatar", data.avatar);
   
  

      
          const res =  await dispatch(updateProfile(formData));
      
          await dispatch(getUserData());

         if (res.payload.success) navigate("/user/profile");
          }

          else{
               toast.error("Profile not updated yet")
          }
     };
      
  return (
       <HomeLayout>
          <div className="flex justify-center items-center  py-10 dark:bg-[#12213b] bg-[#e5e7eb] h-[90vh] ">

          <form
          onSubmit={submitErrorHandler}
          //   noValidate
          className="dark:bg-[#c6cedd16] bg-[#c0c3c9ef] shadow-2xl w-[90%] sm:w-[60%] lg:w-[45%] xl:w-[35%]  px-5  flex-col flex justify-center items-center  py-5 gap-4 rounded "
          >
              <h1 className="text-xl vs:text-3xl text-black dark:text-white font-bold ">Edit Profile</h1>

          <div className="flex vs:flex-row flex-col items-center vs:items-start justify-between w-[90%] gap-3  vs:gap-0">
          { !previewImage  ? <FaUserCircle className="rounded-full dark:text-white text-black" size="100" /> : <img src={previewImage}  className="rounded-full w-[100px] h-[100px] text-black" />}
               <div className="  h-8 px-3 w-20 vs:w-auto rounded-sm text-black my-auto">
                    <input
                    onChange={getImage}
                    type="file"
                    className=" absolute  opacity-0 bg-black  h-8 px-3 w-20 "
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    />
                    <button className=" flex justify-between flex-wrap  w-[100%]   tracking-widest   text-md sm:text-xl rounded bg-transparent cursor-pointer">
                         <span className="avatar-btn-hover bg-black  text-white text-wrap  dark:bg-[#ffffffd0] transition-all ease-in-out duration-300   dark:text-black tracking-normal px-2 py-1 cursor-pointer rounded font-semibold">
                              update
                         </span>
                    </button>
               </div>
          </div>

          <div className="fields w-[90%] flex flex-col justify-center items-center mt-8 gap-6">
               <div className="w-[100%] flex flex-col gap-1">
               <label htmlFor="Name" className="text-start w-[100%] text-xl font-bold dark:text-white text-black">Name</label>
               <input
                    required
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={data.fullName}
                    className="lowercase-input px-3 py-3 w-[100%] outline-none dark:hover:border-[#fff] border-black transition-all ease-in-out duration-300 tracking-widest text-black  dark:text-white dark:border-[#ffffff91] text-md sm:text-xl  border-2 rounded bg-transparent placeholder:text-black placeholder:dark:text-white"
                    onChange={setName}
               />
               </div>
               
     
               <button  type="submit" className="signup-btn dark:bg-[#ffffffe5] bg-[#000000] rounded text-white active:bg-[#000000a2] dark:active:bg-[#ffffff7f] transition-all ease-in-out duration-300 border-none px-3 py-3 w-[100%] dark:text-black font-semibold text-md sm:text-xl">
               Update profile
               </button>
          
          <Link to={'/user/profile'} className="link flex  gap-2 justify-center items-center text-[#463cfa] dark:hover:text-[#346560] hover:text-[#2f2b72] dark:text-accent cursor-pointer transition-all duration-300 ease-in-out">
               <AiOutlineArrowLeft className="" size={20} />  <p>Go back to profile</p>
               </Link>
          </div>
          </form>
          </div>
       </HomeLayout>
  );
 
 
};
 
export default EditProfile;