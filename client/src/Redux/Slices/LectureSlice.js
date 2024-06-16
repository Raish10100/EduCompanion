import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures: []
};


export const getCourseLecture = createAsyncThunk("/course/lecture/get", async (cid) => {
    const loadingMessageId = toast.loading(`Loading lectures...`);
    try {
        const response = await axiosInstance(`/courses/${cid}`);
        toast.success("Successfully loaded lectures"), { id: loadingMessageId };
        return response?.data;
    } catch (error) {
        toast.error("Failed to get lectures", { id: loadingMessageId})
    }
}) 

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    const loadingMessageId = toast.loading(`Adding lecture...`);
    try {
        const response = await axiosInstance(`/courses/${data.id}`, data.formData) ;
        toast.success(`Successfully added lecture`), { id: loadingMessageId };
        return response?.data
    } catch (error) {
        toast.error(`Failed to add lectures`, { id: loadingMessageId });
    }
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {
        const response = await axiosInstance(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.success(`Successfully deleted lecture`);
        return response?.data
    } catch (error) {
        toast.error(`Failed to delete lecture`)
    }
})


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
        });
        builder.addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
        })
    },
})


export default lectureSlice.reducer;