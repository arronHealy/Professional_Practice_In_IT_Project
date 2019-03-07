//import { TEST_DISPATCH } from './types';
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utilities/setAuthToken';
import jwt_decode from 'jwt-decode';

// User Registration
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    //.then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// User Login
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // save to local storage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem('jwtToken', token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// user logout
export const logoutUser = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem('jwtToken');
  // remove authentication header for future requests
  setAuthToken(false);
  // set current user to null which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
