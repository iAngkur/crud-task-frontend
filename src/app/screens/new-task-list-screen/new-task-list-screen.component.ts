import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task-list-screen',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './new-task-list-screen.component.html',
  styleUrl: './new-task-list-screen.component.scss'
})
export class NewTaskListScreenComponent {

  constructor(private router: Router, private taskService: TaskService) {}

  addNewTaskList(newTaskListTitle: String) {
    if(newTaskListTitle) {
      this.taskService.createATaskList(newTaskListTitle)
      .subscribe((newTaskList) => {
        this.router.navigate(['task-list', newTaskList._id]);
      });
    } else {
      alert('Title cannot be empty!');
      return;
    }
  }
}
