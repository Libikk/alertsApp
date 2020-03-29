// const { sqlQuery } = require('../sql/sqlServer');
import AuthService  from '../api/authService';
import { logoutUser } from '../utils/auth'

export const authorize = (token) => (dispatch) => {
  return AuthService.authorize(token)
    .then(payload => dispatch({
      type: 'LOGIN',
      payload,
    }))
    .catch((err) => console.error('Error: ', err.message))
};

export const login = (personCredential) => (dispatch) => {
  return AuthService.login(personCredential)
    .then(payload =>  dispatch({
      type: 'LOGIN',
      payload,
    }));
};

export const reSendActivationToken = () => (dispatch) => {
  return AuthService.reSendActivationToken()
    .then(() =>  dispatch({ type: 'RESEND_ACTIVATION_TOKEN' }));
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

export const passwordReset = (email) => (dispatch) => {
  dispatch({ type: 'PASSWORD_RESET_REQUEST' });
  return AuthService.passwordReset(email)
    .then(() => {
      dispatch({ type: 'PASSWORD_RESET_SUCCESS' });
    })
}

export const logout = () => (dispatch) => {
    logoutUser()
    return dispatch({ type: 'LOGOUT' })
};