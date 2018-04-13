import { combineReducers } from 'redux'

import auth from './auth'
import register from './register'
import books from './books'

export default combineReducers({
  auth,
  register,
  books,
})
