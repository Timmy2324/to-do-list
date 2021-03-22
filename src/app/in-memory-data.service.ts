import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  constructor() { }

  createDb() {
    const tasks = [
      { id: 1, title: "Заголовок1", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, suscipit consequatur aliquam ex temporibus ipsum. Natus assumenda odio veritatis quidem non cupiditate, dolorem ea, repudiandae, laudantium et expedita asperiores officiis.", priority: "High" },
      { id: 2, title: "Заголовок2", priority: "Medium" },
      { id: 3, title: "Заголовок3", priority: "Low" },
      { id: 4, title: "Заголовок4", priority: "Low" },
      { id: 5, title: "Заголовок5", priority: "Medium", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, suscipit consequatur aliquam ex temporibus ipsum. Natus assumenda odio veritatis quidem non cupiditate, dolorem ea, repudiandae, laudantium et expedita asperiores officiis." },
      { id: 6, title: "Заголовок6", priority: "High" },
      { id: 7, title: "Заголовок7", priority: "Low" },
      { id: 8, title: "Заголовок8", priority: "High", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, suscipit consequatur aliquam ex temporibus ipsum. Natus assumenda odio veritatis quidem non cupiditate, dolorem ea, repudiandae, laudantium et expedita asperiores officiis." },
    ];
    return { tasks };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
