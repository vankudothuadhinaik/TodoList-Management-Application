import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

describe("Todo management", () => {\n  beforeEach(() => window.localStorage.clear());\n  afterEach(() => { cleanup(); window.localStorage.clear(); });
  test("renders the task manager and empty state", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /your tasks, under control/i })).toBeInTheDocument();
    expect(screen.getByText(/add your first task above/i)).toBeInTheDocument();
  });

  test("adds a trimmed task and clears the input", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: /add a task/i });
    fireEvent.change(input, { target: { value: "  Write tests  " } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(screen.getByText("1 active")).toBeInTheDocument();
  });

  test("restores tasks from browser storage after remount", () => {\n    const firstRender = render(<App />);\n    fireEvent.change(screen.getByRole("textbox", { name: /add a task/i }), {\n      target: { value: "Persist this task" },\n    });\n    fireEvent.click(screen.getByRole("button", { name: /add task/i }));\n    expect(window.localStorage.getItem("todo-list-management.tasks")).toContain("Persist this task");\n    firstRender.unmount();\n    render(<App />);\n    expect(screen.getByText("Persist this task")).toBeInTheDocument();\n  });\n\n  test("does not add an empty task", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.queryByRole("list", { name: /tasks/i })).not.toBeInTheDocument();
    expect(screen.getByText(/add your first task above/i)).toBeInTheDocument();
  });

  test("toggles completion and filters completed tasks", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("textbox", { name: /add a task/i }), {
      target: { value: "Ship feature" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /mark ship feature as completed/i }));
    expect(screen.getByText("0 active")).toBeInTheDocument();
    expect(screen.getByText("1 completed")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^completed$/i }));
    expect(within(screen.getByRole("list", { name: /tasks/i })).getByText("Ship feature")).toBeInTheDocument();
  });

  test("deletes a task and clears completed tasks", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: /add a task/i });
    fireEvent.change(input, { target: { value: "Remove me" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    fireEvent.click(screen.getByRole("button", { name: /delete: remove me/i }));
    expect(screen.queryByText("Remove me")).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Done item" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /mark done item as completed/i }));
    fireEvent.click(screen.getByRole("button", { name: /clear completed/i }));
    expect(screen.queryByText("Done item")).not.toBeInTheDocument();
  });
});
