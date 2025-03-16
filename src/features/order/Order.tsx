// Test ID: IIDSAT
import { useLoaderData, LoaderFunctionArgs, useFetcher } from "react-router";
import OrderItem from "./OrderItem";
import { getOrder } from "../../services/apiRestaurant";
import { OrderedPizzaType, OrderType, PizzaType } from "../../types";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData<OrderType>();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    cart,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='space-y-8 px-4 py-6'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold' aria-live='polite'>
          Order #{id} status
        </h2>

        <div className='space-x-2'>
          {priority && (
            <span
              className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase'
              role='status'
              aria-live='polite'>
              Priority
            </span>
          )}
          <span
            className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase'
            aria-label={`${status} order`}>
            {status} order
          </span>
        </div>
      </div>

      <div
        className='flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5'
        aria-live='polite'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left`
            : "Order should have arrived"}
        </p>
        <p className='text-sm text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul
        className='divide-y divide-stone-200 border-t border-b border-stone-200 px-6'
        role='list'
        aria-label='Ordered items'>
        {cart.map((item: OrderedPizzaType) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el: PizzaType) => el.pizzaId === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className='space-y-2 bg-stone-200 px-6 py-5'>
        <p className='text-sm font-medium text-stone-600'>
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold' aria-live='polite'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export default Order;

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.orderId;
  if (!id) {
    throw new Response(JSON.stringify({ message: "Order ID is missing." }), {
      status: 400,
      statusText: "Bad Request"
    });
  }

  try {
    const order = await getOrder(id);

    return order;
  } catch (error) {
    // Return a structured Response with error details
    throw new Response(JSON.stringify({ message: "Failed to fetch order." }), {
      status: 500,
      statusText: "Internal Server Error"
    });
  }
}
