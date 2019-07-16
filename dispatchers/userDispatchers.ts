import { UserService } from '../api/UserService';


export const getUserData = () => (dispatch) => {
  return UserService.getUserData()
    .then(personData => {
        console.log('personData: ', personData);
        dispatch({
      type: 'GET_USER_DATA',
      personData,
    })
});
};
