import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo-item';

// const todos = [
//   { Id: 1, Content: 'hi', IsCompleted: false },
//   { Id: 2, Content: 'hello', IsCompleted: false },
//   { Id: 3, Content: 'hahaha', IsCompleted: false },
//   { Id: 4, Content: "i don't know what to do now", IsCompleted: false },
//   {
//     Id: 5,
//     Content:
//       "This is very long Content. i don't know what to do now, This is very long Content. hahaha",
//     IsCompleted: false,
//   },
// ];

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService
      .getTodoItems()
      .subscribe((todos: TodoItem[]) => (this.todos = todos));
  }

  handleFilledCheckboxClick(Id: number, body: TodoItem) {
    this.todoService.changeTodoItem(Id, body).subscribe(
      (response) => {
        // 체크박스 변경
        const index = this.todos.findIndex((todo) => todo.Id === Id);
        if (index !== -1) {
          this.todos[index].IsCompleted = !this.todos[index].IsCompleted;
        }
        console.log('Todo 상태 변경 완료: ', response);
      },
      (error) => {
        console.error('Todo 상태 변경 에러: ', error);
      }
    );
  }

  handleEmptyCheckboxClick(Id: number, body: TodoItem) {
    this.todoService.changeTodoItem(Id, body).subscribe(
      (response) => {
        // 체크박스 변경
        const index = this.todos.findIndex((todo) => todo.Id === Id);
        if (index !== -1) {
          this.todos[index].IsCompleted = !this.todos[index].IsCompleted;
        }
        console.log('Todo 상태 변경 완료: ', response);
      },
      (error) => {
        console.error('Todo 상태 변경 에러: ', error);
      }
    );
  }

  handleEdit(Id: number, body: TodoItem) {
    this.todoService.changeTodoItem(Id, body).subscribe(
      (response) => {
        console.log('Todo 내용 변경 완료: ', response);
      },
      (error) => {
        console.error('Todo 내용 변경 에러: ', error);
      }
    );
  }

  handleRemove(Id: number) {
    this.todoService.deleteTodoItem(Id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.Id !== Id);
    });
  }
}
