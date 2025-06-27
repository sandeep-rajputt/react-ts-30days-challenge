import { useState } from "react";

type Tabs = 1 | 2 | 3;

const tabsData = [
  "This is the content for Tab 1. Here you can display any information related to the first tab.",
  "This is the content for Tab 2. This tab contains different information from the first tab.",
  "This is the content for Tab 3. Each tab has its own unique content and functionality.",
];

function Task2() {
  const [currentTab, setCurrentTab] = useState<Tabs>(1);
  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Tab Switcher Component</h1>
          <p className="opacity-70 mt-3">
            Click tabs to switch between different content
          </p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-lg font-semibold">Interactive Tabs</h2>
          <TabStructure
            length={tabsData.length}
            changeTab={setCurrentTab}
            currentTab={currentTab}
          />
        </div>
      </div>
    </div>
  );
}

export default Task2;

function TabStructure({
  length,
  changeTab,
  currentTab,
}: {
  length: number;
  currentTab: Tabs;
  changeTab: React.Dispatch<React.SetStateAction<Tabs>>;
}) {
  return (
    <div className="mt-5">
      <div>
        {Array(length)
          .fill(null)
          .map((_item, index) => {
            return (
              <button
                onClick={() => {
                  changeTab((index + 1) as typeof currentTab);
                }}
                key={index}
                className={`py-2 px-4 cursor-pointer border-b-2 ${
                  index + 1 === currentTab
                    ? "bg-blue-500/10 border-blue-500"
                    : "hover:bg-[#212529] border-transparent "
                }`}
              >
                Tab {index + 1}
              </button>
            );
          })}
      </div>
      <hr />
      <Tab item={tabsData[currentTab - 1]} />
    </div>
  );
}

function Tab({ item }: { item: string }) {
  return (
    <div className="py-4">
      <p>{item}</p>
    </div>
  );
}
