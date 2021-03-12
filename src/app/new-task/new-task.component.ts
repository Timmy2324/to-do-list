import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { PRIORITIES } from '../priorities';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task: Task | undefined;
  tasks: Task[] = [];
  priorities = PRIORITIES;

  newTaskForm: FormGroup;

  constructor(
    private taskService: TaskService,
  ) {
    this.newTaskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      text: new FormControl(''),
    })
  }

  ngOnInit(): void {
  }

  addTask(title: string, priority: string, text?: string) {
    if (!title || !priority) {
      return;
    }
    this.taskService.addTask({ title, priority, text } as Task).subscribe(task => {
      this.tasks.push(task);
    })
  }

  // buttonDisabled(title: string, priority: string): boolean {
  //   if (!title && !priority) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
