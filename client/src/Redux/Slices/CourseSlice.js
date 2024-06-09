import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

// const res = await axiosInstance.post("/user/register", data);
// toast.success(res?.data?.message, {  id: loadingMessage });
// return res?.data

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    const loadingMessage = toast.loading("Please wait! fetching courses data...");
    try{
        const response = axiosInstance.get("/courses");
        toast.success(response?.data?.message, { id: loadingMessage })
        return response?.data
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

    }
})

export default courseSlice.reducer;