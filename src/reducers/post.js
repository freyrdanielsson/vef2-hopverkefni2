import { 
	POST_REQUEST,
	POST_SUCCESS,
	POST_FAILURE,
} from '../actions/post';

const initialState = {
	isFetching: false,
	result: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case POST_REQUEST:    
			return {
				...state,
				isFetching: action.isFetching,
			};
		case POST_SUCCESS:
			return {
				...state,
				isFetching: action.isFetching,
				result: action.result,
				message: action.message,
			};
		case POST_FAILURE:
			return {
				...state,
				isFetching: action.isFetching,
				message: action.message,
			};
		default:
			return state;
	}
};