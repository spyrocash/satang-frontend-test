import numeral from 'numeral'
import { ReactComponent as ArrowUp } from 'assets/images/icons/arrow-up.svg'
import { ReactComponent as ArrowDown } from 'assets/images/icons/arrow-down.svg'
import './style.scss'

function Card({ logo, name, fullname, price, changePercent24h, volumn24h }) {
  const isPriceUp = changePercent24h > 0
  return (
    <div className="card-component">
      <div className="row-1">
        <div className="head-info">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="name-block">
            <p className="name">{name}</p>
            <p className="fullname">{fullname}</p>
          </div>
        </div>
      </div>
      <div className="row-2">
        <p className="price">{numeral(price || 0).format('$0,0.00')}</p>
      </div>
      <div className="row-3">
        <div className="change-24h">
          <p className={`value price-${isPriceUp ? 'up' : 'down'}`}>
            {numeral(changePercent24h || 0).format('+0,0.00')}% {isPriceUp ? <ArrowUp /> : <ArrowDown />}
          </p>
          <p className="label">24h change</p>
        </div>
        <div className="volumn-24h">
          <p className="value">{numeral(volumn24h || 0).format('0,0.00')}</p>
          <p className="label">24h Volume</p>
        </div>
      </div>
    </div>
  )
}

export default Card
