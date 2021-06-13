import React from 'react'
import './App.css';
import Todos from './Components/todos/Todos';


class App extends React.Component {
  render(){
    return(
      <div className="App">
        <Todos />
      </div>
    )
  }
}

export default App;

