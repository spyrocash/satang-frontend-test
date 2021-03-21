import { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Card from 'components/Card'
import './style.scss'

function Home() {
  const dispatch = useDispatch()

  const items = useSelector(state => state.cryptocurrency.items)

  // const items = useStoreState(state => state.cryptocurrency.items)
  // const getItems = useStoreActions(actions => actions.cryptocurrency.getItems)
  // const getItemsFormSocket = useStoreActions(actions => actions.cryptocurrency.getItemsFormSocket)

  // useEffect(() => {
  //   getItems()
  //   getItemsFormSocket()
  // }, [])

  useEffect(() => {
    dispatch({ type: 'ITEMS_FETCH_REQUESTED' })
    dispatch({ type: 'ITEMS_SOCKET_REQUESTED' })
  }, [])

  return (
    <div className="home-page">
      <div className="container">
        {_.map(items, (item, index) => {
          const { logo, name, fullname, price, changePercent24h, volumn24h } = item
          return (
            <Card
              key={index}
              logo={logo}
              name={name}
              fullname={fullname}
              price={price}
              changePercent24h={changePercent24h}
              volumn24h={volumn24h}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
