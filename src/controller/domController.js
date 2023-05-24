import { formatDistanceToNow, parse } from 'date-fns';
import { todos } from '../model/todoDatabase';
import circleOutline from '../assets/icon/circle-outline.svg';
import deleteIcon from '../assets/icon/delete.svg';
import folderIcon from '../assets/icon/folder-open-outline.svg';
import closeIcon from '../assets/icon/close.svg';
import undo from '../assets/icon/undo.svg';

const hookElement = (element) => document.querySelector(element);

const createElement = (element) => document.createElement(element);

const notification = () => {
  hookElement('.notification').classList.remove('hidden');
  setTimeout(() => {
    hookElement('.notification').classList.add('hidden');
  }, 2000);
};

const textElementGenerator = (text) => {
  const paragraphElement = createElement('p');
  paragraphElement.textContent = text;
  return paragraphElement;
};

const imageElementGenerator = (image) => {
  const createImage = new Image();
  createImage.src = image;
  return createImage;
};

const insertClass = (element, classArray) => {
  classArray.forEach((cls) => {
    element.classList.add(cls);
  });
};

const resetElement = (classListArray) => {
  classListArray.forEach((cls) => {
    const element = hookElement(cls);
    element.innerHTML = '';
  });
};

const listTask = (task) => {
  const checkBoxImage = task.isCompleted ? undo : circleOutline;

  const mainContainer = createElement('div');
  const checkbox = imageElementGenerator(checkBoxImage);
  const title = textElementGenerator(task.title);
  const distance = formatDistanceToNow(parse(task.createdAt.toString(), 'yyyy-MM-dd HH:mm:ss', new Date()));
  const createdAt = textElementGenerator(`Created ${distance} ago`);
  const deleteButton = imageElementGenerator(deleteIcon);

  insertClass(mainContainer, [
    'bg-gray-100',
    'p-2',
    'mb-3',
    'rounded-md',
    'flex',
    'gap-2',
    'items-center',
  ]);

  insertClass(checkbox, [
    'check',
    'h-6',
    'w-6',
    'cursor-pointer',
    'hover:scale-110',
  ]);

  insertClass(title, [
    'task',
    'grow']);
  insertClass(createdAt, ['text-xs']);

  insertClass(deleteButton, [
    'delete-task',
    'h-6',
    'w-6',
    'cursor-pointer',
    'hover:scale-105',
  ]);

  mainContainer.append(checkbox, title, createdAt, deleteButton);
  return mainContainer;
};

const createProjectElement = (project) => {
  const projectElement = createElement('li');

  const container = createElement('div');
  const folder = imageElementGenerator(folderIcon);
  const deleteButton = imageElementGenerator(closeIcon);
  const paragraphElement = textElementGenerator(project);

  insertClass(container, [
    'item-project',
    'flex', 'gap-2',
    'w-fit',
    'hover:outline',
    'w-full',
    'rounded-md',
    'p-2',
    'cursor-pointer',
  ]);

  insertClass(folder, [
    'folder',
    'h-6',
    'w-6',
    'cursor-pointer',
    'hover:scale-105',
  ]);

  insertClass(deleteButton, [
    'delete-project',
    'h-6',
    'w-6',
    'cursor-pointer',
    'hover:scale-110',
  ]);

  insertClass(paragraphElement, [
    'cursor-pointer',
    'w-fit',
    'grow',
    'item-project',
  ]);

  container.append(folder, paragraphElement, deleteButton);
  projectElement.append(container);

  return projectElement;
};

const completedListEmpty = () => hookElement('.completed-tasks').childElementCount === 0;

function refreshDom() {
  resetElement(['.project-list', '.tasks-list', '.completed-tasks']);

  todos.database.forEach((project) => {
    const projectListElement = hookElement('.project-list');
    const projectElement = createProjectElement(project.name);
    projectListElement.append(projectElement);
    const selectedTitle = document.getElementById('title').textContent;

    if (project.name === selectedTitle) {
      project.tasks.forEach((task) => {
        const tasksList = hookElement('.tasks-list');
        const completeTask = hookElement('.completed-tasks');

        if (!task.isCompleted) {
          tasksList.append(listTask(task));
        }

        if (task.isCompleted) {
          completeTask.append(listTask(task));
        }
      });
    }

    if (completedListEmpty()) {
      hookElement('#completed-task-heading').classList.add('hidden');
    } else {
      hookElement('#completed-task-heading').classList.remove('hidden');
    }
  });
}

export { refreshDom, notification };
