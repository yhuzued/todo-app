import '../style.css';
import todoDatabase from '../model/todoDatabase';
import TodoFactory from '../model/todoFactory';
import { addProject as domAddProject, addTask as domAddTask } from '../view/domManipulation';

const todos = todoDatabase();

function createNewProject(task, project) {
  const newProject = new TodoFactory(task, project);
  todos.add(newProject);
  domAddProject(project);
  domAddTask(task);
  newProject.addTodo(task);
}

function insertToProject(task, project) {
  const existingProject = todos.database.find((obj) => obj.project.name === project);
  existingProject.addTodo(task);
  domAddTask(task);
  return existingProject;
}

function isProjectExist(project) {
  return todos.database.some((task) => task.project.name === project);
}

function addTask(task, project = 'Default Folder') {
  if (!isProjectExist(project)) {
    createNewProject(task, project);
  } else {
    insertToProject(task, project);
  }
}

export { addTask, todos };
