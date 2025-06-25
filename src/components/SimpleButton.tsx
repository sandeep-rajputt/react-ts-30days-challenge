import React from "react";

function SimpleButton({
  children,
  className = "",
  handleClick = () => {},
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex font-semibold items-center justify-center gap-2 border-2 ${
        disabled ? "cursor-default" : "cursor-pointer"
      }  border-white/30 hover:bg-[#212529] bg-[#212529]/50 px-2 py-1 rounded ${className}`}
      disabled={disabled}
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
}

export default SimpleButton;
