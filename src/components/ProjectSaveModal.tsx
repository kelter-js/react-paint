import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

import { hide } from "../modules/modals/slice";
import { getCanvasImage } from "../utils/canvasUtils";
import { useCanvas } from "../CanvasContext";
import { saveProject } from "../modules/strokes/slice";
import getBase64Thumbnail from "../utils/scaler";

const ProjectSaveModal = () => {
  const [projectName, setProjectName] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const canvasRef = useCanvas();

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleHide = () => {
    dispatch(hide());
  };

  const handleProjectSave = async () => {
    const file = await getCanvasImage(canvasRef.current);

    if (file) {
      const thumbnail = await getBase64Thumbnail({ file, scale: 0.1 });

      dispatch(saveProject({ projectName, thumbnail }));
      setProjectName("");
      handleHide();
    }
  };

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Save</div>
      </div>

      <div className="window-body">
        <div className="field-row-stacked">
          <label htmlFor="projectName">Project name</label>

          <input
            id="projectName"
            onChange={handleProjectNameChange}
            type="text"
          />
        </div>

        <div className="field-row">
          <button onClick={handleProjectSave}>Save</button>
          <button onClick={handleHide}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSaveModal;
