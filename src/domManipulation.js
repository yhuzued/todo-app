function addProject(todo) {
  const ul = document.querySelector('.project-list');
  const li = document.createElement('li');
  li.textContent = todo;
  ul.append(li);
}

function addTask(task) {
  const ul = document.querySelector('.tasks-list');
  const li = document.createElement('li');
  li.textContent = task;
  ul.append(li);
}

export { addProject, addTask };
