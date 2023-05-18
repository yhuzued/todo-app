import { Project, Task } from '../model/project';
import { todos } from '../model/todoDatabase';
import { saveTodoList } from './databaseController';

function insertToProject(task, project) {
  const existProject = todos.database.find((obj) => obj.name === project);
  existProject.tasks.push(new Task(task));
}
function createNewProject(project) {
  const newProject = new Project(project);
  todos.database.push(newProject);
}

function isProjectExist(project) {
  return todos.database.some((obj) => obj.name === project);
}

export default function addTask(task, project = 'Default Folder') {
  if (!isProjectExist(project)) {
    createNewProject(project);
  }

  insertToProject(task, project);
  saveTodoList();
}

export { addTask, createNewProject };
