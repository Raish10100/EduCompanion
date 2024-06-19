import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";

import "./App.css";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Course/CourseDescription";
import RequireAuth from "./Components/Auth/RequireAuth";
import CreateCourse from "./Pages/Course/CreateCourse";
import Profile from "./Pages/User/Profile";
import EditProfile from "./Pages/User/EditProfile";
import ChangePassword from "./Pages/Password/ChangePassword";
import ForgetPassword from "./Pages/Password/ForgetPassword";
import ResetPassword from "./Pages/Password/ResetPassword";
import CheckoutPage from "./Pages/Payment/CheckoutPage";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFail from "./Pages/Payment/CheckoutFail";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import TermsAndConditions from "./Pages/Legal/TermsAndConditions";
import ScrollToTop from "./Helpers/ScrollToTop";
import PrivacyPolicy from "./Pages/Legal/PrivacyPolicy";
import RefundCancellationPolicy from "./Pages/Legal/RefundCancellationPolicy";
import ShippingPolicy from "./Pages/Legal/ShippingPolicy";
import AddLecture from "./Pages/Dashboard/AddLecture";

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/user/changepassword" element={<ChangePassword />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/course/displaylectures" element={<DisplayLectures />} />
        </Route>

        <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />}/>
        <Route path="/legal/privacy-and-policy" element={<PrivacyPolicy />}/>
        <Route path="/legal/refund-cancellation-policy" element={<RefundCancellationPolicy/>} />
        <Route path="/legal/shipping-policy" element={<ShippingPolicy />} />

        <Route path="/denied" element={<Denied />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
