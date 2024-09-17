import { useDispatch, useSelector } from "react-redux";

import { strokesLengthSelector } from "../modules/strokes/slice";
import { undo, redo } from "../modules/historyIndex/slice";

const EditPanel = () => {
  const dispatch = useDispatch();

  const undoLimit = useSelector(strokesLengthSelector);
  const handleUndo = () => dispatch(undo(undoLimit));
  const handleRedo = () => dispatch(redo());

  return (
    <div className="window edit">
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>

      <div className="window-body">
        <div className="field-row">
          <button className="button redo" onClick={handleUndo}>
            Undo
          </button>

          <button className="button undo" onClick={handleRedo}>
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
