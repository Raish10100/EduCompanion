import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
 
function CheckoutPage() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector(state => state.razorpay.key);
  const subscription_id = useSelector(state => state.razorpay.subscription_id);
  const isPaymentVerified =  useSelector(state => state.razorpay.isPaymentVerified);
  const userData = useSelector(state => state?.auth?.data);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };
  


      const handleSubscription = async (event) => {
        event.preventDefault();
    
        if (!razorpayKey || !subscription_id) {
            toast.error("Try again")
          return;
        }
    
        const options = {
          key: razorpayKey,
          subscription_id: subscription_id,
          name: "EduCompanion Pvt. Ltd.",
          description: "Subscription",
          prefill: {
            name: userData.fullName,
            email: userData.email,
          },
          theme: {
            color: "#213049",
          },
          handler: async function (response) {
            paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
            paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
            paymentDetails.razorpay_signature = response.razorpay_signature;
    
            
            const res = await dispatch(verifyUserPayment(paymentDetails));
            // console.log(` 1->${razorpay_payment_id}, 2 -> ${razorpay_signature}, 3-> ${razorpay_subscription_id} `)
            console.log(isPaymentVerified)
            
            !isPaymentVerified && isPaymentVerified != undefined
            ? navigate("/checkout/success")
            : navigate("/checkout/fail");
            
            // toast.success("Payment Successfull");

          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
    

    async function load() {
        await dispatch(getRazorPayId())
        await dispatch(purchaseCourseBundle())
    }

      useEffect(() => {
        load()
      }, [])
 
  return (
       <HomeLayout>
            <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-black dark:text-white dark:bg-transparent bg-[#e5e7eb] "
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative dark:bg-[#436db662] bg-[#a3a3a345]">
          <h1 className="bg-[#a8a9aa] dark:bg-[#6189cde9] absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center ">
            <p className="text-[17px] mt-4">
              This purchase will allow you to access all the available courses
              of our platform for{" "}
              <span className="text-[#379cda] font-bold">1 Year Duration</span>
              . <br />
              All the existing and new launched courses will be available to you
              in this subscription bundle
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-[#379cda]">
              <BiRupee /> <span>1</span>only
            </p>

            <div className="dark:text-gray-200 ">
              <p>100% refund at cancellation</p>
              <p>* Terms & Condition Applied</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#a8a9aa] dark:bg-[#6189cd] dark:hover:bg-[#6189cdc0] hover:bg-[#a8a9aac3] transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
          >
            Buy Now
          </button>
        </div>
      </form>
       </HomeLayout>
  );
 
 
};
 
export default CheckoutPage;