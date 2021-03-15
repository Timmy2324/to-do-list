import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { searchPriorities } from './search-priorities';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  priorityColor: string;
  searchValue: string;
  priorities = Object.values(searchPriorities);
  searchPriorityValue: string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  public colorPriority(priority: string) {
    switch (priority) {
      case "High": {
        return "red";
      }
      case "Medium": {
        return "grey";
      }
      case "Low": {
        return "green";
      }
      default: {
        return;
      }
    }
  }
}
