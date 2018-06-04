import { SEARCH } from '../constants/ActionTypes'

const initialState = {
  data: ''
}

export default function search (state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return action.text
    default:
      return state
  }
}
