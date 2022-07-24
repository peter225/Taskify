import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task;
  form: FormGroup;
  submitted = false;
  private taskId: string | null;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      completed: new FormControl(false, {
        validators: [Validators.requiredTrue]}),
      
  });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.taskId = paramMap.get('taskId');
        this.taskService.onFetchTask(this.taskId).subscribe(taskData => {
          this.task = {
            id: taskData.id,
            name: taskData.name,
            completed: taskData.completed
          };
          this.form.setValue({
            name: this.task.name,
            completd: this.task.completed
            
          });
        });
      } 
    });

  }

}
