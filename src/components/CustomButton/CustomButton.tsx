import React from "react";
import "./CustomButton.css";

interface ButtonPropsType {
  type?: "submit" | "reset" | "button";
  text?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton = ({ type, text, className, onClick }: ButtonPropsType) => {
  return (
    <main>
      <button type={type} onClick={onClick} className={className}>
        {text}
      </button>
    </main>
  );
};

export default CustomButton;
