import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const handlChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      const newTodo = { id: Date.now(), name: input, completed: false };
      setTodos([...todos, newTodo]);

      setInput("");
    }
  };

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const del = todos.filter((item) => item.id !== id);
    setTodos(del);
  };
  const handleCompleted = (id) => {
    todos.map((item) => {
      if (item.id === id) {
        console.log(item.id);
        setTodos([...todos, !item.completed]);
      }
    });
  };
  return (
    <div className="h-full w-full">
      <div className="m-auto mt-20 block ">
        <div className=" flex ">
          <h1 className="m-2 text-3xl">Add Tasks</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              className="rounded border border-emerald-200 p-3 outline-none"
              onChange={handlChange}
              value={input}
            />
          </form>
          <GrAdd
            className=" m-2 cursor-pointer text-3xl"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {todos.map((item) => (
          <div key={item.id}>
            <p className={item.completed ? "text-yellow-400" : "text-black"}>
              {item.name}
            </p>
            <button onClick={handleCompleted}> done</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
