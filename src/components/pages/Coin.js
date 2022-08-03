import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";
import CoinInfo from "../others/CoinInfo";
import { SingleCoin } from "../../config/api";
import Context from '../../Context'

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(Context);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "#89CFF" }} />;

  return (
    <div className={"container"}>
      <div className={"sideBar"}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={"header"}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="desc">
          {parser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className="marketdata">
            <span style={{display:'flex',textAlign:"center"}}>
               <Typography variant="h5" className="header">
                Rank:
               </Typography>
               &nbsp;&nbsp;
               <Typography variant="h5" style={{fontFamily:"poppins"}}>
                {
                    coin.market_cap_rank
                }
               </Typography>
            </span>
            <span style={{display:'flex'}}>
               <Typography variant="h5" className="header">
                Current Price:
               </Typography>
               &nbsp;&nbsp;
               <Typography variant="h5" style={{fontFamily:"poppins"}}>
                {
                 symbol
                }
                {""}{numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
               </Typography>
            </span>
            <span style={{display:'flex'}}>
               <Typography variant="h5" className="header">
                Market Cap:
               </Typography>
               &nbsp;&nbsp;
               <Typography variant="h5" style={{fontFamily:"poppins"}}>
                {
                 symbol
                }
                {""}{numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}
               </Typography>
            </span>
        </div>
        </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;