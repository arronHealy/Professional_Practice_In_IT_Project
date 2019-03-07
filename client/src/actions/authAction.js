import { TEST_DISPATCH } from './types';

// User Registration
export const registerUser = (userData) => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
     
};