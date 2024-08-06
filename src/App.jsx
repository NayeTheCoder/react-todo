import { useState, useEffect, Fragment} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {
    const [todoList, setTodoList] = useState(() => {
    const storedTodoList = [];
     return storedTodoList ? storedTodoList : [];
});

const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
      const promiseThen = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({data:{todoList:JSON.parse(localStorage.getItem('storedTodoList'))}});
        }, 2000);
      });
      promiseThen
        .then((data) => {
          console.log(data)
          setTodoList(JSON.parse(localStorage.getItem('storedTodoList')));
          setIsLoading(false);
        })
    }, [] );

  useEffect(() => {
    if (isLoading === false) {
          localStorage.setItem('storedTodoList', JSON.stringify(todoList));
    }
    }, [todoList]); 

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
    {isLoading && <p>Loading...</p>}
     <h1> Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  )
}


export default App
