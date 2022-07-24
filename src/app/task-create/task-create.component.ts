import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  //@Output() taskCreated = new EventEmitter<boolean>();
  tasks: Task[] = [];
  completed: boolean = false;
  taskName = "";
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }
  createTask(name: string):void
  {
    //const newTask: Task = { name } as Task;
    this.taskService.onCreateTask(name);
    
      
  }
  

}
