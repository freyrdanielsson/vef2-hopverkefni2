import { 
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from '../actions/users';

const initialState = {
  isFetching: null,
  profilePic: null,
  user: null,
  books: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:    
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.user,
        message: action.message,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };
    default:
      return state;
  }
};