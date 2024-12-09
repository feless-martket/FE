import DeleteTodo from "./DeleteTodo";
import { Todo as ITodo } from "./types/todo.type";
import UpdateTodo from "./UpdateTodo";

interface Props {
  todo: ITodo;
}

export default function Todo({ todo }: Props) {
  return (
    <li className="flex h-7 items-center justify-between gap-1 pt-1">
      <div className="flex items-center gap-1">
        <UpdateTodo todo={todo}></UpdateTodo>
        <span className="align-middle text-sm">{todo.title}</span>
      </div>
      <DeleteTodo id={todo.id}></DeleteTodo>
    </li>
  );
}
