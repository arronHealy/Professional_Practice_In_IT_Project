import axios from "axios";

//import action types
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILES,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  ADD_PROFILE_POST,
  DELETE_PROFILE_POST,
  POST_LOADING
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

// delete account
export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Are you sure you want to delete your account ? This can NOT be undone !!"
    )
  ) {
    axios
      .delete("/api/profile")
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
      })
    );
};

// get profile by username
export const getProfileByUsername = username => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/username/" + username)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Add book
export const listBook = (book, history) => dispatch => {
  axios
    .post("/api/profile/list-book", book)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete book
export const deleteBook = id => dispatch => {
  axios
    .delete(`/api/profile/list-book/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/*
//get profile posts
export const getProfilePosts = username => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/profile/posts/" + username)
    .then(res => {
      dispatch({
        type: GET_PROFILE_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE_POSTS,
        payload: null
      })
    );
};
*/

//add a post
export const addProfilePost = (username, post) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/profile/posts/" + username, post)
    .then(res =>
      dispatch({
        type: ADD_PROFILE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete a post

export const deleteProfilePost = (postId, id) => dispatch => {
  axios
    .delete("/api/profile/posts/" + postId + "/" + id)
    .then(res => {
      dispatch({
        type: DELETE_PROFILE_POST,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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

//clear errors

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
