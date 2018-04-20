import { READBOOK_REQUEST, READBOOK_SUCCESS, READBOOK_FAILURE } from '../actions/readBook';

const initialState = {
  isFetching: false,
  readBook: [],
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case READBOOK_REQUEST:    
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case READBOOK_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };

    case READBOOK_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        readBook: action.readBook,
        message: action.message
      };
    default:
      return state;
  }
};