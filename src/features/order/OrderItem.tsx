import { OrderedPizzaType } from "../../types";
import { formatCurrency } from "../../utils/helpers";

interface OrderItemProps {
  item: OrderedPizzaType;
  isLoadingIngredients: boolean;
  ingredients: string[];
}

function OrderItem({
  item,
  ingredients,
  isLoadingIngredients
}: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className='space-y-1 py-3' role='listitem'>
      <div className='flex items-center justify-between gap-4 text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
      <p
        className='text-sm text-stone-500 capitalize italic'
        aria-live='polite'>
        {isLoadingIngredients ? "Loading..." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
