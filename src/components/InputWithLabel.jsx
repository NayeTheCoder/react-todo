import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,        
  handleTitleChange: PropTypes.func.isRequired,  
};

export default InputWithLabel;


