import { X } from "lucide-react";
import { useDeleteTodoMutation } from "./api/api";

interface Props {
  id: number;
}

export default function DeleteTodo({ id }: Props) {
  const [remove] = useDeleteTodoMutation();

  const handleDelete = () => {
    remove({
      id,
    });
  };

  return (
    <button onClick={() => handleDelete()}>
      <X />
    </button>
  );
}
