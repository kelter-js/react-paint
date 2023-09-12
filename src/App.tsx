import { useEffect, useRef, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawStroke, clearCanvas, setCanvasSize } from "./utils/canvasUtils";
import "./index.css";
import EditPanel from "./shared/EditPanel";
import { ColorPanel } from "./shared/ColorPanel";
import {
  beginStroke,
  endStroke,
  updateStroke,
} from "./modules/currentStroke/actions";
import { strokesSelector } from "./modules/strokes/reducer";
import { currentStrokeSelector } from "./modules/currentStroke/reducer";
import { historyIndexSelector } from "./modules/historyIndex/reducer";

const WIDTH = 1024;
const HEIGHT = 768;

const App = (): JSX.Element => {
  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  }, [historyIndex]);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke(historyIndex, currentStroke));
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    dispatch(updateStroke(offsetX, offsetY));
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
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>

        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>

      <EditPanel />
      <ColorPanel />

      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
};

export default App;
