import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import {
  NotificationContext,
  NotificationContextData,
} from "src/context/NotificationContext";
import {
  getEmailSample,
  getNotificationContextValue,
  getPasswordSample,
} from "src/tests-utils";
import { InvalidData } from "src/errors";

function renderLoginPage(
  loginUser = jest.fn(),
  notifyValue: NotificationContextData
) {
  const contextValue = notifyValue
    ? notifyValue
    : getNotificationContextValue();

  return render(
    <NotificationContext.Provider value={contextValue}>
      <MemoryRouter>
        <Login loginUser={loginUser} />
      </MemoryRouter>
    </NotificationContext.Provider>
  );
}

describe("loginUser", () => {
  test("When loginUser throw, then call error notify with particular text", async () => {
    const loginUser = jest.fn().mockRejectedValueOnce(new Error("Error"));
    const notifyError = jest.fn();
    renderLoginPage(
      loginUser,
      getNotificationContextValue({ error: notifyError })
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, getEmailSample());
    userEvent.type(passInput, getPasswordSample());
    userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(notifyError).toBeCalledWith(
        expect.stringMatching(/Failed to login/i)
      )
    );
  });

  test("When loginUser throw Invalid Data, then call error notify with particular text", async () => {
    const loginUser = jest.fn().mockRejectedValueOnce(new InvalidData("Error"));
    const notifyError = jest.fn();
    renderLoginPage(
      loginUser,
      getNotificationContextValue({ error: notifyError })
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, getEmailSample());
    userEvent.type(passInput, getPasswordSample());
    userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(notifyError).toBeCalledWith(expect.stringMatching(/Invalid data/i))
    );
  });

  test("When loginUser success, then call success notify with particular text", async () => {
    const loginUser = jest.fn();
    const notifySuccess = jest.fn();
    renderLoginPage(
      loginUser,
      getNotificationContextValue({ success: notifySuccess })
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, getEmailSample());
    userEvent.type(passInput, getPasswordSample());
    userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(notifySuccess).toBeCalledWith(
        expect.stringMatching(/Successfully/i)
      )
    );
  });
});
