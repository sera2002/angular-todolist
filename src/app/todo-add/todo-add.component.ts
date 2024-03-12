import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo-item';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent {
  todo: TodoItem = {
    Id: 0,
    Content: '',
    IsCompleted: false,
  };

  constructor(private todoService: TodoService) {}

  onSubmit() {
    this.todoService.createTodoItem(this.todo).subscribe(
      (response) => {
        console.log('Todo 생성 완료:', response);
      },
      (error) => {
        console.error('Todo 생성 실패:', error);
      }
    );
  }
}
