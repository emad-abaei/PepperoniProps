import { APIResponsePizza, NewOrderType, PizzaType } from "../types";
import { API_URL } from "../utils/constants";

export async function getMenu(): Promise<PizzaType[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw new Error("Failed getting menu");

  const { data }: { data: APIResponsePizza[] } = await res.json();

  return data.map((pizza) => ({
    pizzaId: pizza.id,
    imageUrl: pizza.imageUrl,
    ingredients: pizza.ingredients,
    name: pizza.name,
    soldOut: pizza.soldOut,
    unitPrice: pizza.unitPrice,
  }));
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder: NewOrderType) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(
  id: string,
  updateObj: { priority: boolean },
) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
