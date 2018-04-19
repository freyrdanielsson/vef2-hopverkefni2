import { combineReducers } from 'redux'

import auth from './auth'
import register from './register'
import books from './books'
import profile from './profile'
import patchBook from './patchBook'
import users from './users'

import post from './post'

import categories from './categories'


export default combineReducers({
  auth,
  register,
  books,
  profile,
  patchBook,
  users,

  post,

  categories

})
