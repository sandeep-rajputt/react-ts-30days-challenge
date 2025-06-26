import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const data: { ques: string; ans: string }[] = [
  {
    ques: "What is React?",
    ans: "React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and allows developers to create reusable UI components and manage application state efficiently.",
  },
  {
    ques: "What is useState?",
    ans: "useState is a React Hook that allows you to add state to functional components. It returns an array with the current state value and a function to update it.",
  },
  {
    ques: "What is the difference between props and state?",
    ans: "Props are read-only data passed from parent to child components, while state is mutable data that belongs to a component and can be changed over time using setState or useState.",
  },
  {
    ques: "What is JSX?",
    ans: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets compiled to regular JavaScript function calls.",
  },
  {
    ques: "What are React Hooks?",
    ans: "React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, and more.",
  },
  {
    ques: "What is the Virtual DOM?",
    ans: "The Virtual DOM is a JavaScript representation of the actual DOM. React uses it to optimize rendering by comparing the virtual DOM with the previous version and only updating the parts that changed.",
  },
];

function Task2() {
  const [activeQues, setActiveQues] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveQues((prev) => (index === prev ? null : index));
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-semibold flex items-center justify-center gap-2">
            <FaRegQuestionCircle className="text-blue-500" /> Accordion FAQ
          </h1>
          <p className="opacity-70 mt-3">
            Frequently Asked Questions about React
          </p>
        </div>
        <div className="flex flex-col gap-7 mt-10">
          {data.map((item, index) => (
            <Accordion
              active={index === activeQues}
              handleClick={() => handleClick(index)}
              ques={item.ques}
              ans={item.ans}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task2;

const Accordion = ({
  active,
  handleClick,
  ques,
  ans,
}: {
  active: boolean;
  handleClick: () => void;
  ques: string;
  ans: string;
}) => {
  return (
    <div className="w-full rounded-lg border border-white/30 bg-[#343a40] px-5">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center font-semibold justify-between gap-5 w-full cursor-pointer py-5"
      >
        {ques}
        {active ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {active && <p className="pb-5 opacity-70">{ans}</p>}
    </div>
  );
};
