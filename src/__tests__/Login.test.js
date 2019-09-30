import React from "react";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import Login from "components/Login";

test("allows the user to login successfully", async () => {
  //mock out window.fetch for the test
  const fakeUserResponse = { token: "fake_user_token" };
  jest.spyOn(window, "fetch").mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse)
    });
  });

  const { getByLabelText, getByText, findByRole } = render(<Login />);

  fireEvent.change(getByLabelText(/username/i), { target: { value: "chuck" } });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: "norris" }
  });

  fireEvent.click(getByText(/submit/i));

  const alert = await findByRole("alert");

  expect(alert.textContent).toMatch(/congrats/i);
  expect(window.localStorage.getItem("token")).toEqual(fakeUserResponse.token);
});
