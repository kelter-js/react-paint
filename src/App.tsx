import { useEffect, useRef, MouseEvent } from "react";
import { clearCanvas, setCanvasSize } from "./utils/canvasUtils";
import { useDispatch, useSelector } from "react-redux";
import { beginStroke, endStroke, updateStroke } from "./actions";
import "./index.css";
import { RootState } from "./utils/types";

const WIDTH = 1024;
const HEIGHT = 768;

const App = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };
  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke());
    }
  };

  const isDrawing = useSelector<RootState>(
    (state) => !!state.currentStroke.points.length
  );

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

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>

        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>

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
