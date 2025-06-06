import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu' ariaLabel='Go back to the menu page'>
        &larr; Back to menu
      </LinkButton>
      <p className='mt-7 font-semibold'>
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
