import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://13.238.99.1:5000/api/todo';

  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.apiUrl}`);
  }

  getTodoItem(Id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${Id}`);
  }

  createTodoItem(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}`, todoItem);
  }

  changeTodoItem(Id: number, todoItem: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${Id}`, todoItem);
  }

  deleteTodoItem(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Id}`);
  }
}
