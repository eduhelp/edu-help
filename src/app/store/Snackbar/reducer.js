import { fromJS } from 'immutable'
import {
  TOGGLE_SNACKBAR,
} from './actionType'

export const initialState = fromJS({
  snackbarMessage: {},
})

export default function grouperReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SNACKBAR:
      return state
        .set('snackbarMessage', fromJS(action.snackMessage))

    default:
      return state
  }
}