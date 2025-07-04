import type { JSX } from "react";
import { Routes, Route } from "react-router";
import * as DaysMap from "@src/days/days.ts";
import { Link } from "react-router";
import React, { useEffect, useState } from "react";

const daysRecord = DaysMap as Record<string, React.ComponentType<any>>;

type DaysTasks = {
  name: string;
  goal: string;
  features: string[];
  element: string;
}[][];

const daysTasks: DaysTasks = [
  [
    {
      name: "To-Do List App",
      goal: "Build a to-do list where users can add, complete, and delete tasks.",
      features: [
        "Input to add tasks",
        "Show task list with checkboxes",
        "Delete button per task",
        "Count total and completed tasks",
        "Persist in localStorage",
      ],
      element: "Day1Task1",
    },
    {
      name: "Theme Toggle App (Light/Dark)",
      goal: "Build a theme switcher app using Context API",
      features: [
        "Toggle button or switch for theme",
        "Show task list with checkboxes",
        "Global theme state via Context",
        "Theme stored in localStorage",
        "Reusable components reflect theme changes",
      ],
      element: "Day1Task2",
    },
    {
      name: "Sortable, Paginated Data Table",
      goal: "Build a table with data from JSONPlaceholder",
      features: [
        "Fetch & display data",
        "Pagination (Next/Prev & numbers)",
        "Search filter",
        "Loading + error handlings",
      ],
      element: "Day1Task3",
    },
  ],
  [
    {
      name: "Counter with Step Control",
      goal: "Build a simple counter with buttons to increase/decrease the count, plus a dropdown to select step size.",
      features: [
        "Display the current count",
        "+ and - buttons to increment/decrement",
        "Dropdown or input to choose the step (e.g., 1, 5, 10)",
        "Reset button to set count back to zero",
      ],
      element: "Day2Task1",
    },
    {
      name: "Accordion FAQ Component",
      goal: "Build an accordion where multiple FAQ items can expand/collapse.",
      features: [
        "Render a list of FAQ items (question + answer)",
        "Only one item open at a time (optional: allow multiple)",
        "Clicking a question toggles its answer",
        "Use an array of FAQ data to render dynamically",
      ],
      element: "Day2Task2",
    },
    {
      name: "Multi Step Form",
      goal: "Create a 3-step form that collects user info step-by-step",
      features: [
        "Step 1: Name + Email",
        "Step 2: Address + Phone",
        "Step 3: Review & Submit",
        "Buttons: Next, Back, Submit",
        "Show current step",
        "Validate basic fields (e.g., no empty input)",
      ],
      element: "Day2Task3",
    },
  ],
  [
    {
      name: "Emoji Picker Input",
      goal: "Build a text input where users can click to insert emojis from a list.",
      features: [
        "Input field for typing text",
        "Emoji button toggles a dropdown/popup with 10+ emojis",
        "Clicking an emoji adds it to the current input value",
        "Optional: Close dropdown when clicked outside",
      ],
      element: "Day3Task1",
    },
    {
      name: "Tab Switcher Component",
      goal: "Create a tab UI with 3 tabs — clicking each shows different content.",
      features: [
        "Tab headers (Tab 1, Tab 2, Tab 3)",
        "Only one tab content visible at a time",
        "Highlight active tab",
        "Reusable Tab and Tabs component structure",
      ],
      element: "Day3Task2",
    },
    {
      name: "Form Validation Library (Mini)",
      goal: "Build a reusable form input + validation system.",
      features: [
        "Input fields: name, email, password",
        "Show real-time validation errors",
        "Validations: required, email format, min password length",
        "Submit button disabled unless all valid",
        "Optional: Show success message after submission",
      ],
      element: "Day3Task3",
    },
  ],
  [
    {
      name: "Random Color Box",
      goal: "Generate and display colored boxes with random colors.",
      features: [
        "A button labeled “Generate Color”",
        "On each click, generate a new box with a random background color",
        "Show the hex color code inside the box",
        "Stack boxes vertically (or in a grid if you want)",
        "Optional: limit to 10 recent boxes only",
        "Bonus: Add a “Clear All” button",
      ],
      element: "Day4Task1",
    },
    {
      name: "Searchable List with Debounce",
      goal: "Render a list of items and filter it based on a search input — with debounce.",
      features: [
        "Search input box",
        "30–40 hardcoded list items",
        "Show only items that match the search term",
        "Debounce the filtering logic (e.g. 300ms delay after user stops typing)",
        "Show “No results found” if nothing matches",
      ],
      element: "Day4Task2",
    },
    {
      name: "Auth-Protected Route Demo",
      goal: "Implement simple routing with protected pages based on fake authentication.",
      features: [
        "Pages: Home (/), Login (/login), Dashboard (/dashboard)",
        "“Fake” login button sets a loggedIn flag in context",
        "If not logged in → redirect to /login",
        "Use React Router (react-router-dom)",
        "Auth context using createContext",
        "Simple logout functionality",
      ],
      element: "Day4Task3",
    },
  ],
  [
    {
      name: "Star Rating Component",
      goal: "Build a simple interactive star rating component.",
      features: [
        "Display 5 stars (or any number)",
        "Hover effect: highlight stars up to the hovered one",
        "Click to set the rating",
        "Show selected rating (e.g., “You rated: 4/5”)",
        "Optional: pass max stars as a prop",
      ],
      element: "Day5Task1",
    },
  ],
];

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  if (width < 800) {
    return (
      <div className="bg-[#212529] text-[#f8f9fa]">
        <div className="flex-col gap-10 min-h-screen py-10 w-full flex items-center justify-center">
          <h1 className="text-2xl font-semibold">
            Please open this app in large screen
          </h1>
          <p className="text-sm opacity-70">
            This app is designed to work on larger screens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full bg-[#212529] text-[#f8f9fa]">
      <Routes>
        <Route index element={<Home />} />
        {daysTasks.map((item, index) => {
          return (
            <>
              <Route
                path={`/day-${index + 1}`}
                element={<Day day={index + 1} childs={item} />}
              />
              {item.map((childItem, childIndex) => {
                const ChildComponent = daysRecord[childItem.element];
                return (
                  <>
                    <Route
                      path={`/day-${index + 1}/task-${childIndex + 1}/*`}
                      element={<ChildComponent />}
                    />
                  </>
                );
              })}
            </>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;

function Home(): JSX.Element {
  return (
    <div className="flex-col gap-10 min-h-screen py-10 w-full flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Days</h1>
      <ul className="flex flex-col gap-10">
        {daysTasks.map((_item, index) => {
          return (
            <li key={index}>
              <Link
                to={`/day-${index + 1}`}
                className="border px-10 py-7 flex flex-col gap-5 items-center justify-center bg-[#343a40] rounded-lg border-white/30 cursor-pointer"
              >
                Day {index + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Day({
  day,
  childs,
}: {
  day: number;
  childs: { name: string; goal: string; features: string[]; element: string }[];
}) {
  return (
    <div className="flex-col gap-10 min-h-screen py-10 w-full flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Day {day}</h1>
      <ul className="flex flex-col items-center w-full gap-10">
        {childs.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={`/day-${day}/task-${index + 1}`}
                className="w-xl border px-10 py-7 flex flex-col gap-5 bg-[#343a40] rounded-lg border-white/30 cursor-pointer"
              >
                <h1 className="w-full text-center font-semibold">
                  Task {index + 1}
                </h1>
                <div className="flex flex-col gap-2">
                  <p>
                    <span className="font-semibold">Name: </span>
                    <span className="opacity-70">{item.name}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Goal: </span>
                    <span className="opacity-70">{item.goal}</span>
                  </p>
                  <div>
                    <p>
                      <span className="font-semibold">Features: </span>
                    </p>
                    <ul className="text-sm opacity-70 ml-2">
                      {item.features.map((feature, index) => {
                        return (
                          <li key={index}>
                            {index + 1}) {feature}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
