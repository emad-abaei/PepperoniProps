import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";

function Cart() {
  const username = useSelector((state: RootState) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu' ariaLabel='Back to menu'>
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

      <ul className='mt-3 divide-y divide-stone-200 border-b border-stone-200'>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button to='/order/new' ariaLabel='Proceed to order pizzas'>
          Order pizzas
        </Button>
        <Button
          variant='secondary'
          onClick={handleClearCart}
          ariaLabel='Clear cart'>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
