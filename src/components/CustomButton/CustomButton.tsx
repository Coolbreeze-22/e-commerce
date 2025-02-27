import React from "react";
import "./CustomButton.css";

interface ButtonPropsType {
  text?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton = ({ text, className, onClick }: ButtonPropsType) => {
  return (
    <main>
      <button onClick={onClick} className={className ? className : "btn"}>
        {text}
      </button>
    </main>
  );
};

export default CustomButton;
