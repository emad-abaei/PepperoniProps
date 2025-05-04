import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router";
import userReducer from "./features/user/userSlice";
import Home from "./ui/Home";
import { vi } from "vitest";
import type { UserStateType } from "./types";

// Mock CreateUser component so it renders predictable text
vi.mock("./features/user/CreateUser", () => ({
  default: () => <div>Mocked CreateUser</div>
}));

test("renders CreateUser when username is not set", () => {
  const preloadedUserState: UserStateType = {
    username: "",
    status: "idle",
    position: null,
    address: "",
    error: ""
  };

  const store = configureStore({
    reducer: {
      user: userReducer
    },
    preloadedState: {
      user: preloadedUserState
    }
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/mocked createuser/i)).toBeInTheDocument();
});
