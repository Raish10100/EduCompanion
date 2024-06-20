import { configureStore } from '@reduxjs/toolkit'
import  authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice.js'
import RazorpaySliceReducer from './Slices/RazorpaySlice.js'
import LectureSliceReducer from './Slices/LectureSlice.js'
import StatSliceReducer from './Slices/StatSlice.js'

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: RazorpaySliceReducer,
    lecture: LectureSliceReducer,
    stat: StatSliceReducer
  },
  devTools: true
})