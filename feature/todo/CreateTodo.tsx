import { Input } from "@/components/ui/input";
import { useCreateTodoMutation } from "./api/api";
import { FormEventHandler } from "react";
import { format } from "date-fns";

export default function CreateTodo() {
  const [create] = useCreateTodoMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("newTodoTitle") as string;
    if (!title) return;

    create({
      newTodo: {
        title,
        created: format(new Date().toISOString(), "yyyy-MM-dd"),
        lastModified: format(new Date().toISOString(), "yyyy-MM-dd"),
        status: "not-started",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input className="h-8 text-sm" name="newTodoTitle"></Input>
    </form>
  );
}
