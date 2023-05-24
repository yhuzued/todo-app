import '../assets/style.css';
import { refreshDom, notification } from './domController';
import { getTodoList, isTodoListExist, saveTodoList } from './databaseController';
import {
  addTask, createNewProject, deleteProject, isProjectExist, deleteTask, changeTaskStatus,
} from './todoController';
import { todos } from '../model/todoDatabase';
import circleOutline from '../assets/icon/circle-outline.svg';
import circleCheck from '../assets/icon/check-circle-outline .svg';

const initializeDatabase = () => {
  createNewProject('My Day');
  saveTodoList();
};

const handleProjectItemClick = (e) => {
  const project = document.querySelector('#title');
  const parentNode = Array.from(e.target.parentNode.children);
  const targetTask = parentNode.find((element) => element.classList.contains('task'));

  if (e.target.classList.contains('item-project')) {
    document.getElementById('title').textContent = e.target.textContent;
  }

  if (e.target.classList.contains('delete-project')) {
    deleteProject(e.target.previousElementSibling.textContent);
  }

  if (e.target.classList.contains('delete-task')) {
    deleteTask(project.textContent, targetTask.textContent);
  }

  if (e.target.classList.contains('check')) {
    changeTaskStatus(project.textContent, targetTask.textContent);
  }

  if (todos.database.length === 0) {
    initializeDatabase();
  }

  saveTodoList();
  refreshDom();
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  if (e.target.id === 'new-task-form') {
    const taskInput = document.querySelector('#task');
    const project = document.getElementById('title');
    addTask(taskInput.value, project.textContent);
  }

  if (e.target.id === 'new-project-form') {
    const projectInput = document.querySelector('#project');
    if (!isProjectExist(projectInput.value)) {
      createNewProject(projectInput.value);
    } else {
      notification();
    }
  }

  saveTodoList();
  refreshDom();
  e.target.reset();
};

const imageOver = (e) => {
  const grandparentNode = e.target.parentNode.parentNode;
  if (e.target.classList.contains('check') && grandparentNode.classList.contains('tasks-list')) {
    e.target.src = circleCheck;
  }
};

const imageOut = (e) => {
  const grandparentNode = e.target.parentNode.parentNode;
  if (e.target.classList.contains('check') && grandparentNode.classList.contains('tasks-list')) {
    e.target.src = circleOutline;
  }
};

document.addEventListener('click', handleProjectItemClick);
document.addEventListener('submit', handleFormSubmit);
document.addEventListener('mouseover', imageOver);
document.addEventListener('mouseout', imageOut);

if (isTodoListExist()) {
  getTodoList();
} else {
  initializeDatabase();
}

refreshDom();
