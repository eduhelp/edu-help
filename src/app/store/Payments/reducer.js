import { fromJS } from 'immutable'
import {
  GET_PAYMENTS_SUCCESS,
  GET_LEVEL_PAYMENTS_SUCCESS,
  MY_CONFIRM_PENDING_LIST,
  MY_PAYMENT_LIST_SUCCESS,
  LEVEL_ELIGIBILIY_SUCCESS,
  CONFIRM_RECEIVER_SUCCESS,
  RECEIVED_PAYMENT_LIST_SUCCESS,
} from './actionType'

export const initialState = fromJS({
  userPayments : [],
  levelPayments: [],
  confirmPendingList: [],
  myPaymentList: [],
  levelEligibility: [],
  confirmReceiver: '',
  myReceivedList: []
})


export default function paymentsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTS_SUCCESS:
      return state
        .set('userPayments', fromJS(action.data))

    case GET_LEVEL_PAYMENTS_SUCCESS:
      return state
        .set('levelPayments', fromJS(action.data))

    case MY_CONFIRM_PENDING_LIST:
      return state
        .set('confirmPendingList', fromJS(action.data))
    
    case MY_PAYMENT_LIST_SUCCESS:
      return state
        .set('myPaymentList', fromJS(action.data))
    
    case LEVEL_ELIGIBILIY_SUCCESS:
      return state
        .set('levelEligibility', fromJS(action.data))
    
    case LEVEL_ELIGIBILIY_SUCCESS:
        return state
          .set('confirmReceiver', fromJS('confirmed'))

    case RECEIVED_PAYMENT_LIST_SUCCESS:
        return state
          .set('myReceivedList', fromJS(action.data))
          
    default:
      return state
  }
}
