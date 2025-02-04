import React, { ChangeEvent,RefCallback } from 'react';

interface Props {
  label?: string;
  name: string;
  type: string;
  placeHolder?: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>)=>void;
  errors?:string;
  className?: string;
  ref?: RefCallback<HTMLInputElement>;
  id?: string;
  pattern?: string;
}

const Input: React.FC<Props> = ({
  label,
  name,
  type,
  placeHolder,
  value,
  onChange,
  errors,
  className = '',
  pattern,
  ref,
  id,
}) => {
  return (
    <>
      <div className={`flex justify-center gap-8 rounded-md items-center my-4 ${className}`}>
        {label ? <label className='p-2 text-lg' htmlFor={id}>{label}</label> : null}
        <input
          id={id}
          name={name}
          ref={ref}
          placeholder={placeHolder}
          className={`h-fit p-2 outline-none rounded-md border-2 border-green-700 bg-slate-100 ${className}`}
          type={type}
          defaultValue={value}
          pattern={pattern}
          onChange={onChange}
        />
      </div>
      {errors ? <span className='text-red-600 font-semibold o-2'>{errors}</span> : null}
    </>
  );
};

export default Input;
