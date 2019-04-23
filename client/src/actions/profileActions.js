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
  GET_PROFILE_POST,
  ADD_PROFILE_COMMENT,
  POST_LOADING,
  DELETE_PROFILE_COMMENT,
  ADD_TO_CART,
  GET_CART,
  REMOVE_BOOK

} from "./types";

//create profile for user
export const createProfile = (data, history) => dispatch => {

  let formData = new FormData();

        formData.append('profileImage',data.profileImage);
        formData.append('username',data.username);
        formData.append('website',data.website);
        formData.append('location',data.location);
        formData.append('bio',data.bio);
        formData.append('facebook',data.facebook);
        formData.append('twitter',data.twitter);
        formData.append('linkedin',data.linkedin);
        formData.append('youtube',data.youtube);

        const configFile = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

  axios
    .post("/api/profile", formData,configFile)
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

  let bookData = new FormData();

  bookData.append('title',book.title);
  bookData.append('author',book.author);
  bookData.append('genre',book.genre);
  bookData.append('condition',book.condition);
  bookData.append('price',book.price);
  bookData.append('description',book.description);
  bookData.append('twitter',book.twitter);
  bookData.append('errors',book.errors);
  bookData.append('bookImage',book.bookImage);

  const configFile = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };

  axios
    .post("/api/profile", formData,configFile)
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

//get post by id
export const getProfilePost = (profileId, id) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/profile/profile-post/" + profileId + "/" + id)
    .then(res => {
      dispatch({
        type: GET_PROFILE_POST,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE_POST,
        payload: null
      })
    );
};

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

// add a comment to profile post

export const addProfileComment = (profileId, postId, post) => dispatch => {
  axios
    .post("/api/profile/profile-comment/" + profileId + "/" + postId, post)
    .then(res =>
      dispatch({
        type: ADD_PROFILE_COMMENT,
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

// delete a profiles comment

export const deleteProfileComment = (profileId, postId, id) => dispatch => {
  axios
    .delete(
      "/api/profile/profile-comment/" + profileId + "/" + postId + "/" + id
    )
    .then(res => {
      dispatch({
        type: DELETE_PROFILE_COMMENT,
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

// add a book to cart
export const addToCart = (  bookId,profId) => dispatch => {
  axios
    .put(`/api/profile/cart/${bookId}`, {profId})
    .then(res =>
      dispatch({
        type: ADD_TO_CART,
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

// remove a book to cart
export const removeFromCart = (  bookId) => dispatch => {
  axios
    .put(`/api/profile/cart/rmv/${bookId}`)
    .then(res =>
      dispatch({
        type: REMOVE_BOOK,
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

// get all books in cart
export const getCart = ( ) => dispatch => {
  axios
    .get(`/api/profile/cart`)
    .then(res =>
      dispatch({
        type: GET_CART,
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
