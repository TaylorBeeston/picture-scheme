import React, { FC } from "react";

import { Color } from "../types/colors";

const ColorSchemeInput: FC<{
  colors: Color[];
  setColors: React.Dispatch<Color[]>;
}> = ({ colors, setColors }) => {
  const inputs = Array(8)
    .fill(0)
    .map((_, index) => (
      <input
        type="color"
        onChange={(e) => {
          const newColors = [...colors];
          newColors[index] = e.target.value;
          setColors(newColors);
        }}
        value={colors[index] ?? "#000000"}
      />
    ));
  return <div className="flex justify-center">{inputs}</div>;
};

export default ColorSchemeInput;
