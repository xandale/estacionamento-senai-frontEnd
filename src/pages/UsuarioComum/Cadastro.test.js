import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cadastro from "./Cadastro";

describe("Cadastro Component", () => {
  test("renders cadastro form", () => {
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu CPF")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu telefone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
  });

  test("submits cadastro form", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Digite seu nome"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Digite seu CPF"), { target: { value: "123.456.789-00" } });
    fireEvent.change(screen.getByPlaceholderText("Digite seu telefone"), { target: { value: "(11) 98765-4321" } });
    fireEvent.change(screen.getByPlaceholderText("Digite seu email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Digite sua senha"), { target: { value: "password" } });
    fireEvent.click(screen.getByText("Cadastrar"));

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/cadastro",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          nome: "John Doe",
          cpf: "12345678900",
          telefone: "11987654321",
          email: "john@example.com",
          senha: "password",
        }),
      })
    );
  });
});
