const fetchProjectsList = () =>
  fetch("http://localhost:4000/projects").then((res) => res.json());

export default fetchProjectsList;
