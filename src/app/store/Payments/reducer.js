import { fromJS } from 'immutable'
import {
  GET_PAYMENTS_SUCCESS,
  GET_LEVEL_PAYMENTS_SUCCESS,
  RECEIVE_PAYMENT_LIST_SUCCESS,
  MY_PAYMENT_LIST_SUCCESS,
  LEVEL_ELIGIBILIY_SUCCESS,
  CONFIRM_RECEIVER_SUCCESS,
  RECEIVED_PAYMENT_LIST_SUCCESS,
} from './actionType'

export const initialState = fromJS({
  userPayments : [],
  levelPayments: [],
  receivePaymentsList: [],
  myPaymentList: [],
  levelEligibility: [],
  confirmReceiver: '',
  myReceivedPayments: []
})


export default function paymentsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTS_SUCCESS:
      return state
        .set('userPayments', fromJS(action.data))

    case GET_LEVEL_PAYMENTS_SUCCESS:
      return state
        .set('levelPayments', fromJS(action.data))

    case RECEIVE_PAYMENT_LIST_SUCCESS:
      return state
        .set('receivePaymentsList', fromJS(action.data))
    
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
          .set('myReceivedPayments', fromJS(action.data))
          
    default:
      return state
  }
}
