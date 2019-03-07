//import { TEST_DISPATCH } from './types';
import axios from 'axios';
import { GET_ERRORS } from './types';

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