import Cookie from 'js-cookie';

export const logoutUser = () => {
    return Cookie.remove('access_token');
};