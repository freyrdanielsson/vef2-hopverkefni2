import api from '../api';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const READ_BOOKS_SUCCESS = 'READ_BOOKS_SUCCESS';
export const NOT_THE_SAME = 'NOT_THE_SAME';


function requestUpload(className) {
  return {
    type: UPDATE_USER_REQUEST,
    isFetching: className,
  }
}

function receiveUpload(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    isFetching: null,
    user,
    message: null,
  }
}

function receiveBooks(books) {
  return {
    type: READ_BOOKS_SUCCESS,
    isFetching: null,
    books,
    message: null,
  }
}

function uploadError(message) {
  return {
    type: UPDATE_USER_FAILURE,
    isFetching: null,
    message
  }
}

function notTheSame() {
  return {
    type: NOT_THE_SAME,
    message: {field: 'Oops', message: 'Passwords do not match'},
  }
}

// Thunk!
export const uploadProfile = (profile, className) => {
  return async (dispatch) => {
    dispatch(requestUpload(className));    

    let upload;
    try {
      upload = await api.postFile('/users/me/profile', profile);
    } catch (e) {
      return dispatch(uploadError(e))
    }

    if (upload.result.error) {
      dispatch(uploadError([{message: upload.result.error}]))
    }

    if (upload.status === 201) {
      const user = upload.result;
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(receiveUpload(user));
    }
  }
}

// Thunk!

export const updateUser = (userInfo, theSame, className) => {
  if(!theSame) {
    return(dispatch) => dispatch(notTheSame());
  }

  return async (dispatch) => {
    dispatch(requestUpload(className));
    let update;
    try {
      update = await api.patch('/users/me', userInfo);
    } catch (e) {
      return dispatch(uploadError(e))
    }

    if (update.result.errors) {
      dispatch(uploadError(update.result.errors))
    }

    if (update.status === 200) {
      const user = update.result;
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(receiveUpload(user));
    }
  }
}

export const fetchRead = (url, className) => {
  return async (dispatch) => {
    dispatch(requestUpload(className));
    let read;
    try {
      read = await api.get(`/users/me/read${url}`);
    } catch (e) {
      return dispatch(uploadError(e))
    }

    if (read.result.error) {
      dispatch(uploadError(read.result.error))
    }

    if (read.status === 200) {
      const { items } = read.result;
      dispatch(receiveBooks(items));
    }
  }
}