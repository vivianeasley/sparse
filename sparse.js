/**
 * sparse - A minimal component-based frontend UI library (~1 KB)
 *
 * Renders a full DOM tree using template literals and tracks state updates
 * via a JavaScript Proxy. Designed for small, simple applications like games,
 * demos, or hackathon projects. Full re-renders are triggered on any mutation
 * of the state object.
 *
 * Core Features:
 * - Uses `html` template tag to build DOM content as strings.
 * - Supports simple, global state management with automatic re-rendering.
 * - Includes `bindInput()` for easy two-way binding of text inputs.
 * - Includes `mapList()` for cleanly rendering array-based lists.
 *
 * Limitations:
 * - Not optimized for performance; re-renders the entire DOM on state change.
 * - Intended for static apps with no backend, auth, or sensitive data.
 * - Relies on inline event handlers (e.g. `onclick="..."`).
 *
 * @function sparse
 * @param {HTMLElement} rootEl - The root DOM element to render the application into.
 * @param {Function} viewFn - A function that returns a template literal (via `html`) to describe the UI. Called with `(state, prevState)`.
 * @param {Object} initialState - A plain object containing application state. Mutating it triggers a re-render.
 * @returns {{
*   state: Object,
*   html: (strings: TemplateStringsArray, ...values: any[]) => string,
*   bindInput: (key: string) => string,
*   mapList: <T>(arr: T[], render: (item: T, index: number) => string) => string
* }}
*
* @example
* const { state, html, bindInput, mapList } = sparse(document.getElementById('app'), (state) => html`
*   <h1>Hello ${state.name}</h1>
*   <input ${bindInput('name')}>
* `, { name: 'world' })
*/
export function sparse(rootEl, viewFn, initialState) {
    let prevState = null
  
    const state = new Proxy(initialState, {
      set(target, prop, value) {
        prevState = { ...target }
        target[prop] = value
        render()
        return true
      }
    })
  
    const html = (strings, ...values) =>
      strings.reduce((out, str, i) => out + str + (values[i] ?? ''), '')
  
    function bindInput(key) {
      return `value="${state[key]}" oninput="sparse.state.${key} = event.target.value"`
    }
  
    function mapList(arr, render) {
      return arr.map(render).join('')
    }
  
    function render() {
      rootEl.innerHTML = viewFn(state, prevState || state)
    }
  
    render()
  
    // Expose to global for use in inline attributes
    sparse.state = state
    sparse.bindInput = bindInput
    sparse.mapList = mapList
  
    return { state, html, bindInput, mapList }
  }
