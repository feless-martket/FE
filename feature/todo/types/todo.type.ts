export type TodoStatus = "not-started" | "done";

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  created: string; // ISO date string
  lastModified: string; // ISO date string
}

export interface NewTodo {
  title: string;
  status: TodoStatus;
  created: string; // ISO date string
  lastModified: string; // ISO date string
}
