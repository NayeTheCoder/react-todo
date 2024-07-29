import React from 'react';
import TodoListItem from './TodoListItem';
  
function TodoList ({ todoList, onRemoveTodo }) { // adding onRemoveTodo as a prop here
    return(
        <ul>
        {todoList.map(item => (
            <TodoListItem
               key={item.id}
               title={item.title}   
               id={item.id}  
               onRemoveTodo={() => onRemoveTodo(item.id)}  // passes the callback with id
          />
        ))}
      </ul>
    );
}
export default TodoList;

