import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import _ from 'lodash'
import {
  apiGetCryptoCurrency,
  socketGetCryptoCurrencyUrl,
  mapFieldCryptoCurrency,
  mapFieldCryptoCurrencyFromSocket,
} from 'services'

// worker Saga: will be fired on ITEMS_FETCH_REQUESTED actions
function* fetchItems(action) {
  try {
    const result = yield call(apiGetCryptoCurrency)
    const items = _.map(result.data, mapFieldCryptoCurrency)
    yield put({ type: 'ITEMS_FETCH_SUCCEEDED', items })
  } catch (e) {
    yield put({ type: 'ITEMS_FETCH_FAILED', message: e.message })
  }
}

function* socketItems(action) {
  const socketGetCryptoCurrency = async () => {
    const socket = new WebSocket(socketGetCryptoCurrencyUrl)
    socket.addEventListener('message', function (event) {
      if (!event.data) return
      try {
        const messages = JSON.parse(event.data)
        const items = _.map(messages, mapFieldCryptoCurrencyFromSocket)
        console.log('items', items)
        return items
      } catch (e) {}
    })
  }
  try {
    const result = yield call(socketGetCryptoCurrency)
    // const items = _.map(result.data, mapFieldCryptoCurrency)
    // console.log('items', items)
    // yield put({ type: 'ITEMS_FETCH_SUCCEEDED', items })
  } catch (e) {
    yield put({ type: 'ITEMS_FETCH_FAILED', message: e.message })
  }
}

/*
  Starts fetchItems on each dispatched `ITEMS_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery('ITEMS_FETCH_REQUESTED', fetchItems)
  yield takeEvery('ITEMS_SOCKET_REQUESTED', socketItems)
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "ITEMS_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest('ITEMS_FETCH_REQUESTED', fetchItems)
//   yield takeLatest('ITEMS_SOCKET_REQUESTED', socketItems)
// }

export default mySaga
