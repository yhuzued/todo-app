import '../view/style.css';
import { refreshDom } from './domController';
import { getTodoList, isTodoListExist } from './databaseController';
import { addTask, createNewProject } from './todoController';

if (isTodoListExist()) {
  getTodoList();
} else {
  createNewProject('Default Folder');
}

refreshDom();

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id === 'new-task-form') {
    const taskInput = document.querySelector('#task');
    addTask(taskInput.value);
  }

  if (e.target.id === 'new-project-form') {
    const taskInput = document.querySelector('#project');
    createNewProject(taskInput.value);
  }
  refreshDom();
  e.target.reset();
});
