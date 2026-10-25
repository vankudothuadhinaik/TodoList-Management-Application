[![Todo List CI](https://github.com/vankudothuadhinaik/TodoList-Management-Application/actions/workflows/ci.yml/badge.svg)](https://github.com/vankudothuadhinaik/TodoList-Management-Application/actions/workflows/ci.yml)

# Todo List Management Application

A responsive React task manager focused on a clean workflow and accessible interactions.

## Features

- Add tasks with whitespace trimming and a 200-character input limit
- Mark tasks complete or active
- Filter tasks by all, active, or completed
- Delete individual tasks and clear completed tasks
- Live active/completed counts and helpful empty states
- Accessible names for form controls and task actions
- Responsive layout for desktop and mobile

## Tech stack

- React
- Create React App (`react-scripts`)
- React Testing Library and Jest

## Run locally

Requires Node.js and npm.

```bash
npm ci
npm start
```

Open http://localhost:3000.

## Tests and production build

```bash
npm test -- --watchAll=false
npm run build
```

GitHub Actions runs the test suite and production build on pushes and pull requests.

## Scope and limitations

This is a front-end learning project. Tasks are stored only in React state and are cleared when the page is refreshed. It has no backend, account system, or cross-device persistence.
