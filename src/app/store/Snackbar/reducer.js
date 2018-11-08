import { fromJS } from 'immutable'
import {
  TOGGLE_SNACKBAR,
  TOGGLE_LOADER,
} from './actionType'

export const initialState = fromJS({
  snackbarMessage: {},
  loaderStatus: {
    status: false
  }
})

export default function grouperReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SNACKBAR:
      return state
        .set('snackbarMessage', fromJS(action.snackMessage))

    case TOGGLE_LOADER:
      return state
        .set('loaderStatus', fromJS(action.loaderMsg))

    default:
      return state
  }
}
