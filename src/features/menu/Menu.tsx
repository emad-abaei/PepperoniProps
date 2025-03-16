import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { PizzaType } from "../../types";

function Menu() {
  const menu = useLoaderData<PizzaType[]>();

  return (
    <div className='divide-y divide-stone-200 px-2'>
      <h2 className='text-2xl text-center font-semibold mt-4 px-2 pb-4'>
        Our Menu
      </h2>
      <ul className='divide-y divide-stone-200' role='list' aria-live='polite'>
        {menu.map((pizza) => {
          return <MenuItem pizza={pizza} key={pizza.pizzaId} />;
        })}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
