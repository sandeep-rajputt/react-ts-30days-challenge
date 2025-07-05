import SimpleButton from "@src/components/SimpleButton";
import { useEffect, useRef, useState } from "react";

function Task3() {
  const targetElement = useRef(null);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<string[]>([]);
  const maxLimit = 50;

  function loadMore() {
    setLoadingPost(true);

    // fake api time
    setTimeout(() => {
      setPosts((prevPosts) => {
        const newPosts = Array(10)
          .fill(null)
          .map((_item, index) => String(index + prevPosts.length + 1));
        return [...prevPosts, ...newPosts];
      });

      setLoadingPost(false);
    }, 500);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingPost) {
        loadMore();
      }
    });
    if (targetElement.current) {
      observer.observe(targetElement.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [posts, loadingPost]);

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Infinite Scroll Feed</h1>
          <p className="opacity-70 mt-3">
            Social feed that loads more posts as you scroll
          </p>
        </div>
        <div className="w-full rounded-lg border flex items-center justify-between border-white/30 bg-[#343a40] p-5 mt-10">
          <p className="text-sm font-semibold bg-[#212529] w-fit px-3 py-1 rounded-full">
            {posts.length} posts loaded
          </p>
          <SimpleButton
            handleClick={() => {
              setPosts(() => []);
              setLoadingPost(false);
            }}
          >
            Reset Feed
          </SimpleButton>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {posts.map((item, index) => {
            return (
              <div className="bg-[#343a40] p-5 rounded-md" key={index}>
                <h2 className="text-lg font-semibold">Post Title {item}</h2>
                <p className="text-sm mt-3">
                  This is the content for post number {item}. It contains some
                  interesting information about various topics and demonstrates
                  how infinite scroll works with dynamic content loading.
                </p>
              </div>
            );
          })}
        </div>
        {posts.length < maxLimit ? (
          <div ref={targetElement} className="text-center my-10 ">
            Loading...
          </div>
        ) : (
          <div>
            <div className="text-center my-10 ">You reached the end</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task3;
