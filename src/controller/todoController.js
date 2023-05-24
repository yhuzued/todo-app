import { Project, Task } from '../model/project';
import { todos } from '../model/todoDatabase';

function insertToProject(task, project) {
  const existProject = todos.database.find((obj) => obj.name === project);

  if (existProject.tasks.some((tsk) => tsk.title === task)) {
    return;
  }

  if (task === '') {
    return;
  }

  existProject.tasks.push(new Task(task));
}

function findTask(projectObject, taskName) {
  return projectObject.tasks.find((tsk) => tsk.title === taskName);
}

function findProject(projectName) {
  return todos.database.find((prj) => prj.name === projectName);
}

function createNewProject(project) {
  if (project === '') {
    return;
  }

  const newProject = new Project(project);
  todos.database.push(newProject);
}

function deleteProject(projectName) {
  const project = findProject(projectName);
  const projectIndex = todos.database.indexOf(project);
  todos.database.splice(projectIndex, 1);
}

function deleteTask(projectName, taskName) {
  const project = findProject(projectName);
  const task = findTask(project, taskName);
  const projectIndex = todos.database.indexOf(project);
  const taskIndex = project.tasks.indexOf(task);

  todos.database[projectIndex].tasks.splice(taskIndex, 1);
}

function changeTaskStatus(projectName, taskName) {
  const project = findProject(projectName);
  const task = findTask(project, taskName);
  const projectIndex = todos.database.indexOf(project);
  const taskIndex = project.tasks.indexOf(task);
  const projectStatus = todos.database[projectIndex].tasks[taskIndex].isCompleted;

  todos.database[projectIndex].tasks[taskIndex].isCompleted = !projectStatus;
}

function isProjectExist(project) {
  return todos.database.some((obj) => obj.name === project);
}

export default function addTask(task, project = 'My Day') {
  if (!isProjectExist(project)) {
    createNewProject(project);
  }

  insertToProject(task, project);
}

export {
  addTask, createNewProject, isProjectExist, deleteProject, deleteTask, changeTaskStatus,
};
