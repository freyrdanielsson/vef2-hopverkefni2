import { 
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions/me';

const user = JSON.parse(window.localStorage.getItem('user') || 'null');

const initialState = {
  isFetching: false,
  profilePic: user ? user.image : null,
  user,
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
    default:
      return state;
  }
};
