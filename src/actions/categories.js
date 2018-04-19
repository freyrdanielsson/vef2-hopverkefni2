import api from '../api';

export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';

function requestCategories() {
    return {
      type: CATEGORIES_REQUEST,
      fetchingCategories: true,
      categoryError: null,
    }
}
  
function categoriesError(error) {
    return {
      type: CATEGORIES_ERROR,
      fetchingCategories: false,
      categories: [],
      categoryError: error,
    }
}
  
function receiveCategories(categories) {
    return {
      type: CATEGORIES_SUCCESS,
      fetchingCategories: false,
      categories,
      categoryError: null,
    }
}

export const fetchCategories = () => {
  
    return async (dispatch) => {
      dispatch(requestCategories());
      let categories;
      try {
        categories = await api.get('/categories?offset=0&limit=100');
      } catch (e) {
        return dispatch(categoriesError(e))
      }
  
      dispatch(receiveCategories(categories));
    }
}