import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/others/Header'
import Home from './components/pages/Home'
import Coinpage from './components/pages/Coinpage';
import Context from './Context'
import { useState, useLayoutEffect } from 'react';

function App() {
  const [currency,setCurrency] = useState('INR');
  const [symbol,setSymbol] = useState('₹');
  useLayoutEffect(()=>
  {
    currency==='INR'?setSymbol('₹'):setSymbol('$');
  },[currency])
  return (    
    <Context.Provider value={{currency,setCurrency,symbol}}>
      <div className='app'>
    <Header/>
      <Routes>
        <Route  exact path='/' element={<Home/>} />
        <Route  path='coin/:id' element={<Coinpage/>}/>
      </Routes>
    </div>
    </Context.Provider>
  );
}

export default App;
