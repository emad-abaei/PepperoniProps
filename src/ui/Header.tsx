import { Link } from "react-router";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import PizzaImage from "./PizzaImage";

function Header() {
  return (
    <header className='flex items-center justify-between border-b border-stone-300 bg-amber-400 px-4 py-3 uppercase sm:px-6'>
      <Link
        to='/'
        className='font-damion text-2xl text-stone-600 tracking-widest capitalize sm:text-3xl'
        aria-label='Go to homepage'>
        <div className='flex items-center gap-1 sm:gap-2'>
          <PizzaImage className='max-w-10 sm:max-w-12' />
          <span>PepperoniProps</span>
        </div>
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
