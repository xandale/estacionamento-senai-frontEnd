import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Usuario from "./Usuario";

jest.mock("axios");

describe("Usuario Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders user data fields", async () => {
    axios.get.mockResolvedValueOnce({
      data: { nome: "John Doe", email: "john@example.com", cpf: "123.456.789-00", telefone: "(11) 98765-4321" },
    });

    render(<Usuario />);
    expect(await screen.findByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
  });

  test("updates user data", async () => {
    axios.put.mockResolvedValueOnce({});
    axios.get.mockResolvedValueOnce({
      data: { nome: "John Doe", email: "john@example.com", cpf: "123.456.789-00", telefone: "(11) 98765-4321" },
    });

    render(<Usuario />);
    fireEvent.click(await screen.findByText("Editar"));
    fireEvent.change(screen.getByDisplayValue("John Doe"), { target: { value: "Jane Doe" } });
    fireEvent.click(screen.getByText("Salvar alterações"));

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3000/usuarios/atualizar",
      expect.objectContaining({ nome: "Jane Doe" }),
      expect.any(Object)
    );
  });
});
