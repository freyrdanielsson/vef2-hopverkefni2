import { 
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAILURE,
  } from '../actions/patchBook';

const initialState = {
    isPatching: false,
    book: null
};

export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_BOOK_REQUEST:    
        return {
          ...state,
          isPatching: action.isPatching,
        };
      case UPDATE_BOOK_SUCCESS:
        return {
          ...state,
          isPatching: action.isPatching,
          book: action.book,
          message: action.message,
        };
      case UPDATE_BOOK_FAILURE:
        return {
          ...state,
          isPatching: action.isPatching,
          message: action.message
        };
      default:
        return state;
    }
};