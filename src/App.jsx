import { useState, useEffect, Fragment} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('storedTodoList'));
     return storedTodoList ? storedTodoList : [];
});

  useEffect(() => {
    localStorage.setItem('storedTodoList', JSON.stringify(todoList));
    }, [todoList]); //this is the dependency. 

  return [todoList, setTodoList]

 } 

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
  setTodoList([...todoList, newTodo]);
};

  return (
    <>
     <h1> Todo List</h1>
      <TodoList todoList={todoList}/>
      <AddTodoForm onAddTodo={addTodo}/>
    </>
  );
}

export default App
