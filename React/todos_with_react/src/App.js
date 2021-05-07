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

/* User stories: 
 1. Read a list of todos so that the browser renders them. (DONE) 
 2.Add a todo using keyboard, so non mobile users can participate
 2a.Add a todo using mouse, so mobile app users can participate
 3.Mark todo as complete using mouse click
 4.view a category of todos. EX: A. All todos, B. Active todos, C. Complete todos
 5.Delete a todo using mouse click
 6. Add todo ownership, view only user todos
*/



export default App;

