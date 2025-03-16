import { useState } from "react";
import {
  Form,
  ActionFunctionArgs,
  redirect,
  useNavigation,
  useActionData
} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import store, { AppDispatch, RootState } from "../../store";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";
import Button from "../../ui/Button";
import { createOrder } from "../../services/apiRestaurant";
import { ErrorsType, NewOrderType } from "../../types";
import { AddressStatusState, NavigationState } from "../../enums";
import { formatCurrency, isValidPhone } from "../../utils/helpers";
import { PRIORITY_RATE } from "../../utils/constants";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    address,
    position,
    error: addressError
  } = useSelector((state: RootState) => state.user);

  const isLoadingAddress = addressStatus === AddressStatusState.LOADING;
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const isSubmitting = navigation.state === NavigationState.SUBMITTING;
  const formErrors = useActionData();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * PRIORITY_RATE : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  function handleGetPosition() {
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST' action='/order/new'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40' htmlFor='customer'>
            First Name
          </label>
          <input
            id='customer'
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            required
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline'>
          <label className='sm:basis-40' htmlFor='phone'>
            Phone number
          </label>
          <div className='grow'>
            <input
              id='phone'
              className='input w-full'
              type='tel'
              name='phone'
              required
              aria-invalid={!!formErrors?.phone}
            />
            <div aria-live='polite'>
              {formErrors?.phone && (
                <p className='mt-2 rounded-full bg-red-100 px-6 py-2 text-xs text-red-700'>
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40' htmlFor='address'>
            Address
          </label>
          <div className='grow'>
            <input
              id='address'
              className='input w-full disabled:bg-stone-100'
              type='text'
              name='address'
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {addressStatus === AddressStatusState.ERROR && (
              <p className='mt-2 rounded-full bg-red-100 px-6 py-2 text-xs text-red-700'>
                {addressError}
              </p>
            )}
          </div>
          {!position?.latitude && !position?.longitude && (
            <div className='absolute top-[35px] right-1 sm:top-[3px] md:top-[7px] md:right-2'>
              <Button
                type='button'
                variant='small'
                onClick={handleGetPosition}
                disabled={isLoadingAddress}
                ariaDescribedBy='address'>
                Get Position
              </Button>
            </div>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-amber-400 focus:ring focus:ring-amber-400 focus:ring-offset-2 focus:outline-none'
            type='checkbox'
            name='priority'
            id='priority'
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            Want to give your order priority?
          </label>
        </div>

        <div>
          {/* get cart data using this hidden input */}
          <input
            type='hidden'
            name='cart'
            value={JSON.stringify(cart)}
            aria-hidden='true'
          />
          <input
            type='hidden'
            name='position'
            value={
              position?.latitude && position?.longitude
                ? `${position?.latitude}, ${position?.longitude}`
                : ""
            }
            aria-hidden='true'
          />

          <Button type='submit' disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Extract form data entries and ensure they are strings
  const customer = data.customer as string;
  const phone = data.phone as string;
  const address = data.address as string;
  const priority = data.priority === "on" ? true : false;
  const cart = typeof data.cart === "string" ? JSON.parse(data.cart) : [];

  const order: NewOrderType = {
    customer,
    phone,
    address,
    cart,
    priority
  };

  // If there is any errors, create errors and return it
  const errors: ErrorsType = {};

  if (!isValidPhone(order.phone))
    errors.phone = "Enetr a valid phone number, please.";

  if (Object.keys(errors).length > 0) return errors;

  // If there is no error, create new order and redirect
  const newOrder = await createOrder(order);

  // Do not overuse this trick because of performance issues.
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
