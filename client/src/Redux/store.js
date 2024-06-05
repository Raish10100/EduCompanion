import { configureStore } from '@reduxjs/toolkit'
import  authSliceReducer from './Slices/AuthSlice.js'

export default configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  devTools: true
})