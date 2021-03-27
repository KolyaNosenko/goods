import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";
import { getEmailSample, getPasswordSample } from "../../tests-utils";
import { InvalidData } from "../../errors";

function renderLoginPage(loginUser = jest.fn(), notify) {
  const notifyMock = notify ? notify : { success: jest.fn(), error: jest.fn() };

  return render(
    <NotificationContext.Provider value={{ notify: notifyMock }}>
      <MemoryRouter>
        <Login loginUser={loginUser} />
      </MemoryRouter>
    </NotificationContext.Provider>
  );
}

describe("loginUser", () => {
  test("When loginUser throw, then call error notify with particular text", async () => {
    const loginUser = jest.fn().mockRejectedValueOnce(new Error("Error"));
    const notify = {
      error: jest.fn(),
    };
    renderLoginPage(loginUser, notify);
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, getEmailSample());
    userEvent.type(passInput, getPasswordSample());
    userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(notify.error).toBeCalledWith(
        expect.stringMatching(/Failed to login/i)
      )
    );
  });

  test("When loginUser throw Invalid Data, then call error notify with particular text", async () => {
    const loginUser = jest.fn().mockRejectedValueOnce(new InvalidData("Error"));
    const notify = {
      error: jest.fn(),
    };
    renderLoginPage(loginUser, notify);
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, getEmailSample());
    userEvent.type(passInput, getPasswordSample());
    userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(notify.error).toBeCalledWith(
        expect.stringMatching(/Invalid data/i)
      )
    );
  });

  test("When loginUser success, then call success notify with particular text", async () => {
    const loginUser = jest.fn();
    const notify = {
      success: jest.fn(),
    };
    renderLoginPage(loginUser, notify);
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/password/i);

    userEvent.type(emailInput, getEmailSample());
    userEvent.type(passInput, getPasswordSample());
    userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(notify.success).toBeCalledWith(
        expect.stringMatching(/Successfully/i)
      )
    );
  });
});
