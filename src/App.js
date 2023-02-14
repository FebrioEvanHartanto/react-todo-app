import React, { useState, useEffect } from "react";
import './App.css'
import Form from "./components/Form"
import TodoList from "./components/TodoList"
function App() {
  const [inputText, setInputText] = useState(""); 
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filtered, setfiltered] = useState([]);
  
   useEffect(() =>{
     getLocalTodos();
   },[]);
  
  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setfiltered(todos.filter(todo => todo.completed === true))
          break;
        case 'uncompleted':
          setfiltered(todos.filter(todo => todo.completed === false))
          break;
        default:
          setfiltered(todos);
          break;
      }
    }
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

    const saveLocalTodos = () => { 
    localStorage.setItem('todos', JSON.stringify(todos));
}

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));

    setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
      <header>
        <h1>ToDo List </h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}

      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filtered={filtered}
      />
    </div>
  );
}

export default App;