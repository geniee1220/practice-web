import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";

describe("App Component", () => {
  it("로고 렌더링 확인", () => {
    // Arrange
    render(<App />);

    // Act
    const viteLogo = screen.getByAltText("Vite logo");
    const reactLogo = screen.getByAltText("React logo");

    // Assert
    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  it("버튼 클릭 시 카운트 증가", () => {
    // Arrange
    render(<App />);
    const countButton = screen.getByText(/count is/i);

    // Act
    fireEvent.click(countButton);

    // Assert
    expect(countButton).toHaveTextContent("count is 1");
  });
});
