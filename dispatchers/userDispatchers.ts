import { UserService } from '../api/userService';

export const updateUserDetails = (newUserDetails) => (dispatch) => {
  dispatch({ type: 'REQUEST_UPDATE_USER_DETAILS' });

  return UserService.updateUserDetails(newUserDetails)
    .then(res => {
      dispatch({
        type: 'SUCCESS_UPDATE_USER_DETAILS',
        newUserDetails,
      })
      return res;
    });
};
