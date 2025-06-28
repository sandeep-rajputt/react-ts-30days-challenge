# 1) How does useEffect cleanup work?

**✅ What is useEffect cleanup?** :

Sometimes, the code inside `useEffect` sets up something that needs to be cleaned up when:

- the component unmounts, or
- the effect re-runs because dependencies changed.

👉 Example: event listeners, timers, subscriptions, or intervals — they must be cleared to avoid memory leaks or bugs.

You handle this by returning a cleanup function inside `useEffect`.

**✅ Example:**

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running...");
  }, 1000);

  // 🔴 Cleanup function
  return () => {
    clearInterval(interval);
    console.log("Cleanup done!");
  };
}, []);
```

- On first render → sets the interval
- On unmount or dependency change → cleanup function runs to clear it

**✅ When does the cleanup run?**
| When? | What happens? |
| ----- | --------------- |
| Before component unmounts | Cleanup runs automatically |
| Before effect re-runs (if deps changed) | Cleanup runs first, then new effect runs |

**How to answer in an interview**

In `useEffect`, the cleanup function is used to clean up side effects like timers, subscriptions, or event listeners. It runs automatically when the component unmounts or before the effect re-runs due to dependency changes. We return the cleanup function inside the `useEffect`. This prevents memory leaks and ensures the component behaves correctly when re-rendered or removed.

# 2) What’s the difference between useRef and useState?

**✅ `useRef` vs `useState`**

| Aspect            | useState                             | useRef                                            |
| ----------------- | ------------------------------------ | ------------------------------------------------- |
| Purpose           | Stores state and triggers re-render  | Stores mutable value that doesn’t cause re-render |
| Causes re-render? | ✅ Yes, when value changes           | ❌ No, value changes silently                     |
| Use cases         | UI data that should update on change | DOM refs, timers, previous values, mutable flags  |
| Returns           | `[value, setValue]`                  | `.current` (mutable object)                       |

**✅ When to use which**

- Use useState when your data should trigger re-rendering (e.g., form inputs, toggles).
- Use useRef when you just want to hold a value, or reference DOM elements, or store previous state, without triggering re-render.

**How to answer in an interview**

`useState` is used to store state in a component and it causes the component to re-render whenever the state changes. On the other hand, `useRef` holds a mutable value that doesn't cause a re-render when updated. It’s commonly used for accessing DOM elements or storing values like previous state or timers. Basically, if I need UI updates, I use `useState`; if I need to persist a value without re-rendering, I use `useRef`.

# 3) What’s the purpose of keys in React lists?

**✅ Explanation**

In React, keys help identify which items in a list have changed, been added, or removed.\
When you render a list using `.map()`, React uses the `key` prop to:

- track each element
- optimize rendering
- avoid unnecessary re-renders

Without unique keys, React may re-render or reuse elements incorrectly, causing bugs or performance issues.

**How to answer in an interview**

Keys in React lists are used to uniquely identify each item when rendering lists. They help React detect which items have changed, been added, or removed, so it can update the DOM efficiently. Without keys or with duplicate ones, React may re-render the wrong items or cause performance issues. Ideally, we use a unique ID as the key, instead of the array index.

# 4) Can you call Hooks inside loops or conditions?

**✅ Explanation**

- No, you should never call hooks inside:
- loops,
- conditions (like `if` or `switch`),
- nested functions.

**✅ Why? (The Reason)**

Hooks (like `useState`, `useEffect`, etc.) must be called in the same order on every render.\
If you put them inside a loop or condition:

- The order may change between renders
- React will not know which state belongs to which hook
- This can cause bugs or crashes

React follows the "Rules of Hooks":

- ✅ Only call hooks at the top level of your React function (not inside loops, conditions, or nested functions).

**How to answer in an interview**

No, we shouldn’t call hooks inside loops, conditions, or nested functions. Hooks must be called in the exact same order on every render, otherwise React can't keep track of the state correctly. This is why hooks should always be at the top level of the component. It’s part of the official Rules of Hooks.

# 4) What is the difference reconciliation and Diffing in react

**Explanation**
| **Concept** | **Reconciliation** | **Diffing** |
| ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Definition** | The overall process React uses to update the DOM when the UI changes | A part of reconciliation — the **algorithm** used to compare Virtual DOM trees |
| **Scope** | Broad — includes identifying changed components, rerenders, etc. | Narrow — focuses on finding what exactly changed in the DOM nodes |
| **When it happens** | Whenever state or props change | When React compares old vs new virtual DOM to decide DOM updates |
| **Involves** | Component updates, re-rendering, key usage in lists, hooks, etc. | Node-by-node comparison, skipping unchanged nodes using heuristics |

**🧠 In simple terms:**

- Reconciliation = the full decision process React uses to update the UI.
- Diffing = the specific algorithm React uses to compare old vs new virtual DOM elements efficiently.

React does diffing during reconciliation to find the minimal changes needed in the real DOM.

**How to answer in an interview**

Reconciliation in React is the process of updating the DOM when a component’s state or props change. It includes figuring out which components need to re-render. Diffing is a part of reconciliation — it’s the algorithm React uses to compare the new and old Virtual DOM and find the minimal changes. So, reconciliation is the overall update strategy, and diffing is the specific technique used to identify what changed
