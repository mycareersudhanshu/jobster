import customFetch from "../../utils/customFetch";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";
import authHeader from "../../utils/authHeader";

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(
      `/jobs/${jobId}`,
      // headers: {
      //   authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      // },
      authHeader(thunkAPI)
    );
    thunkAPI.dispatch(getAllJobs());
    console.log("inside delete", resp.data.msg);
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorize logging out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
