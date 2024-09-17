import { useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { drawStroke, clearCanvas, setCanvasSize } from "./utils/canvasUtils";
import { beginStroke, updateStroke } from "./modules/currentStroke/slice";
import { currentStrokeSelector } from "./modules/currentStroke/slice";
import { historyIndexSelector } from "./modules/historyIndex/slice";
import { strokesSelector } from "./modules/strokes/slice";
import { ModalLayer } from "./components/ModalLayer";
import { endStroke } from "./modules/sharedActions";
import { ColorPanel } from "./shared/ColorPanel";
import { useCanvas } from "./CanvasContext";
import { HEIGHT, WIDTH } from "./constants";
import FilePanel from "./shared/FilePanel";
import EditPanel from "./shared/EditPanel";
import "./index.css";

const App = (): JSX.Element => {
  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;

  const canvasRef = useCanvas();

  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();

    if (!context || !canvas) {
      return;
    }

    requestAnimationFrame(() => {
      clearCanvas(canvas);

      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  }, [historyIndex, strokes]);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ historyIndex, stroke: currentStroke }));
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    dispatch(updateStroke({ x: offsetX, y: offsetY }));
  };

  const dispatch = useDispatch();

  const getCanvasWithContext = (canvas = canvasRef.current) => ({
    canvas,
    context: canvas?.getContext("2d"),
  });

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();

    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, []);

  useEffect(() => {
    const { context } = getCanvasWithContext();

    if (!context) {
      return;
    }

    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    );
  }, [currentStroke]);

  return (
    <div className="window main-container">
      <div className="title-bar">
        <div className="title-bar-text">Paint</div>

        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>

      <div className="controls-container">
        <EditPanel />
        <FilePanel />
      </div>

      <ColorPanel />

      <ModalLayer />

      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        width="94"
        height="120"
        ref={canvasRef}
      />
    </div>
  );
};

export default App;
