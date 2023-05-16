import { addTask } from './todoController';

const form = document.querySelector('form');
addTask('Cek rekening koran');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.querySelector('#task');
  addTask(taskInput.value);
  form.reset();
});
