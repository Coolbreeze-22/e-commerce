import "./CustomInput.css";

interface InputPropsType {
  autoFocus?: boolean;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  autoFocus,
  required,
  type,
  name,
  placeholder,
  value,
  className,
  onChange,
}: InputPropsType) => (
  <input
    autoFocus={autoFocus}
    required={required}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    className={className}
    onChange={onChange}
  />
);
export default CustomInput;
