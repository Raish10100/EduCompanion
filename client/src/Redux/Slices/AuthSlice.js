import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../Helpers/axiosInstance'
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}


export const createAccount = createAsyncThunk("/auth/register", async (data) => {
  const loadingMessage = toast.loading("Please wait! creating your account...");
  try {
      const res = await axiosInstance.post("/user/register", data);
      toast.success(res?.data?.message, {  id: loadingMessage });
      return res?.data
  } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage });
      throw error;
  }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
  const loadingMessage = toast.loading("Please wait! authentication is in progress...");
  try {
      const res = await axiosInstance.post("/user/login", data);
      toast.success(res?.data?.message, { id: loadingMessage });// success toast replace the loading toast because they shared same id.
      return res?.data
  } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage });
      throw error;
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})


// export const { } = authSlice.actions
export default authSlice.reducer