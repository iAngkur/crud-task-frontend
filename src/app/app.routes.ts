import { Routes } from '@angular/router';
import { TaskScreenComponent } from './screens/home-screen/home-screen.component';
import { NewTaskListScreenComponent } from './screens/new-task-list-screen/new-task-list-screen.component';
import { NewTaskScreenComponent } from './screens/new-task-screen/new-task-screen.component';

export const routes: Routes = [
    {path: '', redirectTo: 'task-list', pathMatch: 'full'},
    {path: 'task-list', component: TaskScreenComponent},
    {path: 'task-list/:tasklistId', component: TaskScreenComponent},
    {path: 'new-task-list', component: NewTaskListScreenComponent},
    {path: 'task-list/:tasklistId/new-task', component: NewTaskScreenComponent},
];
