import { UPLOAD_PIC_REQUEST, UPLOAD_PIC_SUCCESS, UPLOAD_PIC_FAILURE } from '../actions/me';

const user = JSON.parse(window.localStorage.getItem('user') || 'null');

const initialState = {
  isFetching: false,
  user,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PIC_REQUEST:    
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case UPLOAD_PIC_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.user,
        message: action.message,
      };
    case UPLOAD_PIC_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };
    default:
      return state;
  }
};
