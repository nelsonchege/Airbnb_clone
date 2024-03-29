"use client";

import { IconType } from "react-icons";

type CategoryInputProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

export default function CategoryInput({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3  hover:border-rose-400 transition cursor-pointer ${
        selected ? "border-rose-500" : "border-neutral-200"
      }`}
    >
      <Icon size={26} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}
