import { NewTodo, Todo } from "./todo.type";

export type UseTodosQueryRes = Todo[];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UseTodosQueryArg {}

export type UseCreateTodoMutationRes = any;

export interface UseCreateTodoMutationArg {
  newTodo: NewTodo;
}

export type UseUpdateTodoMutationRes = any;

export interface UseUpdateTodoMutationArg {
  id: number;
  updateTodo: Todo;
}

export type UseDeleteTodoMutationRes = any;

export interface UseDeleteTodoMutationArg {
  id: number;
}
