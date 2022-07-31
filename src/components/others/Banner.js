import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

function Banner() {
  return (
    <div className='banner'>
        <Container>
            <div className='bannerTag'>
                <Typography variant='h2' style={{fontWeight:"bold",marginBottom:15,fontFamily:"poppins",textAlign:"center"}}>
                     Crypto View
                </Typography>
                <Typography variant='subtitle2' style={{color:"#8899A6",textTransform:"capitalize",fontFamily:"poppins",textAlign:"center",marginBottom:"5px"}}>
                     Get all the information about your favorite crypto currenecy
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner