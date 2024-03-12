import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo-item';

// const todos = [
//   { id: 1, content: 'hi', isCompleted: false },
//   { id: 2, content: 'hello', isCompleted: false },
//   { id: 3, content: 'hahaha', isCompleted: false },
//   { id: 4, content: "i don't know what to do now", isCompleted: false },
//   {
//     id: 5,
//     content:
//       "This is very long content. i don't know what to do now, This is very long content. hahaha",
//     isCompleted: false,
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
    this.loadTodos(); // 초기 todo 목록
    this.todoService.todos$.subscribe((todos) => {
      this.todos = [...this.todos, ...todos];
    });
  }

  loadTodos(): void {
    this.todoService
      .getTodoItems()
      .subscribe((todos: TodoItem[]) => (this.todos = todos));
  }

  handleFilledCheckboxClick(id: number, body: TodoItem) {
    this.todoService.changeTodoItem(id, body).subscribe(
      (response) => {
        // 체크박스 변경
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index].isCompleted = !this.todos[index].isCompleted;
        }
        console.log('Todo 상태 변경 완료: ', response);
      },
      (error) => {
        console.error('Todo 상태 변경 에러: ', error);
      }
    );
  }

  handleEmptyCheckboxClick(id: number, body: TodoItem) {
    this.todoService.changeTodoItem(id, body).subscribe(
      (response) => {
        // 체크박스 변경
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index].isCompleted = !this.todos[index].isCompleted;
        }
        console.log('Todo 상태 변경 완료: ', response);
      },
      (error) => {
        console.error('Todo 상태 변경 에러: ', error);
      }
    );
  }

  handleEdit(id: number, body: TodoItem) {
    this.todoService.changeTodoItem(id, body).subscribe(
      (response) => {
        console.log('Todo 내용 변경 완료: ', response);
      },
      (error) => {
        console.error('Todo 내용 변경 에러: ', error);
      }
    );
  }

  handleRemove(id: number) {
    this.todoService.deleteTodoItem(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }
}
