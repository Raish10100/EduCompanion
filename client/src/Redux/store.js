import { configureStore } from '@reduxjs/toolkit'
import  authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice.js'
import RazorpaySliceReducer from './Slices/RazorpaySlice.js'

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: RazorpaySliceReducer
  },
  devTools: true
})