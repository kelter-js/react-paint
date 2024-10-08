import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";

import { getCanvasImage } from "../utils/canvasUtils";
import { useCanvas } from "../CanvasContext";
import { show } from "../modules/modals/slice";
import { MODAL_TYPES } from "../entities/modal";

const FilePanel = () => {
  const canvasRef = useCanvas();

  const dispatch = useDispatch();

  const exportToFile = async () => {
    const file = await getCanvasImage(canvasRef.current);

    if (!file) {
      return;
    }

    saveAs(file, "drawing.png");
  };

  const handleSave = () => dispatch(show(MODAL_TYPES.PROJECTS_SAVE_MODAL));
  const handleLoad = () => dispatch(show(MODAL_TYPES.PROJECTS_MODAL));

  return (
    <div className="window file">
      <div className="title-bar">
        <div className="title-bar-text">File</div>
      </div>

      <div className="window-body">
        <div className="field-row">
          <button className="save-button" onClick={exportToFile}>
            Export
          </button>

          <button className="save-button" onClick={handleSave}>
            Save
          </button>

          <button className="save-button" onClick={handleLoad}>
            Load
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePanel;
