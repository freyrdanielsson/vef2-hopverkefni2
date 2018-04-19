import { combineReducers } from 'redux'

import auth from './auth'
import register from './register'
import books from './books'
import patchBook from './patchBook'
import users from './users'

import post from './post'

import categories from './categories'


export default combineReducers({
  auth,
  register,
  books,
  patchBook,
  users,
  post,
  categories

})
