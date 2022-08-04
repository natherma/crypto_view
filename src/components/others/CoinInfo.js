import React from 'react'
import {useContext,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Context from '../../Context'
import {HistoricalChart} from '../../config/api'
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { Line } from "react-chartjs-2";
import { chartDays } from "../../config/data"
import SelectButton from './SelectButton'
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);


function CoinInfo(props) {
  const {coin} = props
  const [historicalData,setHistoricalData]=useState();
  const {currency,symbol} = useContext(Context);
  const [days,setDays] = useState(1);
  const {id} = useParams()
  const [flag,setflag] = useState(false);
  const fetchData = async()=>
  {
    const {data} = await axios.get(HistoricalChart(coin.id,days,currency))
    setHistoricalData(data.prices)
  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  useEffect(()=>
  {
    fetchData()
  },[])
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='container2'>
        {
          !historicalData ?  (<CircularProgress style={{backgroundColor:"#89CFF0"}}  thickness={1}></CircularProgress>):
          <>
           <div style={{ height: "100%", width: "100%" }}>

<Line

  data={{

    labels: historicalData.map((coin) => {

      let date = new Date(coin[0]);

      let time =

        date.getHours() > 12

          ? `${date.getHours() - 12}:${date.getMinutes()} PM`

          : `${date.getHours()}:${date.getMinutes()} AM`;

      return days === 1 ? time : date.toLocaleDateString();

        }),



        datasets: [

          {

            data: historicalData.map((coin) => coin[1]),

            label: `Price ( Past ${days} Days ) in ${currency}`,

            borderColor: "#EEBC1D",

          },

        ],

      }}

      options={{

        elements: {

          point: {

            radius: 1,

          },

        },

      }}

    />
    </div>
    <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                    console.log(day.value)
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo