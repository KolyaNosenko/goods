import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("Email validation", () => {
  test("When empty, then show error", async () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    userEvent.click(screen.getByRole("button"));

    const error = await screen.findByText(/email is required/i);
    expect(error).toBeInTheDocument();
  });

  test("When invalid, then show error", async () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    const invalidEmail = "test.mail.com";
    const emailInput = screen.getByLabelText(/email/i);

    userEvent.type(emailInput, invalidEmail);
    userEvent.click(screen.getByRole("button"));

    const error = await screen.findByText(/invalid email/i);
    expect(error).toBeInTheDocument();
  });
});

describe("Password validation", () => {
  test("When empty, then show error", async () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    userEvent.click(screen.getByRole("button"));
    const error = await screen.findByText(/password is required/i);
    expect(error).toBeInTheDocument();
  });

  test("When pass too short, then show error", async () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    const tooShortPas = "123";
    const passInput = screen.getByLabelText(/password/i);

    userEvent.type(passInput, tooShortPas);
    userEvent.click(screen.getByRole("button"));

    const error = await screen.findByText(/too short/i);
    expect(error).toBeInTheDocument();
  });
});

test("When fill all fields, then submit with field values", async () => {
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} />);
  const email = "email@mailto.com";
  const password = "123123123";
  const emailInput = screen.getByLabelText(/email/i);
  const passInput = screen.getByLabelText(/password/i);

  userEvent.type(emailInput, email);
  userEvent.type(passInput, password);
  userEvent.click(screen.getByRole("button"));

  await waitFor(() =>
    expect(onSubmit).toBeCalledWith({
      email,
      password,
    })
  );
});
