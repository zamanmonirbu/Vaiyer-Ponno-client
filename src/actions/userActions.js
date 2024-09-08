import axiosInstance from "../api/axiosInstance"; // Import Axios instance
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  RESET_USER,
} from "./actionTypes";


// Action creator for login start
export const loginStart = () => ({
  type: LOGIN_START,
});

// Action creator for login success
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

// Action creator for login failure
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action creator for registration start
export const registerStart = () => ({
  type: REGISTER_START,
});

// Action creator for registration success
export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

// Action creator for registration failure
export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

// Thunk action for login
export const loginUser = (credentials, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post("/api/auth/login", credentials);
    const data = response.data;
    console.log(data)
    dispatch(loginSuccess(data));

    // Save user auth and token to localStorage
    localStorage.setItem("userAuth", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);

    // Navigate to user dashboard after successful login
    navigate(`/user/dashboard`);
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for registration
export const registerUser = (userInfo, navigate) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axiosInstance.post("/api/auth/register", userInfo);
    const data = response.data;
    dispatch(registerSuccess(data));

    // Navigate to login page after successful registration
    navigate("/user/login");
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.error || error.message));
  }
};

// Get User Profile
export const getUserProfile = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const { data } = await axiosInstance.get(`/api/users/profile/${userId}`);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update User Profile
export const updateUserProfile = (userId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { data } = await axiosInstance.put(
      `/api/users/profile/${userId}`,
      updatedData
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Reset User State
export const resetUser = () => ({
  type: RESET_USER,
});

// Logout User
export const logoutUser = (navigate) => (dispatch) => {
  // Clear localStorage
  localStorage.removeItem("userAuth");
  localStorage.removeItem("authToken");

  // Dispatch the resetUser action to clear the user data from state
  dispatch(resetUser());

  // Navigate to the login page after logout
  navigate("/user/login");
};
