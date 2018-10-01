import { fromJS } from 'immutable'
import {
  MY_TREE_SUCCESS,
  MY_TOP_LEVEL_SUCCESS,
} from './actionType'

export const initialState = fromJS({
  myTree: {},
  myTopLevel: {},
})

export default function grouperReducer (state = initialState, action) {
  switch (action.type) {
    case MY_TREE_SUCCESS:
      return state
        .set('myTree', fromJS(action.data))

    case MY_TOP_LEVEL_SUCCESS:
      return state
        .set('myTopLevel', fromJS(action.data))

    default:
      return state
  }
}