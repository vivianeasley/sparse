# Sparse
A minimal component-based frontend UI library (~400 bytes)

Renders a full DOM tree using template literals and tracks state updates
via a JavaScript Proxy. Designed for personal use in small, simple applications like games,
demos, or hackathon projects. Full re-renders are triggered on any mutation
of the state object.

## Core Features:
- Uses `html` template tag to build DOM content as strings.
- Supports simple, global state management with automatic re-rendering.
- Includes `mapList()` for cleanly rendering array-based lists.

## Limitations:
- Not optimized for performance; re-renders the entire DOM on state change.
- Intended for static apps with no backend, auth, or sensitive data.
- Relies on inline event handlers (e.g. `onclick="..."`).

## Example Usage
```JavaScript
import { sparse } from './sparse.js'

const Greeting = (state) => html`
  <p>Hello, <strong>${state.name || 'stranger'}</strong>!</p>
`

const TodoItem = (todo, i) => html`
  <li>
    ${todo}
    <button onclick="methods.removeElement(${i})">❌</button>
  </li>
`

const appEl = document.getElementById('app')

const state = sparse(appEl, (state) => html`
  <div>
    <h1>Sparse Greeting Component Test</h1>
    ${Greeting(state)}

    <h2>Element Test</h2>
    <button onclick="methods.addElement()">Add</button>

    <ul>
      ${mapList(state.todos, (todo, i) => TodoItem(todo, i))}
    </ul>
  </div>
`, {
  name: 'test',
  newTodo: 'hi',
  todos: ['this', 'is', 'a', 'test']
})

const addElement = () => {
  if (state.newTodo.trim()) {
    state.todos.push(state.newTodo.trim()) // Doesn't trigger re-render
    const options = ['this', 'is', 'a', 'test']
    state.todos = [...state.todos] // Triggers re-render
    state.newTodo = options[Math.floor(Math.random() * options.length)]
  }
}

const removeElement = (i) => {
  state.todos = state.todos.filter((_, idx) => idx !== i)
}

window.methods = {
  addElement,
  removeElement
}
```
