"use client";

import { useTodosQuery } from "./api/api";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

export default function TodoList() {
  const { data } = useTodosQuery({});

  return (
    <section className="flex h-full flex-col items-center justify-center">
      {/* todo title */}
      <div className="">
        <h2 className="text-2xl font-bold">TODO LIST</h2>
      </div>
      {/* todo form */}
      <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm">
        <span>새로 할 일을 추가하세요.</span>
        <CreateTodo />
      </div>
      {/* todo list */}
      <div className="mt-4 grow">
        <ul>{data?.map((todo) => <Todo key={todo.id} todo={todo}></Todo>)}</ul>
      </div>
    </section>
  );
}
