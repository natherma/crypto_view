import Context from '../../Context';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Container, ThemeProvider } from '@mui/system';
import {useNavigate} from 'react-router-dom'

function CoinsTable() {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const[search,setSearch] = useState("");
    const {currency} = useContext(Context);
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
                              <TableCell style={{color:"#15202B",fontWeight:"700",fontFamily:"poppins"}} key={element} align={element==="Coin"?"":"right"}>
                              
                              {element}
                            </TableCell>
                            )
                          })
                      }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    handleSearch().map((item)=>
                    {
                      let profit = item.price_change_percentage_24h>=0;
                      return(
                        <TableRow>
                          <TableCell>
                            lame
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            }
          </TableContainer>
        </Container>
   </ThemeProvider>
  )
}

export default CoinsTable

