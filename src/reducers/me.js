import { 
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  READ_BOOKS_SUCCESS,
  NOT_THE_SAME,
} from '../actions/me';

const user = JSON.parse(window.localStorage.getItem('user') || 'null');

const initialState = {
  isFetching: null,
  profilePic: user ? user.image : null,
  user,
  books: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:    
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.user,
        message: action.message,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };
    case NOT_THE_SAME:
      return {
        ...state,
        message: [action.message],
      };
      case READ_BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        message: action.message,
      };
    default:
      return state;
  }
};
