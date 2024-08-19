import { useState, useEffect, Fragment } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('storedTodoList')) || [];
    return storedTodoList;
  });

  const [isLoading, setIsLoading] = useState(true);

  // async function
  async function fetchData() {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
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
      // makes it compatible with how my app and showing this list
      const todos = data.records.map(record => ({
        id: record.id,
        title: record.fields.title,
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
    <>
      {isLoading && <p>Loading...</p>}
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
