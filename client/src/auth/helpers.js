import cookie from 'js-cookie';

// set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 30
    });
  }
}

// remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 30
    });
  }
}

// get from cookie
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
}

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

// authenticate user by passing data to cookie and localstorage
export const authenticate = (response, next) => {
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
}

// access user information from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');

    if(cookieChecked) {
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
}

// remove user information from cookie and localstorage
export const logout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}