import SimpleButton from "@src/components/SimpleButton";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function Task1() {
  const [threeStars, setThreeStars] = useState<number>(0);
  const [fiveStars, setFiveStars] = useState<number>(0);

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Star Rating Component</h1>
          <p className="opacity-70 mt-3">
            Simple interactive star rating with hover effects
          </p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-2xl font-semibold">Rate This Product</h2>

          <div className="mt-5 flex flex-col gap-2">
            <h3>3-Star Rating:</h3>
            <Stars numbers={3} value={threeStars} updateValue={setThreeStars} />
            {threeStars > 0 && (
              <div>
                <p>You rated:{threeStars}/3</p>
                <SimpleButton
                  handleClick={() => {
                    setThreeStars(0);
                  }}
                >
                  Reset
                </SimpleButton>
              </div>
            )}
          </div>
          <div className="mt-10 flex flex-col gap-2">
            <h3>5-Star Rating:</h3>
            <Stars numbers={5} value={fiveStars} updateValue={setFiveStars} />
            {fiveStars > 0 && (
              <div>
                <p>You rated:{fiveStars}/5</p>
                <SimpleButton
                  handleClick={() => {
                    setFiveStars(0);
                  }}
                >
                  Reset
                </SimpleButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Task1;

function Stars({
  numbers,
  value,
  updateValue,
}: {
  numbers: number;
  value: number;
  updateValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [localFilledStar, setLocalFilledStar] = useState<number>(0);

  return (
    <div
      className="flex items-center w-fit"
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      {Array(numbers)
        .fill(null)
        .map((_item, index) => {
          return (
            <button
              onMouseEnter={() => setLocalFilledStar(index)}
              onClick={() => updateValue(index + 1)}
              key={index}
              className="px-1 cursor-pointer"
            >
              {mouseEnter ? (
                <>
                  {localFilledStar >= index ? (
                    <FaStar className="text-3xl text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-3xl" />
                  )}
                </>
              ) : (
                <>
                  {value < index + 1 ? (
                    <FaRegStar className="text-3xl" />
                  ) : (
                    <FaStar className="text-3xl text-yellow-500" />
                  )}
                </>
              )}
            </button>
          );
        })}
    </div>
  );
}
