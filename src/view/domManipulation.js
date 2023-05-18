import { todos } from '../model/todoDatabase';

function addElementDom(elementClass, projectOrTask) {
  const element = document.querySelector(elementClass);
  const newElement = document.createElement('li');
  newElement.textContent = projectOrTask;
  element.append(newElement);
}

function refreshDom() {
  todos.database.forEach((project) => {
    addElementDom('.project-list', project.name);
    project.tasks.forEach((task) => addElementDom('.tasks-list', task.title));
  });
}

export { addElementDom, refreshDom };
