import Context from '../../Context';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Container, ThemeProvider } from '@mui/system';
import {useNavigate} from 'react-router-dom'

function CoinsTable() {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const[search,setSearch] = useState("");
    const[page,setPage] = useState(1);
    const {currency,symbol} = useContext(Context);
    const navigate = useNavigate();
    const fetchCoins = async (currency)=>
    {
      setLoading(true)
      let {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
      setCoins(data)
      setLoading(false) 
    }
    useEffect(()=>
    { 
       fetchCoins(currency)
    },[currency])

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    };
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
  return (
   <ThemeProvider theme= {darkTheme}>
        <Container style= {{textAlign:"center"}}>
          <Typography variant="h4" style={{margin:19,fontFamily:"poppins"}}>
                Cryptocurrency Price by Market Cap
          </Typography>
          <TextField label="Search For Crypto Currency" variant='outlined' style={{width:"100%",marginBottom:"20px"}} onChange={(event)=>{setSearch(event.target.value)}}>
          </TextField>
          <TableContainer>
            {
              loading?(<LinearProgress style={{backgroundColor:"#89CFF0"}}></LinearProgress>):
              <Table>
                <TableHead style={{backgroundColor:"#89CFF0"}}>
                  <TableRow>
                      {
                        ["Coins","Price","24hr Change","Market Cap"].map((element)=>
                          {
                            return (
                              <TableCell style={{color:"#15202B",fontWeight:"700",fontFamily:"poppins"}} key={element} align={element==="Coins"?"":"right"}>
                              {element}
                            </TableCell>
                            )
                          })
                      }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    handleSearch().slice((page-1)*10,(page-1)*10+10).map((item)=>
                    {
                      let profit = item.price_change_percentage_24h>=0;
                      return(
                        <TableRow className="row" key={item.id} onClick={()=>navigate(`/coins/${item.id}`)}>
                          <TableCell component={"th"} scope="row" style={{display:'flex',gap:15}}>
                          <img src={item.image} alt={item.name} height="50" style={{marginBottom:10}}>
                              </img>
                              <div style={{display:"flex",flexDirection:"column"}}>
                                <span style={{textTransform:"uppercase",fontSize:22}}>
                                  {item.symbol}
                                </span>
                                <span style={{color:"#8899A6"}}>
                                  {item.name}
                                </span>
                              </div>
                          </TableCell>
                          <TableCell align="right" style={{fontSize:"1.1rem"}}>
                            {symbol}
                            {numberWithCommas(item.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell align="right" style={{color:profit>0?"rgb(52, 161, 52)":"red",fontSize:"1.1rem"}}>
                            {profit && "+"}
                            {item.price_change_percentage_24h.toFixed(2)}
                          </TableCell>
                          <TableCell align="right" style={{fontSize:"1.1rem"}}>
                            {symbol}
                            {numberWithCommas(item.market_cap)}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            }
          </TableContainer>
          <Pagination count={(handleSearch().length/10)} style={{padding:20,width:"100%",display:"flex",justifyContent:"center"}} id="pagination" onChange={(_,value)=>
            {
              setPage(value);
              window.scroll(0,450)
            }}>            
          </Pagination>
        </Container>
   </ThemeProvider>
  )
}

export default CoinsTable

