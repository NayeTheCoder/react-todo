import { useState } from 'react';

function AddTodoForm (props) {
   const [todoTitle, setTodoTitle] = useState("");

 function handleTitleChange(event){
   let newTodoTitle = event.target.value;
   setTodoTitle(newTodoTitle);
   console.log(todoTitle);
 }
    function handleAddTodo(event) {
       event.preventDefault();
       props.onAddTodo({title:todoTitle, id:Date.now()});
       setTodoTitle('');
       console.log(todoTitle);
    }
 return(
    <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>
        <input name="title" id="todoTitle" value={props.todoTitle} onChange={handleTitleChange}></input>
        <button type="submit">Add</button>
    </form>
 );
};
export default AddTodoForm;


