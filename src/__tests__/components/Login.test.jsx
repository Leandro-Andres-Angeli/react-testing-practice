import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { setupStore } from "../../store/store";
import { Provider } from "react-redux";
import { Login } from "../../components/Login";

const loggedInstore = setupStore({
  auth: {
    token: "fake-token-123",
    loading: false,
    error: null,
  },
});
const emptyStore = setupStore({});
const MockupLogin = ({ store }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={store}>
        <Login></Login>
      </Provider>
    </BrowserRouter>
  );
};
describe("Should change login button text to 'logging in...' on succesful login ", () => {
  // Explicitly unmount and clear the DOM after every test
  afterEach(() => {
    cleanup();
  });

  it("succesful login", () => {
    const store = setupStore({})
    render(<MockupLogin store={store}></MockupLogin>);
    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(userNameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.click(loginButton);
    expect(
      screen.getByRole("button", { name: /logging in\.\.\./i }),
    ).toBeInTheDocument();
  });
    it("wrong credentials should render 'invalid credentials' ", async () => {
        const store = setupStore({})
    render(<MockupLogin store={store}></MockupLogin>);
    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    
    fireEvent.change(userNameInput, { target: { value: "123" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });

    
    await fireEvent.click(loginButton);
    
    expect( await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    
  });
});
