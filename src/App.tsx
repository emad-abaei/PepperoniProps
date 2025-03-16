import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Loader from "./ui/Loader";
import PageNotFound from "./ui/PageNotFound";
import ErrorFallback from "./ui/ErrorBoundary";

// Lazy load pages
const Home = lazy(() => import("./ui/Home"));
const Menu = lazy(() => import("./features/menu/Menu"));
const Cart = lazy(() => import("./features/cart/Cart"));
const Order = lazy(() => import("./features/order/Order"));
const CreateOrder = lazy(() => import("./features/order/CreateOrder"));

// Loaders & actions
import { loader as menuLoader } from "./features/menu/Menu";
import { loader as orderLoader } from "./features/order/Order";
import { action as createOrderAction } from "./features/order/CreateOrder";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: "/menu",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <Menu />
            </Suspense>
          </ErrorBoundary>
        ),
        loader: menuLoader,
        errorElement: <Error />
      },
      {
        path: "/cart",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: "/order/new",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <CreateOrder />
            </Suspense>
          </ErrorBoundary>
        ),
        action: createOrderAction
      },
      {
        path: "/order/:orderId",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <Order />
            </Suspense>
          </ErrorBoundary>
        ),
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction
      },
      {
        path: "*",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <PageNotFound />
            </Suspense>
          </ErrorBoundary>
        )
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
