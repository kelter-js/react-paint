import { generateRandomValue } from "./generateRandomValue";
import { MIN_COLORS_AMOUNT } from "../constants";

export const generateColors = () => [
  ...new Set(
    new Array(MIN_COLORS_AMOUNT)
      .fill(null)
      .map(
        () =>
          `rgb(${generateRandomValue(0, 255)}, ${generateRandomValue(
            0,
            255
          )}, ${generateRandomValue(0, 255)})`
      )
  ),
];
