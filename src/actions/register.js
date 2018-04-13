import api from '../api';
import { loginUser } from './auth';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function requestRegister() {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    message
  }
}


// Thunk!
export const registerUser = (name, username, password) => {
  return async (dispatch) => {
    dispatch(requestRegister());    

    let register;
    try {
      register = await api.post('/register', {name, username, password});
    } catch (e) {
      return dispatch(registerError(e))
    }

    if (register.result.errors) {
      dispatch(registerError(register.result.errors))
    }

    if (register.status === 201) {
      dispatch(loginUser(username, password));
    }
  }
}
