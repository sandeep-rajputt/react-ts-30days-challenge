# 1) What is JSX and why is it used?

**Explanation** :

JSX stands for:

```bash
JavaScript XML
```

It’s a syntax extension to JavaScript used in React.

Instead of using `React.createElement()`, JSX lets you write HTML-like code inside JavaScript. It looks like HTML, but it's actually syntactic sugar for `React.createElement()` calls.

**✅ Why is JSX used?**

- It makes the code cleaner and more readable.
- You can write UI structure and logic together.
- It gives better developer experience with:
  - syntax highlighting,
  - error messages,
  - and fast development.

Under the hood, JSX is converted to JavaScript by tools like Babel.

**How to answer in an interview**

JSX stands for JavaScript XML. It’s a syntax extension used in React that lets us write HTML-like code inside JavaScript. It improves code readability and allows developers to design the UI within the same file as the logic. JSX is not required to use React, but it makes the code more intuitive and easier to manage. Under the hood, JSX is compiled into regular JavaScript using tools like Babel.

# 2) How does useState work?

**✅ What is useState?**'

useState is a React Hook that lets functional components store and manage state (like variables that remember values between renders).

Before hooks, only class components could use state. Now, thanks to useState, functional components can have their own state too.

**✅ How it works?**

```jsx
import { useState } from "react";

const [count, setCount] = useState(0);
```

_🔍 What’s happening here?_

- `count` → current state value
- `setCount` → function to update the state
- `useState(0)` → initial state is `0`'

_🔄 When you call `setCount(newValue)`:_

- React updates the state
- Then re-renders the component to reflect the new value

**How to answer in an interview**

`useState` is a hook in React that allows functional components to hold and manage state. It returns an array with two elements — the current state value and a function to update it. When we call the update function, React re-renders the component with the new state. For example, `const [count, setCount] = useState(0)` lets me store a counter value starting at 0, and update it using `setCount`. It’s a simple and powerful way to add interactivity in React components.

# 3) Explain the virtual DOM

**✅ What is the Virtual DOM?**

- The Virtual DOM (VDOM) is a lightweight copy of the real DOM (Document Object Model).
- It is kept in memory by React.
- Every time something in the UI changes (like state or props), React doesn’t update the real DOM directly.

_Instead:_

**🔄 The process:**

- React creates a new virtual DOM after the update.
- It compares it with the previous virtual DOM (using a process called diffing).
- It finds out what actually changed.
- Then it updates only the changed part in the real DOM — not the whole thing.

**🧠 Why is this useful?**

- Updating the real DOM is slow.
- Updating a JavaScript object (the virtual DOM) is fast.
- So this method gives React better performance and smooth UI updates.

**How to answer in an interview**

The Virtual DOM is a lightweight copy of the actual DOM. Instead of updating the real DOM directly when a component’s state changes, React updates the Virtual DOM first. Then it compares it with the previous version using a diffing algorithm to find what changed. Finally, it updates only those specific parts in the real DOM. This makes updates faster and improves app performance.

# 4) ✅ Controlled vs Uncontrolled Components

**👉 Controlled Component**

- eact controls the input’s value using `useState` or props
- You access/change value via React state
- Recommended for full control & validation
- Easier to debug and test
- Example:
  ```jsx
  <input value={value} onChange={handleChange} />
  ```

**👉 Uncontrolled Component**

- The input manages its own state using the DOM
- You access the value via `ref` (like `inputRef.current.value`)
- Useful when you don’t need frequent updates or validation
- Less code, but less control
- Example
  ```jsx
  <input ref={inputRef} />
  ```

**How to answer in an interview**

In React, a controlled component is one where the form input is fully managed by React using state. The input’s value is stored in a state variable and updated using `onChange`. In contrast, an uncontrolled component manages its own state internally, and we access its value using a `ref`. Controlled components give more control and are better for validation and dynamic form handling. Uncontrolled ones are useful for simple, one-time value access.

# 4) 5️⃣ What are fragments in React?

**Explanation**

- React Fragments let you group multiple elements without adding extra nodes to the DOM.

**🔍 Why is this useful?**

- In React, a component must return only one parent element.
- Normally, you might wrap everything in a <div>, but that adds an extra node in the DOM — which is sometimes unnecessary or harmful for layout or styling.

✅ So instead, we use `<React.Fragment>` or short syntax `<>` to group children.

**How to answer in an interview**

Fragments in React allow us to group multiple elements without adding an extra DOM node. Normally, React components must return a single parent element, so we often use a `<div>`, but that creates unnecessary nesting. With `<React.Fragment>` or short syntax `<>`, we can return multiple elements cleanly without affecting the DOM structure. It helps keep the DOM lightweight and the JSX readable.
