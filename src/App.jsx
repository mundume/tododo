import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";

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
      setTodos([newTodo, ...todos]);

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
  function handleCompleted(completed) {
    todos.filter((item) => {
      if (item.id === completed) {
        return { ...item, completed: !item.completed };
      }
      setTodos(todos);
    });
  }
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
      <div className="m-5 flex flex-col items-center justify-center">
        {todos.map((item) => (
          <div key={item.id} className="m-auto block">
            <p
              className={
                item.completed ? "text-yellow-400" : "m-auto block text-black"
              }
            >
              {item.name}
            </p>
            <button
              className="rounded border-none bg-emerald-600 p-2 text-white outline-none"
              onClick={() => handleCompleted(item.completed)}
            >
              {" "}
              Mark done
            </button>
            <button
              className="m-2 rounded border-none bg-red-600 p-2 text-white outline-none"
              onClick={() => handleDelete(item.id)}
            >
              {" "}
              delete task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
