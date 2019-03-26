import axios from "axios";

//import action types
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
<<<<<<< HEAD
  GET_PROFILES
=======
  SET_CURRENT_USER
>>>>>>> e1d0525a20da3c64c7de12ac51bfb968ff72d8c4
} from "./types";

//create profile for user
export const createProfile = (data, history) => dispatch => {
  axios
    .post("/api/profile", data)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get current users profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

<<<<<<< HEAD
// get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
=======
// delete account
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure you want to delete your account ? This can NOT be undone !!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Add book
export const listBook = (book, history) => dispatch => {
  axios
    .post('/api/profile/list-book', book)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
>>>>>>> e1d0525a20da3c64c7de12ac51bfb968ff72d8c4
      })
    );
};

<<<<<<< HEAD
// get profile by username
export const getProfileByUsername = username => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/username/" + username)
=======
// Delete book
export const deleteBook = id => dispatch => {
  axios
    .delete(`/api/profile/list-book/${id}`)
>>>>>>> e1d0525a20da3c64c7de12ac51bfb968ff72d8c4
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
<<<<<<< HEAD
        type: GET_PROFILE,
        payload: null
=======
        type: GET_ERRORS,
        payload: err.response.data
>>>>>>> e1d0525a20da3c64c7de12ac51bfb968ff72d8c4
      })
    );
};

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// clear current profile after logout
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
