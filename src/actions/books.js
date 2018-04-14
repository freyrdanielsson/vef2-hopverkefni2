import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_ERROR = 'BOOKS_ERROR';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';

function requestBooks() {
    return {
      type: BOOKS_REQUEST,
      isFetching: true,
      error: null,
    }
}
  
function booksError(error) {
    return {
      type: BOOKS_ERROR,
      isFetching: false,
      books: [],
      error: error,
    }
}
  
function receiveBooks(books) {
    return {
      type: BOOKS_SUCCESS,
      isFetching: false,
      books,
      error: null,
    }
}

export const fetchBooks = (url) => {
  
    return async (dispatch) => {
      dispatch(requestBooks());
      let books;
      try {
        books = await api.get(`/books${url}`);
      } catch (e) {
        return dispatch(booksError(e))
      }
  
      dispatch(receiveBooks(books));
    }
}