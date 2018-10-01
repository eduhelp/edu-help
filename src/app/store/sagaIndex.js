import { fork } from 'redux-saga/effects'
import watchRegistrationSaga from './Registration/saga'

export default function * () {
    yield * [
        fork(watchRegistrationSaga),
    ]
}