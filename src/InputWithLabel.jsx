import React, {useEffect, useRef} from 'react';

function InputWithLabel({...props}) {
 const inputRef = useRef()
    useEffect(() => {
      inputRef.current.focus();
    }, []);
    return (
    <>
    <label htmlFor="todoTitle">{props.todoTitle}</label>
        <input 
        name="title" 
        id="todoTitle"
        ref={inputRef}
        onChange={props.handleTitleChange}
        />
        </>
  );
}

export default InputWithLabel;


