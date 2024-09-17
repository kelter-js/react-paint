import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { setStrokeColor } from "../modules/currentStroke/slice";
import { generateColors } from "../utils/generateColors";

const colors = generateColors();

export const ColorPanel = () => {
  const dispatch = useDispatch();

  const handleColorChange = (color: string) => () =>
    dispatch(setStrokeColor(color));

  const renderedColors = useMemo(
    () =>
      colors.map((color: string) => (
        <div
          key={color}
          onClick={handleColorChange(color)}
          className="color"
          style={{ backgroundColor: color }}
        />
      )),
    [colors]
  );

  return (
    <div className="window colors-panel">
      <div className="title-bar">
        <div className="title-bar-text">Colors</div>
      </div>

      <div className="window-body colors">
        <div className="colors-container">{renderedColors}</div>
      </div>
    </div>
  );
};
