import api from '../api';

export const UPLOAD_PIC_REQUEST = 'UPLOAD_PIC_REQUEST';
export const UPLOAD_PIC_SUCCESS = 'UPLOAD_PIC_SUCCESS';
export const UPLOAD_PIC_FAILURE = 'UPLOAD_PIC_FAILURE';

function requestUpload() {
  return {
    type: UPLOAD_PIC_REQUEST,
    isFetching: true,
  }
}

function receiveUpload(user) {
  return {
    type: UPLOAD_PIC_SUCCESS,
    isFetching: false,
    user,
    message: null,
  }
}

function uploadError(message) {
  return {
    type: UPLOAD_PIC_FAILURE,
    isFetching: false,
    message
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
