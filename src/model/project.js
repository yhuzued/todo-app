import { startOfToday, format } from 'date-fns';

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
    creteadAt: format(startOfToday(), 'dd MM yyyy'),
  };
}

export { Project, Task };
