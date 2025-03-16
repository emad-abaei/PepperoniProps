export interface APIResponsePizza {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

export interface PizzaType {
  pizzaId: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

export interface OrderedPizzaType extends PizzaType {
  quantity: number;
  totalPrice: number;
}

export interface OrderType {
  id: number;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: OrderedPizzaType[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
}

export interface NewOrderType {
  customer: string;
  address: string;
  cart: PizzaType[];
  phone: string;
  priority: boolean;
}

export interface PositionType {
  latitude: number;
  longitude: number;
}

export interface UserStateType {
  username: string;
  status: "idle" | "loading" | "error";
  position: PositionType | null;
  address: string;
  error: string;
}

export interface CartItemType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartStateType {
  cart: CartItemType[];
}

export interface ErrorsType {
  phone?: string;
}
