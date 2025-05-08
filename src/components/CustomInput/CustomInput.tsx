import "./CustomInput.css";

interface InputPropsType {
  autoFocus?: boolean;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  checked?: boolean;
  readOnly?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  autoFocus,
  required,
  type,
  name,
  placeholder,
  value,
  checked,
  readOnly,
  className,
  onChange,
  onKeyDown,
}: InputPropsType) => (
  <input
    autoFocus={autoFocus}
    required={required}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    checked={checked}
    readOnly={readOnly}
    className={className}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
);
export default CustomInput;
