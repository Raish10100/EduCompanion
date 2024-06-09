import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    courseData: []
}



export const getAllCourses = createAsyncThunk("/course/get", async () => {
        const loadingMessage = toast.loading("Please wait! fetching courses data...");
  
    try{
        const response = await axiosInstance.get("/courses");
        toast.success(response?.data?.message, { id: loadingMessage })
        // console.log(response)
        return response?.data?.courses;
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error
    }
})


const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action?.payload) {
                // console.log(action?.payload)
                state.courseData = [...action?.payload];
            }
        })
    }
})

export default courseSlice.reducer;