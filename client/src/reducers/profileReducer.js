import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  ADD_PROFILE_POST,
  DELETE_PROFILE_POST,
  GET_PROFILE_POST,
  ADD_PROFILE_COMMENT,
  DELETE_PROFILE_COMMENT
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  post: {},
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
    case ADD_PROFILE_POST:
      return {
        ...state,
        profile: {
          ...state.profile,
          reviews: action.payload
        }
      };
    case DELETE_PROFILE_POST:
      return {
        ...state,
        profile: {
          ...state.profile,
          reviews: action.payload
        }
      };
    case GET_PROFILE_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_PROFILE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload
        }
      };
    case DELETE_PROFILE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload
        }
      };
    default:
      return state;
  }
}
