import { useContext } from "react";
import { ThemeContext } from "@src/hook/ChangeTheme";

type Theme = "light" | "dark";

function ThemeChanger() {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, setTheme } = context;

  function changeTheme(theme: Theme) {
    setTheme(theme);
  }

  return (
    <select
      name="theme"
      id="theme"
      value={theme}
      onChange={(e) => changeTheme(e.target.value as Theme)}
      className="dark:text-[#f8f9fa] px-5 py-1 text-[#212529] bg-[#f8f9fa] dark:bg-[#212529] outline-none border border-[#212529] dark:border-[#f8f9fa]"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}

export default ThemeChanger;
