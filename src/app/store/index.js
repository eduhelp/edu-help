import { combineReducers } from 'redux-immutable'
import RegistrationContainer from '../store/Registration/reducer'
import PaymentsContainer from '../store/Payments/reducer'
import SnackbarContainer from './Snackbar/reducer'
import PlcementsContainer from './Placements/reducer'

const rootReducer = combineReducers({
  RegistrationContainer,
  PaymentsContainer,
  SnackbarContainer,
  PlcementsContainer,
})

export default rootReducer
