import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { LanguageToggle } from "./language-toggle";

it("switches the visible language and persists the choice", () => {
  render(<LanguageToggle />);
  fireEvent.click(screen.getByRole("button", { name: "Русский" }));
  expect(screen.getByText("Русский")).toBeInTheDocument();
  expect(localStorage.getItem("foxphase-locale")).toBe("ru");
});
