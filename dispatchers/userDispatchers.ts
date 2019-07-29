import { UserService } from '../api/UserService';


export const getUserData = () => (dispatch) => {
  return UserService.getUserData()
    .then(res => {
      dispatch({
      type: 'LOGIN',
      payload: res.data,
    })
});
};
