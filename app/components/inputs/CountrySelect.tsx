import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};
export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getCountries } = useCountries();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getCountries()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-md",
          option: () => "text-md",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}
