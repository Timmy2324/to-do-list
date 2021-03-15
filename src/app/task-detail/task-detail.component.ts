import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Priorities } from '../priorities';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  priorities = Object.values(Priorities);

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe(task => this.task = task);
  }

  saveTask(): void {
    this.taskService.updateTask(this.task).subscribe();
  }
}
