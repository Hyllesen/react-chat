import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HiddenMessage from "components/HiddenMessage";

test("shows the children when the checkbox is checked", () => {
  const testMessage = "Test Message";
  const { queryByText, getByLabelText, getByText } = render(
    <HiddenMessage>{testMessage}</HiddenMessage>
  );

  expect(queryByText(testMessage)).toBeNull();

  fireEvent.click(getByLabelText("Show Message"));

  expect(getByText(testMessage)).toBeDefined();
});
