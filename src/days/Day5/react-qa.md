## 1) What are common performance pitfalls in Context API?

**✅ Explanation**

React Context API is great for avoiding prop drilling, but it can lead to **performance issues** if not used carefully.

**✅ Common Pitfalls**

- **Re-rendering all consumers**: Every component that uses the context will re-render when any value in context changes.
- **Passing non-memoized objects/functions**: These create new references on each render, triggering unnecessary updates.
- **Too much logic in the provider**: Keeping all state and logic in the context provider can slow things down.
- **One big global context**: Mixing unrelated state like auth, theme, cart in one provider leads to frequent re-renders.

**✅ Best Practices**

- Split context into smaller ones (e.g., AuthContext, ThemeContext)
- Use `useMemo` or `useCallback` for context values
- Keep logic in custom hooks and keep the provider lean

**How to answer in an interview**

The main performance pitfall in Context API is that all consuming components re-render whenever the context value changes, even if they don’t use the changed part. This happens especially when passing new object references or functions as context values. To avoid this, I use `useMemo` to memoize values and split large contexts into smaller ones. I also keep context logic minimal and avoid putting everything into one global context.

---

## 2) How do you lazy load components in React?

**✅ Explanation**

Lazy loading means **loading components only when needed**, which helps improve performance by splitting the code.

**✅ How to Implement**

- Use `React.lazy()` to define lazy-loaded components
- Wrap the component with `<Suspense>` and provide a fallback UI

**✅ Example**

```jsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));

<Suspense fallback={<p>Loading...</p>}>
  <LazyComponent />
</Suspense>;
```

**✅ Notes**

- Works with default exports only
- Needs React 16.6+
- Useful for route-based code splitting or heavy UI modules

**How to answer in an interview**

In React, I use `React.lazy()` and `Suspense` to lazy load components. This helps split the code and load components only when needed, improving performance. I define the lazy component using `React.lazy(() => import(...))`, and then wrap it in `<Suspense>` with a fallback UI like a loading spinner.

---

## 3) What is code splitting and why is it important?

**✅ Explanation**

**Code splitting** is breaking your JavaScript bundle into smaller chunks so the browser only loads what’s needed.

**✅ Why It’s Important**

- Reduces initial load time
- Improves performance on slow networks
- Avoids unnecessary code execution

**✅ How to Do It in React**

- Use `React.lazy()` + `Suspense`
- Use dynamic `import()` syntax
- Combine with bundlers like Webpack or Vite

**How to answer in an interview**

Code splitting is the process of breaking a large JavaScript bundle into smaller chunks, so the app loads only what’s needed. In React, we can use `React.lazy()` and `Suspense` to load components on demand. This improves performance, reduces initial load time, and gives a better user experience, especially for large applications or slow networks.

---

## 4) Can Suspense be used for data fetching?

**✅ Explanation**

Yes, **React 18+** allows Suspense to be used for data fetching — but only with **libraries or frameworks** that support it.

**✅ Examples that support it**

- React Query (v5+)
- Relay
- Next.js App Router (`app/` folder)

**✅ Notes**

- Suspense itself doesn’t fetch data; it waits for something (like a promise)
- It needs concurrent rendering support (React 18+)

**✅ React Query Example**

```jsx
const { data } = useQuery({
  queryKey: ["user"],
  queryFn: fetchUser,
  suspense: true,
});

<Suspense fallback={<Loader />}>
  <UserComponent />
</Suspense>;
```

**How to answer in an interview**

Yes, in React 18, Suspense can be used for data fetching — but only when combined with compatible libraries like React Query or frameworks like Next.js. Suspense pauses rendering until the data is ready, then shows a fallback like a loader. However, Suspense doesn’t fetch data on its own — it requires a data library that supports it.

---

## 5) What is useTransition and how does it improve UX?

**✅ Explanation**

`useTransition` is a React 18 hook that lets you mark **non-urgent updates**, so urgent updates like typing feel faster.

**✅ Syntax**

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setFilteredItems(filterLargeList());
});
```

**✅ Use Cases**

- Filtering a large list based on input
- Switching tabs with heavy components
- Background updates without blocking UI

**✅ Benefit**: Keeps UI smooth by prioritizing user interaction

**How to answer in an interview**

`useTransition` is a hook introduced in React 18 that helps improve user experience by separating urgent and non-urgent updates. For example, user interactions like typing or clicking are urgent and should happen instantly, but filtering a large list is non-urgent. `useTransition` allows non-urgent updates to run in the background without blocking the UI. It keeps the interface smooth and responsive while showing a loading state using `isPending`.
