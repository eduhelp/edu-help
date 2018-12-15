import { fromJS } from 'immutable'
import {
  OPEN_DISPUTE_SUCCESS,
  GET_MY_DISPUTES_SUCCESS,
  DISPUTE_PHOTOS_SUCCESS,
  DISPUTE_COMMENTS_SUCCESS,
  GET_NOTIFICATIONS_SUCCESS,
  OPEN_NOTIFY_STATUS,
} from './actionType'

export const initialState = fromJS({
  openDispute: [],
  myDisputes: [],
  disputePhotos: [],
  disputeComments: [],
  listNitifications: [],
  notifcationOpenStatus: false
})

export default function disputeReducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_DISPUTE_SUCCESS:
      return state
        .set('openDispute', fromJS(action.data))
    
    case GET_MY_DISPUTES_SUCCESS:
      return state
        .set('myDisputes', fromJS(action.data))
    
    case DISPUTE_PHOTOS_SUCCESS:
      return state
        .set('disputePhotos', fromJS(action.data))

    case DISPUTE_COMMENTS_SUCCESS:
      return state
        .set('disputeComments', fromJS(action.data))
    
    case GET_NOTIFICATIONS_SUCCESS:
      return state
        .set('listNitifications', fromJS(action.data))
    
    case OPEN_NOTIFY_STATUS:
      return state
        .set('notifcationOpenStatus', true)

    default:
      return state
  }
}