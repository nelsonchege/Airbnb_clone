"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputsProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formartPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}
const Inputs: React.FC<InputsProps> = ({
  id,
  label,
  type,
  disabled,
  formartPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formartPrice && <BiDollar />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`
            peer
            w-full
            p-4
            pt-6
            font-light
            bg-white
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${formartPrice ? "pl-9" : "pl-4"}
            ${errors[id] ? "border-rose-500" : "border-neutral-300"}
            ${errors[id] ? "focus:border-rose-500" : "focus:border-neutral-300"}
        `}
      />
      <label
        className={`
            absolute
            text-md
            duration-150
            transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            ${formartPrice ? "left-9" : "left-4"}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? "text-rose-500" : "text-zinc-600"}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Inputs;
