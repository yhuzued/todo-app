import { formatDistanceToNow, parse } from 'date-fns';
import { todos } from '../model/todoDatabase';
import circleOutline from '../assets/icon/circle-outline.svg';

const hookElement = (element) => document.querySelector(element);

const createElement = (element) => document.createElement(element);

const listTask = (task) => {
  const mainContainer = createElement('div');
  mainContainer.classList.add('bg-gray-100', 'p-2', 'mb-3', 'rounded-md', 'flex', 'gap-2', 'items-center');

  const checkbox = new Image();
  checkbox.src = circleOutline;
  checkbox.classList.add('check', 'h-6', 'w-6', 'cursor-pointer');

  const title = createElement('p');
  title.textContent = task.title;
  title.classList.add('grow');

  const createdAt = createElement('p');
  const distance = formatDistanceToNow(parse(task.createdAt.toString(), 'yyyy-MM-dd HH:mm:ss', new Date()));
  createdAt.textContent = `Created ${distance} ago`;
  createdAt.classList.add('text-xs');

  const deleteButton = createElement('p');
  deleteButton.textContent = 'X';

  mainContainer.append(checkbox, title, createdAt, deleteButton);
  return mainContainer;
};

const createProjectElement = (project) => {
  const projectElement = document.createElement('li');
  const paragraphElement = document.createElement('p');

  paragraphElement.textContent = project;
  paragraphElement.classList.add('cursor-pointer', 'w-fit', 'item-project');
  projectElement.append(paragraphElement);

  return projectElement;
};

export default function refreshDom() {
  const projectListElement = hookElement('.project-list');
  const tasksListElement = hookElement('.tasks-list');
  projectListElement.innerHTML = '';
  tasksListElement.innerHTML = '';

  todos.database.forEach((project) => {
    const projectElement = createProjectElement(project.name);
    projectListElement.append(projectElement);

    const selectedTitle = document.getElementById('title').textContent;
    if (project.name === selectedTitle) {
      project.tasks.forEach((task) => {
        const tasksList = hookElement('.tasks-list');
        tasksList.append(listTask(task));
      });
    }
  });
}
