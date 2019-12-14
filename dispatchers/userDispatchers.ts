import { UserService } from '../api/userService';


export const getUserData = () => (dispatch) => {
  return UserService.getUserData()
    .then(res => {
      dispatch({
        type: 'LOGIN',
        payload: res.data,
      })
    });
};

export const updateUserDetails = (newUserDetails) => (dispatch) => {
  dispatch({ type: 'REQUEST_UPDATE_USER_DETAILS' });

  return UserService.updateUserDetails(newUserDetails)
    .then(res => {
      dispatch({
        type: 'SUCCESS_UPDATE_USER_DETAILS',
        payload: res.data,
      })
      return res;
    });
};
