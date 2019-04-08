import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  ADD_POST,
  GET_POST,
  GET_POSTS,
  DELETE_POST
  //ADD_PROFILE_POST,
  //GET_PROFILE_POST,
  //GET_PROFILE_POSTS,
  //DELETE_PROFILE_POST
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    /*
    case GET_PROFILE_POSTS:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILE_POST:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case ADD_PROFILE_POST:
      return {
        ...state,
        profile: action.payload
      };
    case DELETE_PROFILE_POST:
      return {
        ...state,
        profile: state.profile.reviews.posts.filter(
          post => post._id !== action.payload
        )
      };
      */
    default:
      return state;
  }
}
