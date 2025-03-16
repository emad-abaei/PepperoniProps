import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import Button from "../../ui/Button";
import { PizzaType } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import { memo } from "react";

interface MenuItemProps {
  pizza: PizzaType;
}

const MenuItem = memo(function MenuItem({ pizza }: MenuItemProps) {
  const dispatch = useDispatch();
  const { pizzaId, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const isInCart = currentQuantity > 0;

  function handleClick(): void {
    const newItem = {
      pizzaId,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={soldOut ? `${name} is sold out` : name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm text-stone-500 capitalize italic'>
          {ingredients.join(", ")}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium text-stone-500 uppercase'>
              Sold out
            </p>
          )}

          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity
                pizzaId={pizzaId}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={pizzaId} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button
              variant='small'
              onClick={handleClick}
              aria-label={`Add ${name} to cart`}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
});

export default MenuItem;
