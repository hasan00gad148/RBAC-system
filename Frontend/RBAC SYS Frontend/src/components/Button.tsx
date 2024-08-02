import React from 'react';

interface Props {
  name: string;
  className: string;
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const Button: React.FC<Props> = ({ name, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 my-6 border border-green-500 hover:border-transparent rounded ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;