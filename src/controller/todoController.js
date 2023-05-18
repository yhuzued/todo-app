import { Project, Task } from '../model/project';
import { todos } from '../model/todoDatabase';
import { saveTodoList } from './databaseController';

function createNewProject(task, project) {
  const newProject = new Project(project);
  newProject.tasks.push(new Task(task));
  todos.database.push(newProject);
}

function insertToProject(task, project) {
  const existProject = todos.database.find((obj) => obj.name === project);
  existProject.tasks.push(new Task(task));
}

function isProjectExist(project) {
  return todos.database.some((obj) => obj.name === project);
}

export default function addTask(task, project = 'Default Folder') {
  if (isProjectExist(project)) {
    insertToProject(task, project);
  } else {
    createNewProject(task, project);
  }
  saveTodoList();
}
