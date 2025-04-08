import React from "react";
import "./CustomButton.css";

interface ButtonPropsType {
  type?: "submit" | "reset" | "button";
  text?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;

}

const CustomButton = ({ type, text, className, onClick, disabled, style }: ButtonPropsType) => {
  return (
    <main>
      <button type={type} onClick={onClick} className={className} disabled={disabled} style={style}>
        {text}
      </button>
    </main>
  );
};

export default CustomButton;
