import type { JSX } from "react";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="min-h-screen h-full">
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

function Home(): JSX.Element {
  return <div>Home</div>;
}
