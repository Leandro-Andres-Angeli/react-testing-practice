import { fireEvent, render, screen } from "@testing-library/react";

import { Header } from "../../components/Header";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";
import { BrowserRouter } from "react-router-dom";
const loggedInstore = setupStore({
  auth: {
    token: "fake-token-123",
    loading: false,
    error: null,
  },
});
const emptyStore = setupStore({});
const MockupHeader = ({ store }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={store}>
        <Header></Header>
      </Provider>
    </BrowserRouter>
  );
};

describe("Header", () => {
  it("Should render Login button when user is not logged in ", () => {
    render(<MockupHeader store={emptyStore}></MockupHeader>);
    const loginButton = screen.getByRole("link", { name: /login/i });

    expect(loginButton).toBeInTheDocument();
  });
  it("Should render Logout button when user is logged in", () => {
    render(<MockupHeader store={loggedInstore}></MockupHeader>);
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    
    expect(logoutButton).toBeInTheDocument();
  });
  it("Should trigger Logout action when logout button is clicked and display login button again", () => {
    render(<MockupHeader store={loggedInstore}></MockupHeader>);
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    
     fireEvent.click(logoutButton)
     expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
  });
});
