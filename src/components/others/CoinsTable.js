import Context from '../../Context';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CoinList from '../../config/api'

function CoinsTable() {
    const [coins,setCoins] = useState([]);
    const [loadinf,setLoading] = useState(false);
    const {currency} = useContext(Context);
    const fetchCoins = async (currency)=>
    {
        
      let {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
      setCoins(data) 
    }
    useEffect(()=>
    { 
       fetchCoins(currency)
    },[currency])

  return (
    <div>CoinsTable</div>
  )
}

export default CoinsTable

