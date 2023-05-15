import Todo from './todo';
import Project from './project';

export default class TodoFactory {
  constructor(task, project = 'default') {
    this.project = new Project(project);
    this.project.tasks.push(new Todo(task));
  }

  addTodo = (todo) => {
    this.project.tasks.push(new Todo(todo));
  };
}
