import React from 'react'

function InputWithLabel({label, handleTitleChange}) {
    return (
    <>
    <label htmlFor="todoTitle">{label}</label>
        <input 
        name="title" 
        id="todoTitle"
        onChange={handleTitleChange}
        />
        </>
  );
}

export default InputWithLabel;


