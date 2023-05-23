import '../assets/style.css';
import { refreshDom, notification } from './domController';
import { getTodoList, isTodoListExist, saveTodoList } from './databaseController';
import {
  addTask, createNewProject, deleteProject, isProjectExist, deleteTask,
} from './todoController';
import circleOutline from '../assets/icon/circle-outline.svg';
import circleCheck from '../assets/icon/check-circle-outline .svg';
import { todos } from '../model/todoDatabase';

const initializeDatabase = () => {
  createNewProject('My Day');
  saveTodoList();
};

const handleProjectItemClick = (e) => {
  if (e.target.classList.contains('item-project')) {
    document.getElementById('title').textContent = e.target.textContent;
  }

  if (e.target.classList.contains('delete-project')) {
    deleteProject(e.target.previousElementSibling.textContent);
  }

  if (e.target.classList.contains('delete-task')) {
    const project = document.querySelector('#title');
    const parentNode = Array.from(e.target.parentNode.children);
    const targetTask = parentNode.find((element) => element.classList.contains('task'));
    deleteTask(project.textContent, targetTask.textContent);
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
  if (e.target.classList.contains('check')) {
    e.target.src = circleCheck;
  }
};

const imageOut = (e) => {
  if (e.target.classList.contains('check')) {
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
