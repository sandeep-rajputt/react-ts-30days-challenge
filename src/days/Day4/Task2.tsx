import { useEffect, useState } from "react";

const data: string[] = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Ice Cream",
  "Jackfruit",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Ugli Fruit",
  "Vanilla",
  "Watermelon",
  "Xigua",
  "Yellow Apple",
  "Zucchini",
  "Avocado",
  "Blueberry",
  "Coconut",
  "Dragon Fruit",
  "Eggplant",
  "Fennel",
  "Grapefruit",
  "Huckleberry",
  "Indian Fig",
  "Jujube",
  "Kumquat",
  "Lime",
  "Mulberry",
  "Nutmeg",
  "Olive",
  "Peach",
  "Quinoa",
  "Radish",
  "Spinach",
  "Tomato",
];

function Task2() {
  const [filteredData, setFilteredData] = useState<string[]>(data);
  const [inputSearch, setInputSearch] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputSearch !== "") {
        setFilteredData(() =>
          data.filter((item) =>
            item.toLowerCase().includes(inputSearch.toLowerCase())
          )
        );
      } else {
        setFilteredData(() => [...data]);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputSearch]);

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">
            Searchable List with Debounce
          </h1>
          <p className="opacity-70 mt-3">
            Search through items with 300ms debounce delay
          </p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-2xl font-semibold">Search Items</h2>
          <div>
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Type to search the items..."
              className="w-full focus:outline-none border mt-3 border-white/30 rounded-md px-2 py-1"
            />
            <p className="text-sm mt-1 opacity-60">
              Showing {filteredData.length} of {data.length} items
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10">
          {filteredData.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-lg border border-white/30 bg-[#343a40] p-5"
              >
                {item}
              </div>
            );
          })}
        </div>
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 w-full rounded-lg border border-white/30 bg-[#343a40]">
            <p className="text-lg font-semibold">No results found</p>
            <p className="text-sm opacity-50">
              Try searching for a different term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task2;
