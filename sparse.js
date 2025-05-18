/** Template tag for HTML string building */
export const html = (strings, ...values) =>
  strings.reduce((out, str, i) => out + str + (values[i] ?? ''), '')

/** Utility to map over arrays and return joined HTML strings */
export const mapList = (arr, render) => arr.map(render).join('')

/**
 * Initializes the app and rerenders when state changes.
 * @param {HTMLElement} rootEl - The DOM element to render into
 * @param {Function} viewFn - A function that returns an HTML string from state
 * @param {Object} initialState - Initial reactive state object
 * @returns {Object} Reactive state
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

  function render() {
    rootEl.innerHTML = viewFn(state, prevState || state)
  }

  render()
  return state
}
