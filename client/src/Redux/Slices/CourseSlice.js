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
        // console.log(response)
        toast.success(response?.data?.message, { id: loadingMessage })
        return response?.data?.courses;
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error
    }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {

        const loadingMessageId = toast.loading("deleting course...");
    try{
        const response = await axiosInstance.delete(`/courses/${id}`);
        toast.success(response?.data?.message, { id: loadingMessageId })
        return response?.data;
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessageId });
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

export const updateCourse = createAsyncThunk("/course/update", async(data) => {
    const loadingMessage = toast.loading("Please wait! creating new course...");
console.log(data)
    try {
        const formData = new FormData();
        formData.append("title", data?.userInput.title);
        formData.append("description", data?.userInput?.description);
        formData.append("category", data?.userInput?.category);
        formData.append("createdBy", data?.userInput?.createdBy);
        if(data?.userInput?.thumbnail != null) {
            formData.append("thumbnail", data?.userInput?.thumbnail);
        }
        
// // Function to log all entries in FormData
// function logFormData(formData) {
//     for (let pair of formData.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//     }
// }

// // Log the contents of formData
// logFormData(formData);

        const response = await axiosInstance.put(`/courses/${data.id}`, formData);
        console.log(response)
        // toast.success("Course created successfully", { id: loadingMessage});

        return {
            data:  response?.data,
            loadingMessageId: loadingMessage
        };

    } catch (error) {
        console.log(error)
        toast.error("Failed to update course", { id: loadingMessage});
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