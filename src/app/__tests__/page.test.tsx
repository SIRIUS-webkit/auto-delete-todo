import { render, screen, fireEvent, act } from "@testing-library/react";
import Home from "@/app/page";

jest.useFakeTimers();

describe("Auto Delete Todo List", () => {
  test("renders the main list with all items initially", () => {
    render(<Home />);
    const mainList = screen.getByTestId("main-list");
    expect(mainList.children.length).toBe(11);
  });

  test("moves an item to its category and auto-returns after 5 seconds", () => {
    render(<Home />);

    const appleButton = screen.getByText("Apple");
    fireEvent.click(appleButton);

    const mainList = screen.getByTestId("main-list");
    expect(mainList.children.length).toBe(10);

    const fruitList = screen.getByTestId("fruit-list");
    expect(fruitList).toHaveTextContent("Apple");

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mainList.children.length).toBe(11);
    expect(fruitList).not.toContain("Apple");
  });

  test("returns an item immediately when its category button is clicked", () => {
    render(<Home />);

    const bananaButton = screen.getByText("Banana");
    fireEvent.click(bananaButton);

    const fruitList = screen.getByTestId("fruit-list");
    expect(fruitList).toHaveTextContent("Banana");

    const fruitBananaButton = screen.getByText("Banana");
    fireEvent.click(fruitBananaButton);

    expect(fruitList).not.toHaveTextContent("Banana");
    const mainList = screen.getByTestId("main-list");
    expect(mainList).toHaveTextContent("Banana");
  });
});
