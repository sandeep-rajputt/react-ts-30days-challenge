import SimpleButton from "@src/components/SimpleButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";

const carouselData: { name: string; image: string }[] = [
  { name: "SunShine", image: "https://wallpapercave.com/wp/wp7826742.jpg" },
  { name: "Night View", image: "https://wallpapercave.com/wp/wp12025797.jpg" },
  { name: "Mountains", image: "https://wallpapercave.com/wp/wp3137838.jpg" },
  { name: "Earth", image: "https://wallpapercave.com/wp/wp3137840.jpg" },
  { name: "City View", image: "https://wallpapercave.com/wp/wp3137839.jpg" },
];

function Task2() {
  const [selected, setSelected] = useState<number>(1);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  function NextImage() {
    if (selected === carouselData.length) {
      setSelected((_prev) => 1);
    } else {
      setSelected((prev) => prev + 1);
    }
  }

  function PreviousImage() {
    if (selected === 1) {
      setSelected(carouselData.length);
    } else {
      setSelected((prev) => prev - 1);
    }
  }

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        NextImage();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [autoPlay, selected]);

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Image Carousel</h1>
          <p className="opacity-70 mt-3">
            Simple image slider with navigation and auto-slide
          </p>
          <p className="opacity-50">
            💡 Use arrow keys to navigate, spacebar to pause/play
          </p>
        </div>
        <div className="w-full rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Image Carousel Demo</h2>
            <div className="flex items-center gap-5">
              <p>
                {selected}/{carouselData.length}
              </p>
              <SimpleButton
                className="!flex items-center justify-center"
                handleClick={() => setAutoPlay((prev) => !prev)}
              >
                {autoPlay ? (
                  <>
                    <IoIosPause className="mt-0.5" />
                    Pause
                  </>
                ) : (
                  <>
                    <FaPlay className="mt-0.5" />
                    Play
                  </>
                )}
              </SimpleButton>
            </div>
          </div>

          <div className="mt-5">
            <div className="w-full relative h-72 flex items-center justify-center overflow-hidden">
              <SimpleButton
                handleClick={PreviousImage}
                className="absolute top-1/2 left-1 !bg-[#212529] py-2 transform -translate-y-1/2"
              >
                <FaChevronLeft />
              </SimpleButton>
              <SimpleButton
                handleClick={NextImage}
                className="absolute top-1/2 right-1 !bg-[#212529] py-2 transform -translate-y-1/2"
              >
                <FaChevronRight />
              </SimpleButton>
              <p className="bg-white/50 text-black absolute bottom-1 left-1 px-4 py-2 text-lg font-semibold">
                {carouselData[selected - 1].name}
              </p>
              <img src={carouselData[selected - 1].image} alt="SunShine" />
            </div>
            <div className="mt-5 flex flex-col items-center justify-center">
              <p className="text-lg font-semibold">
                {carouselData[selected - 1].name}
              </p>
              <p>
                Image {selected}/{carouselData.length}
              </p>
              <div className="mt-2 flex gap-2">
                {carouselData.map((_item, index) => {
                  return (
                    <div
                      onClick={() => setSelected(index + 1)}
                      className={`w-3 h-3 cursor-pointer rounded-full bg-[#212529] ${
                        selected === index + 1 ? "bg-white" : "bg-[#212529]"
                      }`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task2;
