export interface TodoItem {
  id: number;
  content: string;
  isCompleted: boolean;
}

export interface TodoItemEdit extends TodoItem {
  isEditing: boolean;
}
