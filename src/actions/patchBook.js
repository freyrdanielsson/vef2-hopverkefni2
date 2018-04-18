import api from '../api';

export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE';

function requestUpload() {
    return {
      type: UPDATE_BOOK_REQUEST,
      isFetching: true,
    }
  }
  
function receiveUpload(book) {
    return {
      type: UPDATE_BOOK_SUCCESS,
      isFetching: false,
      book,
      message: null,
    }
}
  
function uploadError(message) {
    return {
      type: UPDATE_BOOK_FAILURE,
      isFetching: false,
      message
    }
}


export const patchBook = (bookInfo, id) => {
  
    return async (dispatch) => {
      dispatch(requestUpload());
      let update;
      try {
        update = await api.patch(`/books/${id}`, bookInfo);
      } catch (e) {
        return dispatch(uploadError(e))
      }
  
      if (update.result.errors) {
        dispatch(uploadError(update.result.errors))
      }
      if (update.status === 200 || update.status === 201) {
        const book = update.result;
        dispatch(receiveUpload(book));
      }
    }
  }

