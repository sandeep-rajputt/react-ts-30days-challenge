import { useState } from "react";
import { loginData } from "@src/hook/Day4Task3Login";
import { useNavigate } from "react-router";

function Task3Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, login, isLoggedIn } = loginData();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    navigate("/day-4/task-3/dashboard");
    return <div>Redirecting to Dashboard</div>;
  }

  function handleSubmit() {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (email === "test@website.com" && password === "password123") {
      login(email, password);
    } else {
      alert("Invalid credentials");
    }
  }

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Login</h1>
          <p className="opacity-70 mt-3">Login to access protected pages</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10"
        >
          <h2 className="text-2xl font-semibold">Login</h2>
          <div className="flex flex-col gap-5 mt-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none border border-white/30 rounded-md px-3 py-1 bg-transparent"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none border border-white/30 rounded-md px-3 py-1 bg-transparent"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
              Login
            </button>
          </div>
        </form>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-2xl font-semibold">Login Credentials </h2>
          <p className="opacity-70 mt-3">
            Use the following credentials to login:
          </p>
          <p className="opacity-70">
            Email: <b>test@website.com</b>
          </p>
          <p className="opacity-70">
            Password: <b>password123</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Task3Login;
