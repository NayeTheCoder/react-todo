import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from '../TodoListItem/TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className="ListItem">
      {todoList.length === 0 ? (
        <li>No tasks available</li>
      ) : (
        todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            onRemoveTodo={onRemoveTodo}
          />
        ))
      )}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;

