export default function todoDatabase() {
  const database = [];

  function add(project) {
    return database.push(project);
  }

  return { database, add };
}
