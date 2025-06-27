import SimpleButton from "@src/components/SimpleButton";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";

const emojiData: string[] = [
  "😍",
  "😊",
  "😂",
  "🤣",
  "❤️",
  "😒",
  "👌",
  "😘",
  "💕",
];

function Task1() {
  const [value, setValue] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold flex items-center justify-center gap-2">
            <BsEmojiSmile className="text-blue-500" /> Emoji Picker Input
          </h1>
          <p className="opacity-70 mt-3">
            Type text and add emojis with the picker
          </p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <h2 className="text-2xl font-semibold">
            Text Input with Emoji Picker
          </h2>
          <div className="grid grid-cols-[1fr_auto] gap-5 mt-5">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full focus:outline-none border border-white/30 rounded-md px-2 py-1"
              type="text"
            />
            <div className="relative">
              <SimpleButton
                handleClick={() => setShowEmoji((prev) => !prev)}
                className="!p-2"
              >
                <BsEmojiSmile />
              </SimpleButton>
              {showEmoji && (
                <div className="grid grid-cols-3 p-2 bg-[#212529] absolute top-full w-36 border border-white/30 rounded right-0">
                  {emojiData.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setValue((prev) => prev + item);
                        setShowEmoji(false);
                      }}
                      className="p-2 rounded cursor-pointer hover:bg-[#343a40] w-fit"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="py-4 px-3 bg-[#212529]/50 rounded-md mt-5">
            <h3 className="text-lg">Preview:</h3>
            <p>{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task1;
