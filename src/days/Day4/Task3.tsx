import { Route, Routes } from "react-router";
import Task3Home from "./Task3Home";
import Task3Login from "./Task3Login";
import Task3Dashboard from "./Task3Dashboard";
import LoginProvider, { ProtectedRoute } from "@src/hook/Day4Task3Login";

function Task3() {
  return (
    <LoginProvider>
      <div>
        <Routes>
          <Route path="/" element={<Task3Home />} />
          <Route path="/login" element={<Task3Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Task3Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </LoginProvider>
  );
}

export default Task3;
