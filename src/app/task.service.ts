import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task.model';

//Observable
import { catchError, retry } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskChanged = new Subject<Task>();
  //url = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  onCreateTask(name: string) {
    return this.http.post<Task>('http://localhost:3000/api/v1/tasks', {'name':name}).subscribe(response => {this.taskChanged.next(response)});
  }
  onFetchTasks():Observable<{tasks:Task[]}>{
    return this.http.get<{tasks:Task[]}>('http://localhost:3000/api/v1/tasks');
  }
  onFetchTask(id: string | null){
    return this.http.get<Task>('http://localhost:3000/api/v1/tasks'+ id);
  }
  
}
