import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./Components/TodoList/TodoList";
import AddTodoForm from "./Components/AddTodoForm/AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList =
      JSON.parse(localStorage.getItem("storedTodoList")) || [];
    return storedTodoList;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(""); // Add date state

  // async function
  async function fetchData() {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      console.log(`Fetching data from ${url} with options:`, options);
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      // Transform and set the todo list
      data.records.sort((objectA, objectB) => {
        if (objectA.fields.Title > objectB.fields.Title) {
          return 1;
        } else if (objectA.fields.Title < objectB.fields.Title) {
          return -1;
        }
        return 0;
      });

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.Title,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  // Get the current date including the day of the week
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long", // This will show the full day of the week
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formattedDate);
  }, []); // This will only run when the component mounts

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("storedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  async function addTodo(title) {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}`;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      );

      const raw = JSON.stringify({
        records: [
          {
            fields: {
              Title: title,
            },
          },
        ],
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const id = data.records[0].id;

      setTodoList([...todoList, { id: id, title: title }]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async function removeTodo(id) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    await fetch(url, options);
    setTodoList(newTodoList);
  }

  return (
    <BrowserRouter>
      <div className="App">
      <h1>Top Priority!!!!</h1>
        <p className="date-display"> {date}</p> {/* Display the full date with the day */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <h1>New Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
