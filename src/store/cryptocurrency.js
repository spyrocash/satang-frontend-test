import { action, thunk } from 'easy-peasy'
import _ from 'lodash'
import { apiGetCryptoCurrency, socketGetCryptoCurrencyUrl } from 'services'

export const mapFieldCryptoCurrency = item => {
  const { symbol, lastPrice, openPrice, quoteVolume } = item
  const openPriceNumber = Number(openPrice)
  const lastPriceNumber = Number(lastPrice)
  const changePercent24h = openPriceNumber ? ((lastPriceNumber - openPriceNumber) / openPriceNumber) * 100 : 100
  return {
    logo: null,
    name: symbol,
    fullname: symbol,
    price: lastPrice,
    changePercent24h,
    volumn24h: quoteVolume,
  }
}

export const mapFieldCryptoCurrencyFromSocket = item => {
  const { c, o, q, s } = item
  const openPriceNumber = Number(o)
  const lastPriceNumber = Number(c)
  const changePercent24h = openPriceNumber ? ((lastPriceNumber - openPriceNumber) / openPriceNumber) * 100 : 100
  return {
    logo: null,
    name: s,
    fullname: s,
    price: c,
    changePercent24h,
    volumn24h: q,
  }
}

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
