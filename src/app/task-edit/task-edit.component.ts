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
          console.log(taskData)
          this.task = {
            _id: taskData.task._id,
            name: taskData.task.name,
            completed: taskData.task.completed
          };
          
          this.form.setValue({
            name: this.task.name,
            completed: this.task.completed
            
          });
          //console.log(this.form)
        });
      }
      else{
        console.log("not fetched")
      } 
    });

  }

  editTask()
  {
    //console.log('a')
    this.taskService.onEditTask(this.task._id,this.form.value.name, this.form.value.completed)
  }

}
