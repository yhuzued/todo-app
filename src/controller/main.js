import '../assets/style.css';
import refreshDom from './domController';
import { getTodoList, isTodoListExist, saveTodoList } from './databaseController';
import { addTask, createNewProject } from './todoController';
import circleOutline from '../assets/icon/circle-outline.svg';
import circleCheck from '../assets/icon/check-circle-outline .svg';

const handleProjectItemClick = (e) => {
  if (e.target.classList.contains('item-project')) {
    document.getElementById('title').textContent = e.target.textContent;
    refreshDom();
  }
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
    createNewProject(projectInput.value);
    saveTodoList();
  }

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
  createNewProject('My Day');
}

refreshDom();
