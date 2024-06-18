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
        return response?.data?.courses;
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error
    }
});

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    const loadingMessage = toast.loading("Please wait! creating new course...");

    try {
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = await axiosInstance.post("/courses", formData);
        
        // toast.success("Course created successfully", { id: loadingMessage});

        return {
            data:  response?.data,
            loadingMessageId: loadingMessage
        };

    } catch (error) {
        console.log(error)
        toast.error("Failed to create course", { id: loadingMessage});
        return
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