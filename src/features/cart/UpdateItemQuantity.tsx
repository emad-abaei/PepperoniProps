import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import Button from "../../ui/Button";

interface UpdateItemQuantityProps {
  pizzaId: number;
  currentQuantity: number;
}

function UpdateItemQuantity({
  pizzaId,
  currentQuantity
}: UpdateItemQuantityProps) {
  const dispatch = useDispatch();

  function handleIncreament() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecreament() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <Button
        variant='round'
        onClick={handleDecreament}
        ariaLabel={`Decrease quantity of pizza ${pizzaId}`}>
        -
      </Button>
      <span className='text-sm font-medium'>{currentQuantity}</span>
      <Button
        variant='round'
        onClick={handleIncreament}
        ariaLabel={`Increase quantity of pizza ${pizzaId}`}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
