import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}


export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data
    } catch (error) {
        toast.error("Failed to log data");
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    const loadingId = toast.loading("Subscribing bundle...");
    try {
    const response = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
    });
    toast.success("Payment verified", { id: loadingId })
    return response.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingId });
    }    
});

export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    const loadingId = toast.loading("Getting the payment records");
    try {
    const response = await axiosInstance.get("/payments?count=100");
    toast.success("Successfully retrieved payment records", { id: loadingId})
    return response.data;
    } catch (error) {
        toast.error("Operation failed", { id: loadingId});
    }    
});

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
    const loadingId = toast.loading("unsubscribing the bundle...")
    try {
        const response = await axiosInstance.post("/payments/unsubscribe");
        toast.success(response?.data?.message, {id: loadingId});
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, {id: loadingId});
        throw error;
    }
})

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
           });
        builder.addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
        });
        builder.addCase(verifyUserPayment.fulfilled, (state, action) => {
            state.isPaymentVerified = action?.payload?.success;
        });
        builder.addCase(verifyUserPayment.rejected, (state, action) => {
            toast.error(action?.payload?.message);
            state.isPaymentVerified = false;
          })
        builder.addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
    }
})

console.log(initialState)

export default razorpaySlice.reducer;