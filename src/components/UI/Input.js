import React from 'react';

const Input = React.forwardRef(({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  const inputId = `input-${name}`;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          input
          ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
