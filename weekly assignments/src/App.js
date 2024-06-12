
import './App.css';

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


function App() {
  return (
    <div className="App">
     <h1> Todo List</h1>
      <ul>
        {todoList.map(function (item) {
        return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
