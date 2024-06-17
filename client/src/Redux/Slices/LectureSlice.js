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
        toast.success("Successfully loaded lectures", { id: loadingMessageId });
        return response?.data;
    } catch (error) {
        toast.error("Failed to get lectures", { id: loadingMessageId})
    }
}) 

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    const loadingMessageId = toast.loading(`Adding lecture...`);
    try {
        const response = await axiosInstance.post(`/courses/${data.id}`, data.formData) ;
        toast.success(`Successfully added lecture`, { id: loadingMessageId });
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log(action?.payload)
            state.lectures = action?.payload?.lectures;
        });
        builder.addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
    },
})


export default lectureSlice.reducer;