import { combineReducers } from 'redux'
import counter from './counter'
import login from './Login'
import getname from './getname'

export default combineReducers({
  counter, login, getname
})
