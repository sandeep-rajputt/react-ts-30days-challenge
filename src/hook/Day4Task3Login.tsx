import React, { createContext, useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router";

const LoginContext = createContext<{
  login: (email: string, password: string) => void;
  loading: boolean;
  logout: () => void;
  isLoggedIn: boolean;
}>({
  login: () => {},
  loading: true,
  logout: () => {},
  isLoggedIn: false,
});

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  function logout() {
    setIsLoggedIn(false);
    setLoading(false);
    localStorage.setItem(
      "day4task3credential",
      JSON.stringify({
        email: undefined,
        password: undefined,
      })
    );
  }

  function login(email: string, password: string) {
    if (email === "test@website.com" && password === "password123") {
      setIsLoggedIn(true);
    }
    localStorage.setItem(
      "day4task3credential",
      JSON.stringify({
        email: "test@website.com",
        password: "password123",
      })
    );
  }

  useEffect(() => {
    if (loading) {
      const credentials = localStorage.getItem("day4task3credential");
      if (credentials) {
        const data = JSON.parse(credentials);
        if (
          data.email === "test@website.com" &&
          data.password === "password123"
        ) {
          setIsLoggedIn(true);
        }
      }
    }
    setLoading(false);
  }, []);

  return (
    <LoginContext value={{ loading, login, logout, isLoggedIn }}>
      {children}
    </LoginContext>
  );
};

export default LoginProvider;

export function loginData() {
  const { loading, login, logout, isLoggedIn } = useContext(LoginContext);
  return { loading, login, logout, isLoggedIn };
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoggedIn, loading } = loginData();

  console.log(isLoggedIn);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/day-4/task-3/login");
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (isLoggedIn) {
      return children;
    } else {
      return <div>Redirecting to Login Page</div>;
    }
  }
}
