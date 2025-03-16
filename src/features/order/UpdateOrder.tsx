import { ActionFunctionArgs, useFetcher } from "react-router";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();
  const isUpdating = fetcher.state === "submitting";

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button
        type='submit'
        disabled={isUpdating}
        ariaLabel='Make this order a priority'>
        {isUpdating ? "Updating..." : "Make priority"}
      </Button>
      <p aria-live='polite' className='sr-only'>
        {isUpdating ? "Updating order priority..." : ""}
      </p>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }: ActionFunctionArgs) {
  if (!params.orderId) {
    return { error: "Order ID is missing." };
  }

  const data = { priority: true };

  try {
    await updateOrder(params.orderId, data);
    return null;
  } catch (error) {
    return { error: "Failed to update order." };
  }
}
