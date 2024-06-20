import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUsersCount: 0,
    subscribedUsersCount: 0
};


export const getStatsData = createAsyncThunk("/stats/get", async () => {
    const loadingMessageId = toast.loading("Getting Stats Data...");
    try {
        const response = await axiosInstance.get("/admin/stats/users");
        console.log(response?.data)
        toast.success(response?.data?.message, { id: loadingMessageId});
        return response?.data
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessageId });
    }
})


const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedUsersCount = action?.payload?.subscribedUsersCount
        })
        console.log(`stat extra reducer `)
    }

})

export default statSlice.reducer;