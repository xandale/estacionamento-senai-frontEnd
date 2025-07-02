import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

jest.mock("axios");

describe("Login Component", () => {
  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Digite seu e-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  test("submits login form", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "mock-token" } });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Digite seu e-mail"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Digite sua senha"), { target: { value: "password" } });
    fireEvent.click(screen.getByText("Entrar"));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/login",
      expect.objectContaining({ email: "user@example.com", senha: "password" })
    );
  });
});
