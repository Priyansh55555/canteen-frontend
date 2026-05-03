import React, { useId } from 'react';

const Checkbox = ({ state, setState, label, disabled = false, ...props }) => {
  const id = useId();

  return (
    <div className={`flex items-center gap-2 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <input
        {...props}
        id={id}
        type="checkbox"
        checked={state}
        disabled={disabled}
        onChange={(e) => {
          if (!disabled) setState(e.target.checked);
        }}
        className="hidden"
      />

      <label
        htmlFor={id}
        className={`w-9 h-5 relative rounded-full flex items-center transition-all duration-300
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          ${state ? "bg-black" : "bg-gray-300"}
        `}
      >
        <div
          className={`w-5 h-5 absolute top-1/2 -translate-y-1/2 border border-gray-200 transition-all duration-300
            ${state ? "translate-x-4" : "translate-x-0"}
            bg-white rounded-full
          `}
        ></div>
      </label>

      {label && (
        <label
          htmlFor={id}
          className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} select-none`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;