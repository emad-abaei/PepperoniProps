import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

interface DeleteItemProps {
  pizzaId: number;
}

function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button
      variant='small'
      onClick={handleDelete}
      aria-label={`Remove pizza ${pizzaId} from cart`}>
      Delete
    </Button>
  );
}

export default DeleteItem;
