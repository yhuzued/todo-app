export default function todoDatabase() {
  const database = [];

  function add(project) {
    database.push(project);
  }

  return { database, add };
}
