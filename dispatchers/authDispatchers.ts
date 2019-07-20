// const { sqlQuery } = require('../sql/sqlServer');
import AuthService  from '../api/authService';
import { logoutUser } from '../utils/auth'


export const login = (personCredential) => (dispatch) => {
  return AuthService.login(personCredential)
    .then(payload =>  dispatch({
      type: 'LOGIN',
      payload,
    }));
};

export const register = (personCredential) => (dispatch) => {
    return AuthService.register(personCredential)
      .then(payload => {
        dispatch({ type: 'REGISTER' });
        dispatch({
            type: 'LOGIN',
            payload,
        })
    });
  };

export const logout = () => (dispatch) => {
    logoutUser()
    return dispatch({ type: 'LOGOUT' })
};