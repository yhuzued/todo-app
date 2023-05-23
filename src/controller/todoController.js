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

function createNewProject(project) {
  if (project === '') {
    return;
  }

  const newProject = new Project(project);
  todos.database.push(newProject);
}

function deleteProject(projectName) {
  const project = todos.database.find((prj) => prj.name === projectName);
  const projectIndex = todos.database.indexOf(project);
  todos.database.splice(projectIndex, 1);
}

function deleteTask(projectName, taskName) {
  const project = todos.database.find((prj) => prj.name === projectName);
  const task = project.tasks.find((tsk) => tsk.title === taskName);
  const taskIndex = project.tasks.indexOf(task);

  todos.database.forEach((prj) => {
    if (prj.name === projectName) {
      prj.tasks.splice(taskIndex, 1);
    }
  });
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
  addTask, createNewProject, isProjectExist, deleteProject, deleteTask,
};
