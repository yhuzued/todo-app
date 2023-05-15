import { startOfToday, format } from 'date-fns';

export default function Todo(task) {
  this.title = task;
  this.isCompleted = false;
  this.createdAt = format(startOfToday(), 'dd MM yyyy');
}
