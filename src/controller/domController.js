import { formatDistanceToNow, parse } from 'date-fns';
import { todos } from '../model/todoDatabase';
import circleOutline from '../assets/icon/circle-outline.svg';
import deleteIcon from '../assets/icon/delete.svg';
import folderIcon from '../assets/icon/folder-open-outline.svg';

const hookElement = (element) => document.querySelector(element);

const createElement = (element) => document.createElement(element);

const notification = () => {
  hookElement('.notification').classList.remove('hidden');
  setTimeout(() => {
    hookElement('.notification').classList.add('hidden');
  }, 2000);
};

const listTask = (task) => {
  const mainContainer = createElement('div');
  mainContainer.classList.add('bg-gray-100', 'p-2', 'mb-3', 'rounded-md', 'flex', 'gap-2', 'items-center');

  const checkbox = new Image();
  checkbox.src = circleOutline;
  checkbox.classList.add('check', 'h-6', 'w-6', 'cursor-pointer');

  const title = createElement('p');
  title.textContent = task.title;
  title.classList.add('task', 'grow');

  const createdAt = createElement('p');
  const distance = formatDistanceToNow(parse(task.createdAt.toString(), 'yyyy-MM-dd HH:mm:ss', new Date()));
  createdAt.textContent = `Created ${distance} ago`;
  createdAt.classList.add('text-xs');

  const deleteButton = new Image();
  deleteButton.src = deleteIcon;
  deleteButton.classList.add('delete-task', 'h-6', 'w-6', 'cursor-pointer', 'hover:scale-105');

  mainContainer.append(checkbox, title, createdAt, deleteButton);
  return mainContainer;
};

const createProjectElement = (project) => {
  const projectElement = createElement('li');
  const container = createElement('div');
  container.classList.add('item-project', 'flex', 'gap-2', 'w-fit', 'hover:outline', 'w-full', 'rounded-md', 'p-2', 'cursor-pointer');

  const folder = new Image();
  folder.src = folderIcon;
  folder.classList.add('folder', 'h-6', 'w-6', 'cursor-pointer', 'hover:scale-105');

  const deleteButton = new Image();
  deleteButton.src = deleteIcon;
  deleteButton.classList.add('delete-project', 'h-6', 'w-6', 'cursor-pointer', 'hover:scale-105');

  const paragraphElement = createElement('p');
  paragraphElement.textContent = project;
  paragraphElement.classList.add('cursor-pointer', 'w-fit', 'grow', 'item-project');

  container.append(folder, paragraphElement, deleteButton);

  projectElement.append(container);

  return projectElement;
};

function refreshDom() {
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
        if (!task.isCompleted) {
          tasksList.append(listTask(task));
        }
      });
    }
  });
}

export { refreshDom, notification };
