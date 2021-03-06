import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  ADD_PROFILE_POST,
  DELETE_PROFILE_POST,
  GET_PROFILE_POST,
  ADD_PROFILE_COMMENT,
  DELETE_PROFILE_COMMENT,
  ADD_TO_CART,
  GET_CART,
  REMOVE_BOOK,
  GET_SEARCH_RESULT
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  post: {},
  loading: false,
  cart:[],
  books: []
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
      case GET_CART:
      return {
        ...state,
       cart:action.payload
      };
      case ADD_TO_CART:
      return {
        ...state,
          cart: action.payload
      };
      case REMOVE_BOOK:
      return {
        ...state,
          cart: action.payload
      };
      case GET_SEARCH_RESULT:
      return {
        ...state,
        books: action.payload
      };
    default:
      return state;
  }
}
