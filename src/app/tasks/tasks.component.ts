import { state, trigger, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


import { Task } from '../task';
import { TaskService } from '../task.service';
import { searchPriorities } from './search-priorities';

interface SortParam {
  name: string;
  sortFunc: (a: Task, b: Task) => number;
  isSorted: boolean;
}

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
  startIndex: number = 0;
  endIndex: number = 5;
  pageSizeOptions: number[] = [5, 10, 25];

  public sortParams: SortParam[] = [
    {
      sortFunc: (task1: Task, task2: Task): number => {
        return task1.id - task2.id;
      },
      isSorted: true,
      name: 'Идентификатор',
    },
    {
      sortFunc: (task1: Task, task2: Task): number => {
        if (task1.title.toLocaleLowerCase() > task2.title.toLocaleLowerCase()) {
          return 1;
        }
        if (task1.title.toLocaleLowerCase() < task2.title.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      },
      isSorted: false,
      name: 'Заголовок',
    },
    {
      sortFunc: (task1: Task, task2: Task): number => {
        return this.getPriority(task1.priority) - this.getPriority(task2.priority);
      },
      isSorted: false,
      name: 'Приоритет',
    }
  ];

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
      this.startIndex = this.startIndex + event.pageSize;
      this.endIndex = this.endIndex + event.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.startIndex = this.startIndex - event.pageSize;
      this.endIndex = this.endIndex - event.pageSize;
    }
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.endIndex = this.startIndex + this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  showTasks(startIndex: number, endIndex: number): Task[] {
    return this.tasks.slice(startIndex, endIndex);
  }

  filterTasks(title: string, priority: string): void {
    this.tasks = this.initialTasks;
    if (title === undefined) {
      if (priority === "All") {
        return;
      }
      this.tasks = this.tasks.filter(task => task.priority.includes(priority));
    }
    else if (priority === "All") {
      this.tasks = this.tasks.filter(task => task.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }
    else {
      this.tasks = this.tasks.filter(task => task.priority.includes(priority));
      this.tasks = this.tasks.filter(task => task.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }
  }

  dischargeFilter(): void {
    this.searchValue = '';
    this.priorityValue = 'All';
    this.tasks = this.initialTasks;
  }

  sortByParam(sortParam: SortParam): void {
    if (sortParam.isSorted) {
      this.tasks = this.tasks.reverse();
      return;
    }
    this.tasks = this.tasks.sort(sortParam.sortFunc);
    this.sortParams.forEach((param) => {
      param.isSorted = false;
    });
    sortParam.isSorted = true;
  }

  getPriority(priority: string) {
    switch (priority) {
      case 'High': {
        return 3;
      }
      case 'Medium': {
        return 2;
      }
      case 'Low': {
        return 1;
      }
      default: {
        return 0;
      }
    }
  }
}