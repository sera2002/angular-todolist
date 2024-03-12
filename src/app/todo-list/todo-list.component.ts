import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItem, TodoItemEdit } from '../todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoItemEdit[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos(); // 초기 todo 목록
    this.todoService.todos$.subscribe((todos) => {
      this.todos = [...this.todos, ...todos];
    });
  }

  loadTodos(): void {
    this.todoService.getTodoItems().subscribe((todos: TodoItem[]) => {
      this.todos = todos.map((todo) => ({ ...todo, isEditing: false }));
    });
  }

  handleFilledCheckboxClick(id: number, body: TodoItem) {
    this.todoService
      .changeTodoItem(id, { ...body, isCompleted: false })
      .subscribe(
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
    this.todoService
      .changeTodoItem(id, { ...body, isCompleted: true })
      .subscribe(
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

  handleEdit(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      // Switch to edit mode
      this.todos[index].isEditing = !this.todos[index].isEditing;
    }
  }

  submitEdit(id: number, body: TodoItem) {
    // 다시 read 모드로
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      // Switch to edit mode
      this.todos[index].isEditing = false;
    }

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
