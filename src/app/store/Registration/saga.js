import { takeLatest, put, call } from 'redux-saga/effects'
import { getUsersAPI } from './actionCreator'
import * as types from './actionType'

export function * getUserListSaga() {
    try {
        const data = yield call(getUsersAPI)
        yield put({
            type: types.GET_USERS_SUCCESS,
            data
        })
    } catch (error) {
        if (error && error.response && error.response.data) {
            const errorData = {status: true, variant: 'error', message: error.response.data.message }
            yield put({
                type: TOGGLE_SNACKBAR,
                snackMessages: errorData,
            })
        }
    }
}

export default function * watchRegistrationSaga () {
    yield takeLatest(types.GET_USERS, getUserListSaga)
}