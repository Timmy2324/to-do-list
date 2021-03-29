import { state, trigger, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


import { Task } from '../task';
import { TaskService } from '../task.service';
import { searchPriorities } from './search-priorities';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('filterAnimation', [
      state('small', style({ opacity: 0, visibility: 'hidden' })),
      state('large', style({ opacity: 1, visibility: 'visible' })),
      transition('small <=> large', animate('400ms ease-in'))
    ])
  ],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  initialTasks: Task[];
  priorityColor: string;
  searchValue: string;
  priorities = Object.values(searchPriorities);
  priorityValue: string = 'All';
  collapsed: string = 'small';
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  lowIndex: number = 0;
  highIndex: number = 5;
  pageSizeOptions: number[] = [5, 10, 25];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.initialTasks = tasks;
    });
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
    this.initialTasks = this.initialTasks.filter(t => t !== task);
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

  filterAnimation(): void {
    this.collapsed = (this.collapsed === 'small' ? 'large' : 'small');
  }

  getPaginatorData(event: PageEvent): void {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowIndex = this.lowIndex + event.pageSize;
      this.highIndex = this.highIndex + event.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowIndex = this.lowIndex - event.pageSize;
      this.highIndex = this.highIndex - event.pageSize;
    }
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.highIndex = this.lowIndex + this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  showTasks(lowIndex: number, highIndex: number): Task[] {
    return this.tasks.slice(lowIndex, highIndex);
  }

  filterTasks(title: string, priority: string): void {
    this.tasks = this.initialTasks;
    if (priority === "All") {
      this.tasks = this.tasks.filter(task => task.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    } else {
      this.tasks = this.tasks.filter(task => task.priority.includes(priority));
      this.tasks = this.tasks.filter(task => task.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }
  }

  dischargeFilter(): void {
    this.searchValue = '';
    this.priorityValue = 'All';
    this.tasks = this.initialTasks;
  }
}