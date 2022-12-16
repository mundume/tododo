import { useEffect, useState, useReducer } from "react";
import { GrAdd } from "react-icons/gr";

//reducers
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [newTodo(action.payload.name), ...state];
    case "DELETE":
      return state.filter((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
      });
    case "SET_COMPLETE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return !item.completed;
        }
      });
  }
}
function newTodo(name) {
  return { id: Date.now(), name: name, completed: false };
}
function App() {
  //initial reducer state
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];

  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      dispatch({
        type: "ADD",
        payload: {
          name: input,
        },
      });
      console.log(input);
      setInput("");
    }
  };

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE",
      payload: {
        id: id,
      },
    });
  };
  function handleCompleted(id) {
    dispatch({
      type: "SET_COMPLETE",
      payload: {
        id: id,
      },
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
        {state.map((item) => (
          <div key={item.id} className="m-auto block">
            <p className={"m-auto block text-black"}>{item.name}</p>
            <button
              className="rounded border-none bg-emerald-600 p-2 text-white outline-none"
              onClick={() =>
                dispatch({
                  type: "SET_COMPLETE",
                  payload: item.id,
                })
              }
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
