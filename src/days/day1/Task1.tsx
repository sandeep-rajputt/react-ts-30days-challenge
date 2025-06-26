import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Task1() {
  const [inputText, setInputText] = useState<string>("");
  const [list, setList] = useState<{ value: string; completed: boolean }[]>([]);

  // handle form submission
  function handleSubmit() {
    const trimmedText = inputText.trim();
    if (trimmedText) {
      setList((prev) => [...prev, { value: trimmedText, completed: false }]);
      setInputText("");
    }
  }

  // toggle the task
  function toggleCompleted(index: number) {
    setList((prev) =>
      prev.map((item, indx) =>
        indx === index ? { ...item, completed: !item.completed } : item
      )
    );
  }

  // delete Item from list
  function handleDelete(index: number) {
    setList((prev) => {
      const newList = prev.filter((_item, indx) => indx !== index);
      if (newList.length === 0) {
        localStorage.removeItem("list");
      }
      return [...newList];
    });
  }

  useEffect(() => {
    if (list.length === 0) {
      // get list from localstorage
      let localItem = localStorage.getItem("list");
      if (localItem) {
        setList([...JSON.parse(localItem)]);
      }
    } else {
      // store list to the localstorage
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl my-10 border bg-[#343a40] border-white/30 px-10 py-5 rounded-lg">
        <h1 className="text-center font-bold text-lg">My Todo List</h1>
        <div className="flex text-xs gap-2 justify-center mt-2">
          <p className="bg-[#495057]/50 px-4 py-1 rounded-full font-semibold">
            total: {list.length}
          </p>
          <p className="bg-green-500/40 px-4 py-1 rounded-full font-semibold">
            completed: {list.filter((item) => item.completed).length}
          </p>
          <p className="border border-[#495057] px-4 py-1 rounded-full font-semibold">
            pending: {list.filter((item) => !item.completed).length}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="grid grid-cols-[1fr_auto] gap-2 mt-6"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border focus:outline-none rounded-md border-white/30 h-9 px-2"
          />
          <button
            aria-label="Add Task"
            disabled={inputText.trim().length === 0}
            className={`flex gap-1 items-center justify-center px-3 py-1 rounded-md  ${
              inputText.trim().length === 0
                ? "bg-[#212529]/90 text-white/50 cursor-default"
                : "bg-white/90 text-black cursor-pointer"
            }`}
          >
            <IoMdAdd />
            Add
          </button>
        </form>
        {list.length > 0 ? (
          <div>
            <ul className="flex flex-col gap-2 mt-10">
              {list.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="grid grid-cols-[auto_1fr_auto] gap-2 py-3 px-4 items-center border rounded-md border-white/30"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleCompleted(index)}
                      className="cursor-pointer"
                    />
                    <p className={`${item.completed && "line-through"}`}>
                      {item.value}
                    </p>
                    <button
                      aria-label="Delete Task"
                      onClick={() => handleDelete(index)}
                      className="text-red-500 cursor-pointer hover:bg-red-500/10 border hover:border-white/30 border-transparent rounded p-2"
                    >
                      <MdDelete />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="min-h-40 flex flex-col items-center justify-center">
            <p className="font-semibold text-lg opacity-80">No tasks yet!</p>
            <p className="opacity-60">
              Add your first task above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task1;
