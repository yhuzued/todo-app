import '../style.css';
import { refreshDom } from '../view/domManipulation';
import { getTodoList, isTodoListExist } from './databaseController';
import addTask from './todoController';

const form = document.querySelector('form');
if (isTodoListExist()) {
  getTodoList();
  refreshDom();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.querySelector('#task');
  addTask(taskInput.value);
  form.reset();
});
