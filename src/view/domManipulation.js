function addProject(todo) {
  const projectList = document.querySelector('.project-list');
  const newProject = document.createElement('li');
  newProject.textContent = todo;
  projectList.append(newProject);
}

function addTask(task) {
  const tasksList = document.querySelector('.tasks-list');
  const newTask = document.createElement('li');
  newTask.textContent = task;
  tasksList.append(newTask);
}

export { addProject, addTask };
