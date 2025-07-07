import SimpleButton from "@src/components/SimpleButton";
import { useState } from "react";

function Task1() {
  const [color, setColor] = useState<string>("#000000");
  const [savedColors, setSavedColors] = useState<
    { name: string; value: string }[]
  >([]);
  const [saveInput, setSavedInput] = useState<string>("");

  function saveColor(name: string, value: string) {
    setSavedColors((prev) => [{ name, value }, ...prev]);
    setSavedInput("");
  }

  function deleteSavedColor(index: number) {
    setSavedColors((prev) => prev.filter((_item, i) => i !== index));
  }

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Color Picker</h1>
          <p className="opacity-70 mt-3">
            Select and preview colors with hex codes
          </p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-2xl font-semibold">Color Selection</h2>
          <div className="flex mt-10">
            <label htmlFor="color-input">Color Picker:</label>
            <input
              type="color"
              id="color-input"
              color={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-14 w-14"
            />
          </div>
          <div>
            <p>Color Preview:</p>
            <div className={`w-full h-28`} style={{ background: color }}></div>
          </div>
          <label htmlFor="save-color" className="mt-5 block">
            Save to Favorites:
          </label>
          <form
            className="flex gap-5 w-full mt-1"
            onSubmit={(e) => {
              e.preventDefault();
              saveColor(saveInput, color);
            }}
          >
            <input
              required
              type="text"
              id="save-color"
              value={saveInput}
              onChange={(e) => setSavedInput(e.target.value)}
              placeholder="Name your color"
              className="w-full focus:outline-none border px-2 py-1 rounded-md"
            />
            <SimpleButton>Save</SimpleButton>
          </form>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Color Selection</h2>
            <span className="block  rounded-full text-xs px-4 py-1 bg-[#212529]">
              {saveColor.length} save
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {savedColors.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-md"
                  style={{ background: item.value }}
                >
                  <span>{item.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteSavedColor(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task1;
