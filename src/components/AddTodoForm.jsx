import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  function handleTitleChange(event) {
    setTodoTitle(event.target.value);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    if (!todoTitle.trim()) return; // Prevent adding empty titles
    onAddTodo(todoTitle);
    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        label="Title"
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }} disabled={!todoTitle.trim()}>
        Add
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
