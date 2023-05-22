import '../assets/style.css';
import refreshDom from './domController';
import { getTodoList, isTodoListExist, saveTodoList } from './databaseController';
import { addTask, createNewProject } from './todoController';

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

document.addEventListener('click', handleProjectItemClick);
document.addEventListener('submit', handleFormSubmit);

if (isTodoListExist()) {
  getTodoList();
} else {
  createNewProject('My Day');
}

refreshDom();
