import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student";
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  registerLoading: boolean;
  error: string | null;
  successMessage: string | null;
}




const initialState: AuthState = {
  user: null,
  token: null,
  registerLoading: false,
  successMessage: null,
  loading: false,
  error: null,
};

// 🔥 Async Thunk (Typed)

export const registerUser = createAsyncThunk<
  string, // return message
  { name: string; email: string; password: string; rollNumber: string }, // argument type
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message);
    }

    return data.message;
  } catch (error) {
    return rejectWithValue("Registration failed");
  }
});


export const loginUser = createAsyncThunk<
  { user: User }, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Error type
>(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      

      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.loading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;