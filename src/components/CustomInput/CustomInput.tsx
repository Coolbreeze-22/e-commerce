import "./CustomInput.css";

interface InputPropsType {
  autoFocus?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  autoFocus,
  type,
  name,
  placeholder,
  value,
  className,
  onChange,
}: InputPropsType) => (
  <input
    autoFocus={autoFocus}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    className={className}
    onChange={onChange}
  />
);
export default CustomInput;
