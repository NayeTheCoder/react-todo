import TodoListItem from './TodoListItem';

  
function TodoList(props) {
    return(
        <ul>
        {props.todoList.map(function(item){
          return (
            <TodoListItem key={item.id} title={item.title}/>   
          );
        })}
      </ul>
    );
}
export default TodoList;