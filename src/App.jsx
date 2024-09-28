import React, { useState } from 'react';
import './App.css';
import { Input } from './components';

import useCurrencyinfo from './hooks/useCurrencyinfo';


function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  const currencyInfo = useCurrencyinfo(from);
  const options = Object.keys(currencyInfo);
  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("https://images.pexels.com/photos/904735/pexels-photo-904735.jpeg?auto=compress&cs=tinysrgb&w=600")` }}
      // Ensure the correct path
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert(); // Call convert when form is submitted
            }}
          >
            <div className="w-full mb-1">
              <Input 
                label="From" 
                amount={amount} 
                currencyOption={options}
                onAmountChange={(amount)=>setAmount(amount)}
                onCurrencyChange={(currency)=> setAmount(currency)}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-teal-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <Input 
                label="To" 
                amount={convertedAmount} 
                currencyOption={options}
                onCurrencyChange={(currency)=> setTo(currency)}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
                selectCurrency={to} // To prevent manual input for converted amount
                amountDisabled
              />
            </div>
            <button type="submit" className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
