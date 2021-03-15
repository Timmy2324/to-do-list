import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'priorityFilter'
})
export class PriorityFilterPipe implements PipeTransform {

  transform(Tasks: Task[], searchPriorityValue: string): Task[] {
    if (!Tasks || !searchPriorityValue) {
      return Tasks;
    }
    if (searchPriorityValue === "All") {
      return Tasks;
    }
    return Tasks.filter(task => task.priority.toLocaleLowerCase().includes(searchPriorityValue.toLocaleLowerCase()));
  }

}
