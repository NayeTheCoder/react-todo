import React, { useState } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import style from "./AddTodoForm.module.css";  

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    setTodoTitle(event.target.value);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    console.log("todoTitle ===> ", todoTitle);
    onAddTodo(todoTitle);
    setTodoTitle("");
  }

  return (
    <div className={style.formContainer}>  {/* Use className from the CSS module */}
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          label="Title"
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Click to Add
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
