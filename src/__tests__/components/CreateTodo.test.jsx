import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { CreateTodo } from "../../components/CreateTodo";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { setupStore } from "../../store/store";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Todos } from "../../components/Todos";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
const loggedInstore = () =>
  setupStore({
    auth: {
      token: "fake-token-123",
      loading: false,
      error: null,
    },
  });
const emptyStore = () => setupStore({});
const MockCreateTodo = ({ store }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={store}>
        <CreateTodo></CreateTodo>
      </Provider>
    </BrowserRouter>
  );
};
const MockRouter = ({ store }) => {
  return (
    <Provider store={store}>
    <MemoryRouter
    initialEntries={["/create"]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateTodo />
            </ProtectedRoute>
          }
        />
     </Routes>
    </MemoryRouter>
     </Provider>
  );
};
describe("Create Todo tests ", () => {
  afterEach(() => {
    cleanup();
    mockNavigate.mockClear();
  });
  it("Should input text on todo input", () => {
    const store = loggedInstore();
    render(<MockCreateTodo store={store}></MockCreateTodo>);
    const todoInput = screen.getByPlaceholderText(/What needs to be done/i);
    fireEvent.change(todoInput, { target: { value: "Buy groceries" } });
    console.log(todoInput.value);
    expect(todoInput.value).toBe("Buy groceries");
  });
  it("Should navigate to 'todos' page after succesful todo creation ", async () => {
    const store = loggedInstore();
    render(<MockRouter store={store}></MockRouter>);
    const todoInput = screen.getByPlaceholderText(/What needs to be done/i);
    fireEvent.change(todoInput, { target: { value: "Buy groceries" } });
    console.log(todoInput.value);
    expect(todoInput.value).toBe("Buy groceries");
    const submitBtn = screen.getByRole("button", { name: /create/i });
    await fireEvent.click(submitBtn);
    await waitFor(async () => {
      expect(await mockNavigate).toHaveBeenCalledWith("/todos");
      screen.debug();
    });
  });
});
