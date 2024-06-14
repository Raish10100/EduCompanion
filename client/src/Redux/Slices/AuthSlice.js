import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../Helpers/axiosInstance'
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}
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
  console.log(data)
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

export const logout = createAsyncThunk('/auth/logout', async () =>{ 
  const loadingMessage = toast.loading('Please wait! logout is in progress...')
  try {
    const res = await axiosInstance.get('/user/logout');
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, {id: loadingMessage})
  }
})

export const updateProfile = createAsyncThunk('/user/update/profile', async (data) =>{ 
  const loadingMessage = toast.loading('Please wait! update is in progress...')
  try {
    const res = await axiosInstance.post(`/user/update`, data);
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, {id: loadingMessage})
  }
})

export const getUserData = createAsyncThunk('/user/details', async () =>{ 
  try {
    const res = await axiosInstance.get('/user/me');
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
});

export const changePassword = createAsyncThunk("/user/change-password", async (userPasswords) => {
  const loadingMessage = toast.loading('Please wait! change is in progress...')

    try {
      const res = await axiosInstance.post("/user/changePassword", userPasswords);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage})
      return
    }
})

export const forgetPassword = createAsyncThunk("/auth/forgetPassword", async (email) => {
  const loadingMessage = toast.loading('Please wait! sending email...')

    try {
      const res = await axiosInstance.post('/user/forgotPassword', email);
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data

    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage})
      return
    }
} );

export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  const loadingMessage = toast.loading('Please wait! processing...')

  try {
    const res = await axiosInstance.post(`/user/resetPassword/${data.resetToken}`, {
      password: data.password,
    });

    toast.success("Password resetted successfully", { id: loadingMessage})

    return res.data;
    
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingMessage});
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // for signup
    builder.addCase(createAccount.fulfilled, (state, action) => {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
    })
    
    // for login    
    builder.addCase(login.fulfilled, (state, action) => {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
    });

    // for logout
    builder.addCase(logout.fulfilled, (state) => {
          localStorage.removeItem("data");
          localStorage.removeItem("role");
          localStorage.removeItem("isLoggedIn");
          state.data = {};
          state.role = "";
          state.isLoggedIn = false;
    });

    // for Edit Profile
    builder.addCase(getUserData.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
    })
    
  }
})


// export const { } = authSlice.actions
export default authSlice.reducer