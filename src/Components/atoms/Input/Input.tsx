import React from 'react';

interface InputProps {
  placeholder?: string;
  type?: string; // default to 'text', but can be customized
}

const InputAtom: React.FC<InputProps> = ({ placeholder = "Enter text", type = "text" }) => {
  return (
    <input
    className='bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin'
      type={type}
      placeholder={placeholder}
    />
  );
}

export default InputAtom;