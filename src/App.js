import React, { useEffect, useMemo, useRef, useState } from "react";
import TodoList from "./Todolist";
import "./App.css";

const STORAGE_KEY = "todo-list-management.tasks";

function loadSavedTodos() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (todo) =>
        todo &&
        Number.isSafeInteger(todo.id) &&
        todo.id > 0 &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean"
    );
  } catch {
    return [];
  }
}

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(loadSavedTodos);
  const [filter, setFilter] = useState("all");
  const nextId = useRef(1);

  useEffect(() => {
    nextId.current = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // The app remains usable if storage is unavailable or full.
    }
  }, [todos]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const visibleTodos = useMemo(
    () => todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    }),
    [todos, filter]
  );

  function submitHandler(event) {
    event.preventDefault();
    const text = task.trim();
    if (!text) return;
    setTodos((current) => [...current, { id: nextId.current++, text, completed: false }]);
    setTask("");
    setFilter("all");
  }

  function toggleHandler(id) {
    setTodos((current) => current.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteHandler(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  return (
    <main className="app-shell">
      <section className="app-card" aria-labelledby="app-title">
        <p className="eyebrow">FOCUS · ONE TASK AT A TIME</p>
        <header className="app-header">
          <div>
            <h1 id="app-title">Your tasks, under control.</h1>
            <p className="subtitle">Make a list. Make progress. Repeat.</p>
          </div>
          <div className="task-total" aria-label={`${todos.length} total tasks`}>
            <strong>{todos.length}</strong>
            <span>Total</span>
          </div>
        </header>

        <form className="task-form" onSubmit={submitHandler}>
          <label className="sr-only" htmlFor="task-input">Add a task</label>
          <input
            id="task-input"
            name="task"
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="What needs to get done?"
            maxLength={200}
            autoComplete="off"
          />
          <button type="submit" className="primary-button">Add task</button>
        </form>

        <div className="task-summary" aria-live="polite">
          <span>{activeCount} active</span>
          <span className="summary-dot" aria-hidden="true">·</span>
          <span>{completedCount} completed</span>
        </div>

        <div className="list-toolbar">
          <div className="filter-group" role="group" aria-label="Filter tasks">
            {["all", "active", "completed"].map((option) => (
              <button
                key={option}
                type="button"
                className={filter === option ? "filter-button selected" : "filter-button"}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option[0].toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
          {completedCount > 0 && (
            <button type="button" className="text-button" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>

        {visibleTodos.length > 0 ? (
          <TodoList listtodo={visibleTodos} onToggle={toggleHandler} onDelete={deleteHandler} />
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <p>{todos.length === 0 ? "A clear list is a fresh start." : `No ${filter} tasks right now.`}</p>
            <span>{todos.length === 0 ? "Add your first task above." : "Choose another filter to see more tasks."}</span>
          </div>
        )}

        <footer className="app-footer">
          Tasks are saved in this browser on this device. Clearing site data removes them.
        </footer>
      </section>
    </main>
  );
}

export default App;
