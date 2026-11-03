<div align="center">

# Todo List Management Application

**A responsive, accessible task manager built with React.**

[![CI](https://github.com/vankudothuadhinaik/TodoList-Management-Application/actions/workflows/ci.yml/badge.svg)](https://github.com/vankudothuadhinaik/TodoList-Management-Application/actions/workflows/ci.yml)

[Features](#features) · [Tech stack](#tech-stack) · [Run locally](#run-locally) · [Testing](#testing) · [Scope](#scope-and-limitations)

</div>

---

## Overview

A lightweight frontend application for managing everyday tasks. The project focuses on predictable UI state, input validation, accessible controls, browser-local persistence, and responsive layouts.

## Features

- Create tasks with whitespace trimming and a 200-character input limit.
- Mark tasks as active or completed.
- Filter the list by all, active, or completed tasks.
- Delete individual tasks and clear completed tasks.
- Display live active/completed counts and useful empty states.
- Persist tasks in browser `localStorage` across refreshes and remounts.
- Validate persisted data and fall back safely when stored data is malformed or browser storage is unavailable.
- Provide accessible names for form controls and task actions.
- Adapt the layout for desktop and mobile screens.

## Tech stack

| Area | Tools |
|---|---|
| UI | React |
| Build tooling | Create React App, `react-scripts` |
| Language | JavaScript |
| State persistence | Browser `localStorage` |
| Testing | Jest, React Testing Library |
| Automation | GitHub Actions |
| Package management | npm |

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/vankudothuadhinaik/TodoList-Management-Application.git
cd TodoList-Management-Application
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Testing and production build

Run the test suite:

```bash
npm test -- --watchAll=false
```

Create an optimized production build:

```bash
npm run build
```

GitHub Actions runs the test suite and production build on pushes and pull requests. The workflow is the repeatable CI check for changes to this project.

## Design notes

- Input is normalized before a task is added, preventing whitespace-only entries.
- Persisted values are treated as untrusted input and validated before being used.
- Empty states and task counts make the current filter/list state clear.
- Accessible labels are provided for controls and task actions.

## Scope and limitations

This is a frontend learning project. Tasks are stored only in the current browser profile. There is no backend, account system, cloud synchronization, or cross-device persistence. Clearing the browser's site data removes saved tasks.

## Possible next steps

- Add end-to-end browser tests for the primary task lifecycle.
- Add keyboard-focused interaction tests for filters and task actions.
- Introduce a backend only if multi-device synchronization becomes a project goal.

---

**Maintainer:** [Adhi Naik](https://github.com/vankudothuadhinaik)
