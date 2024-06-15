
var todoList = [
    {
    id: 1,
    title:"Complete assignment"
    },
    {
      id:2,
      title:"Go to the gym"
    },
    {
      id:3,
      title:"pick up nephew"
    }
  ];
  
function TodoList () {
    return(
        <ul>
        {todoList.map(function (item) {
        return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    );
}
export default TodoList;