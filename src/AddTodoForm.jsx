import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm ({onAddTodo}) {
   const [todoTitle, setTodoTitle] = useState('');

    function handleTitleChange(event) {
      setTodoTitle(event.target.value);
    }
    function handleAddTodo(event) {
      event.preventDefault();
      onAddTodo(todoTitle);
      setTodoTitle('');
    }

 return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
         label="Title" // passing the label prop to InputWithLabel to set the text to "Title"
         todoTitle={todoTitle}
         handleTitleChange={handleTitleChange}
      />
        <button type="submit">Add</button>
    </form>
 );
};
export default AddTodoForm;
