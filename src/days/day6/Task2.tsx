import { marked } from "marked";
import { useState } from "react";

function Task2() {
  const [input, setInput] = useState<string>("");
  const htmlContent: string | Promise<string> = marked.parse(input);

  return (
    <div className="flex justify-center py-10">
      <div className="w-6xl px-5">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Markdown Previewer</h1>
          <p className="opacity-70 mt-3">
            Write markdown and see the live preview
          </p>
        </div>
        <div className="w-full grid grid-cols-2 gap-5 rounded-lg border border-white/30 bg-[#343a40] p-5 mt-10">
          <div>
            <h2 className="text-2xl font-semibold">Live Preview</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name="markdowninput"
              id=""
              className="h-[500px] w-full focus:outline-none border rounded-md border-white/20 px-3 py-3"
            ></textarea>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Live Preview</h2>
            <div className="h-[500px] overflow-y-scroll border rounded-md border-white/20 px-3 py-3">
              <div
                className="markdown-preview"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task2;
