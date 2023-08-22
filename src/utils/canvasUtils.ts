export const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const DOUBLE = 2;

export const setCanvasSize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  canvas.width = width * DOUBLE;
  canvas.height = height * DOUBLE;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext("2d")?.scale(DOUBLE, DOUBLE);
};
