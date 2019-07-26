import Cookie from 'js-cookie';

export const logoutUser = () => {
    return Cookie.remove('access_token');
};

export const getCookie = (name, cookie) => {
    const escape = (s) => s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
    var match = cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}