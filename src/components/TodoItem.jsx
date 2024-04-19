import { useState } from 'react'

function TodoItem({todo, removeItem, toggleComplete, editItem}) {

  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);  


  function handleEdit() {
    setEditing(true);
  }

  function handleRemove() {
    removeItem(todo.text);
  }

  function handleSave() {
    setEditing(false);
    editItem(todo, editText);   // passing the todo object
  }

  function handleTextChange(e) {
    setEditText(e.target.value)
  }


  return (
    // TodoItem
    <li>
      {editing ? (<input
          type="text" value={editText} onChange={handleTextChange} />) : (
            <div>
              <input
                type="checkbox" 
                checked={todo.completed}     
                onChange={() => toggleComplete(todo.text)} />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
                </span>              
            </div>
          )}
          <button onClick={handleEdit} disabled={editing} className='editBtn'>Edit</button>
          <button onClick={handleRemove} disabled={!todo.completed} className='delBtn'>Delete</button>
          {editing && 
            <button onClick={handleSave} className='saveBtn'>Save</button>}
    </li>
  );
}

export default TodoItem