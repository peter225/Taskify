import { Component, ViewChild } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { Router } from '@angular/router';
//TaskEditComponent
//Router


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sportsStore';
  constructor(private router: Router){}
  @ViewChild(TaskEditComponent)child: TaskEditComponent;

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
