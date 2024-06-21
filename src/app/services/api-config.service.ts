import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskList from '../models/taskList';
import Task from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getData<T>(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.API_BASE_URL}/${url}`);
  }

  saveData<T>(url: String, data: Object): Observable<T> {
    return this.httpClient.post<T>(`${this.API_BASE_URL}/${url}`, data);
  }

  updateData<T>(url: String, data: Object): Observable<T> {
    return this.httpClient.put<T>(`${this.API_BASE_URL}/${url}`, data);
  }

  updatePatchData<T>(url: String, data: Object): Observable<T> {
    return this.httpClient.patch<T>(`${this.API_BASE_URL}/${url}`, data);
  }

  deleteData<T>(url: String): Observable<T> {
    return this.httpClient.delete<T>(`${this.API_BASE_URL}/${url}`);
  }

}
