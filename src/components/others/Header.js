import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import {useContext} from 'react'
import Context from '../../Context'

export default function Header()
{
   const {currency,setCurrency,symbol} = useContext(Context)
   const darkTheme = createTheme({
    palette:
    {
    primary:{main:"#fff"},
    type:"dark"
    },
    })
    return(
        <ThemeProvider theme={darkTheme}>
        <AppBar color = 'transparent' position='static'>
        <Container>
          <Toolbar>
              <Typography id='title' variant='h6'>
                 <Link to={'/'}>Crypto View</Link>
              </Typography>
              <Select variant='outlined' style={{width:100,height:40,marginRight:15,color:'white'}} value={currency} onChange={(event)=>{setCurrency(event.target.value)}}>
                  <MenuItem value={'USD'}>
                  USD
                  </MenuItem>
                  <MenuItem value={'INR'}>
                  INR
                  </MenuItem>
              </Select>
          </Toolbar>
        </Container>
     </AppBar>
        </ThemeProvider>
    )

}