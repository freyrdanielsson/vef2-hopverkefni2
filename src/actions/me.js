import api from '../api';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const NOT_THE_SAME = 'NOT_THE_SAME';


function requestUpload() {
  return {
    type: UPDATE_USER_REQUEST,
    isFetching: true,
  }
}

function receiveUpload(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    isFetching: false,
    user,
    message: null,
  }
}

function uploadError(message) {
  return {
    type: UPDATE_USER_FAILURE,
    isFetching: false,
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
export const uploadProfile = (profile) => {
  return async (dispatch) => {
    dispatch(requestUpload());    

    let upload;
    try {
      upload = await api.postFile('/users/me/profile', profile);
    } catch (e) {
      return dispatch(uploadError(e))
    }

    if (upload.result.error) {
      dispatch(uploadError(upload.result.error))
    }

    if (upload.status === 201) {
      const user = upload.result;
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(receiveUpload(user));
    }
  }
}

// Thunk!

export const updateUser = (userInfo, theSame) => {
  if(!theSame) {
    return(dispatch) => dispatch(notTheSame());
  }
  
  return async (dispatch) => {
    dispatch(requestUpload());
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