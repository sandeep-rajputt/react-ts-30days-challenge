# 1) What are Custom Hooks in React and when should you use them?

**✅ Explanation**

A **custom hook** is a JavaScript function whose name **starts with `use`** and that can call other hooks like `useState`, `useEffect`, etc.  
They are used to **reuse logic** across multiple components.

**✅ Why and When to Use Custom Hooks**
You should use custom hooks when:

- You have **repeated logic** in different components (e.g., toggles, data fetching).
- You want to **separate concerns** and keep components clean.
- You want to **reuse stateful logic** without repeating code.

**✅ Example**

```jsx
// useToggle.js
import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}

export default useToggle;
```

### ➤ Usage:

```jsx
const [isOpen, toggleOpen] = useToggle();
```

**How to answer in an interview**

A custom hook in React is a reusable function that starts with the word ‘use’ and can use other hooks inside it. It helps us extract and reuse stateful logic across multiple components, like toggling, data fetching, or handling forms. We use custom hooks to keep our component code clean, reduce duplication, and improve maintainability. They don’t return JSX, just logic and data.

---

# 2) What’s the difference between useReducer and useState?

**✅ useState vs useReducer**

| Feature     | useState                             | useReducer                                               |
| ----------- | ------------------------------------ | -------------------------------------------------------- |
| Used for    | Simple state (input, toggles)        | Complex state logic (multiple or dependent state values) |
| Logic style | Inline via `setState`                | Handled in a `reducer` function with actions             |
| Syntax      | `[value, setValue] = useState(init)` | `[state, dispatch] = useReducer(reducerFn, init)`        |
| Reusability | Simple                               | More organized for large apps                            |

**✅ When to Use**

- Use `useState` when you have basic, isolated state.
- Use `useReducer` when:
  - Multiple values are managed together
  - State updates depend on previous state
  - You want Redux-style structure

**How to answer in an interview**

`useState` is used for managing simple state in a component, like toggles or form inputs. But when the state logic becomes more complex — for example, you have multiple related values or the next state depends on the previous one — `useReducer` is more suitable. It uses a reducer function and actions, similar to Redux, and gives better control and organization for complex state management.

---

# 3) What is prop drilling and how can you avoid it?

**✅ Explanation**

**Prop drilling** happens when you pass data through multiple levels of components, even when only the bottom child needs it.

**✅ Problem**: Intermediate components receive props they don’t use.  
**✅ Solution**: Use **React Context API** or **state management libraries**.

**✅ Example of Prop Drilling**

```jsx
<Parent user={user}>
  <Child>
    <GrandChild user={user} />
  </Child>
</Parent>
```

**✅ How to Avoid It**

- Use React Context to share data without manual passing
- Use state management (Redux, Zustand, etc.)
- Reorganize components to place logic closer to usage

**How to answer in an interview**

Prop drilling is when we pass data through multiple layers of components, even though only the last child actually needs it. This makes the code harder to read and maintain. We can avoid it by using the React Context API, which allows us to provide data globally and access it anywhere in the component tree. For larger apps, we can also use state management libraries like Redux or Zustand.

---

# 4) What are Render Props and how do they differ from HOCs?

**✅ Explanation**

### 🔹 Render Props:

- A **function passed as a prop** that returns JSX.
- Used for **sharing logic** between components.

**Example**:

```jsx
<MouseTracker
  render={(pos) => (
    <h1>
      {pos.x}, {pos.y}
    </h1>
  )}
/>
```

### 🔹 Higher-Order Components (HOCs):

- A **function that takes a component and returns a new one** with extra logic.

**Example**:

```jsx
const Enhanced = withAuth(Component);
```

**✅ Difference Table**

| Feature     | Render Props               | HOC                                      |
| ----------- | -------------------------- | ---------------------------------------- |
| Pattern     | Function-as-a-prop         | Function that returns enhanced component |
| Usage Style | Inline                     | External wrapper                         |
| Reusability | ✅ Yes                     | ✅ Yes                                   |
| Drawbacks   | Nesting hell (if overused) | Wrapper hell / prop name collision       |

**How to answer in an interview**

Render Props and Higher Order Components are both React patterns used to share logic between components. A Render Prop is a function passed as a prop that returns JSX — allowing flexible rendering inside the component. An HOC is a function that wraps a component and returns a new enhanced component. Render Props are used inline and give more flexibility, while HOCs are more abstract and can lead to wrapper nesting. Both help in code reuse but are now often replaced with hooks in modern React.

---

# 5) What are Error Boundaries in React?

**✅ Explanation**

**Error Boundaries** are **React components** that catch JavaScript errors in their child components during:

- rendering,
- lifecycle methods,
- constructor of class components.

Instead of crashing the app, they **show a fallback UI**.

**✅ How to Make One (Class Component Only)**

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

**✅ When It Runs**:

- If an error occurs during render, constructor, or lifecycle in child component

**⛔ What it doesn't catch**:

- Event handlers
- Async errors (e.g. `setTimeout`)
- Server-side errors

**How to answer in an interview**

Error Boundaries are special React components that catch JavaScript errors in the component tree below them and display a fallback UI instead of crashing the whole app. They catch errors during rendering, lifecycle methods, and constructors of child components. They’re created using class components with methods like `getDerivedStateFromError` and `componentDidCatch`. This helps improve user experience and makes the app more reliable.
