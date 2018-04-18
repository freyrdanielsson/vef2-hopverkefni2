import { 
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAILURE,
  } from '../actions/patchBook';

const initialState = {
    isFetching: false,
    book: null
};

export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_BOOK_REQUEST:    
        return {
          ...state,
          isFetching: action.isFetching,
        };
      case UPDATE_BOOK_SUCCESS:
        return {
          ...state,
          isFetching: action.isFetching,
          book: action.book,
          message: action.message,
        };
      case UPDATE_BOOK_FAILURE:
        return {
          ...state,
          isFetching: action.isFetching,
          message: action.message
        };
      default:
        return state;
    }
};