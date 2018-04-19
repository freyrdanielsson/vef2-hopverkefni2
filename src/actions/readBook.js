import api from '../api';

export const READBOOK_REQUEST = 'READBOOK_REQUEST';
export const READBOOK_SUCCESS = 'READBOOK_SUCCESS';
export const READBOOK_FAILURE = 'READBOOK_FAILURE';

function requestRegister() {
  return {
    type: READBOOK_REQUEST,
    isFetching: true,
  }
}

function registerError(message) {
  return {
    type: READBOOK_FAILURE,
    isFetching: false,
    message
  }
}

function registerRecive(readBook) {
    return {
      type: READBOOK_SUCCESS,
      isFetching: false,
      readBook,
      message: null
    }
}



// Thunk!
export const registerReadBook = (bookId, review, rating) => {
  return async (dispatch) => {
    dispatch(requestRegister());    

    let register;
    try {
      register = await api.post('/users/me/read', {bookId, review, rating});
      console.log(register);
    } catch (e) {
      return dispatch(registerError(e))
    }

    dispatch(registerRecive(register))
  }
}
