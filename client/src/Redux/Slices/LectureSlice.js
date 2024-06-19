import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures: []
};


export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (cid) => {
    const loadingMessageId = toast.loading(`Loading lectures...`);
    try {
        const response = await axiosInstance.get(`/courses/${cid}`);
        const lectureNotFound = response?.data?.lectures.length > 0
        // console.log(response)
        if(!lectureNotFound){
            toast.error("Lectures not found", { id: loadingMessageId});
        }
        else{
            toast.success("Successfully loaded lectures", { id: loadingMessageId });
        }
        return response?.data;
    } catch (error) {
        toast.error("Failed to get lectures", { id: loadingMessageId })
    }
}) 

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    const loadingMessageId = toast.loading(`Adding lecture...`);
    try {
        console.log(data.id);
        const response = await axiosInstance.post(`/courses/${data.id}`, data.formData) ;
        // console.log(response)
        toast.success(`Successfully added lecture`, { id: loadingMessageId,  });
        return response?.data
    } catch (error) {
        toast.error(`Failed to add lectures`, { id: loadingMessageId });
    }
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    const loadingMessageId = toast.loading("Deleting Lecture...");
    try {
        const response = await axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.success(`Successfully deleted lecture`, { id: loadingMessageId });
        return response?.data
    } catch (error) {
        toast.error(`Failed to delete lecture`, { id: loadingMessageId})
    }
})


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {
        removeLectures: (state, action) => {
            state.lectures = []
            console.log(`remove leture ${state.lectures}`)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            // console.log(action?.payload)
            state.lectures = action?.payload?.lectures;
        });
        builder.addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
    },
})

export const { removeLectures } = lectureSlice.actions
export default lectureSlice.reducer;