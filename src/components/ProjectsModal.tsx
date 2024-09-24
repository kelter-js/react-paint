import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProjectsList,
  projectsListSelector,
} from "../modules/projectsList/slice";
import { loadProject } from "../modules/strokes/slice";
import { hide } from "../modules/modals/slice";
import { AppDispatch } from "../store";

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

  const handleLoadProject = (id: string) => () => onLoadProject(id);

  const handleCloseModal = () => dispatch(hide());

  const projectsView = useMemo(() => {
    if (projectsList) {
      return projectsList.map((project) => (
        <div
          key={project.id}
          onClick={handleLoadProject(project.id)}
          className="project-card"
        >
          <img src={project.image} alt="thumbnail" />
          <div>{project.name}</div>
        </div>
      ));
    }

    return [];
  }, [projectsList, onLoadProject]);

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Load Project</div>

        <div className="title-bar-controls">
          <button aria-label="Close" onClick={handleCloseModal} />
        </div>
      </div>

      <div className="projects-container">{projectsView}</div>
    </div>
  );
};

export default ProjectsModal;
