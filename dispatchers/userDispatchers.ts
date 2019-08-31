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
