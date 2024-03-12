import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem, TodoItemEdit } from './todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://13.238.99.1:5000/api/todo';
  private todos: BehaviorSubject<TodoItemEdit[]> = new BehaviorSubject<
    TodoItemEdit[]
  >([]);
  public todos$: Observable<TodoItemEdit[]> = this.todos.asObservable();

  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.apiUrl}`);
  }

  getTodoItem(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  createTodoItem(todoItem: TodoItem): Observable<TodoItem> {
    const todoItemEdit: TodoItemEdit = { ...todoItem, isEditing: false };
    const currentTodos = this.todos.getValue();
    const updatedTodos = [...currentTodos, todoItemEdit];
    this.todos.next(updatedTodos);

    return this.http.post<TodoItem>(`${this.apiUrl}`, {
      Id: todoItem.id,
      Content: todoItem.content,
      IsCompleted: todoItem.isCompleted,
    });
  }

  changeTodoItem(id: number, todoItem: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${id}`, {
      Id: todoItem.id,
      Content: todoItem.content,
      IsCompleted: todoItem.isCompleted,
    });
  }

  deleteTodoItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
