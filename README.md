# Sparse
A minimal component-based frontend UI library (~400 bytes)

Renders a full DOM tree using template literals and tracks state updates
via a JavaScript Proxy. Designed for small, simple applications like games,
demos, or hackathon projects. Full re-renders are triggered on any mutation
of the state object.

## Core Features:
- Uses `html` template tag to build DOM content as strings.
- Supports simple, global state management with automatic re-rendering.
- Includes `bindInput()` for easy two-way binding of text inputs.
- Includes `mapList()` for cleanly rendering array-based lists.

## Limitations:
- Not optimized for performance; re-renders the entire DOM on state change.
- Intended for static apps with no backend, auth, or sensitive data.
- Relies on inline event handlers (e.g. `onclick="..."`).

## Example Usage
```JavaScript
    import { sparse } from './sparse.js'

    // --- Child Component (simple greeting) ---
    const Greeting = (name) => html`<p>Hello, <strong>${name}</strong>!</p>`

    // --- Child Component used in a list ---
    const TodoItem = (text, i) => html`
      <li>
        ${text}
        <button onclick="removeTodo(${i})">❌</button>
      </li>
    `

    // --- App initialization ---
    const { state, html, bindInput, mapList } = sparse(
      document.getElementById('app'),
      (state) => html`
        <div>
          <h1>🎮 Sparse Demo</h1>

          <!-- Greeting component -->
          ${Greeting(state.name)}

          <!-- Input bound to state -->
          <input ${bindInput('name')} placeholder="Your name">

          <h2>📝 Todo List</h2>

          <!-- Add todo -->
          <input ${bindInput('newTodo')} placeholder="New task">
          <button onclick="addTodo()">Add</button>

          <!-- List of todo components -->
          <ul>
            ${mapList(state.todos, (todo, i) => TodoItem(todo, i))}
          </ul>
        </div>
      `,
      { name: '', newTodo: '', todos: [] }
    )

    // --- Handlers ---
    window.addTodo = () => {
      if (state.newTodo.trim()) {
        state.todos.push(state.newTodo.trim())
        state.newTodo = ''
      }
    }

    window.removeTodo = (i) => state.todos.splice(i, 1)
```
