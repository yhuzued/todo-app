import '../view/style.css';
import { refreshDom } from './domController';
import { getTodoList, isTodoListExist } from './databaseController';
import { addTask, createNewProject } from './todoController';

if (isTodoListExist()) {
  getTodoList();
} else {
  createNewProject('My Day');
}

refreshDom();

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('item-project')) {
    document.getElementById('title').textContent = e.target.textContent;
    refreshDom();
  }
});

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id === 'new-task-form') {
    const taskInput = document.querySelector('#task');
    const project = document.getElementById('title');
    addTask(taskInput.value, project.textContent);
  }

  if (e.target.id === 'new-project-form') {
    const taskInput = document.querySelector('#project');
    createNewProject(taskInput.value);
  }
  refreshDom();
  e.target.reset();
});
