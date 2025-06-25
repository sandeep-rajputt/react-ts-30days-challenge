import type { JSX } from "react";
import { Routes, Route } from "react-router";
import * as DaysMap from "@src/days/days.ts";
import { Link } from "react-router";
import React from "react";

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
];

function App() {
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
                      path={`/day-${index + 1}/task-${childIndex + 1}`}
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
