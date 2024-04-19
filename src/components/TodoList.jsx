import { useReducer, useState } from "react";
import TodoItem from "./TodoItem";

const initialState = [];

function listReducer(state, action) {
  switch (
    action.type // action.type - the type of action of the cases below!
  ) {
    case "ADD-TODO":
      return [{ text: action.payload, completed: false }, ...state];

    case "REMOVE-TODO":
      return state.filter(function (todo) {
        return todo.text !== action.payload;
      });

    case "TOGGLE-COMPLETE":
      return state.map(function (todo) {
        return todo.text === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

    case "EDIT-TODO":
      return state.map((todo) => {
        return todo.text === action.payload.text
          ? { ...todo, text: action.payload.newText }
          : todo;
      });

    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(listReducer, initialState);
  const [name, setName] = useState("");

  function addItem() {
    dispatch({ type: "ADD-TODO", payload: name });
    setName(""); // to clear the input field after adding an item
  }

  function removeItem(text) {
    dispatch({ type: "REMOVE-TODO", payload: text });
  }

  function toggleComplete(text) {
    dispatch({ type: "TOGGLE-COMPLETE", payload: text });
  }

  function editItem(todo, newText) {
    dispatch(
      { type: "EDIT-TODO", payload: { text: todo.text, newText: newText } },
      todos
    );
  }

  // function handleSubmit() {
  //     dispatch({ type: 'ADD-TODO' })
  //     setName('')
  // }                // moved up to the addItem function instead

  return (
    <div>
      <h1>Create To-Do List</h1>
      <input
        type="text"
        placeholder="Add a task"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addItem} className="addBtn">
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            removeItem={removeItem}
            toggleComplete={toggleComplete}
            editItem={editItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
