import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

  
function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className="ListItem">
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}
export default TodoList;

