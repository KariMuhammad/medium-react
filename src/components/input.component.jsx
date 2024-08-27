import { forwardRef, useState } from "react";

const InputBox = (
  {
    type,
    name,
    value,
    className,
    placeholder,
    id,
    icon,
    errorMessage,
    disabled,
    ...props
  },
  ref
) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible((currentValue) => !currentValue);
  };
  const isCloseEye = !passwordVisible ? "-crossed" : "";

  return (
    <div className="flex flex-col gap-0 mb-2">
      <div className="relative w-full mb-4">
        {/* Input */}
        <input
          type={
            type === "password" ? (passwordVisible ? "text" : "password") : type
          }
          ref={ref}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          id={id}
          disabled={disabled}
          className={`input-box ${className}`}
          {...props}
        />
        {/* Icon */}
        <i className={`fi fi-rr-${icon} input-icon`}></i>

        {type === "password" ? (
          <i
            className={`fi fi-rr-eye${isCloseEye} absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer`}
            onClick={togglePasswordVisible}
          ></i>
        ) : (
          ""
        )}
      </div>

      {errorMessage && <p className="text-red">{errorMessage}</p>}
    </div>
  );
};

export default forwardRef(InputBox);
