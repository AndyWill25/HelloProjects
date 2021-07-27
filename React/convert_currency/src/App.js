import React, { useEffect, useState } from 'react'
import './App.css';
import Currency from './Currency';
import axios from "axios"

const baseURL = 'http://api.exchangeratesapi.io/v1/latest?access_key=c6ffafa39a2efe09fe274a4ce8f0036f'
var fx = require("money")

function App() {

  const [currencyChoice, setCurrencyChoice] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(0)
  const [amountFromCurrency, setAmountFromCurrency] = useState(0)

const getRates = async () => {
  let response = await axios.get(baseURL)
  setCurrencyChoice([ response.data.base, ...Object.keys(response.data.rates)]);

  const firstCurrency = Object.keys(response.data.rates)[0]
  setFromCurrency(response.data.base)
  setToCurrency(firstCurrency)
  
  fx.base = response.data.base;
  fx.rates = response.data.rates

  const defaultInput = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: response.data.base
  }).format(0)

  const defaultOutput = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: firstCurrency
  }).format(0)

  setAmount(defaultInput)
  setAmountFromCurrency(defaultOutput)
};

const convertInput = () => {
  if(amount) {
    const numberInput = amount.replace(/(-(?!\d))|[^0-9|-]/g, "")

    const convertedOutput = fx.convert(numberInput, {
      from: fromCurrency,
      to: toCurrency
    });

    setAmountFromCurrency( new Intl.NumberFormat("en-US", {
      style:'currency',
      currency: toCurrency
    }).format(convertedOutput / 100)
    )
  }
}

const handleInput = (e) => {
  setAmount( new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: fromCurrency
    }).format((e.target.value.replace(/(-(?!\d))|[^0-9|-]/g, "")) / 100)
  )

  convertInput()
}

const handleOutput = (e) => {
  setAmountFromCurrency( new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: fromCurrency
    }).format((amountFromCurrency.replace(/(-(?!\d))|[^0-9|-]/g, "")) / 100)
  )
};

const handleCurrencyChange = (e) => {
  setFromCurrency(e.target.value)

  setAmount( new Intl.NumberFormat("en-US", {
      style:'currency',
      currency: e.target.value
    }).format((amount.replace(/(-(?!\d))|[^0-9|-]/g, "")) / 100)
  )
  convertInput();
}

useEffect(() => {
  getRates();
}, []);



  return (
    <div className="App">
      <h1>Convert!</h1>
        <Currency currencyChoice={currencyChoice}
                  selectedCurrency={fromCurrency}
                  currencyChange={handleCurrencyChange}
                  onChangeAmount={handleInput}
                  amount={amount} />
          <div className="equal">=</div>
        <Currency currencyChoice={currencyChoice}
                  selectedCurrency={toCurrency}
                  currencyChange={(e) => setAmountFromCurrency(e.target.value)}
                  amount={amountFromCurrency}
                  onChangeAmount={(e) => handleOutput()} />
    </div>
  );
}

export default App;