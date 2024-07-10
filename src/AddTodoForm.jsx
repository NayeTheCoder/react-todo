function AddTodoForm (props) {
    function handleAddTodo(event) {
       event.preventDefault();
       let todoTitle = event.target[0].value;
       props.onAddTodo(todoTitle);
       console.log(todoTitle);
       event.target[0].value ='';
    }
 return(
    <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title</label>
        <input name="title" id="todoTitle"></input>
        <button type="submit">Add</button>
    </form>
 );
};
export default AddTodoForm;