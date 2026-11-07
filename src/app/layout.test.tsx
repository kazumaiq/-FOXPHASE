import { expect, it } from "vitest";
import RootLayout from "./layout";

it("sets the FOXPHASE document language and renders children", () => {
  const layout = RootLayout({ children: <main>Independent Sound</main> });
  expect(layout.props.lang).toBe("en");
  expect(layout.props.children).toBeTruthy();
});
