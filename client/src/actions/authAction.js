import { TEST_DISPATCH } from './types';

// User Registration
export const registerUser = (userData) => dispatch => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
     
};