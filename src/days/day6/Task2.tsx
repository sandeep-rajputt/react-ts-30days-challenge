import { marked } from "marked";
import { useState } from "react";

const defaultValue =
  '# Welcome to Markdown Previewer \n\nThis is a **live preview** of your markdown content.\n\n## Features\n\n- **Bold text** and *italic text*\n- [Links](https://example.com)\n- `inline code`\n- Code blocks:\n\n```\nfunction hello() {\nconsole.log("Hello, World!");\n}\n```\n\n### Lists\n- Item 1\n- Item 2\n- Item 3\n\n**Try editing the markdown on the left to see the preview update!**';

function Task2() {
  const [input, setInput] = useState<string>(defaultValue);
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
