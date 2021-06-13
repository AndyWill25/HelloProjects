import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import TodoInput from '../todoInput/TodoInput';
import TodoList from '../todoList/TodoList';

class Todos extends React.Component{
    constructor(props){
        //runs parent contructors
        super(props);
        //Initial state;
        //state in React is immutable. Cant change but replace it
        this.state = {
            todos:[{
                id: 1,
                text: "Call mom",
                isComplete: false
            }, {
                id: 2,
                text: "Finish homework",
                isComplete: true
            }],
            newTodo: ""
        }
    }

    addItem = () => {
            this.setState({
            ...this.state,
            todos: [...this.state.todos, {
                id:Date.now(),
                text: this.state.newTodo,
                isComplete: false
            }],
            newTodo: ""
        }, function(){
            console.log(this.state)
        })
    }

    handleChange = event  => {
        this.setState({
            newTodo: event.target.value
        })
    }

    toggleComplete = id => {
        // make a true copy of state
        this.setState(function(prevState){
            // find the ordinal for the todo that user clicked
            //using id within the trueCopyOfState
            let indexOfTodo = prevState.todos.findIndex(
                t => t.id === id
            )
            //Get an object ref to specific todo within prevState
            let thatTodo = prevState.todos[indexOfTodo]
            //toggle isComplete property within trueCopyOfState
            thatTodo.isComplete = !thatTodo.isComplete
            //replace state with trueCopyOfState
            return prevState;
        })
    }
    //Delete
    removeTodo = id => {
        let prevTodos = [...this.state.todos]
        let filteredTodos = prevTodos.filter(t => t.id !== parseInt(id) )
        this.setState({todos: filteredTodos})
    }

    render(){
        return(
            <div>
                <h1>Sir Task-A-Lot</h1>
                <TodoInput  
                addItem={this.addItem}
                handleChange={this.handleChange}
                newTodo={this.state.newTodo} />
                <TodoList 
                todos={this.state.todos}
                toggleComplete={this.toggleComplete}
                removeTodo={this.removeTodo}
                 />
            </div>
        )
    }
}

export default Todos;