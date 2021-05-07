import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

class TodoList extends React.Component{
    remove = event => {
        event.stopPropagation();
        this.props.removeTodo(event.target.id);
    }
    render(){
        return(
            this.props.todos.map(
                t => {
                    let isCompleteStyle = t.isComplete ? {textDecoration: 'line-through', color: 'red'} : {} 
                    return(
                    <div key={t.id}>
                        <li 
                        key={t.id}  
                        style={isCompleteStyle}
                        className="todos"
                        onClick={() => {this.props.toggleComplete(t.id)}}
                        >
                            {t.text}
                        <button 
                        id={t.id}
                        onClick={this.remove}>Delete</button>
                        </li>
                    </div>
                )
              }
            )
        )
    }
}

export default TodoList;