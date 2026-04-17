import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: {
    college: string | null;
    course: string | null;
    year: number | null;
    skills: string[];
  } | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  registerLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  registerLoading: false,
  error: null,
  successMessage: null,
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
  void, // Return type
  { email: string; password: string; accountType: string }, // Argument type
  { rejectValue: string } // Error type
>(
  "auth/loginUser",
  async (userData, { rejectWithValue, dispatch }) => {
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
      await dispatch(fetchMe());

    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const fetchMe = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      return rejectWithValue("Failed to fetch user");
    }

    return await res.json();
  } catch {
    return rejectWithValue("Failed to fetch user");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      // REGISTER
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
      })

      // FETCH ME
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;