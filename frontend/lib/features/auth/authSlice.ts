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

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") {
    return null; // SSR guard
  }

  const raw = localStorage.getItem("user");

  // If nothing stored or accidentally stored as "undefined", bail out
  if (!raw || raw === "undefined" || raw === "null") {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    return null;
  }
};


const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
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
  { user: User; token: string }, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Error type
>(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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

      console.log("Login successful, received data:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

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

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
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
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
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