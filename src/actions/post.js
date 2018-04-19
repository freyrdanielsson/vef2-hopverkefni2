import api from '../api';
import { loginError } from './auth';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

function requestPost() {
    return {
      type: POST_REQUEST,
      isFetching: true,
    }
  }
  
function receivePost(result) {
    return {
      type: POST_SUCCESS,
      isFetching: false,
      result,
      message: null,
    }
}
  
function postError(message) {
    return {
      type: POST_FAILURE,
      isFetching: false,
      message
    }
}


export const post = (url, data) => {
  
    return async (dispatch) => {
      dispatch(requestPost());
      let post;
      try {
        post = await api.post(url, data);
      } catch (e) {
        return dispatch(postError(e));
      }
  
      if (post.result.errors) {
        dispatch(postError(post.result.errors));
      }

      if (post.status === 401) {
        dispatch(loginError(post.result.error));
        return dispatch(postError([]));
      }

      if (post.status === 201) {
        const response = post.result;
        dispatch(receivePost(response));
      }
    }
  }