import SimpleButton from "@src/components/SimpleButton";
import { useState } from "react";

function Task1() {
  const [boxes, setBoxes] = useState<{ bg: string; text: string }[]>([]);

  function generateRandomColor() {
    const colorCodes: string = "0123456789abcdef";
    const randomNumber: () => number = () => {
      return Math.random() * 15;
    };
    const colorCode = Array(6)
      .fill(null)
      .map((): string => {
        return colorCodes[Math.ceil(randomNumber())];
      })
      .toString()
      .replace(/,/g, "");
    if (/^[0-9]/.test(colorCode)) {
      return { text: "white", bg: `#${colorCode}` };
    } else {
      return { text: "black", bg: `#${colorCode}` };
    }
  }

  function generateBox(number: number) {
    for (let i = 0; i < number; i++) {
      setBoxes((prev) => [generateRandomColor(), ...prev]);
    }
  }

  function handleDelete(index: number) {
    setBoxes((prev) => prev.filter((_item, indx) => index !== indx));
  }

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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Interactive Tabs</h2>
            <p className="bg-[#212529] px-2 py-1 rounded-full text-sm font-semibold">
              {boxes.length} boxes
            </p>
          </div>
          <div className="flex items-center gap-5 mt-5">
            <SimpleButton handleClick={() => generateBox(1)}>
              Generate Color
            </SimpleButton>
            <SimpleButton handleClick={() => generateBox(3)}>
              Generate 3 Color
            </SimpleButton>
            <SimpleButton handleClick={() => generateBox(5)}>
              Generate 5 Color
            </SimpleButton>
            <SimpleButton
              handleClick={() => setBoxes([])}
              className="bg-red-500 hover:bg-red-600"
            >
              Clear All
            </SimpleButton>
          </div>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          {boxes.length > 0 ? (
            <div className="flex  gap-5 flex-wrap self-center">
              {boxes.map((item, index) => {
                return (
                  <div
                    style={{ background: item.bg, color: item.text }}
                    className={`w-fit bg-[${item.bg}] flex flex-col items-center gap-5 px-14 rounded-md py-4`}
                  >
                    <p className="text-xl font-semibold">{item.bg}</p>
                    <p className="text-sm">Box : {index + 1}</p>
                    <SimpleButton handleClick={() => handleDelete(index)}>
                      Delete
                    </SimpleButton>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center my-20">
              <p className="flex gap-2">
                Please Click on
                <span className="text-sm bg-[#212529] block px-3 pt-1 pb-1.5 rounded-full">
                  Generate Color
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task1;
