import { format } from 'date-fns';

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

function Task(title) {
  return {
    title,
    isCompleted: false,
    createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  };
}

export { Project, Task };
