import Cookies from 'js-cookie';

export const setToken = (data, rememberMe = false) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (rememberMe) {
    Cookies.set('id', data.user.id, { expires: 30 });
    Cookies.set('username', data.user.username, { expires: 30 });
    Cookies.set('jwt', data.jwt, { expires: 30 });
    Cookies.set('email', data.user.email, { expires: 30 });
  } else {
    Cookies.set('id', data.user.id);
    Cookies.set('username', data.user.username);
    Cookies.set('jwt', data.jwt);
    Cookies.set('email', data.user.email);
  }
};

export const unsetToken = () => {
  if (typeof window === 'undefined') {
    return;
  }

  Cookies.remove('id');
  Cookies.remove('username');
  Cookies.remove('jwt');
};

export const getUserFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();

  if (jwt) {
    return fetch(`${import.meta.env.VITE_SERVER_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (response.status === 401) throw new Error('Token is expired or contaminated. Login is required');
        return response.json();
      })
      .then((data) => {
        Cookies.set('id', data.id);
        Cookies.set('username', data.username);
        Cookies.set('email', data.email);
        return data;
      })
      .catch((error) => console.log('User not found', error));
  } else {
    return;
  }
};

export const getIdFromLocalCookie = () => {
  return Cookies.get('id');
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get('jwt');
};
