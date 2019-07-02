import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

let id = 0;

const Todo = props => (
  <li>
    <input className="toggle-todo" type="checkbox" checked={props.todo.checked} onChange={props.onToggle}/>
    <span className="todo-text">{props.todo.text}</span>
    <button className="delete-todo" onClick={props.onDelete}>X</button>
  </li>
)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  addTodo() {
    const text = prompt("TODO text please")
    if (text !== "" && text !== null) {
      this.setState({
        todos: [...this.state.todos, {id: id++, text: text, checked: false }],
      })
    }
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="todo-count">Todo count: {this.state.todos.length}</div>
        <div className="todo-unchecked">Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</div>
        <button className="add-todo" onClick={() => this.addTodo()}>Add Todo</button>
        <ol className="todo-list">
          {this.state.todos.map(todo => (
            <Todo 
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)} 
              todo={todo} 
            />
          ))}
        </ol>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
