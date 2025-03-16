import { Link } from "react-router";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (totalCartQuantity === 0) return null;

  return (
    <div className='flex justify-between bg-stone-700 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base'>
      <p className='space-x-4 font-semibold text-stone-300 sm:space-x-4'>
        <span>
          {totalCartQuantity} {totalCartQuantity === 1 ? "pizza" : "pizzas"}
        </span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to='/cart' aria-label='View cart details'>
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
