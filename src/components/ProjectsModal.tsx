import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../store";
import { hide } from "../modules/modals/slice";
import { loadProject } from "../modules/strokes/slice";
import {
  getProjectsList,
  projectsListSelector,
} from "../modules/projectsList/slice";

const ProjectsModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projectsList = useSelector(projectsListSelector);

  useEffect(() => {
    dispatch(getProjectsList());
  }, []);

  const onLoadProject = (projectId: string) => {
    dispatch(loadProject(projectId));
    dispatch(hide());
  };

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Load Project</div>

        <div className="title-bar-controls">
          <button aria-label="Close" onClick={() => dispatch(hide())} />
        </div>
      </div>

      <div className="projects-container">
        {(projectsList || []).map((project) => (
          <div
            key={project.id}
            onClick={() => onLoadProject(project.id)}
            className="project-card"
          >
            <img src={project.image} alt="thumbnail" />
            <div>{project.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsModal;
