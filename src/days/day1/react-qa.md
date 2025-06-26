# 1) What does the dependency array in useEffect control?

**Explanation** : In React, useEffect hook let you run side effect in your component `-` for example

- fetching data
- subscribing event
- manually changing the dom
- starting/stopping timmer

**What does it do ?**

- It tells react when to run the effect again
- If any value in that array changes react re - run the effect
- If the array is empty `[]` the effect run only once after the first render
- If you skip the array the effect run after every render

**How to answer in an interview**

In React, the dependency array in `useEffect` controls when the effect runs again. It’s like a watch list — if any variable inside it changes, React re-executes the effect to keep it updated. For example, if I put `[userId]` in the array, the effect runs whenever `userId` changes. If the array is empty, the effect runs only once, after the first render. If I omit it, it runs after every render. This helps prevent unnecessary re-renders and side effects.

# 2) What’s the difference between props and state?

**Explanation**

**👉 Props**

- Short for properties.
- They are read-only data passed from parent to child component.
- Think of props as external inputs — they let a parent configure or control a child.
- A child cannot modify its props.

**👉 State**

- State is data managed inside the component.
- It is mutable — the component can update its own state using `useState` or `this.setState`.
- State controls how the component behaves or renders at a given time.
- When state changes, React re-renders the component.

**How to answer in an interview**

Props and State are both objects in React, but they’re used differently. Props are read-only and are passed from parent to child to configure how a component looks or behaves. State is internal to a component and can be changed over time, for example by user interaction. Changing state re-renders the component, but props cannot be modified by the child — they come from the parent. So, props make a component reusable, while state makes it interactive.

# 3) When should you use Context API?

**What is Context API?**

- It’s a built-in React feature to share data globally — like a global state — without passing props manually at every level (called “prop drilling”).
- It’s ideal for data that many components need, for example:
  - Theme (dark/light mode)
  - Authenticated user info
  - App language
  - Settings or global config

**When to use it?**

- When props drilling becomes painful (passing props through many nested levels).
- For global or app-wide data that multiple components need to read or update.
- But for complex state management, developers often prefer tools like Redux or other state libraries, because Context is not optimized for high-frequency updates.

**How to answer in an interview**

I use Context API when I need to share data globally across multiple components, without manually passing props at every level. It’s useful for things like theme, user authentication, or app settings. Context helps avoid prop drilling, so the code stays cleaner. But for very complex or frequently changing state, I might use a dedicated state management library like Redux instead.

# 4) Difference between React.memo, useMemo, useCallback?

**Explanation**

**👉 React.memo**

- A Higher Order Component (HOC)
- Wraps a whole component to prevent unnecessary re-renders if props didn’t change
- Usage:
  ```jsx
  export default React.memo(MyComponent);
  ```
- Good for functional components that receive the same props often

**👉 useMemo**

- A hook
- Memorizes the result of a function (value)
- Usage:
  ```jsx
  const memoValue = useMemo(() => computeSomething(), [dependencies]);
  ```
- Good for expensive calculations you don’t want to re-run on every render

**👉 useCallback**

- A hook
- Memorizes the function itself (its reference)
- Usage:
  ```jsx
  const memoFunc = useCallback(() => {
    doSomething;
  }, [dependencies]);
  ```
- Good to avoid re-creating functions when passing them as props (prevents child re-renders)

**When to use them**

- **React.memo**: When a component renders with same props most of the time → wrap it so React skips re-rendering it.

- **useMemo**: When you have expensive computation → cache the computed result.

- **useCallback**: When you pass a function to child components → keep the same function reference to avoid child re-render.

**How to answer in an interview**

`React.memo` is used to memoize a whole functional component to avoid unnecessary re-renders if its props don’t change. `useMemo` is a hook to memoize the result of an expensive calculation, so it doesn’t recompute every time. `useCallback` is similar, but it memoizes the function itself — its reference — so that when we pass it to child components, it doesn’t cause re-renders. In short: React.memo for components, useMemo for values, and useCallback for functions.

# 4) Difference between React.memo, useMemo, useCallback?

**1. Use `React.memo`**

- Wrap components to avoid unnecessary re-renders if props haven’t changed.

**2. Use `useMemo()` and `useCallback()`**

- `useMemo` → cache heavy calculations
- `useCallback` → memoize functions, helpful when passing props to child components

**3. Code Splitting using React.lazy & Suspense**

- Load components only when needed (e.g., routes/components).

**4. Avoid unnecessary re-renders**

- Break down components
- Use proper keys in lists
- Avoid anonymous functions in props

**5. Virtualization (e.g., react-window or react-virtualized)**

- Render only visible items in large lists or tables.

**6. Debounce input or search handlers**

- Prevent multiple re-renders or API calls while user types

**7. Use efficient state structure**

- Don’t store too much data in top-level components
- Avoid deeply nested states

**8. Lazy loading images and assets**
**9. Use Profiler and Performance tools**

- Like React DevTools Profiler and Chrome DevTools to analyze rendering

**How to answer in an interview**

To optimize performance in a React app, I use React.memo to avoid unnecessary re-renders of components, and I use `useMemo` and `useCallback` to memoize values and functions. I also apply code splitting using React.lazy and Suspense to load components only when needed. For large lists, I use virtualization libraries like react-window. Additionally, I debounce input handlers and keep the state minimal and well-structured. I also use tools like React Profiler to analyze rendering performance.
