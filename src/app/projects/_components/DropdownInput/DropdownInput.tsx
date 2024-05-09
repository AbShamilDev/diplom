import { FC } from "react";
import * as SC from "./DropdownInput.style";

interface Props {
  options: string[];
  onChange: (value: string) => void;
}

const DropdownInput: FC<Props> = ({ options, onChange }) => {
  return (
    <SC.Select onChange={(ev) => onChange(ev.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </SC.Select>
  );
};

export default DropdownInput;
