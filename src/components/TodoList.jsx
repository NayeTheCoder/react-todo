import React from 'react';
import PropTypes from 'prop-types';
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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,    
      title: PropTypes.string.isRequired, 
    })
  ).isRequired, 
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;

