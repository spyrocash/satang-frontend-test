import { action, thunk } from 'easy-peasy'
import _ from 'lodash'
import {
  apiGetCryptoCurrency,
  socketGetCryptoCurrencyUrl,
  mapFieldCryptoCurrency,
  mapFieldCryptoCurrencyFromSocket,
} from 'services'

const model = {
  items: [],
  setItems: action((state, payload) => {
    state.items = payload
  }),
  updateItems: action((state, payload) => {
    state.items = _.isEmpty(state.items)
      ? payload
      : _.map(state.items, item => {
          return {
            ...item,
            ..._.find(payload, { name: item.name }),
          }
        })
  }),
  getItems: thunk(async (actions, payload) => {
    apiGetCryptoCurrency()
      .then(res => res.data)
      .then(items => _.map(items, mapFieldCryptoCurrency))
      .then(items => actions.setItems(items))
  }),
  getItemsFormSocket: thunk(async (actions, payload) => {
    const socket = new WebSocket(socketGetCryptoCurrencyUrl)
    socket.addEventListener('message', function (event) {
      if (!event.data) return
      try {
        const messages = JSON.parse(event.data)
        const items = _.map(messages, mapFieldCryptoCurrencyFromSocket)
        actions.updateItems(items)
      } catch (error) {}
    })
  }),
}

export default model
