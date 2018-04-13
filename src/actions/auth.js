
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  }
}

// Thunk!
export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());    

    let login;
    try {
      login = await api.post('/login', {username, password});
    } catch (e) {
      return dispatch(loginError(e))
    }

    if (login.result.error) {
      dispatch(loginError(login.result.error))
    }

    if (login.status === 200) {
      const { user, token } = login.result;
      localStorage.setItem('token', JSON.stringify(token));
      dispatch(receiveLogin(user));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  }
}
