import { todos } from '../model/todoDatabase';

const hookElement = (element) => document.querySelector(element);

const createElement = (element) => document.createElement(element);

const listTask = (task) => {
  const container = createElement('div');
  container.classList.add('bg-gray-100', 'p-2', 'mb-3', 'flex', 'gap-3', 'rounded-md');

  const title = createElement('p');
  title.textContent = task.title;
  title.classList.add('grow');

  const isCompleted = createElement('p');
  isCompleted.textContent = task.isCompleted;

  const createdAt = createElement('p');
  createdAt.textContent = task.createdAt;

  container.append(title, isCompleted, createdAt);
  return container;
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
