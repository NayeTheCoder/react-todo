import { useState, useEffect, Fragment} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


//This is a custom hook that manages the 'todoList' state, loads data to localStorage and saves changes
function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('storedTodoList'));
     return storedTodoList ? storedTodoList : [];
});

  useEffect(() => {
    localStorage.setItem('storedTodoList', JSON.stringify(todoList));
    }, [todoList]); 

  return [todoList, setTodoList]

 } 

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
  setTodoList([...todoList, { id: Date.now(), title: newTodo }]);
};

//removes a to-do item from the list based on the provided id
// it filters the array to remove the specific id and updates the list
  const removeTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
     <h1> Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  );
}


export default App
