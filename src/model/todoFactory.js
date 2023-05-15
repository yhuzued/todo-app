import Todo from './todo';
import Project from './project';

export default class TodoFactory {
  constructor(task, project) {
    this.task = task;
    this.project = new Project(project);
  }

  addTodo = (todo) => {
    this.project.tasks.push(new Todo(todo));
  };
}
