import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function InputWithLabel({ todoTitle, handleTitleChange }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">Title</label>
      <input 
        type="text" 
        name="title" 
        id="todoTitle"
        ref={inputRef}
        onChange={handleTitleChange}
        value={todoTitle} 
      />
    </>
  );
}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,        
  handleTitleChange: PropTypes.func.isRequired,  
};

export default InputWithLabel;

}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,        
  handleTitleChange: PropTypes.func.isRequired,  
};

export default InputWithLabel;


