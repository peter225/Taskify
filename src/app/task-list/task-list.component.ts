import { Component, OnInit, OnDestroy } from '@angular/core';
//import { throttleTime } from 'rxjs/dist/types/operators';
import { map } from "rxjs/operators";
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  //isCompleted: boolean;
  panelOpenState = false;
  tasks: Task[] = [];
  private taskChanged:Subscription;
  
  
  //task = "";
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.fetchTasks();
    this.taskChanged = this.taskService.taskChanged
    .subscribe(
      (task: any) => {
        
        this.tasks.push(task.task);
      }
    );
  }

  fetchTasks()
  {
    this.taskService.onFetchTasks().subscribe((task:{tasks: Task[]})=>{
      console.log(task.tasks)
      this.tasks = task.tasks;
      
    });
    
  }
  ngOnDestroy(): any {
    this.taskChanged.unsubscribe();
  }
  

}
