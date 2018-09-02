import { GET_NAME } from '../constants/ActionTypes'

const initialState = {
  userName: ''
}

export default function login (state = initialState, action) {
  switch (action.type) {
    case GET_NAME:
      return { ...state, userName: action.userName }
    default:
      return state
  }
}
