import { 
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FETCH_SUCCESS,
  NOT_THE_SAME,
} from '../actions/users';

const user = JSON.parse(window.localStorage.getItem('user') || 'null');

const initialState = {
  isFetching: null,
  user,
  items: '',
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
      case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        items: action.items,
        message: action.message,
      };
    default:
      return state;
  }
};
