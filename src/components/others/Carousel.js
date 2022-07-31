import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import { TrendingCoins} from '../../config/api'
import axios from 'axios'
import Context from '../../Context'
import AliceCarousel from 'react-alice-carousel';
import {Link} from 'react-router-dom'

function Carousel() {
    const [trendings,setTrendings] = useState([]);
    const {currency,symbol} = useContext(Context);
    const fetchTrending = async (currency)=>
    {
         const {data} = await axios.get(TrendingCoins(currency))
         setTrendings(data)
    }
    useEffect(()=>
    {
     fetchTrending(currency)
    },[currency])
    const responsive ={
        0: {
            items: 2,
        },
        512:
        {
            items:3
        },
        1024: {
            items: 5
        }
      }
   const items = trendings.map(coin =>
    {
        let profit = coin.price_change_percentage_24h>=0;
        return( 
        <Link to={`/coins/${coin.id}`} className="carouselItem">
        <img src={coin.image} alt={coin.name} height='80' style={{marginBottm:10}}>
        </img>
        <span>
            {coin.symbol.toUpperCase()}
            &nbsp;
            <span className={profit?"greenText":"redText"}>
                {profit?'+':''}
                {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
        </span>
        <span style={{fontSize:32, fontWeight:500}}>
            {symbol}{coin.current_price.toFixed(2)}
        </span>
        </Link>
        )
    })
  return (
    <div className='Carousel'>
        <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items} disableButtonsControls/>
    </div>
  )
}

export default Carousel