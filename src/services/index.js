import axios from 'axios'

export const apiGetCryptoCurrency = () => {
  return axios({
    url: 'https://satangcorp.com/api/v3/ticker/24hr',
  })
}

export const socketGetCryptoCurrencyUrl = 'ws://ws.satangcorp.com/ws/!miniTicker@arr@3000ms'
