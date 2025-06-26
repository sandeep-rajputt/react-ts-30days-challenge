import { useState } from "react";
import { BsLightningCharge } from "react-icons/bs";
import { RiResetLeftLine } from "react-icons/ri";

type PreDefinedStepSize = 1 | 2 | 5 | 10 | 25 | 50 | 100;
const preDefineSteps: [1, 2, 5, 10, 25, 50, 100] = [1, 2, 5, 10, 25, 50, 100];

function Task1() {
  const [value, setValue] = useState<number>(0);
  const [customStep, setCustomStep] = useState<string>("");
  const [useCustomStep, setUseCustomStep] = useState(false);
  const [preDefinedStepSize, setPreDefiedStepSize] =
    useState<PreDefinedStepSize>(1);

  const Increase = () => {
    if (useCustomStep) {
      setValue((prev) => prev + Number(customStep));
    } else {
      setValue((prev) => prev + Number(preDefinedStepSize));
    }
  };

  const Decrease = () => {
    if (useCustomStep) {
      setValue((prev) => prev - Number(customStep));
    } else {
      setValue((prev) => prev - Number(preDefinedStepSize));
    }
  };

  const Reset = () => {
    setValue(0);
  };

  return (
    <div
      className="flex justify-center pb-10"
      onKeyDown={(e) => {
        if (e.key === "-" || e.key === "ArrowDown") {
          Decrease();
        } else if (e.key === "+" || e.key === "ArrowUp") {
          Increase();
        } else if (e.key === "r") {
          Reset();
        }
      }}
      tabIndex={0}
    >
      <div className="w-2xl ">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-semibold ">Counter with Step Control</h1>
          <p className="opacity-70 mt-5">
            Increment, decrement, and reset with customizable step sizes
          </p>
          <p className="opacity-50">
            💡 Tip: Use keyboard arrows (↑↓), +/- keys, or 'R' to reset
          </p>
        </div>
        <div className="bg-[#343a40] flex flex-col gap-6 items-center justify-center py-10 border-2 border-white/30 rounded-xl mt-10">
          <h2
            className={`font-extrabold text-7xl ${
              value === 0
                ? "text-[#f8f9fa]"
                : value > 0
                ? "text-[#69db7c]"
                : "text-[#ff6b6b]"
            }`}
          >
            {value}
          </h2>
          <div className="flex">
            <p className="bg-[#343a40]/60 px-3 py-1 text-sm rounded-full">
              Current Step: {useCustomStep ? customStep : preDefinedStepSize}
            </p>
            {useCustomStep && (
              <p className="flex items-center px-3 py-1 text-sm rounded-full gap-2 border border-white/30">
                <BsLightningCharge />
                Custom
              </p>
            )}
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={Decrease}
              className="px-5 py-3 border-red-500/30 block border-2 text-red-500 hover:bg-red-500/10 cursor-pointer rounded-full"
            >
              -
            </button>
            <button
              onClick={Reset}
              className="flex items-center justify-center gap-3 px-3 py-3 rounded-lg cursor-pointer hover:scale-105 border-2 border-white/30"
            >
              <RiResetLeftLine /> Reset
            </button>
            <button
              onClick={Increase}
              className="px-5 py-3 border-green-500/30 block border-2 text-green-500 hover:bg-green-500/10 cursor-pointer rounded-full"
            >
              +
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="bg-[#343a40] p-5 rounded-md">
            <h3>Step Size</h3>
            <div className={"flex flex-col mt-7"}>
              <label htmlFor="chooseStepSize">Choose step size:</label>
              <select
                name="chooseStepSize"
                id="chooseStepSize"
                className="border border-white/30 px-2 py-1 rounded mt-1 bg-[#343a40]"
                value={preDefinedStepSize}
                onChange={(e) => {
                  setPreDefiedStepSize(
                    Number(e.target.value) as PreDefinedStepSize
                  );
                  setUseCustomStep(false);
                }}
              >
                {preDefineSteps.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className={"flex flex-col mt-5"}>
              <label htmlFor="quickselect">Quick select:</label>
              <div className="flex gap-2 mt-1">
                {preDefineSteps.map((item, index) => (
                  <button
                    className={`border border-white/30 px-2 py-1 rounded-md cursor-pointer ${
                      preDefinedStepSize === item && "bg-white text-black"
                    }`}
                    key={index}
                    onClick={() => {
                      setPreDefiedStepSize(item);
                      setUseCustomStep(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#343a40] p-5 rounded-md">
            <h3>Custom Step</h3>
            <div className={"flex flex-col mt-7"}>
              <label htmlFor="chooseStepSize">Choose step size:</label>
              <input
                type="text"
                value={customStep}
                className="border border-white/30 px-2 py-1 rounded mt-1 bg-[#343a40] focus:outline-none"
                placeholder="Enter a number"
                onChange={(e) => {
                  const numValue = e.target.value.replace(/[^0-9]/g, "");
                  setCustomStep(numValue);
                  if (numValue.length > 0) {
                    setUseCustomStep(true);
                  } else {
                    setUseCustomStep(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task1;
