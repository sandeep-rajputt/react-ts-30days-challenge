import SimpleButton from "@src/components/SimpleButton";
import { loginData } from "@src/hook/Day4Task3Login";

function Task3Dashboard() {
  const { logout } = loginData();
  return (
    <div>
      <div className="flex justify-center py-10">
        <div className="w-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Dashboard</h1>
            <p className="opacity-70 mt-3">
              Welcome to the protected dashboard!
            </p>
          </div>
          <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
            <h2 className="text-2xl font-semibold">Dashboard Content</h2>
            <p className="mt-5">
              This is a protected page. You can only access this page if you are
              logged in.
            </p>
            <SimpleButton
              handleClick={logout}
              className="mt-4 bg-red-500 hover:bg-red-600"
            >
              Logout
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task3Dashboard;
