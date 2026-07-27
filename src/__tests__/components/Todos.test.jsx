import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Todos } from "../../components/Todos";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { setupStore, store } from "../../store/store";
import * as todoSlice from "../../store/todoSlice";
let mockTodos = [
  { id: "1", title: "Learn React Testing", completed: false, important: true },
  { id: "2", title: "Setup Redux", completed: true, important: false },
];
const auth = {
  token: "fake-token-123",
  loading: false,
  error: null,
};
const MockTodos = ({ store }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={store}>
        <Todos></Todos>
      </Provider>
    </BrowserRouter>
  );
};
 
describe("Todos test", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  it("should render loading indicator", () => {
    const store = setupStore({
      auth,
      todos: { status: "loading", savingId: null, items: mockTodos },
    });
    render(<MockTodos store={store}></MockTodos>);

    const loadingIndicator = screen.getByText(/Loading todos/i);
    expect(loadingIndicator).toBeInTheDocument();
  });
  it("should render todos title and list", () => {
    const store = setupStore({
      auth,
      todos: { status: "succeeded", savingId: null, items: mockTodos },
    });
    render(<MockTodos store={store}></MockTodos>);

    const title = screen.getByRole("heading", { name: /Your Todos/i });
    const todos = screen.getAllByTestId(/todo/);
    expect(title).toBeInTheDocument();
    expect(todos.length).toBe(2);
  });
   it("should trigger fetch todos function", () => {
    const store = setupStore({
      auth,
      todos: { status: "idle", savingId: null, items: mockTodos },
    });
    const dispatchSpy = jest.spyOn(store, "dispatch");
    const thunk = jest.fn();
    const fetchTodosSpy = jest.spyOn(todoSlice, "fetchTodos").mockReturnValue(thunk);

    render(<MockTodos store={store}></MockTodos>);

    expect(fetchTodosSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(thunk);
  });
});
