/** */

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "./types/todo.type";
import { useMemo } from "react";
import { useUpdateTodoMutation } from "./api/api";
import { format } from "date-fns";

interface Props {
  todo: Todo;
}

export default function UpdateTodo({ todo }: Props) {
  const checked = useMemo(() => todo.status === "done", [todo]);
  const [update] = useUpdateTodoMutation();

  const handleUpdate = (updateTodo: Todo) => {
    update({
      id: todo.id,
      updateTodo,
    });
  };

  return (
    <Checkbox
      checked={checked}
      onClick={() =>
        handleUpdate({
          ...todo,
          status: todo.status === "done" ? "not-started" : "done",
          lastModified: format(new Date().toISOString(), "yyyy-MM-dd"),
        })
      }
    />
  );
}
