import api from '../api';
import { receiveLogin, loginError } from './auth';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
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

function receiveItems(items) {
  return {
    type: FETCH_SUCCESS,
    isFetching: null,
    items,
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

    if (upload.status === 401) {
      return dispatch(loginError(upload.result.error))
    }

    if (upload.result.error) {
      dispatch(uploadError([{message: upload.result.error}]))
    }

    if (upload.status === 201) {
      const user = upload.result;
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(receiveUpload(user));
      dispatch(receiveLogin(user));
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

    if (update.status === 401) {
      return dispatch(loginError(update.result.error))
    }

    if (update.result.errors) {
      dispatch(uploadError(update.result.errors))
    }

    if (update.status === 200) {
      const user = update.result;
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(receiveUpload(user));
      dispatch(receiveLogin(user));
    }
  }
}

export const fetch = (baseUrl, url, className) => {
  return async (dispatch) => {
    dispatch(requestUpload(className));
    let response;
    try {
      response = await api.get(`${baseUrl}${url}`);
    } catch (e) {
      return dispatch(uploadError(e))
    }

    if (response.status === 401) {
      return dispatch(loginError(response.result.error))
    }
    

    if (response.result.error) {
      dispatch(uploadError(response.result.error))
    }

    if (response.status === 200) {
      const { items } = response.result;
      if(items){
        return dispatch(receiveItems(items));
      }
      return dispatch(receiveUpload(response.result));
    }
  }
}

export const deleteBook = (id, className, url) => {
  return async (dispatch) => {
    try {
      const del = await api.deleteBook(`/users/me/read/${id}`);
    } catch (e) {
      console.log(e);
      
      return dispatch(uploadError(e))
    }

    dispatch(fetch(url, className));
  }
}