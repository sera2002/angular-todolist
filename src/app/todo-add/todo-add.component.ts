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
    id: 0,
    content: '',
    isCompleted: false,
  };

  constructor(private todoService: TodoService) {}

  onSubmit() {
    this.todoService.createTodoItem(this.todo).subscribe(
      (response) => {
        console.log('Todo 생성 완료:', response);
        this.todo.content = '';
      },
      (error) => {
        console.error('Todo 생성 실패:', error);
      }
    );
  }
}
