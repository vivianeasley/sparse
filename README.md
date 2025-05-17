# sparse
A minimal component based frontend framework for simple use cases in 400bytes.

# Example Usage

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
