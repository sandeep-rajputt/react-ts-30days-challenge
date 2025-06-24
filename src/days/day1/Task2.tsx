import ThemeProvider from "@src/hook/ChangeTheme";
import ThemeChanger from "@src/days/day1/ThemeChanger";

function Task2() {
  return (
    <ThemeProvider>
      <div className="h-screen w-screen flex flex-col items-center justify-center dark:bg-[#212529] bg-[#f8f9fa]">
        <div className="flex items-center justify-center gap-10">
          <ThemeChanger />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Task2;
