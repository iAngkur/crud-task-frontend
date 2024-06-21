import { Component, OnInit } from '@angular/core';
import TaskList from '../../models/taskList';
import Task from '../../models/task';
import { TaskService } from '../../services/task.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-task-screen',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class TaskScreenComponent implements OnInit {
  taskLists: TaskList[] = [];
  tasks: Task[] = [];
  tasklistId: String = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTaskLists()
    .subscribe(taskList => this.taskLists = taskList);

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tasklistId = params['tasklistId'];
        if(this.tasklistId) {
          this.taskService.getAllTasksForATaskList(this.tasklistId).subscribe(tasks => this.tasks = tasks);
        }
      }
    );
  }
  addNewTask() {
    if(this.tasklistId) {
      this.router.navigate(['./new-task'], {relativeTo: this.activatedRoute});
    } else {
      alert('Please select a task list!');
      return;
    }
  }

  taskClicked(task: Task) {
    this.taskService.updateTaskStatus(this.tasklistId, task)
    .subscribe(() => task.completed = !task.completed);
  }

  deleteTask(task: Task) {
    this.taskService.deleteATaskFromATaskList(this.tasklistId, task._id)
    .subscribe(deletedTask => {
      this.tasks = this.tasks.filter(task => task._id != deletedTask._id);
    });
  }

  deleteTaskList(taskList: TaskList) {
    this.taskService.deleteATaskList(taskList._id)
    .subscribe(deletedTaskList => {
      this.taskLists = this.taskLists.filter(taskList => taskList._id != deletedTaskList._id);
    });
  }

  hoverIn(event: Event): void {
    const target = (event.currentTarget as HTMLElement).parentElement;
    if (target) {
      target.classList.add('hover');
    }
  }

  hoverOut(event: Event): void {
    const target = (event.currentTarget as HTMLElement).parentElement;
    if (target) {
      target.classList.remove('hover');
    }
  }
}
