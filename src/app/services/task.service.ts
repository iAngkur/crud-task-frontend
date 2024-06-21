import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import Task from '../models/task';
import { Observable } from 'rxjs';
import TaskList from '../models/taskList';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  // TaskList Routes
  getAllTaskLists(): Observable<TaskList[]> {
    return this.apiConfigService.getData<TaskList>('tasklists');
  }

  createATaskList(title: String): Observable<TaskList> {
    return this.apiConfigService.saveData<TaskList>('tasklists', {title});
  }

  deleteATaskList(tasklistId: String): Observable<TaskList> {
    return this.apiConfigService.deleteData<TaskList>(`tasklists/${tasklistId}`);
  }


  // Tasks Routes
  getAllTasksForATaskList(tasklistId: String) : Observable<Task[]> {
    return this.apiConfigService.getData<Task>(`tasklists/${tasklistId}/tasks`);
  }

  createTaskForATaskList(tasklistId: String, title: String): Observable<Task> {
    return this.apiConfigService.saveData<Task>(`tasklists/${tasklistId}/tasks`, {title});
  }

  deleteATaskFromATaskList(tasklistId: String, taskId: String): Observable<Task> {
    return this.apiConfigService.deleteData<Task>(`tasklists/${tasklistId}/tasks/${taskId}`);
  }

  updateTaskStatus(tasklistId: String, task: Task): Observable<Task> {
    return this.apiConfigService.updatePatchData<Task>(`tasklists/${tasklistId}/tasks/${task._id}`, {'completed': !task.completed});
  }

}
