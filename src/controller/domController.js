import { todos } from '../model/todoDatabase';

function addElementDom(elementClass, projectOrTask) {
  const element = document.querySelector(elementClass);
  const newElement = document.createElement('li');
  const paragraph = document.createElement('p');
  paragraph.textContent = projectOrTask;
  if (elementClass === '.project-list') {
    paragraph.classList.add('cursor-pointer', 'w-fit', 'item-project');
  }
  newElement.append(paragraph);
  element.append(newElement);
}

function refreshDom() {
  document.querySelector('.project-list').innerHTML = '';
  document.querySelector('.tasks-list').innerHTML = '';

  todos.database.forEach((project) => {
    addElementDom('.project-list', project.name);
    project.tasks.forEach((task) => {
      const title = document.getElementById('title').textContent;
      if (project.name === title) {
        addElementDom('.tasks-list', task.title);
      }
    });
  });
}

export { addElementDom, refreshDom };
