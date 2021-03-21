import { action, thunk } from 'easy-peasy'
import _ from 'lodash'
import { apiGetCryptoCurrency, socketGetCryptoCurrencyUrl } from 'services'

const staticItems = [
  {
    name: 'BTC',
    fullname: 'Bitcoin',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/btc.png',
  },
  {
    name: 'USDT',
    fullname: 'TetherUS',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/usdt.png',
  },
  {
    name: 'ADA',
    fullname: 'Cardano',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/ada.png',
  },
  {
    name: 'ETH',
    fullname: 'Ethereum',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/eth.png',
  },
  {
    name: 'BNB',
    fullname: 'BNB',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/bnb.png',
  },
  {
    name: 'DOT',
    fullname: 'Polkadot',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/dot.png',
  },
  {
    name: 'XRP',
    fullname: 'Ripple',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/xrp.png',
  },
  {
    name: 'TRX',
    fullname: 'TRON',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/trx.png',
  },
  {
    name: 'HBAR',
    fullname: 'Hedera Hashgraph',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/hbar.png',
  },
  {
    name: 'BAT',
    fullname: 'Basic Attention Token',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/bat.png',
  },
  {
    name: 'DOGE',
    fullname: 'Dogecoin',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coin/38634057-e551-44e0-8ff5-033d4ee0b612.png',
  },
  {
    name: 'XZC',
    fullname: 'Firo',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/xfr.png',
  },
  {
    name: 'XLM',
    fullname: 'Stellar Lumens',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/xlm.png',
  },
  {
    name: 'LTC',
    fullname: 'Litecoin',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/ltc.png',
  },
  {
    name: 'BAND',
    fullname: 'BAND',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/band.png',
  },
  {
    name: 'ATOM',
    fullname: 'Cosmos',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/atom.png',
  },
  {
    name: 'LINK',
    fullname: 'ChainLink',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/link.png',
  },
  {
    name: 'ALGO',
    fullname: 'Algorand',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/algo.png',
  },
  {
    name: 'JFIN',
    fullname: 'JFIN Coin',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coin/7ec09a84-6de9-4649-909b-1a41f6e1b470.png',
  },
  {
    name: 'EOS',
    fullname: 'EOS',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/eos.png',
  },
  {
    name: 'XTZ',
    fullname: 'Tezos',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coin/f80559c6-3242-4c48-ab11-3e5326bf6800.png',
  },
  {
    name: 'DASH',
    fullname: 'Dash',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coin/b6c8c554-ae01-4460-866d-fafa6f19db5c.png',
  },
  {
    name: 'BUSD',
    fullname: 'BUSD',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/busd.png',
  },
  {
    name: 'ZEC',
    fullname: 'Zcash',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/zec.png',
  },
  {
    name: 'ETC',
    fullname: 'Ethereum Classic',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/etc.png',
  },
  {
    name: 'USDC',
    fullname: 'USD Coin',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/usdc.png',
  },
  {
    name: 'BCH',
    fullname: 'Bitcoin Cash',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/bch.png',
  },
  {
    name: 'XMR',
    fullname: 'Monero',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/xmr.png',
  },
  {
    name: 'TUSD',
    fullname: 'TrueUSD',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/tusd.png',
  },
  {
    name: 'DAI',
    fullname: 'Dai',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/dai.png',
  },
  {
    name: 'PAXG',
    fullname: 'PAX Gold',
    logo: 'https://storage.googleapis.com/satang-pro/public/assets/icons/coins/paxg.png',
  },
]

const calculateChangePercent24h = (openPrice, lastPrice) => {
  const openPriceNumber = Number(openPrice)
  const lastPriceNumber = Number(lastPrice)
  return openPriceNumber ? ((lastPriceNumber - openPriceNumber) / openPriceNumber) * 100 : 100
}

const findStaticItem = symbol => {
  const name = _.toUpper(_.replace(symbol, '_thb', ''))
  const staticItem = _.find(staticItems, { name })
  return staticItem
}

export const mapFieldCryptoCurrency = item => {
  const { symbol, openPrice, lastPrice, quoteVolume } = item
  const changePercent24h = calculateChangePercent24h(openPrice, lastPrice)
  return {
    ...findStaticItem(symbol),
    price: lastPrice,
    changePercent24h,
    volumn24h: quoteVolume,
  }
}

export const mapFieldCryptoCurrencyFromSocket = item => {
  const { s, o, c, q } = item
  const changePercent24h = calculateChangePercent24h(o, c)
  return {
    ...findStaticItem(s),
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
