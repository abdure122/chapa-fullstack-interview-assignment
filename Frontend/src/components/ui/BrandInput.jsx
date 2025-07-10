import React from 'react';


const BrandInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  autoFocus,
  required,
  error,
  onBlur,
}) => (
  <div className="w-full">
    {label && (
      <label className="block mb-1 text-sm font-medium text-brand-primary" htmlFor={name}>
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      autoFocus={autoFocus}
      required={required}
      className={`w-full px-5 py-3 rounded-full border-2 ${error ? 'border-red-500' : 'border-brand-primary'} bg-brand-light text-brand-primary placeholder:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all text-lg font-medium shadow-sm`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <div id={`${name}-error`} className="text-red-500 text-xs mt-1 ml-2">
        {error}
      </div>
    )}
  </div>
);

export default BrandInput;
