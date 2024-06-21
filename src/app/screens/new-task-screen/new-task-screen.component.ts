import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task-screen',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './new-task-screen.component.html',
  styleUrl: './new-task-screen.component.scss'
})
export class NewTaskScreenComponent {

  tasklistId: String = '';

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private taskService: TaskService) {
      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.tasklistId = params['tasklistId'];
        }
      );
    }

  addNewTask(newTaskListTitle: String) {
    if(newTaskListTitle) {
      this.taskService.createTaskForATaskList(this.tasklistId, newTaskListTitle)
      .subscribe((newTask) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
    } else {
      alert('Title cannot be empty!');
      return;
    }
  }
}
