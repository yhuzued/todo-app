import todoDatabase from './todoDatabase';
import TodoFactory from './todoFactory';
import { addProject as domAddProject, addTask as domAddTask } from './domManipulation';

const form = document.querySelector('form');
const todos = todoDatabase();

function isProjectExist(todo) {
  return todos.database.some((task) => task.project.name === todo);
}

function addTask(task, project = 'default') {
  if (!isProjectExist(project)) {
    const newProject = new TodoFactory(task, project);
    todos.add(newProject);
    domAddProject(project);
    domAddTask(task);
    newProject.addTodo(task);
    return newProject;
  }

  const todosExist = todos.database.find((obj) => obj.project.name === project);
  todosExist.addTodo(task);
  domAddTask(task);
  return todosExist;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskform = document.querySelector('#task');
  addTask(taskform.value);
  form.reset();
});
