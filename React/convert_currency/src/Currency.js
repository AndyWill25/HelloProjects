import React from 'react'


function Currency(props) {
  
    return (
        <div>
           <input className="input" value={props.amount} onChange={props.onChangeAmount}/>
            <select value={props.selectedCurrency} onChange={props.currencyChange}>
                {props.currencyChoice.map((option, i) => (
                <option key={i} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Currency