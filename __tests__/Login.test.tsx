import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/components/Authentication/Login/Login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../src/controller/userController";

jest.mock("../src/controller/userController", () => ({
  signIn: jest.fn(),
}));

jest.mock("../src/components/CustomInput/CustomInput", () => (props: any) => (
  <input {...props} />
));

jest.mock("../src/components/CustomButton/CustomButton", () => (props: any) => (
  <button {...props}>{props.text}</button>
));

jest.mock("../src/components/Navbar/Navbar", () => ({ children }: any) => (
  <>{children}</>
));

describe("Login Component", () => {
  const navigateMock = jest.fn();
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  test("renders inputs and button", async () => {
    render(<Login />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Log In/i })
      ).toBeInTheDocument();
    });
  });

  test("shows warning if email is missing", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
    await waitFor(() => {
      expect(screen.getByText("Enter email")).toBeInTheDocument();
    });
  });

  test("shows warning if password is missing", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
    await waitFor(() => {
      expect(screen.getByText("Enter password")).toBeInTheDocument();
    });
  });

  test("calls signIn when form is valid", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
      expect(signIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        dispatch: dispatchMock,
        navigate: navigateMock,
      });
    });
  });
});
