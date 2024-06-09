import { configureStore } from '@reduxjs/toolkit'
import  authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice.js'

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer
  },
  devTools: true
})