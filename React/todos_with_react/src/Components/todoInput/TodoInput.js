import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

class TodoInput extends React.Component{
    add = event => {
        //Dont refresh the page, I (function) got it!
        event.preventDefault()
        //Bails out if nothing is in the input
        // if(!this.todoInput.value) return;
        // calls the addItem in Todos
        this.props.addItem();
        //empty the input field
        // this.todoInput.value = ""
        
    }
    render(){
        return(
            <div className='inputContainer'>
                <form onSubmit={this.add}>
                    <input 
                    type="text" 
                    placeholder='Enter new task here'
                    name='todoInput'
                    // lets set up ref with a function, for flexibility(later use)
                    // ref={r => {this.todoInput = r}}
                    onChange={this.props.handleChange}
                    value={this.props.newTodo}
                    />
                </form>
            </div>
        )
    }
}

export default TodoInput;