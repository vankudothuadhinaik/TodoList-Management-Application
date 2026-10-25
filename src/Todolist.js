import React from "react";

function TodoList({ listtodo, onToggle, onDelete }) {
  return (
    <ul className="todo-list" aria-label="Tasks">
      {listtodo.map((todo) => (
        <li className={todo.completed ? "todo-item completed" : "todo-item"} key={todo.id}>
          <label className="todo-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              aria-label={`Mark ${todo.text} as completed`}
            />
            <span>{todo.text}</span>
          </label>
          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete: ${todo.text}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
