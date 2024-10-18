import React from 'react';
import PropTypes from 'prop-types';
import style from"./TodoListItem.module.css";

function TodoListItem ({title, id, onRemoveTodo}) {
  return (
  <li className={style.ListItem}>
    {title}
    <button type="button" 
    onClick={() =>  onRemoveTodo(id)} 
    className={style.Button}
    aria-label={`Remove task: ${title}`}
    >X</button>
    </li>
  );
}

TodoListItem.propTypes = {
  title: PropTypes.string.isRequired,  
  id: PropTypes.number.isRequired,     
  onRemoveTodo: PropTypes.func.isRequired, 
};


export default TodoListItem;


