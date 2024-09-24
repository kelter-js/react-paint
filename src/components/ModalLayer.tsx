import { useSelector } from "react-redux";

import { modalNameSelector } from "../modules/modals/slice";
import { MODAL_TYPES } from "../entities/modal";
import ProjectSaveModal from "./ProjectSaveModal";
import ProjectsModal from "./ProjectsModal";

export const ModalLayer = (): JSX.Element | null => {
  const modalName = useSelector(modalNameSelector);

  switch (modalName) {
    case MODAL_TYPES.PROJECTS_MODAL: {
      return <ProjectsModal />;
    }

    case MODAL_TYPES.PROJECTS_SAVE_MODAL: {
      return <ProjectSaveModal />;
    }

    default:
      return null;
  }
};
