import React from "react";
import style from "./TodoListItem.module.css";

function TodoListItem({ title, id, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
      <span className={style.TaskTitle}>{title}</span> {/* Apply TaskTitle class here */}
      <button
  type="button"
  onClick={() => onRemoveTodo(id)}
  className={style.Button}
  aria-label={`Remove task ${title}`}
>
  Remove Task
</button>
    </li>
  );
}

export default TodoListItem;