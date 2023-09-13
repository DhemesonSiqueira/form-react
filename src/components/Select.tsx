import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  placeholder: string;
  helperText?: string;
  label?: string;
  listOptions: string[];
  field: {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
    name: string;
  };
  handleOnChange?: (value: React.FocusEvent<HTMLButtonElement>) => void;
}

const SelectField = ({
  placeholder,
  helperText = "",
  label,
  listOptions,
  field,
  handleOnChange,
}: SelectProps) => {
  return (
    <div className="w-11/12 max-w-xl flex flex-col gap-2 text-sm text-slate-500">
      <label> {label} </label>

      <Select onValueChange={field.onChange}>
        <SelectTrigger
          onBlur={(event) => {
            if (!handleOnChange) {
              return;
            }

            handleOnChange(event);
          }}
          className={`h-14 ${
            helperText && "border-2 border-red-500 outline-red-500"
          }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {listOptions.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-red-500 text-xs">{helperText}</span>
    </div>
  );
};

export default SelectField;
