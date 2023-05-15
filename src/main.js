import todoDatabase from './todoDatabase';
import TodoFactory from './todoFactory';
import { addProject as domAddProject, addTask as domAddTask } from './domManipulation';

const form = document.querySelector('form');
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

function addTask(task, project = 'default') {
  if (!isProjectExist(project)) {
    createNewProject(task, project);
  } else {
    insertToProject(task, project);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.querySelector('#task');
  addTask(taskInput.value);
  form.reset();
});
