import { BOOKS_REQUEST, BOOKS_ERROR, BOOKS_SUCCESS } from '../actions/books';

const initialState = {
  isFetching: false,
  books: [],
  error: null,
  statusCode: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case BOOKS_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
        statusCode: action.books.status,
      };

    case BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books.result,
        error: action.error,
        statusCode: action.books.status,
      };

    default:
      return state;
  }
};