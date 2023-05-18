import { todos } from '../model/todoDatabase';

const key = 'localTodoApp';

function saveTodoList() {
  const stringTodos = JSON.stringify(todos);
  localStorage.setItem(key, stringTodos);
}

function getTodoList() {
  const storedTodoList = JSON.parse(localStorage.getItem(key));
  storedTodoList.database.forEach((project) => {
    todos.database.push(project);
  });
}

function isTodoListExist() {
  return localStorage.getItem(key) !== null;
}

export {
  isTodoListExist, getTodoList, saveTodoList,
};
