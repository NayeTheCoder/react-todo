import React from 'react';
import style from"./TodoListItem.module.css";

function TodoListItem ({title, id, onRemoveTodo}) {
  return (
  <li className={style.ListItem}>
    {title}
    <button type="button" onClick={() =>  onRemoveTodo(id)} className={style.Button}>X</button>
    </li>
  );
}

export default TodoListItem;


