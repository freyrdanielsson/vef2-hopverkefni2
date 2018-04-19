import { CATEGORIES_REQUEST, CATEGORIES_ERROR, CATEGORIES_SUCCESS } from '../actions/categories';

const initialState = {
  fetchingCategories: false,
  categories: [],
  categoryError: null,
  statusCode: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return {
        ...state,
        fetchingCategories: action.fetchingCategories,
      };

    case CATEGORIES_ERROR:
      return {
        ...state,
        fetchingCategories: action.fetchingCategories,
        categories: action.categories,
        categoryError: action.categoryError,
        statusCode: action.categories.status,
      };

    case CATEGORIES_SUCCESS:
      return {
        ...state,
        fetchingCategories: action.fetchingCategories,
        categories: action.categories.result,
        categoryError: action.categoryError,
        statusCode: action.categories.status,
      };

    default:
      return state;
  }
};