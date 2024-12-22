import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit'; 
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
  >
    {label}
  </button>
);

export default Button;

