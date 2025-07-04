import { Link } from "react-router";

function Task3Home() {
  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Auth-Protected Route Demo</h1>
          <p className="opacity-70 mt-3">Simple routing with protected pages</p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-2xl font-semibold">Search Items</h2>
          <div className="flex gap-5 mt-5">
            <Link
              to={"/day-4/task-3"}
              className="border border-white/30 rounded-md px-3 py-1"
            >
              Home
            </Link>
            <Link
              to={"/day-4/task-3/login"}
              className="border border-white/30 rounded-md px-3 py-1"
            >
              Login
            </Link>
            <Link
              to={"/day-4/task-3/dashboard"}
              className="border border-white/30 rounded-md px-3 py-1"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task3Home;
