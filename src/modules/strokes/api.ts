import { Stroke } from "../../types";

const newProject = (name: string, strokes: Stroke[], image: string) =>
  fetch("http://localhost:4000/projects/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      strokes,
      image,
    }),
  }).then((res) => res.json());

export default newProject;

export const getProject = (projectId: string) => {
  return fetch(`http://localhost:4000/projects/${projectId}`).then((res) =>
    res.json()
  );
};
