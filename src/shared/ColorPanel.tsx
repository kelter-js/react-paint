import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { setStrokeColor } from "../modules/currentStroke/slice";

const COLORS: string[] = [];

const rand = (start: number, end: number) => {
  return ~~(Math.random() * (end - start)) + start;
};

while (COLORS.length < 1000) {
  COLORS.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
}

export const ColorPanel = () => {
  const dispatch = useDispatch();

  const onColorChange = (color: string) => {
    dispatch(setStrokeColor(color));
  };

  const renderedColors = useMemo(
    () =>
      COLORS.map((color: string) => (
        <div
          key={color}
          onClick={() => {
            onColorChange(color);
          }}
          className="color"
          style={{ backgroundColor: color }}
        />
      )),
    [COLORS]
  );

  return (
    <div className="window colors-panel">
      <div className="title-bar">
        <div className="title-bar-text">Colors</div>
      </div>

      <div className="window-body colors">{renderedColors}</div>
    </div>
  );
};
