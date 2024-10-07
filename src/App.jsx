import { useState, useEffect, Fragment } from 'react';
import './components/App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import {BrowserRouter, Routes, Route, Router } from "react-router-dom";


function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('storedTodoList')) || [];
    return storedTodoList;
  });

  const [isLoading, setIsLoading] = useState(true);

  // async function
  async function fetchData() {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      console.log(`Fetching data from ${url} with options:`, options);
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      // Transform and set the todo list
      // this code takes data.records array from Airtable and maps the record into a new object with
      // id and title
      // makes it compatible with my app and showing this list
      data.records.sort((objectA, objectB)=>{
        if (objectA.fields.Title < objectB.fields.Title){
          return 1;
        }
        else if (objectA.fields.Title > objectB.fields.Title){
          return -1;
        }
        return 0;
      })
      const todos = data.records.map(record => ({
        id: record.id,
        title: record.fields.Title,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('storedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, { id: Date.now(), title: newTodo }]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
       <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      </>
      } />
      <Route path="/new" element={
        <>
        <h1>New Todo List</h1>
      </>
      } />
    </Routes>
</BrowserRouter>
 );
}

export default App;
