import { fromJS } from 'immutable'
import {
  OPEN_DISPUTE_SUCCESS,
} from './actionType'

export const initialState = fromJS({
  openDispute: [],
})

export default function grouperReducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_DISPUTE_SUCCESS:
      return state
        .set('openDispute', fromJS(action.data))

    default:
      return state
  }
}